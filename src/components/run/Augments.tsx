import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";
type Augments = {
  handleConsumable: (consumableId: string) => void;
};

const Augments = ({ handleConsumable }: Augments) => {
  const jokers = useGameEngineStore((state) => state.jokers);
  const consumables = useGameEngineStore((state) => state.consumables);

  return (
    <>
      <div className="flex-1 border bg-card p-5 rounded space-y-4  font-mono text-xs h-full ">
        <h3 className="font-bold text-primary tracking-wider uppercase border-b  pb-2">
          [ AUGMENTS ]
        </h3>

        {jokers.length === 0 ? (
          <p className="text-mocha-subtext1 text-[10px] uppercase tracking-widest">
            No active augments
          </p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
            {jokers.map((joker) => (
              <div
                key={joker.id}
                title={joker.description}
                className="relative group cursor-help flex items-center justify-center aspect-square border border-mocha-surface1 bg-mocha-mantle rounded hover:border-mocha-yellow/50 transition-colors"
              >
                <span className="text-xl drop-shadow-[0_0_5px_rgba(240,165,0,0.5)] group-hover:scale-110 transition-transform">
                  {joker.icon}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consumables (Hacks) */}
      <div className="border  bg-card p-5 rounded flex flex-col font-mono text-xs flex-1 ">
        <h3 className="font-bold text-primary  tracking-wider uppercase border-b  pb-2 mb-4">
          [ HACKS ]
        </h3>

        {consumables.length === 0 ? (
          <p className="text-mocha-subtext1 text-[10px] uppercase tracking-widest">
            No hacks available
          </p>
        ) : (
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {consumables.map((consume) => (
              <button
                key={consume.id}
                title={consume.description}
                onClick={() => handleConsumable(consume.id)}
                className="w-full flex items-center justify-between p-2.5 border border-mocha-surface1 bg-mocha-mantle rounded hover:border-mocha-sky/50 transition-colors group text-left flex-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {consume.icon}
                  </span>
                  <span className="text-xs text-mocha-subtext1 group-hover:text-mocha-sky transition-colors hidden xl:inline-block">
                    {consume.name}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-mocha-overlay2 bg-mocha-surface1 px-2 py-1 rounded border border-mocha-surface1">
                  x{consume.quantity}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Augments;
