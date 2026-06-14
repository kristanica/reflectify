"use server";

import { QuestionType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

type GetConceptsType = {
  userId: string;
  deckId: string;
  questionQueues: string[];
};

export type ConceptMasteries = {
  conceptId: string;
  content: string;
  format: QuestionType;
}[];

export default async function getConcepts({
  userId,
  deckId,
  questionQueues,
}: GetConceptsType): Promise<ConceptMasteries> {
  const pendingMasteries = await prisma.conceptMasteries.findMany({
    where: {
      userId: userId,
      concept: {
        deckId: deckId,
      },
      conceptId: {
        notIn: questionQueues,
      },
    },
    include: {
      concept: true,
    },

    orderBy: {
      level: "asc",
    },
    take: 10,
  });

  const formats: QuestionType[] = [
    "MULTIPLE_CHOICE",
    "TRUE_OR_FALSE",
    "IDENTIFICATION",
    "SCENARIO",
  ];

  const conceptMasteries = pendingMasteries.map((mastery) => {
    return {
      conceptId: mastery.conceptId,
      content: mastery.concept.concept,
      format: formats[mastery.level - 1] as QuestionType,
    };
  });

  return conceptMasteries;
}
