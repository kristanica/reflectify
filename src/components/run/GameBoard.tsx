"use client";

import { useEffect } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { ratio } from "fuzzball";

import Lives from "./Lives";
import { redirect } from "next/navigation";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);
  const setHasAnswered = useGameEngineStore((state) => state.setHasAnswered);
  const questionQueues = useGameEngineStore((state) => state.questionQueues);
  const depth = useGameEngineStore((state) => state.questionsAnswered);
  const decrementLives = useGameEngineStore((state) => state.decrementLives);
  const lives = useGameEngineStore((state) => state.lives);

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

  const answerQuestion = async () => {
    setHasAnswered(true);
    let isCorrect = selectedAnswer === questionQueues[0].answer;

    if (questionQueues[0].type === "IDENTIFICATION") {
      {
        const cleanUserAnswer = selectedAnswer!.toLowerCase().trim();
        const cleanAiAnswer = questionQueues[0].answer.toLowerCase().trim();

        const score = ratio(cleanUserAnswer, cleanAiAnswer);
        isCorrect = score >= 85;
      }
    }

    if (!isCorrect) {
      decrementLives();
    }
  };

  useEffect(() => {
    if (questionQueues.length < 10 && !isFetchingQuestion) {
      const conceptIds = questionQueues.map((concept) => concept.conceptId);
      fetchMoreQuestion({ currentIds: conceptIds, depth: depth });
    }
  }, [
    questionQueues.length,
    isFetchingQuestion,
    questionQueues,
    fetchMoreQuestion,
    depth,
  ]);

  if (lives <= 0) {
    return (
      <div className="text-gray-400 h-full flex flex-1  flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto text-center px-4">
          <motion.div
            // A slick cinematic fade-in from a slight blur
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* --- HEADER --- */}
            <p className="text-red-500/80 font-mono tracking-[0.5em] text-xs mb-3 uppercase animate-pulse">
              Fatal Error
            </p>
            <h1 className="text-4xl md:text-5xl  font-bold text-red-600 tracking-widest uppercase">
              Run Terminated
            </h1>
            <div className="border border-red-900/30 my-5 bg-zinc-950/80 p-8 rounded-sm mb-10 w-full max-w-md text-left relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.05)]">
              <div className="absolute inset-0  pointer-events-none opacity-30"></div>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                    Depth Reached
                  </span>
                  <span className="text-amber-500 font-mono text-lg">
                    {depth}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                    System Status
                  </span>
                  <span className="text-red-500 font-mono text-sm uppercase tracking-widest">
                    Offline
                  </span>
                </div>
                {/* Diagnostic Message */}
                <div className="flex justify-between items-start pt-2">
                  <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mt-1">
                    Diagnostic
                  </span>
                  <span className="text-zinc-400 font-mono text-xs text-right max-w-50 leading-relaxed">
                    Insufficient knowledge parameters detected. Core memory
                    override failed.
                  </span>
                </div>
              </div>
            </div>
            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
              <button
                onClick={() => redirect("/decks")}
                className="w-full py-3 px-8 border border-zinc-700 text-zinc-300 hover:bg-amber-600 hover:text-white transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase rounded-sm"
              >
                Return to Base
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
            className="flex flex-col flex-1 relative  min-w-3xl  items-center justify-center"
          >
            <Lives></Lives>
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

      <AnimatePresence></AnimatePresence>
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
