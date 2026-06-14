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

  const activeSession = await prisma.gameSession.findFirstOrThrow({
    where: {
      id: sessionId,
      endedAt: null,
    },
    select: {
      deckId: true,
    },
  });
  return (
    <div className="text-white h-full w-full flex-1 ">
      <GameBoard deckId={activeSession?.deckId} userId={userId}></GameBoard>
    </div>
  );
};

export default page;
