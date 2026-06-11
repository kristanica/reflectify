import Link from "next/link";
import React from "react";

const DeckHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
      <div>
        <h2 className="text-xl font-bold font-mono tracking-widest text-[#f0a500] uppercase">
          [ THE ARCHIVES ]
        </h2>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          INGESTED MATERIAL & PROCEDURAL RUN SEEDS
        </p>
      </div>

      <Link
        href="/upload"
        className="border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] font-mono text-xs font-bold px-4 py-2 transition-all"
      >
        + INGEST NEW SEED
      </Link>
    </header>
  );
};

export default DeckHeader;
