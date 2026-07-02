"use client";

import TypeIt from "typeit-react";
import { Compass } from "lucide-react";

const DeckOwner = () => {
  return (
    <aside className="border-b py-5">
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-full border border-mocha-yellow bg-mocha-mantle flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.15)] overflow-hidden">
            <Compass className="w-8 h-8 text-mocha-yellow" />
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm font-mono font-bold text-mocha-maroon">
              Malakor
            </p>

            <p className="text-xs text-mocha-overlay1 font-mono">
              Mnemonic Cartographer
            </p>
          </div>
        </div>
        <div className="col-span-2 text-xs text-mocha-overlay1 font-mono mt-1 text-left">
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
    </aside>
  );
};

export default DeckOwner;
