import Link from "next/link";
import React from "react";

const DeckHeader = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-mocha-surface1 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mocha-mauve">
          Seed registry
        </p>
        <h1 className="mt-2 text-2xl font-black text-mocha-text sm:text-3xl">
          The Archives
        </h1>
        <p className="mt-2 text-sm leading-6 text-mocha-subtext0">
          Ingested material and procedural run seeds.
        </p>
      </div>

      <Link
        href="/decks/ingest"
        className="inline-flex min-h-11 items-center justify-center border border-mocha-mauve bg-mocha-mauve px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.14em] text-mocha-crust transition-colors hover:bg-mocha-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-lavender"
      >
        Ingest new seed
      </Link>
    </header>
  );
};

export default DeckHeader;
