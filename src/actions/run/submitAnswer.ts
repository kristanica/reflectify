"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const submitAnswer = async (conceptId: string, isCorrect: boolean) => {
  try {
    const session = await checkSession();
    if (session instanceof NextResponse) {
      throw new Error("Unauthorized");
    }

    // Check latest mastery
    const conceptMastery = await prisma.conceptMasteries.findUniqueOrThrow({
      where: {
        userId_conceptId: {
          userId: session.user.id,
          conceptId: conceptId,
        },
      },
      select: {
        id: true,
        level: true,
        timesCorrect: true,
        timesWrong: true,
      },
    });

    if (!conceptMastery) {
      throw new Error("Unauthorized");
    }

    // Update mastery
    await prisma.conceptMasteries.update({
      where: {
        id: conceptMastery.id,
      },
      data: {
        level: isCorrect
          ? conceptMastery?.level + 1
          : Math.max(1, conceptMastery?.level - 1),

        timesCorrect: isCorrect
          ? conceptMastery.timesCorrect + 1
          : conceptMastery.timesCorrect - 1,
        timesWrong: isCorrect
          ? conceptMastery.timesCorrect
          : conceptMastery.timesWrong + 1,
      },
    });

    console.log("updated");
  } catch (e) {
    console.error(e);
  }
};

export default submitAnswer;
