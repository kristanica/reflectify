"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function renameFlashCardSet(id: string, newTitle: string) {
  try {
    const session = await checkSession();
    if (session instanceof NextResponse) {
      return {
        ok: false,
        message: "You must be logged to rename flash card set",
      };
    }

    await prisma.gameSession.update({
      where: { id },
      data: { title: newTitle },
    });

    return { ok: true, message: "Flash card set renamed successfully" };
  } catch {
    return { ok: false, message: "Failed to rename flash card set" };
  }
}
