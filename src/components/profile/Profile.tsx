// app/(app)/profile/page.tsx
"use client";

import React from "react";
import {
  Target,
  Flame,
  BookOpen,
  Skull,
  Dices,
  Gem,
  Zap,
  Coins,
  Sword,
  Trophy,
  Lock,
  ScrollText,
} from "lucide-react";

// Mock Achievements list from the database specs
const ACHIEVEMENTS = [
  {
    key: "first_run",
    name: "First Step",
    description: "Complete your first study run",
    icon: Target,
    unlocked: true,
  },
  {
    key: "streak_lord",
    name: "Streak Lord",
    description: "Achieve a 10-question streak",
    icon: Flame,
    unlocked: true,
  },
  {
    key: "scholar",
    name: "Scholar",
    description: "Master 100 cards across all decks",
    icon: BookOpen,
    unlocked: false,
  },
  {
    key: "iron_mind",
    name: "Iron Mind",
    description: "Complete a Nightmare mode run",
    icon: Skull,
    unlocked: false,
  },
  {
    key: "high_roller",
    name: "High Roller",
    description: "Win a High Risk Mode run",
    icon: Dices,
    unlocked: true,
  },
  {
    key: "perfectionist",
    name: "Perfectionist",
    description: "Complete 3 Perfect Runs",
    icon: Gem,
    unlocked: false,
  },
];

// Mock recent session logs
const RECENT_RUNS = [
  {
    date: "2026-06-11",
    deck: "Javascript Async",
    difficulty: "NORMAL",
    result: "COMPLETED",
    score: 840,
    acc: 80,
  },
  {
    date: "2026-06-10",
    deck: "Cellular Biology",
    difficulty: "HARD",
    result: "DIED (0 LIVES)",
    score: 320,
    acc: 55,
  },
  {
    date: "2026-06-08",
    deck: "World War II",
    difficulty: "EASY",
    result: "COMPLETED",
    score: 1120,
    acc: 95,
  },
];

export default function PlayerProfilePage() {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-8 text-mocha-text overflow-y-auto">
      {/* 1. Header */}
      <div className="border-b border-mocha-surface1 pb-4">
        <h2 className="text-xl font-bold font-mono tracking-widest text-mocha-yellow uppercase">
          [ CHARACTER SHEET ]
        </h2>
        <p className="text-xs text-mocha-overlay1 font-mono mt-1">
          PLAYER ID: #0402 // MNEMONIC INITIATE
        </p>
      </div>

      {/* 2. Top: Player Info Card & Stats Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Player Identity Card */}
        <div className="border border-mocha-surface1 bg-mocha-base/40 p-6 rounded flex flex-col items-center justify-center text-center space-y-4 font-mono">
          {/* Retro Avatar Circle */}
          <div className="relative w-24 h-24 rounded-full border-2 border-mocha-yellow bg-mocha-surface1 flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.2)]">
            <Zap className="w-8 h-8 text-mocha-yellow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-mocha-text uppercase tracking-wider">
              Student_Scholar
            </h3>
            <p className="text-[10px] text-mocha-overlay1 mt-1 uppercase">
              CLASS: MEMORY WEAVER
            </p>
            <p className="text-[9px] text-mocha-yellow mt-1 font-semibold uppercase">
              TITLE: KEEPER OF THE FLAME
            </p>
          </div>
          <div className="text-[9px] text-mocha-overlay1 border-t border-mocha-surface2 pt-3 w-full uppercase">
            INGESTED: 2026-06-01
          </div>
        </div>

        {/* Right Column: Player Stats Matrix (2/3 Width) */}
        <div className="md:col-span-2 border border-mocha-surface1 bg-mocha-base/40 p-6 rounded flex flex-col justify-between space-y-4 font-mono text-xs">
          <h4 className="font-bold text-mocha-text uppercase tracking-wider border-b border-mocha-surface2 pb-2">
            // STATS MATRIX
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              {
                label: "CHARACTER LEVEL",
                val: "Lv. 4",
                color: "text-mocha-text",
              },
              {
                label: "GOLD INVENTORY",
                val: (
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> 120 GP
                  </span>
                ),
                color: "text-mocha-yellow",
              },
              {
                label: "BEST SHARD STREAK",
                val: (
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> 15
                  </span>
                ),
                color: "text-mocha-red",
              },
              {
                label: "TOTAL CARDS MASTERED",
                val: (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> 45 / 150
                  </span>
                ),
                color: "text-mocha-blue",
              },
              {
                label: "COMPLETED RUNS",
                val: (
                  <span className="flex items-center gap-1">
                    <Sword className="w-3.5 h-3.5" /> 12 Runs
                  </span>
                ),
                color: "text-mocha-green",
              },
              {
                label: "AVERAGE ACCURACY",
                val: (
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> 72%
                  </span>
                ),
                color: "text-mocha-mauve",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-mocha-surface2 bg-mocha-mantle/60 p-3 rounded"
              >
                <span className="text-[9px] text-mocha-overlay1 uppercase block leading-none mb-1.5">
                  {stat.label}
                </span>
                <span className={`text-sm font-bold ${stat.color}`}>
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom: Achievements (Left) & Campaign Log (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Achievements Gallery (2/3 Width) */}
        <div className="md:col-span-2 border border-mocha-surface1 bg-mocha-base/40 p-6 rounded space-y-4 font-mono text-xs">
          <h4 className="font-bold text-mocha-text uppercase tracking-wider border-b border-mocha-surface2 pb-2">
            <Trophy className="w-3.5 h-3.5 inline-block" /> UNLOCKED
            RECOLLECTIONS (ACHIEVEMENTS)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((badge) => (
              <div
                key={badge.key}
                className={`border p-3 rounded flex flex-col justify-between space-y-2 transition-all ${
                  badge.unlocked
                    ? "border-mocha-surface1 bg-mocha-mantle/60"
                    : "border-mocha-surface2/50 bg-mocha-base/10 opacity-30 select-none"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {badge.unlocked ? (
                      <badge.icon className="w-5 h-5 text-mocha-yellow" />
                    ) : (
                      <Lock className="w-5 h-5 text-mocha-overlay1" />
                    )}
                  </span>
                  <span
                    className={`font-bold ${badge.unlocked ? "text-mocha-text" : "text-mocha-overlay1"}`}
                  >
                    {badge.name}
                  </span>
                </div>
                <p className="text-[10px] text-mocha-overlay1 leading-normal">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Log (1/3 Width) */}
        <div className="border border-mocha-surface1 bg-mocha-base/40 p-6 rounded space-y-4 font-mono text-xs">
          <h4 className="font-bold text-mocha-text uppercase tracking-wider border-b border-mocha-surface2 pb-2">
            <ScrollText className="w-3.5 h-3.5 inline-block" /> CAMPAIGN LOG
            (RECENT RUNS)
          </h4>

          <div className="space-y-3">
            {RECENT_RUNS.map((run, idx) => (
              <div
                key={idx}
                className="border-b border-mocha-surface2 pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-mocha-subtext1 truncate max-w-[120px]">
                    {run.deck}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                      run.result === "COMPLETED"
                        ? "bg-mocha-green/10 text-mocha-green border border-mocha-green/20"
                        : "bg-mocha-red/10 text-mocha-red border border-mocha-red/20"
                    }`}
                  >
                    {run.result}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-mocha-overlay1 mt-1">
                  <span>{run.date}</span>
                  <span>
                    {run.acc}% ACC // {run.score} PTS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
