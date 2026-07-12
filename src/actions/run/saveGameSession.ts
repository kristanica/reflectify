"use server";

import type { ConceptProgress } from "@/generated/prisma/client";
import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createEmptyCard, fsrs, Rating, type Card } from "ts-fsrs";
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
  attempts: ConceptAttempt[];
};

type UpdatedConceptProgress = {
  conceptId: string;
  dueAt: Date;
  fsrsState: number;
  stability: number;
  difficulty: number;
  learningSteps: number;
  elapsedDays: number;
  scheduleDays: number;
  reps: number;
  lapses: number;
  lastReviewedAt: Date | null;
};

function toFsrsCard(progress: ConceptProgress): Card {
  return {
    due: progress.dueAt,
    stability: progress.stability ?? 0,
    difficulty: progress.difficulty ?? 0,
    elapsed_days: progress.elapsedDays,
    scheduled_days: progress.scheduleDays,
    learning_steps: progress.learningSteps,
    reps: progress.reps,
    lapses: progress.lapses,
    state: progress.fsrsState as Card["state"],
    ...(progress.lastReviewedAt
      ? { last_review: progress.lastReviewedAt }
      : {}),
  };
}

const byAnsweredAt = (a: ConceptAttempt, b: ConceptAttempt) =>
  new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime();

const getRating = (attempt: ConceptAttempt) => {
  if (!attempt.isCorrect) return Rating.Again;
  if (attempt.usedHint) return Rating.Hard;
  if (attempt.responseMs < 7_000) return Rating.Easy;
  return Rating.Good;
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
  attempts,
}: GameSession): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await checkSession();

    if (session instanceof NextResponse) {
      return { success: false, message: "Session not found" };
    }

    const gameSession = await prisma.gameSession.findFirst({
      where: {
        id: sessionId,
        userId: session.user.id,
        endedAt: null,
      },
      select: {
        deckId: true,
      },
    });

    if (!gameSession) {
      return {
        success: false,
        message: "Game session was not found or has already ended",
      };
    }

    const attemptsByConceptId = new Map<string, ConceptAttempt[]>();

    for (const attempt of attempts) {
      const conceptAttempts = attemptsByConceptId.get(attempt.conceptId) ?? [];
      conceptAttempts.push(attempt);
      attemptsByConceptId.set(attempt.conceptId, conceptAttempts);
    }

    const conceptIds = [...attemptsByConceptId.keys()];

    const progressRecords = await prisma.conceptProgress.findMany({
      where: {
        userId: session.user.id,
        conceptId: {
          in: conceptIds,
        },
        concept: {
          is: {
            deckId: gameSession.deckId,
          },
        },
      },
    });

    const progressByConceptId = new Map(
      progressRecords.map((progress) => [progress.conceptId, progress]),
    );

    const scheduler = fsrs();
    const updatedProgress: UpdatedConceptProgress[] = [];

    // FSRS algorithm
    for (const [conceptId, conceptAttempts] of attemptsByConceptId) {
      const progress = progressByConceptId.get(conceptId);

      let card = progress
        ? toFsrsCard(progress)
        : createEmptyCard(new Date(conceptAttempts[0].answeredAt));
      for (const attempt of [...conceptAttempts].sort(byAnsweredAt)) {
        const rating = getRating(attempt);
        card = scheduler.next(card, new Date(attempt.answeredAt), rating).card;
      }
      updatedProgress.push({
        conceptId,
        dueAt: card.due,
        fsrsState: card.state,
        stability: card.stability,
        difficulty: card.difficulty,
        learningSteps: card.learning_steps,
        elapsedDays: card.elapsed_days,
        scheduleDays: card.scheduled_days,
        reps: card.reps,
        lapses: card.lapses,
        lastReviewedAt: card.last_review ?? null,
      });
    }

    await prisma.$transaction(async (tx) => {
      const completedSession = await tx.gameSession.updateMany({
        where: {
          id: sessionId,
          userId: session.user.id,
          endedAt: null,
        },
        data: {
          endedAt: new Date(),
          xpEarned: sessionExpEarned,
          currencyEarned: totalAccumulatedCredits,
          correctCount: correctAnswerCount,
          incorrectCount: inCorrectAnswerCount,
          streak: maxStreak,
          score,
        },
      });

      if (completedSession.count !== 1) {
        throw new Error("Game session was already completed");
      }

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

      if (shopHistory.length > 0) {
        await tx.purchase.createMany({
          data: shopHistory.map((history) => ({
            userId: session.user.id,
            cost: history.cost,
            itemKey: history.itemKey,
            sessionId,
          })),
        });
      }

      for (const progress of updatedProgress) {
        await tx.conceptProgress.upsert({
          where: {
            userId_conceptId: {
              userId: session.user.id,
              conceptId: progress.conceptId,
            },
          },
          update: progress,
          create: {
            userId: session.user.id,
            ...progress,
          },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.log(error instanceof Error ? error.message : String(error));
    return { success: false, message: "Failed to save game session" };
  }
}
