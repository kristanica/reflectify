"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export default async function endSession(sessionId: string) {
  const session = await checkSession();

  if (session instanceof NextResponse) {
    throw new Error("Unauthorized");
  }

  await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      endedAt: new Date(),
    },
  });

  return null;
}
