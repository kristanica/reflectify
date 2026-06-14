import GameBoard from "@/components/run/GameBoard";
import { authOptions } from "@/lib/handlers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    deckId: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const { deckId } = await searchParams;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="text-white h-full w-full flex-1 ">
      <GameBoard deckId={deckId} userId={userId}></GameBoard>
    </div>
  );
};

export default page;
