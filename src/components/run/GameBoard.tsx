"use client";

import { useCallback, useEffect, useRef } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";

import Lives from "./Lives";

import GameOver from "./GameOver";
import Score from "./Score";
import BlackMarket from "./shop/BlackMarket";
import Explanation from "@/components/run/Explanation";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  // gameStore
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);

  const questionQueues = useGameEngineStore((state) => state.questionQueues);
  const depth = useGameEngineStore((state) => state.questionsAnswered);

  const lives = useGameEngineStore((state) => state.lives);

  const submitAnswer = useGameEngineStore((state) => state.submitAnswer);

  const consumables = useGameEngineStore((state) => state.consumables);
  const consumeItem = useGameEngineStore((state) => state.useConsumable);
  const isShopOpen = useGameEngineStore((state) => state.isShopOpen);
  const openShop = useGameEngineStore((state) => state.openShop);
  const lastShopDepth = useGameEngineStore((state) => state.lastOpenedShop);
  const jokers = useGameEngineStore((state) => state.jokers);

  const setQuestionQueues = useGameEngineStore(
    (state) => state.setQuestionQueues,
  );

  const handleNextQuestion = useGameEngineStore(
    (state) => state.handleNextQuestion,
  );

  const handleConsumable = useCallback(
    (consumableId: string) => {
      consumeItem(consumableId);
    },
    [consumeItem],
  );

  // Refs
  const questionTimerStart = useRef<number | null>(null);
  const hasDictionary = jokers.some(
    (joker) => joker.effect === "INSTANT_SUBMIT_PAYOUT",
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

  const answerQuestion = useCallback(() => {
    const timeElapsedInSecond = questionTimerStart.current
      ? (Date.now() - questionTimerStart.current) / 1000
      : 0;

    submitAnswer(timeElapsedInSecond);
  }, [submitAnswer]);

  // Background fetching
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

  // Speed payout
  useEffect(() => {
    if (
      questionTimerStart.current === null &&
      questionQueues[0] &&
      questionQueues[0].question
    ) {
      questionTimerStart.current = Date.now();
    }
  }, [questionQueues]);
  // Dictionary attack
  useEffect(() => {
    if (hasDictionary && selectedAnswer && !hasAnswered) {
      answerQuestion();
    }
  }, [answerQuestion, hasAnswered, hasDictionary, selectedAnswer]);

  // Determines shop pop up
  useEffect(() => {
    if (depth > 0 && depth % 10 === 0 && lastShopDepth !== depth) {
      openShop();
    }
  }, [depth, lastShopDepth, openShop]);

  if (lives <= 0) {
    return <GameOver></GameOver>;
  }

  if (questionQueues.length === 0 && (isFetchingQuestion || isFetchingIdle)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-400 h-full flex  flex-1 items-center justify-center"
      >
        <InitialLoading></InitialLoading>
      </motion.div>
    );
  }

  if (isShopOpen) {
    return <BlackMarket />;
  }
  return (
    <div className="text-gray-400 h-full flex  flex-1 flex-col items-center ">
      <AnimatePresence mode="wait">
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex flex-col flex-1 relative w-full max-w-4xl items-center justify-evenly"
        >
          <div className="w-full flex justify-between items-end  pb-4 mb-6 flex-1">
            <Lives></Lives>
            <Score></Score>
          </div>

          <div className="w-full flex-2">
            <div className="w-full  mb-6 ">
              <div className="pb-3 my-2 border-b border-zinc-400 flex  items-center justify-between">
                <div className="flex flex-row gap-2  items-center justify-center ">
                  {jokers.map((joker) => (
                    <p
                      key={joker.id}
                      title={joker.description}
                      className="text-3xl"
                    >
                      {joker.icon}
                    </p>
                  ))}
                </div>

                {hasAnswered ? (
                  <button
                    disabled={!hasAnswered}
                    onClick={() => handleNextQuestion()}
                    className=" py-2.5 px-8  border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
                  >
                    NEXT
                  </button>
                ) : (
                  !hasDictionary && (
                    <button
                      disabled={!selectedAnswer}
                      onClick={answerQuestion}
                      className=" py-2.5 px-8  border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
                    >
                      ANSWER
                    </button>
                  )
                )}
              </div>

              <div>
                <p className="text-[10px] tracking-widest text-amber-600 mb-2 font-mono">
                  QUESTION
                </p>
                <p className="text-gray-100 font-mono text-sm leading-relaxed">
                  {questionQueues[0].question}
                </p>
              </div>
            </div>

            <GameTypeIdentifier
              choices={questionQueues[0].options as string[]}
              answer={questionQueues[0].answer}
              type={questionQueues[0].type}
            ></GameTypeIdentifier>

            <AnimatePresence mode="wait">
              {hasAnswered && (
                <Explanation
                  explanation={questionQueues[0].explanation}
                ></Explanation>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full border flex items-center justify-center flex-[.5] ">
            {consumables.map((consume) => (
              <motion.button
                key={consume.id}
                title={consume.description}
                onClick={() => {
                  handleConsumable(consume.id);
                }}
                className="text-3xl"
              >
                {consume.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
