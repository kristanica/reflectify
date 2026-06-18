"use client";

import { useEffect } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { ratio } from "fuzzball";

import Lives from "./Lives";

import GameOver from "./GameOver";
import Score from "./Score";
import { Book, Heart } from "lucide-react";
import Shop from "./shop/BlackMarket";
import BlackMarket from "./shop/BlackMarket";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);
  const setHasAnswered = useGameEngineStore((state) => state.setHasAnswered);
  const questionQueues = useGameEngineStore((state) => state.questionQueues);
  const depth = useGameEngineStore((state) => state.questionsAnswered);
  const decrementLives = useGameEngineStore((state) => state.decrementLives);
  const lives = useGameEngineStore((state) => state.lives);
  const plusStreak = useGameEngineStore((state) => state.plusStreak);
  const streak = useGameEngineStore((state) => state.streak);
  const score = useGameEngineStore((state) => state.score);
  const resetStreak = useGameEngineStore((state) => state.resetStreak);
  const setScore = useGameEngineStore((state) => state.setScore);
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );

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
    setSelectedAnswer("");
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
      setScore(-50);
      resetStreak();
    } else {
      plusStreak();
      setScore(100);
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

  // if (questionQueues.length % 10 === 0) {
  //   return <BlackMarket></BlackMarket>;
  // }

  return (
    <div className="text-gray-400 h-full flex  flex-1 flex-col items-center ">
      <AnimatePresence mode="wait">
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex flex-col flex-1 relative min-w-3xl w-full max-w-3xl items-center justify-evenly"
        >
          <div className="w-full flex justify-between items-end  pb-4 mb-6 flex-1">
            {/* Left Side: Lives */}
            <Lives></Lives>

            <Score></Score>
          </div>

          <div className="w-full flex-2">
            <div className="w-full max-w-3xl mb-6 ">
              <div className="pb-3 my-2 border-b border-zinc-400 flex  items-center justify-between">
                <div className="flex flex-row gap-2  items-center justify-center ">
                  <Book />
                  <Heart />
                  <Heart />
                  <Heart />
                  <Heart />
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
                  <button
                    disabled={!selectedAnswer}
                    onClick={answerQuestion}
                    className=" py-2.5 px-8  border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
                  >
                    ANSWER
                  </button>
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
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-3xl mt-6 p-4 border border-zinc-800 bg-zinc-950/50 rounded-sm overflow-hidden"
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
          </div>

          <div className="w-full border flex items-center justify-center flex-[.5] ">
            asd
          </div>
        </motion.div>
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
