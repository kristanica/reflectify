"use client";
import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import TypeIt from "typeit-react";

const IngestOwner = () => {
  return (
    <header className="relative border-b border-mocha-surface1 pb-5">
      <Link href="/decks" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-mocha-overlay1 hover:text-mocha-text">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Archives
      </Link>

      <div className="mt-3 grid gap-4 border border-mocha-surface1 bg-mocha-base/70 p-4 sm:grid-cols-[auto_1fr] sm:items-center sm:p-5">
        <div className="flex items-center gap-3 sm:min-w-56">
          <div className="flex size-14 shrink-0 items-center justify-center border border-mocha-yellow/50 bg-mocha-crust">
            <Compass className="size-6 text-mocha-yellow" aria-hidden="true" />
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-mocha-rosewater">
              Malakor
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mocha-overlay1">
              Seed ingester
            </p>
          </div>
        </div>
        <div className="border-t border-mocha-surface1 pt-4 font-mono text-xs leading-6 text-mocha-subtext0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <TypeIt
            options={{
              speed: 25,
              waitUntilVisible: true,
            }}
          >
            Every note you upload is a new coordinate in the labyrinth. I draw
            the lines, compiling the seeds into paths. You are the one who must
            walk them. Do not blame the mapmaker if you lose your way in the
            dark...
          </TypeIt>
        </div>
      </div>
    </header>
  );
};

export default IngestOwner;
