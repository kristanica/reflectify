"use client";

import { useEffect } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);
  const setHasAnswered = useGameEngineStore((state) => state.setHasAnswered);
  const questionQueues = useGameEngineStore((state) => state.questionQueues);
  const setQuestionQueues = useGameEngineStore(
    (state) => state.setQuestionQueues,
  );

  const handleNextQuestion = useGameEngineStore(
    (state) => state.handleNextQuestion,
  );

  const {
    mutate: fetchMoreQuestion,
    isPending: isFetchingQuestion,
    isIdle: isFetchingIdle,
  } = useGenerateQuestions({
    userId: userId,
    deckId: deckId,
    onGeneratedQuestsion: (newQuestions) => {
      setQuestionQueues(newQuestions);
    },
  });

  const answerQuestion = () => {
    setHasAnswered(true);
  };
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

            <GameTypeIdentifier
              choices={questionQueues[0].options as string[]}
              answer={questionQueues[0].answer}
              type={questionQueues[0].type}
            ></GameTypeIdentifier>

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
                onClick={() => handleNextQuestion()}
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
