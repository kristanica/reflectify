"use client";

import getConcepts from "@/actions/run/getConcepts";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import generateQuestions from "@/actions/run/generateQuestions";
import { QuestionType } from "@/generated/prisma/enums";

type GameBoardType = {
  deckId: string;
  userId: string;
};
type GeneratedQuestion = {
  conceptId: string;
  type: QuestionType;
  question: string;
  options: (string | undefined)[];
  answer: string;
  explanation: string;
};

export default function GameBoard({ deckId, userId }: GameBoardType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questionQueues, setQuestionQueues] = useState<GeneratedQuestion[]>([]);
  const isFetchingRef = useRef(false);
  const query = useMutation({
    mutationFn: async (currentIds: string[]) => {
      const tasks = await getConcepts({
        userId: userId,
        deckId: deckId,
        questionQueues: currentIds,
      });

      if (!tasks || tasks.length === 0) return;

      const generatedConcepts = await generateQuestions(tasks);
      console.log(generatedConcepts);
      return generatedConcepts;
    },
    onSettled: () => {
      isFetchingRef.current = false;
    },
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setQuestionQueues((prev) => [...prev, ...data]);
      }
    },

    onError: () => {
      toast.error("Something went wrong with fetching question");
    },
  });

  useEffect(() => {
    if (questionQueues.length < 10 && !query.isPending) {
      isFetchingRef.current = true;
      const conceptIds = questionQueues.map((concept) => concept.conceptId);

      query.mutate(conceptIds);
    }
  }, [questionQueues.length, query.isPending, questionQueues, query]);

  return (
    <div className="text-gray-400 h-full flex flex-col items-center justify-center">
      {query.isPending
        ? "Loading the dungeon..."
        : questionQueues.length > 0
          ? questionQueues[0].question
          : "You have conquered all concepts!"}
      <Button
        onClick={() => {
          console.log(
            "----",
            questionQueues[0],
            "Has been slicced!",
            questionQueues.length,
            "----",
          );
          setQuestionQueues((prev) => prev.slice(1));
        }}
      >
        Answer & Nexxt
      </Button>
    </div>
  );
}
