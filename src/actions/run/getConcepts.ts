"use server";

import { QuestionType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

type GetConceptsType = {
  userId: string;
  deckId: string;
  questionQueues: string[];
  depth: number;
};

export type ConceptMasteries = {
  conceptId: string;
  content: string;
  format: QuestionType;
}[];

const getLevel = (depth: number) => {
  if (depth < 5) return 1;
  if (depth < 15) return 2;
  if (depth < 25) return 3;
  return 4;
};
const getRandomFormat = () => {
  const formats = ["TRUE_OR_FALSE", "MULTIPLE_CHOICE", "IDENTIFICATION"];

  // Pick a random format from the array
  const randomIndex = Math.floor(Math.random() * formats.length);
  return formats[randomIndex] as QuestionType;
};

export default async function getConcepts({
  userId,
  deckId,
  questionQueues,
  depth,
}: GetConceptsType): Promise<ConceptMasteries> {
  const pendingMasteries = await prisma.concept.findMany({
    where: {
      deckId: deckId,
      id: {
        notIn: questionQueues,
      },
    },
    take: 10,
  });
  const currentLevel = getLevel(depth);

  const conceptMasteries = pendingMasteries.map((mastery) => {
    return {
      conceptId: mastery.id,
      content: mastery.concept,
      level: currentLevel,
      format: getRandomFormat(),
    };
  });

  return conceptMasteries;
}
