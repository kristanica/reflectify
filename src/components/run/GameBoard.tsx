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
  const logs = useGameEngineStore((state) => state.logs);
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
    <div className="w-full h-full flex flex-col p-6 text-[#f0ede8] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex flex-col flex-1 relative w-full max-w-5xl mx-auto h-full space-y-6 min-h-0"
        >
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4 flex-none">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-widest text-[#f0a500] uppercase">
                [ ACTIVE RUN ]
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                DEPTH: {depth}
              </p>
            </div>

            <div className="flex gap-4 text-xs font-mono items-center">
              <Lives />
              <Score />
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
            {/* LEFT COLUMN: Question & Answers (3/4 Width) */}
            <div className="lg:col-span-3 flex flex-col space-y-6 overflow-y-auto pr-2 pb-6">
              {/* Question Block */}
              <div className="border border-zinc-800 bg-zinc-950/40 p-6 rounded flex flex-col space-y-4">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider font-mono text-white uppercase">
                      CURRENT QUERY
                    </h3>
                  </div>

                  <div className="flex gap-4 items-center">
                    {hasAnswered ? (
                      <button
                        disabled={!hasAnswered}
                        onClick={() => handleNextQuestion()}
                        className="px-6 py-2 border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] font-mono text-xs font-bold transition-all duration-300 tracking-widest uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
                      >
                        NEXT
                      </button>
                    ) : (
                      !hasDictionary && (
                        <button
                          disabled={!selectedAnswer}
                          onClick={answerQuestion}
                          className="px-6 py-2 border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] font-mono text-xs font-bold transition-all duration-300 tracking-widest uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
                        >
                          ANSWER
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-zinc-200 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {questionQueues[0].question}
                  </p>
                </div>
              </div>

              {/* Answers Block */}
              <div className="w-full">
                <GameTypeIdentifier
                  choices={questionQueues[0].options as string[]}
                  answer={questionQueues[0].answer}
                  type={questionQueues[0].type}
                />
              </div>

              <div className="border border-[#f0a500]/30 bg-zinc-950/20 p-5 rounded font-mono mt-4">
                <h4 className="text-xs text-[#f0a500] uppercase font-bold tracking-wider mb-3">
                  🤖 AI EXPLANATION
                </h4>

                {/* Explanation Block */}
                <AnimatePresence mode="wait">
                  {hasAnswered ? (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="overflow-hidden"
                    >
                      <Explanation
                        explanation={questionQueues[0].explanation}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no answer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <p className="text-zinc-500 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                        THE AI IS WAITING FOR YOUR ANSWER....
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded font-mono mt-4">
                <h2 className="text-sm font-bold font-mono tracking-widest text-yellow-500 uppercase mb-3">
                  [ LOGS RUN ]
                </h2>

                <div className="max-h-32 w-full border-zinc-800 border bg-zinc-950/20 py-2 px-3 overflow-y-auto text-xs flex flex-col-reverse">
                  {logs.map((item, index) => (
                    <p key={index} className="text-zinc-500 mb-1">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Augments & Consumables (1/4 Width) */}
            <div className="flex flex-col space-y-6 overflow-y-auto pr-2 pb-6 min-h-0">
              {/* Active Augments */}
              <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded space-y-4 font-mono text-xs flex-none">
                <h3 className="font-bold text-[#f0a500] tracking-wider uppercase border-b border-zinc-800 pb-2">
                  [ AUGMENTS ]
                </h3>

                {jokers.length === 0 ? (
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                    No active augments
                  </p>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                    {jokers.map((joker) => (
                      <div
                        key={joker.id}
                        title={joker.description}
                        className="relative group cursor-help flex items-center justify-center aspect-square border border-zinc-800 bg-zinc-950 rounded hover:border-[#f0a500]/50 transition-colors"
                      >
                        <span className="text-xl drop-shadow-[0_0_5px_rgba(240,165,0,0.5)] group-hover:scale-110 transition-transform">
                          {joker.icon}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Consumables (Hacks) */}
              <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded flex flex-col font-mono text-xs flex-1 min-h-0">
                <h3 className="font-bold text-cyan-500 tracking-wider uppercase border-b border-zinc-800 pb-2 mb-4">
                  [ HACKS ]
                </h3>

                {consumables.length === 0 ? (
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                    No hacks available
                  </p>
                ) : (
                  <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                    {consumables.map((consume) => (
                      <button
                        key={consume.id}
                        title={consume.description}
                        onClick={() => handleConsumable(consume.id)}
                        className="w-full flex items-center justify-between p-2.5 border border-zinc-800 bg-zinc-950 rounded hover:border-cyan-500/50 transition-colors group text-left flex-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                            {consume.icon}
                          </span>
                          <span className="text-xs text-zinc-300 group-hover:text-cyan-400 transition-colors hidden xl:inline-block">
                            {consume.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                          x{consume.quantity}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
