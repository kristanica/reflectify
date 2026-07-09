"use server";

import checkSession from "@/lib/checkSession";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteDeckResult = {
  ok: boolean;
  message: string;
};

export const deleteDeck = async (deckId: string): Promise<DeleteDeckResult> => {
  try {
    const session = await checkSession();

    if (!session || "status" in session) {
      return {
        ok: false,
        message: "You must be logged in to delete a deck",
      };
    }

    await prisma.deck.delete({
      where: {
        id: deckId,
        userId: session.user.id,
      },
    });

    revalidatePath("/decks");

    return { ok: true, message: "Deck deleted successfully" };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Failed to delete deck" };
  }
};
