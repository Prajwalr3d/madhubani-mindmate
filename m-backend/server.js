// FINAL MindMate Backend – Full Working Version
// Supports: knowledge.json, doctors.json, sleep_tips.json
// Analyze classification + fallback
// GenAI fallback
// Crisis detection
// ES Module compatible

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// ----------------------------------------
// Middleware
// ----------------------------------------
app.use(helmet());
app.use(express.json({ limit: "80kb" }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// ----------------------------------------
// Load JSON helpers
// ----------------------------------------
function readJSON(file) {
  try {
    const full = path.join(__dirname, file);
    if (!fs.existsSync(full)) return [];
    return JSON.parse(fs.readFileSync(full, "utf-8"));
  } catch (err) {
    console.error("JSON load error:", file, err.message);
    return [];
  }
}

const doctors = readJSON("doctors.json");
const sleepTips = readJSON("sleep_tips.json");
const knowledge = readJSON("knowledge.json");

// Log KB size (debug)
console.log("Loaded knowledge entries:", knowledge.length);

// ----------------------------------------
// Knowledge Search
// ----------------------------------------
function searchKnowledge(q) {
  if (!q) return [];
  const text = q.toLowerCase();
  const exact = knowledge.filter(
    (k) =>
      k.q.toLowerCase().includes(text) ||
      k.a.toLowerCase().includes(text)
  );
  if (exact.length) return exact;

  const tokens = text.split(/\W+/).filter((t) => t.length > 2);
  const fuzzy = knowledge.filter((k) => {
    const blob = (k.q + " " + k.a).toLowerCase();
    return tokens.some((t) => blob.includes(t));
  });
  return fuzzy.slice(0, 5);
}

// ----------------------------------------
// Crisis detection
// ----------------------------------------
const crisisKeywords = [
  "suicide",
  "kill myself",
  "want to die",
  "hurt myself",
  "end my life",
  "i cant go on",
  "cut myself",
  "overdose",
  "hang myself",
];

function isCrisis(text = "") {
  const s = text.toLowerCase();
  return crisisKeywords.some((w) => s.includes(w));
}

// ----------------------------------------
// Fallback Reply
// ----------------------------------------
function fallbackReply(t = "") {
  const s = t.toLowerCase();
  if (/sleep|insomnia/.test(s))
    return "Try 4-4-4 breathing, low lights, and no screens 1 hour before sleep.";
  if (/anx|panic|stress/.test(s))
    return "Pause. Inhale 4s — hold 4s — exhale 4s. You're safe here.";
  if (/depress|sad|hopeless/.test(s))
    return "Small steps help: sunlight, movement, journaling, and talking to someone you trust.";
  return "I'm listening. Tell me a bit more.";
}

// ----------------------------------------
// Routes
// ----------------------------------------
app.get("/api/health", (req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

app.get("/api/doctors", (req, res) => res.json({ doctors }));
app.get("/api/sleep-tips", (req, res) => res.json({ tips: sleepTips }));

app.get("/api/knowledge", (req, res) => {
  const q = req.query.q || "";
  res.json({ results: searchKnowledge(q) });
});

// ----------------------------------------
// /api/analyze – Smart classifier
// ----------------------------------------
app.post("/api/analyze", async (req, res) => {
  try {
    const text = (req.body?.text || "").toString();

    if (!text) return res.json({ error: "empty", reply: "Say something first 💜" });

    if (isCrisis(text))
      return res.json({
        crisis: true,
        label: "suicidal",
        confidence: 1,
        reply:
          "⚠️ I'm really worried by what you said. Call emergency services or a suicide hotline right now.",
      });

    // try HF classification
    let scoresList = [];
    try {
      const HF_KEY = process.env.HUGGINGFACE_API_KEY;
      const MODEL = process.env.MODEL_NAME || "KevSun/mentalhealth_LM";

      const routerURL = "https://router.huggingface.co/hf-inference";
      const resp = await axios.post(
        routerURL,
        {
          model: MODEL,
          input: text,
          parameters: { return_all_scores: true },
          options: { wait_for_model: true, use_cache: false },
        },
        { headers: { Authorization: `Bearer ${HF_KEY}` } }
      );

      const data = resp.data;

      if (Array.isArray(data) && Array.isArray(data[0])) {
        scoresList = data[0];
      } else if (Array.isArray(data)) {
        scoresList = data;
      } else if (data?.label) {
        scoresList = [data];
      }
    } catch (err) {
      console.log("HF failed, using fallback analyze:", err.message);
      scoresList = [];
    }

    // Pick top label
    let label = "neutral";
    let confidence = 0.5;
    if (scoresList.length > 0) {
      scoresList.sort((a, b) => b.score - a.score);
      label = scoresList[0].label;
      confidence = scoresList[0].score;
    }

    // Friendly reply mapping
    let reply = fallbackReply(text);
    if (/depress/i.test(label))
      reply = "This feels like depression. Small routines + support can help.";
    if (/anx/i.test(label))
      reply = "This sounds like anxiety. Try slow breathing: inhale 4, hold 4, exhale 4.";
    if (/stress/i.test(label))
      reply = "Seems like stress. Drink water, stretch 3 min, breathe slowly.";
    if (/suicid/i.test(label))
      reply =
        "⚠️ I'm concerned for you. Please contact emergency services or a helpline immediately.";

    // Knowledge boost
    const kb = searchKnowledge(text);
    if (kb.length > 0) reply = kb[0].a;

    return res.json({
      label,
      confidence: Math.round(confidence * 100) / 100,
      reply,
      crisis: label.toLowerCase() === "suicidal",
      knowledgeResults: kb,
    });
  } catch (err) {
    console.log("ANALYZE ERROR:", err);
    const fallback = fallbackReply(req.body?.text || "");
    return res.json({
      label: "unknown",
      confidence: 0,
      reply: fallback,
      fallback: true,
    });
  }
});

// ----------------------------------------
// /api/genai – generic chat
// ----------------------------------------
app.post("/api/genai", async (req, res) => {
  const text = req.body?.prompt || "";

  if (isCrisis(text))
    return res.json({
      reply:
        "⚠️ This sounds serious. If you're in danger, call emergency services immediately.",
      crisis: true,
    });

  // fallback only (no HF need)
  const kb = searchKnowledge(text);
  if (kb.length > 0)
    return res.json({ reply: kb[0].a, knowledgeResults: kb });

  return res.json({ reply: fallbackReply(text), knowledgeResults: [] });
});

// ----------------------------------------
// Test page
// ----------------------------------------
app.get("/test", (req, res) =>
  res.send(`
  <form method="POST" action="/api/analyze">
    <textarea name="text" rows="4" cols="50">I feel emotional exhaustion</textarea><br>
    <button>Send</button>
  </form>
`)
);

// ----------------------------------------
// Start Server
// ----------------------------------------
app.listen(PORT, () => {
  console.log(`🌿 MindMate backend running on port ${PORT}`);
});
