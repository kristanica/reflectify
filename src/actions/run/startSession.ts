"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
type InitialState = {
  sessionId: string;
  success: boolean;
};

const startSession = async (initialState: InitialState, formData: FormData) => {
  const session = await checkSession();

  if (session instanceof NextResponse) {
    return { success: false, sessionId: "" };
  }
  const deckId = formData.get("deckId") as string;

  const newSession = await prisma.gameSession.create({
    data: {
      userId: session?.user.id,
      deckId: deckId,
    },
    select: {
      id: true,
    },
  });

  return { success: true, sessionId: newSession.id };
};

export default startSession;
