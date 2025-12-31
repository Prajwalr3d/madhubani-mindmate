import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable Results card used by SelfCheck or other flows.
 * Props:
 *  - result: { conditions:[], threatLevel, recommended:[], advice:[], doctors:[] }
 *  - onBack: function to go back / restart
 */
export default function Results({ result, onBack }) {
  if (!result) return null;

  const levelColor = {
    Emergency: "text-red-600",
    High: "text-orange-500",
    Moderate: "text-yellow-600",
    Low: "text-green-600",
  }[result.threatLevel] || "text-green-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 max-w-3xl mx-auto shadow-2xl border border-violet-100"
    >
      <h2 className="text-2xl font-bold text-violet-700 mb-2">🌿 Your Self-Check Results</h2>

      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">
          This is not a diagnosis — it’s an initial screen to help guide you.
        </p>

        <div className="mb-4">
          <h3 className="text-violet-700 font-semibold">Detected Conditions</h3>
          {result.conditions && result.conditions.length ? (
            <ul className="mt-2 text-gray-700 list-inside space-y-1">
              {result.conditions.map((c, i) => (
                <li key={i}>
                  <strong>{c.name}</strong> — {Math.round((c.score || 0) * 100)}%
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No significant symptoms detected.</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-violet-700 font-semibold">Threat Level</h3>
          <p className={`mt-1 text-lg font-semibold ${levelColor}`}>{result.threatLevel}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-violet-700 font-semibold">Recommended Specialists</h3>
          <ul className="mt-2 text-gray-700">
            {result.recommended?.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-violet-700 font-semibold">Suggested Actions</h3>
          <ul className="mt-2 text-gray-700 list-disc pl-5 space-y-1">
            {result.advice?.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-violet-700 font-semibold">Helpful Contacts</h3>
          <ul className="mt-2 text-gray-700 space-y-1">
            {result.doctors?.map((d) => (
              <li key={d.id}>
                <strong>{d.specialty}</strong> — {d.name} ({d.number})
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-pink-400 text-white hover:bg-pink-500 transition"
          >
            Start Again
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open("tel:112");
            }}
            className="px-4 py-2 rounded-full border border-violet-200 text-violet-700 hover:bg-violet-50 transition"
          >
            Call Emergency
          </a>
        </div>
      </div>
    </motion.div>
  );
}
