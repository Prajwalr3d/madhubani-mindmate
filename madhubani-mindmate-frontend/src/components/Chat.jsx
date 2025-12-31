import React, { useState, useRef, useEffect } from "react";

/**
 * Chat.jsx
 * - Inline send SVG (no heroicons dependency)
 * - Uses relative /api/genai endpoint
 * - Shows typing-dots while waiting for response
 * - Simulated typing effect when rendering reply
 */

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "🌿 Hey there, I’m MindMate. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false); // shows typing dots
  const chatEndRef = useRef(null);

  useEffect(() => {
    // auto-scroll when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // small helper to append a user/bot message
  const appendMessage = (m) => setMessages((prev) => [...prev, m]);

  // render typing dots
  function TypingDots() {
    return (
      <div className="flex items-center gap-2 text-sm text-violet-700 italic">
        <div className="flex items-center gap-1">
          <span className="dot animate-pulse">.</span>
          <span className="dot animate-pulse delay-75">.</span>
          <span className="dot animate-pulse delay-150">.</span>
        </div>
      </div>
    );
  }

  // send handler
  const handleSend = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    appendMessage({ from: "user", text });
    setInput("");
    setLoading(true);
    setThinking(true);

    // Add a temporary bot placeholder so we can animate typing
    appendMessage({ from: "bot", text: " " });

    try {
      // use relative URL; with vite proxy this will forward to backend
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error("Network response not OK");
      }

      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't think of a reply right now.";

      // Replace last message with typing animation (character by character)
      // We'll update the last message repeatedly to simulate typing
      for (let i = 0; i <= reply.length; i++) {
        const shown = reply.slice(0, i);
        setMessages((prev) => {
          // replace last message (which is the bot placeholder) with current shown text
          const copy = [...prev];
          // find last index of bot message
          let lastIdx = copy.length - 1;
          // update only if last message is bot
          if (copy[lastIdx]?.from !== "bot") {
            // fallback: push a new bot message
            copy.push({ from: "bot", text: shown });
          } else {
            copy[lastIdx] = { from: "bot", text: shown };
          }
          return copy;
        });
        // typing speed: a short delay per char
        await new Promise((r) => setTimeout(r, 10));
      }
    } catch (err) {
      console.error("Chat error:", err);
      // replace placeholder with error message
      setMessages((prev) => {
        const copy = [...prev];
        let lastIdx = copy.length - 1;
        if (copy[lastIdx]?.from === "bot") {
          copy[lastIdx] = {
            from: "bot",
            text:
              "⚠️ Something went wrong contacting the AI. Try again in a moment.",
          };
        } else {
          copy.push({
            from: "bot",
            text:
              "⚠️ Something went wrong contacting the AI. Try again in a moment.",
          });
        }
        return copy;
      });
    } finally {
      setLoading(false);
      setThinking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[70vh] max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-violet-100">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm md:text-base ${
                m.from === "user"
                  ? "bg-pink-200 text-violet-900 rounded-br-sm"
                  : "bg-white border border-violet-100 text-violet-900 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-white border border-violet-100 text-violet-700 text-sm">
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type what’s on your mind..."
          className="flex-1 px-4 py-3 border border-violet-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pinkAccent bg-white/70"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-pinkAccent text-white px-4 py-2 rounded-full shadow hover:bg-violetDeep transition flex items-center gap-2 disabled:opacity-50"
        >
          {/* Inline SVG send icon — avoids external icon packages */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
          <span className="text-sm font-medium">Send</span>
        </button>
      </form>

      <style jsx>{`
        .dot {
          font-weight: 800;
          font-size: 18px;
          opacity: 0.9;
        }
        .animate-pulse {
          animation: blink 1s linear infinite;
        }
        .delay-75 {
          animation-delay: 0.15s;
        }
        .delay-150 {
          animation-delay: 0.3s;
        }
        @keyframes blink {
          0% { opacity: 0.15; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 0.15; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
