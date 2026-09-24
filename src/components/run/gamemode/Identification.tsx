"use client";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

const Identification = () => {
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const answer = useGameEngineStore((state) => state.selectedAnswer);
  return (
    <div className="flex w-full flex-col">
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-mocha-yellow/70">
          &gt;_
        </span>

        <input
          type="text"
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="ENTER OVERRIDE CODE..."
          spellCheck={false}
          value={answer}
          autoComplete="off"
          aria-label="Type your answer"
          className="min-h-16 w-full border border-mocha-surface1 bg-mocha-base p-4 pl-10 font-mono text-sm tracking-wider text-mocha-text outline-none transition-colors placeholder:text-mocha-overlay0 focus:border-mocha-yellow focus-visible:ring-2 focus-visible:ring-mocha-yellow/40 disabled:opacity-80"
        />
      </div>
    </div>
  );
};

export default Identification;
