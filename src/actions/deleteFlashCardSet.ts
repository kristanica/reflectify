"use server";
import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function deleteFlashCardSet(id: string) {
  try {
    const session = await checkSession();

    if (session instanceof NextResponse) {
      return {
        ok: false,
        message: "You must be logged in to delete a flash card set",
      };
    }
    await prisma.gameSession.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    revalidatePath("/flashcards");
    return { ok: true, message: "Flash card set deleted successfully" };
  } catch {
    return {
      ok: false,
      message: "An error occurred while deleting the flash card set",
    };
  }
}
