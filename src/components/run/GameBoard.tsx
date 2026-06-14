"use client";

import { useEffect, useState } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, hasScale, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  const [questionQueues, setQuestionQueues] = useState<GeneratedQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const {
    mutate: fetchMoreQuestion,
    isPending: isFetchingQuestion,
    isIdle: isFetchingIdle,
  } = useGenerateQuestions({
    userId: userId,
    deckId: deckId,
    onGeneratedQuestsion: (newQuestions) => {
      setQuestionQueues((prev) => [...prev, ...newQuestions]);
    },
  });

  useEffect(() => {
    if (questionQueues.length < 10 && !isFetchingQuestion) {
      const conceptIds = questionQueues.map((concept) => concept.conceptId);

      fetchMoreQuestion(conceptIds);
    }
  }, [
    questionQueues.length,
    isFetchingQuestion,
    questionQueues,
    fetchMoreQuestion,
  ]);

  const answerQuestion = () => {
    setHasAnswered(true);
  };

  const handleNext = () => {
    console.log(
      "----",
      questionQueues[0],
      "Has been slicced!",
      questionQueues.length,
      "----",
    );
    setHasAnswered(false);
    setQuestionQueues((prev) => prev.slice(1));
  };
  return (
    <div className="text-gray-400 h-full flex flex-1  flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {questionQueues.length === 0 &&
        (isFetchingQuestion || isFetchingIdle) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InitialLoading></InitialLoading>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-1  min-w-3xl  items-center justify-center"
          >
            <div className="w-full max-w-3xl border-b border-zinc-800 pb-4 mb-6">
              <p className="text-[10px] tracking-widest text-amber-600 mb-2 font-mono">
                QUESTION
              </p>
              <p className="text-gray-100 font-mono text-sm leading-relaxed">
                {questionQueues[0].question}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-3xl">
              {questionQueues[0].options.map((option, i) => {
                let optionStyle =
                  "border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5";

                if (!hasAnswered) {
                  if (selectedAnswer === option) {
                    optionStyle = "border-amber-600 bg-amber-600/5";
                  }
                } else {
                  const isCorrectPick = option === questionQueues[0].answer;
                  const isWrongPick =
                    selectedAnswer === option && !isCorrectPick;

                  if (isCorrectPick) {
                    optionStyle =
                      "border-green-500 bg-green-500/10 text-green-400";
                  } else if (isWrongPick) {
                    optionStyle = "border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    optionStyle = "border-zinc-800 text-gray-500 opacity-30";
                  }
                }

                return (
                  <button
                    onClick={() => setSelectedAnswer(option)}
                    key={i}
                    className={`relative border rounded-sm text-left p-4 pl-8 min-h-20 flex items-center font-mono text-xs leading-relaxed transition-all duration-150 ${optionStyle} ${!hasAnswered ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <span className="absolute top-2 left-2 text-[10px] text-zinc-600">
                      {i + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {hasAnswered && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-3xl mt-6 p-4 border border-zinc-800 bg-zinc-950/50 rounded-sm"
                >
                  <p className="text-[10px] tracking-widest text-zinc-500 mb-2 font-mono uppercase">
                    System Analysis
                  </p>
                  <p className="text-zinc-300 font-mono text-xs leading-relaxed">
                    {questionQueues[0].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {hasAnswered ? (
              <button
                disabled={!hasAnswered}
                onClick={() => handleNext()}
                className="self-end py-2.5 px-8 mt-6 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm "
              >
                NEXT
              </button>
            ) : (
              <button
                disabled={!selectedAnswer}
                onClick={answerQuestion}
                className="self-end py-2.5 px-8 mt-6 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm "
              >
                ANSWER
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

{
  /* <Button
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
          </Button> */
}
