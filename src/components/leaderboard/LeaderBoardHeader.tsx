import React from "react";

const leaderBoardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-mocha-surface1 pb-4 gap-4">
      <div>
        <h2 className="text-xl font-bold font-mono tracking-widest text-mocha-yellow uppercase">
          [ THE LEADERBOARD ]
        </h2>
        <p className="text-xs text-mocha-overlay1 font-mono mt-1">
          INGESTED MATERIAL & PROCEDURAL RUN SEEDS
        </p>
      </div>
    </header>
  );
};

export default leaderBoardHeader;
