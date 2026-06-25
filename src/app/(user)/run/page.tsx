import GameBoard from "@/components/run/GameBoard";
import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    sessionId: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const { sessionId } = await searchParams;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const [activeSession, userStat] = await Promise.all([
    prisma.gameSession.findFirst({
      where: {
        id: sessionId,
        endedAt: null,
      },
      select: {
        deckId: true,
      },
    }),

    prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        xp: true,
        level: true,
      },
    }),
  ]);
  if (!activeSession || !userStat) {
    notFound();
  }
  return (
    <div className="text-mocha-text h-full w-full flex-1">
      <GameBoard
        baseXp={userStat.xp}
        baseLevel={userStat.level}
        deckId={activeSession?.deckId}
        userId={userId}
        sessionId={sessionId}
      ></GameBoard>
    </div>
  );
};

export default page;
