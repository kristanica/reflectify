"use client";
import TypeIt from "typeit-react";

const BlackMarketOwner = () => {
  return (
    <aside className="border-b border-zinc-800 py-5 select-none">
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-md border border-cyan-500/50 bg-zinc-950 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden group">
            <div className="text-cyan-400 text-3xl group-hover:scale-110 transition-transform duration-500">
              👁️‍🗨️
            </div>
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              CIPHER
            </p>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1 text-center">
              Rogue Daemon
            </p>
          </div>
        </div>

        <div className="col-span-2 text-xs text-zinc-500 font-mono mt-1 text-left">
          <TypeIt
            options={{
              speed: 25,
              waitUntilVisible: true,
            }}
          >
            Intellect is a fragile lantern, traveler, and the drafts of these
            archives blow cold. You will stumble. You will forget. The engines
            of recall wait in the shadows for your focus to fracture. My relics
            do not grant wisdom—they buy you moments. A second heartbeat. A
            frozen second. A glance in the mirror. Trade your coin, before the
            ink claims your final spark...
          </TypeIt>
        </div>
      </div>
    </aside>
  );
};

export default BlackMarketOwner;
