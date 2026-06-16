"use client";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

const Identification = () => {
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const answer = useGameEngineStore((state) => state.selectedAnswer);
  return (
    <div className="w-full max-w-3xl flex flex-col">
      <div className="relative w-full">
        <span className="absolute top-8.5 left-4 text-[12px] text-amber-600/50 font-mono animate-pulse">
          &gt;_
        </span>

        <input
          type="text"
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="ENTER OVERRIDE CODE..."
          spellCheck={false}
          value={answer}
          autoComplete="off"
          className="w-full p-4 pl-10 min-h-20 bg-transparent border rounded-sm font-mono text-sm tracking-widest outline-none transition-all duration-300 border-zinc-800  text-amber-500  disabled:opacity-80 placeholder:text-zinc-700"
        />
      </div>
    </div>
  );
};

export default Identification;
