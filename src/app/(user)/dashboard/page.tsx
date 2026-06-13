/* eslint-disable react/jsx-no-comment-textnodes */
// app/(app)/dashboard/page.tsx
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-[#f0ede8] overflow-y-auto">
      {/* 1. Header & Character Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono tracking-widest text-[#f0a500] uppercase">
            [ THE KEEP ]
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            LOBBY / MAIN DECK
          </p>
        </div>

        {/* Player Stats Block */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded">
            <span className="text-zinc-500">LEVEL:</span>{" "}
            <span className="text-white">Lv. 4</span>
          </div>
          <div className="border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded">
            <span className="text-zinc-500">GOLD:</span>{" "}
            <span className="text-[#f0a500]">🪙 120</span>
          </div>
          <div className="border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded">
            <span className="text-zinc-500">STREAK:</span>{" "}
            <span className="text-red-500">🔥 5 Days</span>
          </div>
        </div>
      </div>

      {/* XP Mana/Health Bar */}
      <div className="w-full border border-zinc-800 bg-zinc-950 p-2.5 rounded font-mono text-xs">
        <div className="flex justify-between text-zinc-400 mb-1">
          <span>XP PROGRESS</span>
          <span>50 / 100 XP</span>
        </div>
        <div className="w-full bg-zinc-900 h-2.5 rounded-sm overflow-hidden border border-zinc-800">
          <div
            className="bg-[#f0a500] h-full shadow-[0_0_8px_#f0a500]"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>

      {/* 2. Grid Content (2-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* LEFT COLUMN: Main Actions & AI Coach (2/3 Width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Procedural Run Trigger */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6 rounded flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-sm font-bold tracking-wider font-mono text-white uppercase">
                // PROCEDURAL RUN
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Ready to initiate a run? Selecting a study seed (document/topic)
                will compile a randomized dungeon of questions with adaptive
                difficulty.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/decks"
                className="border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] font-mono text-xs font-bold px-4 py-2 transition-all"
              >
                INITIATE RUN
              </Link>
              <Link
                href="/decks/ingest"
                className="border border-zinc-700 hover:border-white text-zinc-400 hover:text-white font-mono text-xs px-4 py-2 transition-all"
              >
                INGEST NEW SEED
              </Link>
            </div>
          </div>

          {/* AI Coach Card */}
          <div className="border border-[#f0a500]/30 bg-zinc-950/20 p-5 rounded font-mono">
            <h4 className="text-xs text-[#f0a500] uppercase font-bold tracking-wider mb-2">
              🤖 TACTICAL REPORT (AI COACH)
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              &quot;Your retention on the &apos;JavaScript Async&apos; seed has
              decayed to 40%. The Spaced Repetition engine recommends running a
              quick 5-question review on that deck to recover your ease
              factor.&quot;
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Spaced Repetition & Threat List (1/3 Width) */}
        <div className="space-y-6">
          {/* Spaced Repetition Queue */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded space-y-4 font-mono text-xs">
            <h3 className="font-bold text-white tracking-wider uppercase">
              // REVIEW QUEUE
            </h3>

            <div className="border border-yellow-900/50 bg-yellow-950/10 p-3 rounded">
              <p className="text-[#f0a500] font-bold">15 CARDS DUE TODAY</p>
              <p className="text-zinc-500 text-[10px] mt-1">
                Based on SM-2 spacing calculations.
              </p>
            </div>

            <Link
              href="/review"
              className="block text-center border border-zinc-700 hover:border-[#f0a500] text-zinc-400 hover:text-[#f0a500] py-2 transition-all uppercase font-bold text-[10px]"
            >
              Start Review Session
            </Link>
          </div>

          {/* Weak Spots */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded space-y-3 font-mono text-xs">
            <h3 className="font-bold text-red-500 tracking-wider uppercase">
              🚨 THREAT LIST (WEAK SPOTS)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">DNS Records</span>
                <span className="text-red-500 font-bold bg-red-950/30 px-1.5 py-0.5 rounded text-[10px]">
                  33% Accuracy
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">REST APIs</span>
                <span className="text-red-500 font-bold bg-red-950/30 px-1.5 py-0.5 rounded text-[10px]">
                  40% Accuracy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">OAuth Handshake</span>
                <span className="text-red-500 font-bold bg-red-950/30 px-1.5 py-0.5 rounded text-[10px]">
                  45% Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
