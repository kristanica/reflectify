import Link from "next/link";
import React from "react";

const DeckHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-mocha-surface1 pb-4 gap-4">
      <div>
        <h2 className="text-xl font-bold font-mono tracking-widest text-mocha-yellow uppercase">
          [ THE ARCHIVES ]
        </h2>
        <p className="text-xs text-mocha-overlay1 font-mono mt-1">
          INGESTED MATERIAL & PROCEDURAL RUN SEEDS
        </p>
      </div>

      <Link
        href="/decks/ingest"
        className="border border-mocha-yellow hover:bg-mocha-yellow hover:text-black text-mocha-yellow font-mono text-xs font-bold px-4 py-2 transition-all"
      >
        + INGEST NEW SEED
      </Link>
    </header>
  );
};

export default DeckHeader;
