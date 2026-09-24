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
      <section className="h-full flex-1 border border-mocha-surface1 bg-mocha-base/70 font-mono text-xs">
        <header className="border-b border-mocha-surface1 px-4 py-3">
          <h3 className="font-bold uppercase tracking-[0.18em] text-mocha-mauve">Active augments</h3>
        </header>
        <div className="p-4">

        {jokers.length === 0 ? (
          <p className="text-mocha-subtext1 text-[10px] uppercase tracking-widest">
            No active augments
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4">
            {jokers.map((joker) => (
              <div
                key={joker.id}
                title={joker.description}
                className="group relative flex aspect-square cursor-help items-center justify-center border border-mocha-surface1 bg-mocha-mantle transition-colors hover:border-mocha-yellow/50"
              >
                <span className="text-xl drop-shadow-[0_0_5px_rgba(240,165,0,0.5)] group-hover:scale-110 transition-transform">
                  {joker.icon}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* Consumables (Hacks) */}
      <section className="flex flex-1 flex-col border border-mocha-surface1 bg-mocha-base/70 font-mono text-xs">
        <header className="border-b border-mocha-surface1 px-4 py-3">
          <h3 className="font-bold uppercase tracking-[0.18em] text-mocha-sky">Consumable hacks</h3>
        </header>
        <div className="flex-1 p-4">

        {consumables.length === 0 ? (
          <p className="text-mocha-subtext1 text-[10px] uppercase tracking-widest">
            No hacks available
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {consumables.map((consume) => (
              <button
                key={consume.id}
                title={consume.description}
                onClick={() => handleConsumable(consume.id)}
                className="group flex min-h-12 w-full flex-none items-center justify-between border border-mocha-surface1 bg-mocha-mantle p-2.5 text-left transition-colors hover:border-mocha-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-sky"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {consume.icon}
                  </span>
                  <span className="text-xs text-mocha-subtext1 transition-colors group-hover:text-mocha-sky">
                    {consume.name}
                  </span>
                </div>
                <span className="border border-mocha-surface1 bg-mocha-surface1 px-2 py-1 text-[10px] font-bold text-mocha-overlay2">
                  x{consume.quantity}
                </span>
              </button>
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
};

export default Augments;
