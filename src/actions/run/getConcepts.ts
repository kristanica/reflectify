"use server";

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
  format: "MULTIPLE_CHOICE" | "TRUE_OR_FALSE";
  level: number;
  optionCount: number;
}[];

const getDifficultyParams = (depth: number) => {
  // 1. Pick a random format to keep the game varied!
  const formats = ["TRUE_OR_FALSE", "MULTIPLE_CHOICE"] as const;
  const format = formats[Math.floor(Math.random() * formats.length)];

  let level = 1;
  let optionCount = 2;
  if (depth < 5) {
    level = 1;
    if (format === "MULTIPLE_CHOICE") optionCount = 4;
  } else if (depth < 15) {
    level = 2;
    if (format === "MULTIPLE_CHOICE") optionCount = 4;
  } else if (depth < 25) {
    level = 3;
    if (format === "MULTIPLE_CHOICE") optionCount = 5;
  } else {
    level = 4;
    if (format === "MULTIPLE_CHOICE") optionCount = 6;
  }

  return { format, level, optionCount };
};

export default async function getConcepts({
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

  const conceptMasteries = pendingMasteries.map((mastery) => {
    // Calculate difficulty for THIS specific question
    const params = getDifficultyParams(depth);

    console.log(params.optionCount);

    return {
      conceptId: mastery.id,
      content: mastery.concept,
      format: params.format,
      level: params.level,
      optionCount: params.optionCount,
    };
  });

  return conceptMasteries;
}
