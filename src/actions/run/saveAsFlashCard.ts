"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type SaveAsFlashCardProps = {
  shownQuestions: ShownQuestionState[];
  sessionId: string;
  deckId: string;
};

export const saveAsFlashCard = async ({
  shownQuestions,
  sessionId,
  deckId,
}: SaveAsFlashCardProps) => {
  try {
    if (shownQuestions.length === 0) {
      return { success: false, message: "No questions to save" };
    }

    const session = await checkSession();
    if (session instanceof NextResponse) {
      return { success: false, message: "Session expired" };
    }

    const gameSession = await prisma.gameSession.findFirst({
      where: {
        id: sessionId,
        userId: session.user.id,
        deckId: deckId,
      },
      select: {
        id: true,
      },
    });

    if (!gameSession) {
      return { success: false, message: "Invalid session" };
    }

    await prisma.flashCard.createMany({
      data: shownQuestions.map((sq) => ({
        correctAnswer: sq.correctAnswer,
        question: sq.question,
        deckId,
        gameSessionId: sessionId,
      })),
    });

    return { success: true, message: "Flash cards saved successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export default saveAsFlashCard;
