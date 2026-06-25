"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TypeIt from "typeit-react";

const IngestOwner = () => {
  return (
    <header className="border-b py-5 relative">
      <Link href="/decks" className="absolute left-0 top-0 text-mocha-overlay1">
        <ArrowLeft size={15}></ArrowLeft>
      </Link>

      <div className="flex flex-col items-center relative justify-center max-w-2xl mx-auto gap-2">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-full border border-mocha-yellow bg-mocha-mantle flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.15)] overflow-hidden">
            <div className="text-mocha-yellow text-3xl">🧭</div>
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm font-mono font-bold text-mocha-maroon">
              Malakor
            </p>

            <p className="text-xs text-mocha-overlay1 font-mono">
              [SEED INGESTER]
            </p>
          </div>
        </div>
        <div className="col-span-2 text-xs text-mocha-overlay1 font-mono mt-1 text-center">
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
