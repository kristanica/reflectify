/* eslint-disable react/jsx-no-comment-textnodes */
// app/(app)/dashboard/page.tsx
import Link from "next/link";
import { Coins, Flame, Bot, TriangleAlert } from "lucide-react";
import prisma from "@/lib/prisma";
import checkSession from "@/lib/checkSession";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await checkSession();
  if (session instanceof NextResponse) {
    redirect("/api/auth/signin");
  }

  const [userStat, lastGameSession, decks] = await Promise.all([
    prisma.user.findFirstOrThrow({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        xp: true,
        currency: true,
        level: true,
      },
    }),

    prisma.gameSession.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 3,
      select: {
        endedAt: true,
        id: true,
        score: true,
        deck: {
          select: {
            title: true,
          },
        },
      },
    }),

    prisma.deck.findMany({
      where: {
        userId: session.user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
      take: 3,

      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      {/* 1. Header & Character Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-mocha-surface1 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono tracking-widest text-mocha-yellow uppercase">
            [ THE KEEP ]
          </h2>
          <p className="text-xs text-mocha-overlay1 font-mono mt-1">
            LOBBY / MAIN DECK
          </p>
        </div>

        {/* Player Stats Block */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="border border-mocha-surface1 bg-mocha-mantle px-3 py-1.5 rounded">
            <span className="text-mocha-overlay1">LEVEL:</span>{" "}
            <span className="text-mocha-text">Lv. {userStat.level}</span>
          </div>
          <div className="border border-mocha-surface1 bg-moch-mantle px-3 py-1.5 rounded">
            <span className="text-mocha-overlay1">GOLD:</span>{" "}
            <span className="text-mocha-yellow flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> {userStat.currency}
            </span>
          </div>
          <div className="border border-mocha-surface1 bg-mocha-mantle px-3 py-1.5 rounded">
            <span className="text-mocha-overlay1">STREAK:</span>{" "}
            <span className="text-mocha-red flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> 5 Days
            </span>
          </div>
        </div>
      </div>

      {/* XP Mana/Health Bar */}
      <div className="w-full border dark:bg-card p-2.5 rounded font-mono text-xs">
        <div className="flex justify-between text-mocha-overlay2 mb-1">
          <span>XP PROGRESS</span>
          <span>50 / 100 XP</span>
        </div>
        <div className="w-full bg-mocha-surface1 h-2.5 rounded-sm overflow-hidden border border-mocha-surface1">
          <div className="bg-mocha-yellow w-1/2 h-full"></div>
        </div>
      </div>

      {/* 2. Grid Content (2-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* LEFT COLUMN: Main Actions & AI Coach (2/3 Width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Procedural Run Trigger */}
          <div className="border bg-card p-6 rounded flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-sm font-bold tracking-wider font-mono text-mocha-text uppercase">
                // PROCEDURAL RUN
              </h3>
              <p className="text-xs text-mocha-overlay2 mt-2 leading-relaxed">
                Ready to initiate a run? Selecting a study seed (document/topic)
                will compile a randomized dungeon of questions with adaptive
                difficulty.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/decks"
                className="border border-mocha-yellow hover:bg-mocha-yellow hover:text-black text-mocha-yellow font-mono text-xs font-bold px-4 py-2 transition-all"
              >
                INITIATE RUN
              </Link>
              <Link
                href="/decks/ingest"
                className="border border-mocha-surface2 hover:border-mocha-text text-mocha-overlay2 hover:text-mocha-text font-mono text-xs px-4 py-2 transition-all"
              >
                INGEST NEW SEED
              </Link>
            </div>
          </div>

          {/* AI Coach Card */}
          <div className="border bg-card p-5 rounded font-mono">
            <h4 className="text-xs text-mocha-yellow uppercase font-bold tracking-wider mb-2">
              <Bot className="w-3.5 h-3.5 inline-block" /> TACTICAL REPORT (AI
              COACH)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {lastGameSession.map((item) => (
                <div
                  key={item.id}
                  className="border bg-mocha-mantle p-3 tracking-tight"
                >
                  <p className="text-md font-bold text-primary font-mono">
                    {item.deck.title}
                  </p>
                  <p className="text-xs text-mocha-text">
                    <span className="text-mocha-yellow">Score: </span>
                    {item.score}
                  </p>
                  <p className="text-xs text-mocha-text">
                    <span className="text-mocha-yellow">Ended: </span>
                    {item.endedAt?.toDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Spaced Repetition & Threat List (1/3 Width) */}
        <div className="space-y-6">
          {/* Spaced Repetition Queue */}
          <div className="border bg-card p-5 rounded space-y-4 font-mono text-xs">
            <h3 className="font-bold text-mocha-text tracking-wider uppercase">
              // REVIEW QUEUE
            </h3>

            <div className="flex flex-col gap-2">
              {decks.length === 0 && <p>No decks available.</p>}
              {decks.map((deck) => (
                <Link href={`/decks/${deck.id}`} key={deck.id}>
                  <div className="border bg-card p-3 rounded">
                    <p className="text-mocha-yellow font-bold">{deck.title}</p>
                    <p className="text-mocha-overlay1 text-[10px] mt-1">
                      {deck.createdAt.toDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Weak Spots */}
          <div className="border bg-card p-5 rounded space-y-3 font-mono text-xs">
            <h3 className="font-bold text-mocha-red tracking-wider uppercase flex items-center gap-1.5">
              <TriangleAlert className="w-3.5 h-3.5" /> THREAT LIST (WEAK SPOTS)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-mocha-crust pb-1.5">
                <span className="text-mocha-overlay2">DNS Records</span>
                <span className="text-mocha-red font-bold bg-mocha-red/10 px-1.5 py-0.5 rounded text-[10px]">
                  33% Accuracy
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-mocha-crust pb-1.5">
                <span className="text-mocha-overlay2">REST APIs</span>
                <span className="text-mocha-red font-bold bg-mocha-red/10 px-1.5 py-0.5 rounded text-[10px]">
                  40% Accuracy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-mocha-overlay2">OAuth Handshake</span>
                <span className="text-mocha-red font-bold bg-mocha-red/10 px-1.5 py-0.5 rounded text-[10px]">
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
