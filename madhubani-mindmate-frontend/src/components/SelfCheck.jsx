import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🌿 A pastel, Madhubani-inspired guided self-check screen
export default function SelfCheck({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: "mood",
      question: "How has your mood been lately?",
      options: [
        { value: "happy", label: "Mostly Happy 😊" },
        { value: "neutral", label: "Neutral / Mixed 😐" },
        { value: "depressed", label: "Mostly Sad or Low 😔" }
      ]
    },
    {
      id: "sleep",
      question: "How is your sleep these days?",
      options: [
        { value: "normal", label: "Good & Restful 🌙" },
        { value: "less", label: "Sleeping less than usual 😴" },
        { value: "more", label: "Sleeping more than usual 💤" }
      ]
    },
    {
      id: "anxiety",
      question: "Do you often feel anxious or restless?",
      options: [
        { value: "none", label: "Not much 🌿" },
        { value: "mild", label: "Sometimes 🫰" },
        { value: "high", label: "Often or always ⚡" }
      ]
    },
    {
      id: "suicidal",
      question: "Have you had thoughts of harming yourself?",
      options: [
        { value: "no", label: "No 🙏" },
        { value: "maybe", label: "Sometimes I feel that way 💭" },
        { value: "yes", label: "Yes — I need help 🚨" }
      ]
    },
    {
      id: "duration_days",
      question: "How long have you felt this way?",
      options: [
        { value: 7, label: "Less than a week 🌅" },
        { value: 30, label: "About a month 🌤" },
        { value: 90, label: "Several months ☁️" }
      ]
    },
    {
      id: "function_impairment",
      question: "Is it affecting your studies or work?",
      options: [
        { value: 0, label: "Not really 🙂" },
        { value: 2, label: "A little 😕" },
        { value: 5, label: "Quite a lot 😞" }
      ]
    }
  ];

  const handleSelect = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/selfcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, text })
      });
      const data = await res.json();
      setResult(data);
      onComplete(data);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const gradientBg =
    "bg-gradient-to-br from-pink-100 via-violet-100 to-white min-h-screen";

  return (
    <div
      className={`${gradientBg} flex flex-col items-center justify-center text-center p-6 transition-all`}
    >
      <AnimatePresence mode="wait">
        {step < questions.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md border border-violet-200"
          >
            <h2 className="text-xl font-semibold text-violet-700 mb-4">
              {questions[step].question}
            </h2>
            <div className="flex flex-col gap-3">
              {questions[step].options.map((opt) => (
                <motion.button
                  key={opt.value}
                  onClick={() => handleSelect(questions[step].id, opt.value)}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-100 hover:bg-pink-200 text-violet-800 px-4 py-3 rounded-xl border border-violet-300 transition-all"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === questions.length && !result && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-md border border-pink-200"
          >
            <h2 className="text-lg font-semibold text-violet-700 mb-3">
              Optional: Describe how you’ve been feeling 💬
            </h2>
            <textarea
              className="w-full border border-violet-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              rows={4}
              placeholder="Type here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="mt-4 bg-violet-600 text-white px-6 py-3 rounded-full shadow hover:bg-violet-700 transition-all"
            >
              {loading ? "Analyzing..." : "See My Results 💫"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-lg border border-violet-200 mt-6"
        >
          <h2 className="text-2xl font-semibold text-violet-700 mb-4">
            🌿 Self-Check Results
          </h2>

          {result.conditions.length === 0 ? (
            <p className="text-gray-700">No significant symptoms detected.</p>
          ) : (
            <ul className="text-left text-gray-700 mb-4">
              {result.conditions.map((c, i) => (
                <li key={i}>
                  <strong>{c.name}</strong> — {Math.round(c.score * 100)}%
                </li>
              ))}
            </ul>
          )}

          <p className="text-violet-700 font-semibold">
            Threat Level:{" "}
            <span
              className={`${
                result.threatLevel === "Emergency"
                  ? "text-red-600"
                  : result.threatLevel === "High"
                  ? "text-orange-500"
                  : result.threatLevel === "Moderate"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {result.threatLevel}
            </span>
          </p>

          <div className="mt-4 text-left">
            <h3 className="font-semibold text-violet-700 mb-2">
              Recommended Specialists:
            </h3>
            <ul className="text-gray-700">
              {result.recommended.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-left">
            <h3 className="font-semibold text-violet-700 mb-2">
              Suggested Actions 🌱
            </h3>
            <ul className="text-gray-700">
              {result.advice.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-left">
            <h3 className="font-semibold text-violet-700 mb-2">
              Helpful Contacts 📞
            </h3>
            <ul className="text-gray-700">
              {result.doctors.map((d) => (
                <li key={d.id}>
                  <strong>{d.specialty}</strong> — {d.name} ({d.number})
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              setResult(null);
              setStep(0);
              setAnswers({});
              setText("");
            }}
            className="mt-6 bg-pink-400 text-white px-5 py-2 rounded-full hover:bg-pink-500 transition-all"
          >
            Start Again 🔁
          </button>
        </motion.div>
      )}
    </div>
  );
}
