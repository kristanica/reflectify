"use server";

import prisma from "@/lib/prisma";
import { ConceptMasteries } from "./getConcepts";

type GetMultipleConceptsType = {
  deckId: string;
  questionQueues: string[];
};

export default async function getMultipleConcepts({
  deckId,
  questionQueues,
}: GetMultipleConceptsType): Promise<ConceptMasteries> {
  let multipleConcepts = await prisma.concept.findMany({
    where: {
      deckId: deckId,
      id: {
        notIn: questionQueues,
      },
    },
    take: 3,
  });

  // If the deck is small and all concepts are currently in the queue, 
  // fallback to grabbing any 3 concepts to guarantee the boss spawns!
  if (multipleConcepts.length === 0) {
    multipleConcepts = await prisma.concept.findMany({
      where: {
        deckId: deckId,
      },
      take: 3,
    });
  }
  return multipleConcepts.map((concept) => ({
    conceptId: concept.id,
    content: concept.concept,
    format: "BOSS_SCENARIO" as const,
    level: 4,
    optionCount: 6,
  }));
}
