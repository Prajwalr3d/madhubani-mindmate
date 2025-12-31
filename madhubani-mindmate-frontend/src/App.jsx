import React, { useState } from "react";
import SelfCheck from "./components/SelfCheck";
import Results from "./components/Results";
import Chat from "./components/Chat"; // 🌿 added import

/**
 * Main App: home / nav / chat / self-check integration
 */
export default function App() {
  const [view, setView] = useState("home"); // home | chat | selfcheck | results | sleep | knowledge
  const [lastResult, setLastResult] = useState(null);

  const openSelfCheck = () => setView("selfcheck");
  const openChat = () => setView("chat");
  const goHome = () => setView("home");

  const onSelfCheckComplete = (result) => {
    setLastResult(result);
    setView("results");
  };

  const header = (
    <header className="bg-white/60 backdrop-blur-sm border-b border-violet-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
        <svg
          className="w-14 h-10"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 50 C40 5, 90 5, 120 50 C140 80, 190 80, 195 50"
            fill="none"
            stroke="#6B21A8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="30" cy="18" r="6" fill="#FF6FB5" />
          <circle cx="85" cy="12" r="5" fill="#F3D3F0" />
        </svg>

        <div className="flex-1">
          <h1 className="text-violet-800 text-xl font-bold">
            Madhubani MindMate
          </h1>
          <p className="text-sm text-muted">
            A calm space to check in, learn, and take small steps
          </p>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={goHome}
            className="text-sm px-3 py-2 rounded-md hover:bg-violet-50"
          >
            Home
          </button>
          <button
            onClick={openSelfCheck}
            className="text-sm px-3 py-2 rounded-md bg-pink-100 text-violet-700 hover:bg-pink-200"
          >
            Self Check
          </button>
          <button
            onClick={openChat}
            className="text-sm px-3 py-2 rounded-md hover:bg-violet-50"
          >
            Chat
          </button>
        </nav>
      </div>
    </header>
  );

  const hero = (
    <section className="max-w-4xl mx-auto p-6 text-center">
      <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-3xl p-8 shadow-soft border border-violet-100">
        <h2 className="text-3xl font-extrabold text-violet-800 mb-2">
          Welcome back
        </h2>
        <p className="text-gray-700 mb-6">
          Take a deep breath. You can chat with MindMate, run a short self-check,
          or explore tips for sleep and wellbeing.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={openSelfCheck}
            className="px-6 py-3 bg-violet-700 text-white rounded-full shadow hover:bg-violet-800"
          >
            Start Self Check
          </button>
          <button
            onClick={openChat}
            className="px-6 py-3 border border-violet-200 text-violet-700 rounded-full hover:bg-violet-50"
          >
            Talk to MindMate
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violetSoft to-pinkLight">
      {header}

      <main className="py-8">
        {view === "home" && (
          <>
            {hero}
            <section className="max-w-4xl mx-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-soft border border-violet-100">
                  <h4 className="font-semibold text-violet-700 mb-2">
                    Sleep Help
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Practical exercises & routines to help you sleep better.
                  </p>
                  <button
                    onClick={() => {
                      setView("sleep");
                    }}
                    className="text-sm bg-pink-100 px-3 py-2 rounded-full text-violet-700"
                  >
                    Explore Sleep Tips
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-soft border border-violet-100">
                  <h4 className="font-semibold text-violet-700 mb-2">
                    Self Check
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    A short, guided questionnaire to understand how you're
                    feeling.
                  </p>
                  <button
                    onClick={openSelfCheck}
                    className="text-sm bg-pink-100 px-3 py-2 rounded-full text-violet-700"
                  >
                    Start
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-soft border border-violet-100">
                  <h4 className="font-semibold text-violet-700 mb-2">
                    Wellbeing Info
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Quick tips and short guides for everyday wellbeing.
                  </p>
                  <button
                    onClick={() => setView("knowledge")}
                    className="text-sm bg-pink-100 px-3 py-2 rounded-full text-violet-700"
                  >
                    Learn
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {view === "selfcheck" && (
          <div className="py-6">
            <SelfCheck onComplete={onSelfCheckComplete} />
          </div>
        )}

        {view === "results" && lastResult && (
          <div className="py-6 px-4">
            <Results
              result={lastResult}
              onBack={() => {
                setView("selfcheck");
                setLastResult(null);
              }}
            />
          </div>
        )}

        {view === "chat" && (
          <div className="py-6">
            <Chat /> {/* 🌿 real AI chat */}
          </div>
        )}

        {view === "sleep" && (
          <section className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-violet-100">
              <h3 className="text-lg font-semibold text-violet-700 mb-2">
                Sleep Tips
              </h3>
              <p className="text-gray-700">
                Open the Sleep Tips panel in the app (left) or try the 'Sleep'
                button below to fetch curated routines.
              </p>
              <button
                onClick={async () => {
                  const res = await fetch("/api/sleep-tips");
                  const j = await res.json();
                  alert(
                    "Sleep tips fetched — view them in console and implement UI to render them: " +
                      j.tips.length +
                      " tips"
                  );
                  console.log(j);
                }}
                className="mt-3 bg-pink-400 text-white px-4 py-2 rounded-full"
              >
                Fetch Sleep Tips
              </button>
            </div>
          </section>
        )}

        {view === "knowledge" && (
          <section className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-violet-100">
              <h3 className="text-lg font-semibold text-violet-700 mb-2">
                Wellbeing Info
              </h3>
              <p className="text-gray-700">
                Try searching common topics (e.g., "sleep", "panic").
              </p>
              <SearchKnowledge />
            </div>
          </section>
        )}
      </main>

      <footer className="text-center text-sm text-muted py-6">
        © 2025 MindMate • Not a substitute for professional care
      </footer>
    </div>
  );
}

/* Search Knowledge component stays the same */
function SearchKnowledge() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);

  const search = async () => {
    try {
      const r = await fetch("/api/knowledge?q=" + encodeURIComponent(q));
      const j = await r.json();
      setRes(j.results || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try 'sleep' or 'panic'"
          className="flex-1 p-2 border border-violet-200 rounded-md"
        />
        <button
          onClick={search}
          className="bg-violet-700 text-white px-3 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {res.length === 0 && <p className="text-gray-600">No results yet.</p>}
        {res.map((r) => (
          <div
            key={r.id}
            className="bg-pink-50 border border-violet-100 p-3 rounded-md"
          >
            <strong className="text-violet-700">{r.q}</strong>
            <p className="text-gray-700 mt-1">{r.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
