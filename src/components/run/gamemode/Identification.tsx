"use client";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

const Identification = () => {
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const answer = useGameEngineStore((state) => state.selectedAnswer);
  return (
    <div className="w-full flex flex-col mt-4">
      <div className="relative w-full">
        <span className="absolute top-1/2 -translate-y-1/2 left-4 text-[12px] text-mocha-yellow/50 font-mono animate-pulse">
          &gt;_
        </span>

        <input
          type="text"
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="ENTER OVERRIDE CODE..."
          spellCheck={false}
          value={answer}
          autoComplete="off"
          className="w-full p-4 pl-10 min-h-20 bg-mocha-base/40 border rounded-sm font-mono text-sm tracking-widest outline-none transition-all duration-300 border-mocha-surface1 focus:border-mocha-yellow focus:shadow-[0_0_10px_rgba(240,165,0,0.2)] text-mocha-text disabled:opacity-80 placeholder:text-mocha-overlay0"
        />
      </div>
    </div>
  );
};

export default Identification;
