import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import FlashCardScreen from "@/components/flashcards/FlashCardScreen";

type FlashCardSet = {
  params: Promise<{ slug: string; setId: string }>;
};

export default async function Page({ params }: FlashCardSet) {
  // Slug is the deck slug, setId is the gamesession  id
  const { slug, setId } = await params;

  const flashCardSets = await prisma.flashCard.findMany({
    where: {
      deckId: slug,
      gameSessionId: setId,
    },
    select: {
      id: true,
      question: true,
      correctAnswer: true,
    },
  });

  return (
    <section className="h-full w-full  flex items-center justify-center">
      <FlashCardScreen cards={flashCardSets} />
    </section>
  );
}
