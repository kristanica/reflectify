// app/(app)/leaderboard/page.tsx
"use client";

import React, { useState } from "react";

// Mock data representing the top performers in the database
const LEADERBOARD_DATA = {
  xp: [
    {
      rank: 1,
      name: "Aelph_01",
      level: 18,
      value: "12,450 XP",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "LunaScribe",
      level: 15,
      value: "9,820 XP",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Vespera",
      level: 14,
      value: "8,900 XP",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Novice_Lain",
      level: 12,
      value: "7,200 XP",
      isCurrentUser: false,
    },
    {
      rank: 5,
      name: "Student_Scholar (You)",
      level: 4,
      value: "4,120 XP",
      isCurrentUser: true,
    },
    {
      rank: 6,
      name: "Caelum_S",
      level: 9,
      value: "3,800 XP",
      isCurrentUser: false,
    },
    {
      rank: 7,
      name: "Chronos_R",
      level: 8,
      value: "3,150 XP",
      isCurrentUser: false,
    },
  ],
  score: [
    {
      rank: 1,
      name: "Aelph_01",
      level: 18,
      value: "98,400 PTS",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "LunaScribe",
      level: 15,
      value: "78,200 PTS",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Vespera",
      level: 14,
      value: "72,100 PTS",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Student_Scholar (You)",
      level: 4,
      value: "45,200 PTS",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Novice_Lain",
      level: 12,
      value: "44,900 PTS",
      isCurrentUser: false,
    },
    {
      rank: 6,
      name: "Caelum_S",
      level: 9,
      value: "31,200 PTS",
      isCurrentUser: false,
    },
    {
      rank: 7,
      name: "Chronos_R",
      level: 8,
      value: "29,400 PTS",
      isCurrentUser: false,
    },
  ],
  streak: [
    {
      rank: 1,
      name: "Vespera",
      level: 14,
      value: "28 Flame Streak",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Aelph_01",
      level: 18,
      value: "24 Flame Streak",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "LunaScribe",
      level: 15,
      value: "22 Flame Streak",
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: "Caelum_S",
      level: 9,
      value: "18 Flame Streak",
      isCurrentUser: false,
    },
    {
      rank: 5,
      name: "Student_Scholar (You)",
      level: 4,
      value: "15 Flame Streak",
      isCurrentUser: true,
    },
    {
      rank: 6,
      name: "Novice_Lain",
      level: 12,
      value: "12 Flame Streak",
      isCurrentUser: false,
    },
    {
      rank: 7,
      name: "Chronos_R",
      level: 8,
      value: "10 Flame Streak",
      isCurrentUser: false,
    },
  ],
};

type TabType = "xp" | "score" | "streak";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("xp");

  return (
    <div className="w-full flex flex-col p-6 space-y-6 text-[#f0ede8] overflow-y-auto">
      <div className="flex border border-zinc-800 bg-zinc-950 p-1.5 rounded font-mono text-xs gap-2">
        {(["xp", "score", "streak"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 transition-all uppercase font-bold tracking-wider ${
              activeTab === tab
                ? "bg-[#f0a500] text-black shadow-[0_0_8px_rgba(240,165,0,0.2)]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab === "xp"
              ? "XP RANKINGS"
              : tab === "score"
                ? "ALL-TIME SCORE"
                : "MAX STREAKS"}
          </button>
        ))}
      </div>

      {/* 3. Scores Table */}
      <div className="border border-zinc-800 bg-zinc-950/40 rounded overflow-hidden font-mono text-xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 text-[10px] tracking-wider uppercase">
              <th className="py-3 px-4 font-bold">Rank</th>
              <th className="py-3 px-4 font-bold">Scholar</th>
              <th className="py-3 px-4 font-bold text-center">Level</th>
              <th className="py-3 px-4 text-right font-bold">Record</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD_DATA[activeTab].map((row) => {
              // Styling helper for podium ranks (Gold, Silver, Bronze)
              const rankColor =
                row.rank === 1
                  ? "text-[#f0a500] font-bold"
                  : row.rank === 2
                    ? "text-zinc-350 font-bold"
                    : row.rank === 3
                      ? "text-amber-700 font-bold"
                      : "text-zinc-500";

              return (
                <tr
                  key={row.name}
                  className={`border-b border-zinc-900 transition-colors hover:bg-zinc-900/30 ${
                    row.isCurrentUser
                      ? "bg-zinc-900/50 border-y border-[#f0a500]/30"
                      : ""
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-3.5 px-4 font-bold">
                    <span className={rankColor}>
                      {row.rank === 1
                        ? "🥇 "
                        : row.rank === 2
                          ? "🥈 "
                          : row.rank === 3
                            ? "🥉 "
                            : ""}
                      {row.rank}
                    </span>
                  </td>

                  {/* Name Column */}
                  <td className="py-3.5 px-4 font-bold text-zinc-200">
                    <span className={row.isCurrentUser ? "text-[#f0a500]" : ""}>
                      {row.name}
                    </span>
                  </td>

                  {/* Level Column */}
                  <td className="py-3.5 px-4 text-center text-zinc-400 font-bold">
                    Lv. {row.level}
                  </td>

                  {/* Value Column */}
                  <td className="py-3.5 px-4 text-right font-bold text-white tracking-wide">
                    {row.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. Player Standing Footer */}
      <div className="border border-[#f0a500]/20 bg-[#f0a500]/5 p-4 rounded text-center font-mono text-xs text-zinc-400">
        <span>Your active global ranking is: </span>
        <span className="text-[#f0a500] font-bold">#5 overall</span>
        <span>. Play runs and log daily reviews to advance.</span>
      </div>
    </div>
  );
}
