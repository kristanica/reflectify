import { SourceType } from "@/generated/prisma/enums";
import prisma from "./prisma";

type SaveToDeck = {
  userId: string;
  title: string;
  ingestType: string;
  rawText: string[];
  generatedConcepts: string[];
};

async function saveToDeck({
  userId,
  title,
  ingestType,
  rawText,
  generatedConcepts,
}: SaveToDeck) {
  // Put into transaction to ensure data is saved
  const deck = await prisma.$transaction(async (tx) => {
    //  Save it as deck first
    const deck = await tx.deck.create({
      data: {
        title: title,
        sourceType: ingestType.toUpperCase() as SourceType,
        rawText: JSON.stringify(rawText),

        user: {
          connect: { id: userId },
        },
      },
    });
    // Save extracted concepts
    const concepts = await tx.concept.createManyAndReturn({
      data: generatedConcepts.map((concept) => ({
        concept: concept,
        deckId: deck.id,
      })),
    });
    // Generate masteries
    await tx.conceptMasteries.createMany({
      data: concepts.map((concept) => ({
        userId: userId,
        conceptId: concept.id,
        level: 2,
      })),
    });
    return deck;
  });

  return deck;
}

export default saveToDeck;
