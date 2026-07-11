"use client";
import { BookOpen, Shuffle, ShuffleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
type FlashCardScreenProps = {
  cards: {
    id: string;
    question: string;
    correctAnswer: string;
  }[];
};

export default function FlashCardScreen({ cards }: FlashCardScreenProps) {
  const [studyCards, setStudyCards] = useState<typeof cards>(cards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = studyCards[currentCardIndex];
  const [showAnswer, setShowAnswer] = useState(false);
  if (cards.length === 0) {
    return (
      <div className="flex min-h-96 w-full max-w-xl flex-col items-center justify-center rounded-lg border border-dashed border-mocha-surface2 bg-mocha-base/40 px-6 py-20 text-center font-mono shadow-[0_0_40px_rgba(0,0,0,0.16)]">
        <BookOpen className="mb-4 h-9 w-9 text-mocha-yellow" />
        <h3 className="text-sm font-bold tracking-[0.18em] text-mocha-text uppercase">
          No Flash Card sets Found
        </h3>
        <p className="mt-3 mb-6 max-w-sm text-xs leading-relaxed text-mocha-overlay1">
          Your archives are empty.
        </p>
        <Link
          href="/decks"
          className="rounded-sm border border-mocha-surface2 px-4 py-2 text-xs tracking-wider text-mocha-overlay2 transition-colors hover:border-mocha-yellow hover:text-mocha-yellow"
        >
          Go to Archive
        </Link>
      </div>
    );
  }

  const shufleCards = () => {
    const shuffled = [...studyCards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    setStudyCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => Math.min(prev + 1, cards.length - 1));
  };
  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center bg-mocha-base px-5 py-10 font-mono sm:px-8">
      <div className="w-full max-w-3xl perspective-distant">
        <motion.article
          animate={{ rotateY: showAnswer ? 180 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          onClick={() => setShowAnswer((prev) => !prev)}
          className="relative min-h-96 w-full cursor-pointer transform-3d"
        >
          <div className="absolute inset-0 flex items-center justify-center rounded-lg border bg-mocha-crust p-12 backface-hidden">
            <p className="max-w-2xl text-center text-2xl leading-relaxed text-mocha-text">
              {currentCard.question}
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-mocha-green bg-mocha-crust p-12  backface-hidden transform-[rotateY(180deg)]">
            <p className="max-w-2xl text-center text-2xl leading-relaxed text-mocha-text">
              {currentCard.correctAnswer}
            </p>
          </div>
        </motion.article>
      </div>

      <nav
        className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        aria-label="Flashcard navigation"
      >
        <button
          onClick={handlePrevious}
          className="rounded-sm border border-mocha-surface2 px-5 py-3 text-xs font-bold tracking-[0.16em] text-mocha-subtext1 uppercase transition-colors hover:border-mocha-overlay0 hover:bg-mocha-surface0 hover:text-mocha-text"
        >
          Previous
        </button>
        <button
          onClick={() => setShowAnswer((prev) => !prev)}
          className="rounded-sm border border-mocha-mauve bg-mocha-mauve px-5 py-3 text-xs font-bold tracking-[0.16em] text-mocha-base uppercase transition-colors "
        >
          {showAnswer ? "Hide Answer" : "Answer"}
        </button>
        <button
          onClick={handleNext}
          className="rounded-sm border border-mocha-surface2 px-5 py-3 text-xs font-bold tracking-[0.16em] text-mocha-subtext1 uppercase transition-colors hover:border-mocha-overlay0 hover:bg-mocha-surface0 hover:text-mocha-text"
        >
          Next
        </button>
      </nav>

      <div className="flex flex-row gap-5 my-5 items-center justify-center ">
        <button onClick={shufleCards}>
          <ShuffleIcon></ShuffleIcon>
        </button>
        <p className=" rounded-full border border-mocha-surface1 bg-mocha-mantle px-4 py-1.5 text-xs tracking-[0.16em] text-mocha-overlay1">
          {currentCardIndex + 1} / {cards.length}
        </p>
      </div>
    </div>
  );
}
