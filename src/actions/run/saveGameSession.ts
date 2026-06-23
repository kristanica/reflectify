"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { after, NextResponse } from "next/server";

type GameSession = {
  maxStreak: number;
  shopHistory: Purchase[];
  inCorrectAnswerCount: number;
  correctAnswerCount: number;
  sessionId: string;
  score: number;
  sessionExpEarned: number;
  totalAccumulatedCredits: number;
  newLevel: number;
};

export default async function saveToGameSession({
  maxStreak,
  shopHistory,
  inCorrectAnswerCount,
  correctAnswerCount,
  sessionId,
  score,
  sessionExpEarned,
  totalAccumulatedCredits,
  newLevel,
}: GameSession): Promise<{ success: boolean; sessionId?: string }> {
  const session = await checkSession();

  if (session instanceof NextResponse) {
    return { success: false, sessionId: "" };
  }

  await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      endedAt: new Date(),
      xpEarned: sessionExpEarned,
      currencyEarned: totalAccumulatedCredits,
      correctCount: correctAnswerCount,
      incorrectCount: inCorrectAnswerCount,
      streak: maxStreak,
      score: score,
    },
  });

  after(async () => {
    try {
      await prisma.$transaction(async (tx) => {
        // Update first the user
        await tx.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            level: newLevel,
            xp: {
              increment: sessionExpEarned,
            },
            currency: {
              increment: totalAccumulatedCredits,
            },
          },
        });

        await tx.purchase.createMany({
          data: shopHistory.map((history) => ({
            userId: session.user.id,
            cost: history.cost,
            itemKey: history.itemKey,
            sessionId: sessionId,
          })),
        });
      });
    } catch (e) {
      console.log(e);
    }
  });

  return { success: true };
}
