"use client";

import getConcepts from "@/actions/run/getConcepts";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import generateQuestions from "@/actions/run/generateQuestions";
import { QuestionType } from "@/generated/prisma/enums";
import { Label } from "../ui/label";

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
    onSettled: () => {},
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
      const conceptIds = questionQueues.map((concept) => concept.conceptId);

      query.mutate(conceptIds);
    }
  }, [questionQueues.length, query.isPending, questionQueues, query]);

  return (
    <div className="text-gray-400 h-full flex flex-1  flex-col items-center justify-center">
      {questionQueues.length === 0 && (query.isPending || query.isIdle) ? (
        <div>Initializing dungon...</div>
      ) : (
        <div className="flex flex-col flex-1  min-w-3xl  items-center justify-center">
          <div className="w-full max-w-3xl border-b border-zinc-800 pb-4 mb-6">
            <p className="text-[10px] tracking-widest text-amber-600 mb-2 font-mono">
              QUESTION
            </p>
            <p className="text-gray-100 font-mono text-sm leading-relaxed">
              {questionQueues[0].question}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-3xl">
            {questionQueues[0].options.map((option, i) => (
              <div
                key={i}
                className="relative border rounded-sm p-4 pl-8 min-h-20 flex items-center font-mono text-xs leading-relaxed cursor-pointer transition-all duration-150border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5"
              >
                <span className="absolute top-2 left-2 text-[10px] text-zinc-600">
                  {i + 1}
                </span>
                {option}
              </div>
            ))}
          </div>

          {/* <Button
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
          </Button> */}
        </div>
      )}
    </div>
  );
}
