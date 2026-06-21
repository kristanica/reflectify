"use client";

import { AUGMENTS, CONSUMABLE_DATABASE } from "@/lib/mockData";
import BlackMarketOwner from "./BlackMarketOwner";
import Header from "@/components/Header";
import { useState } from "react";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { motion, useAnimation } from "motion/react";
import ShopItem from "@/components/ShopItem";

const BlackMarket = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRandomItems = (database: any[]) => {
    return [...database].sort(() => Math.random() - 0.5).slice(0, 3);
  };
  const [consumablesBrought, addConsumablesBrought] = useState<ShopItem[]>([]);

  const [maxJokerShuffle, setMaxJokerShuffle] = useState<number>(3);
  const [maxConsumablesShuffle, setMaxConsumablesShuffle] = useState<number>(3);
  const [availableJokers, setAvailableJokers] = useState(() =>
    getRandomItems(AUGMENTS),
  );
  const [availableConsumables, setAvailableConsumables] = useState(() =>
    getRandomItems(CONSUMABLE_DATABASE),
  );

  const shuffleJokers = () => {
    const shuffled = [...AUGMENTS].sort(() => Math.random() - 0.5);

    setAvailableJokers(() => shuffled.slice(0, 3));
    setMaxJokerShuffle((prev) => prev - 1);
  };

  const shuffleConsumables = () => {
    const shuffled = [...CONSUMABLE_DATABASE].sort(() => Math.random() - 0.5);

    addConsumablesBrought([]);
    setAvailableConsumables(() => shuffled.slice(0, 3));
    setMaxConsumablesShuffle((prev) => prev - 1);
  };

  const credits = useGameEngineStore((state) => state.credits);

  const animatedCredits = useAnimatedNumber({ val: credits });
  const buyJoker = useGameEngineStore((state) => state.buyJoker);
  const jokers = useGameEngineStore((state) => state.jokers);
  const consumables = useGameEngineStore((state) => state.consumables);
  const closeShop = useGameEngineStore((state) => state.closeShop);

  const buyConsumables = useGameEngineStore((state) => state.buyConsumable);
  const goldControls = useAnimation();
  const purchase = async (item: ShopItem) => {
    if (credits < item.cost) {
      await goldControls.start({
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        backgroundColor: ["#ffffff", "#ffcccc", ""],
        transition: { duration: 0.4, ease: "easeInOut" },
      });

      return;
    }

    if (item.type === "PASSIVE") {
      buyJoker(item);
      return;
    } else {
      buyConsumables(item);
    }
  };

  return (
    <div className="text-[#f0ede8] h-full w-full flex flex-col flex-1 px-6 py-6 max-w-7xl mx-auto space-y-6 overflow-hidden">
      {/* Header Block */}
      <div className="border-b border-zinc-800 pb-4 flex-none">
        <Header
          title="[ THE BLACK MARKET ]"
          description="Intellect is a fragile lantern, traveler, and the drafts of these archives blow cold."
        />
        <div className="mt-2">
          <BlackMarketOwner />
        </div>
      </div>

      {/* Main Layout Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* LEFT COLUMN: Shop Items (3/4 Width) */}
        <aside className="lg:col-span-3 flex flex-col space-y-6 overflow-y-auto pr-2 pb-6 custom-scrollbar h-full min-h-0">
          
          {/* Shop Augments */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6 rounded flex flex-col space-y-6 flex-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
              <h2 className="text-[#f0a500] font-mono tracking-widest text-sm font-bold uppercase">
                [ ILLEGAL AUGMENTS ]
              </h2>
              <motion.div
                animate={goldControls}
                className="bg-zinc-950 px-4 py-1.5 border border-[#f0a500]/50 rounded text-xs font-mono text-[#f0a500] font-bold tracking-widest shadow-[0_0_10px_rgba(240,165,0,0.1)]"
              >
                🪙 CREDITS: $<motion.span>{animatedCredits}</motion.span>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableJokers.map((item) => {
                const hasAlreadyJoker = jokers.some((j) => j.id === item.id);

                let dynamicText = `PURCHASE $${item.cost}`;
                const isBroke = credits < item.cost;
                if (hasAlreadyJoker) dynamicText = `CANNOT STACK`;
                else if (isBroke) dynamicText = "INSUFFICIENT FUNDS";
                return (
                  <ShopItem
                    onPurchase={async () => {
                      addConsumablesBrought((prev) => [...prev, item]);
                      purchase(item);
                    }}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    cost={item.cost}
                    icon={item.icon}
                    type="PASSIVE"
                    effect={item.effectType}
                    value={item.value}
                    canAfford={!isBroke}
                    dynamicText={dynamicText}
                  />
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={!maxJokerShuffle}
                onClick={shuffleJokers}
                className="py-2 px-6 border border-[#f0a500] text-[#f0a500] hover:bg-[#f0a500] hover:text-black transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
              >
                SHUFFLE ({maxJokerShuffle})
              </button>
            </div>
          </div>

          {/* Shop Consumables */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6 rounded flex flex-col space-y-6 flex-none">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h2 className="text-cyan-500 font-mono tracking-widest text-sm font-bold uppercase">
                [ SINGLE-USE HACKS ]
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableConsumables.map((item) => {
                const hasBeenBroughtLocally = consumablesBrought.some(
                  (c) => c.id === item.id,
                );

                const isBroke = credits < item.cost;
                let dynamicText = `PURCHASE $${item.cost}`;
                if (hasBeenBroughtLocally) dynamicText = "SOLD OUT";
                else if (isBroke) dynamicText = "INSUFFICIENT FUNDS";
                return (
                  <ShopItem
                    onPurchase={async () => {
                      if (hasBeenBroughtLocally) return;
                      addConsumablesBrought((prev) => [...prev, item]);
                      purchase(item);
                    }}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    cost={item.cost}
                    icon={item.icon}
                    type="CONSUMABLE"
                    effect="BONUS_CREDITS"
                    value={0}
                    dynamicText={dynamicText}
                    canAfford={!isBroke}
                  />
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={!maxConsumablesShuffle}
                onClick={shuffleConsumables}
                className="py-2 px-6 border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-black transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
              >
                SHUFFLE ({maxConsumablesShuffle})
              </button>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Inventory & Exit (1/4 Width) */}
        <aside className="lg:col-span-1 flex flex-col h-full min-h-0 pb-6">
          <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {/* Active Augments */}
            <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded space-y-4 font-mono text-xs flex-none">
              <h3 className="font-bold text-[#f0a500] tracking-wider uppercase border-b border-zinc-800 pb-2">
                [ ACTIVE AUGMENTS ]
              </h3>
              
              {jokers.length === 0 ? (
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                  No active augments
                </p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                  {jokers.map((joker) => (
                    <div
                      key={joker.id}
                      title={joker.description}
                      className="relative group cursor-help flex items-center justify-center aspect-square border border-zinc-800 bg-zinc-950 rounded hover:border-[#f0a500]/50 transition-colors"
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
            <div className="border border-zinc-800 bg-zinc-950/40 p-5 rounded flex flex-col font-mono text-xs flex-none">
              <h3 className="font-bold text-cyan-500 tracking-wider uppercase border-b border-zinc-800 pb-2 mb-4">
                [ HACKS INVENTORY ]
              </h3>
              
              {consumables.length === 0 ? (
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                  No hacks available
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {consumables.map((c) => (
                    <div
                      key={c.id}
                      title={c.description}
                      className="w-full flex items-center justify-between p-2.5 border border-zinc-800 bg-zinc-950 rounded hover:border-cyan-500/50 transition-colors group text-left cursor-help"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                          {c.icon}
                        </span>
                        <span className="text-xs text-zinc-300 group-hover:text-cyan-400 transition-colors hidden xl:inline-block">
                          {c.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                        x{c.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* EXIT BUTTON */}
          <div className="mt-6 flex-none">
            <button
              onClick={closeShop}
              className="w-full py-3 border border-red-600/50 text-red-500 hover:bg-red-950/50 hover:text-red-400 hover:border-red-500 transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              [ EXIT SYSTEM ]
            </button>
          </div>
        </aside>

      </section>
    </div>
  );
};

export default BlackMarket;
