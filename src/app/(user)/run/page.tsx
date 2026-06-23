import GameBoard from "@/components/run/GameBoard";
import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
    prisma.gameSession.findFirstOrThrow({
      where: {
        id: sessionId,
        endedAt: null,
      },
      select: {
        deckId: true,
      },
    }),

    prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: {
        xp: true,
        level: true,
      },
    }),
  ]);
  return (
    <div className="text-white h-full w-full flex-1 ">
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
