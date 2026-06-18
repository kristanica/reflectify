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
    <div className="text-white h-full w-full flex flex-col flex-1 px-10 py-5 space-y-8 overflow-hidden">
      <div className="">
        <Header
          title="[ THE BLACK MARKET ]"
          description="Intellect is a fragile lantern, traveler, and the drafts of these archives blow cold."
        />
        <BlackMarketOwner />
      </div>

      <section className="grid grid-cols-3 overflow-hidden relative">
        <aside className="row-span-2 border-r border-zinc-800/50 mr-8 pr-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-amber-500 font-mono tracking-widest text-xs font-bold uppercase border-b border-zinc-800/50 pb-2">
              [ ACTIVE AUGMENTS ]
            </h2>
            <div className="flex flex-row flex-wrap gap-4">
              {jokers.length === 0 && (
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                  No Augments Installed
                </p>
              )}
              {jokers.map((joker) => (
                <div
                  key={joker.id}
                  className="relative group cursor-help w-14 h-14 flex items-center justify-center border border-zinc-800 bg-zinc-950/40 rounded hover:border-amber-500/50 transition-colors"
                >
                  <span className="text-2xl drop-shadow-[0_0_5px_rgba(240,165,0,0.5)] group-hover:scale-110 transition-transform">
                    {joker.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-cyan-500 font-mono tracking-widest text-xs font-bold uppercase border-b border-zinc-800/50 pb-2">
              [ CONSUMABLES ]
            </h2>

            <div className="flex flex-row flex-wrap gap-4">
              {consumables.length === 0 && (
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                  No Hacks Available
                </p>
              )}
              {consumables.map((c) => (
                <div
                  key={c.id}
                  className="relative group cursor-help w-14 h-14 flex items-center justify-center border border-zinc-800 bg-zinc-950/40 rounded hover:border-cyan-500/50 transition-colors"
                >
                  <span className="text-2xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>

                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-48 p-3 bg-zinc-950 border border-cyan-500/50 text-xs text-zinc-300 rounded shadow-xl z-50 pointer-events-none">
                    <p className="font-bold text-cyan-500 tracking-wider mb-1 uppercase">
                      {c.name}
                    </p>
                    <p className="font-mono leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={closeShop}
            className="self-center bottom-0 absolute  py-2 px-6 border border-red-600 text-red-600 hover:bg-red-600 hover:text-black transition-all duration-300 font-mono tracking-widest text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
          >
            EXIT SHOP
          </button>
        </aside>

        <aside className="col-span-2">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
              <h2 className="text-amber-500 font-mono tracking-widest text-sm font-bold uppercase">
                Available Augments
              </h2>
              <motion.div
                animate={goldControls}
                className=" bg-zinc-950 px-4 overflow-hidden  rounded text-xs font-mono text-[#f0a500] "
              >
                🪙 CREDITS: $<motion.span>{animatedCredits}</motion.span>
              </motion.div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {availableJokers.map((item) => (
                <ShopItem
                  onPurchase={async () => {
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
                  canAfford={credits < item.cost}
                />
              ))}
            </div>
            <button
              disabled={!maxJokerShuffle}
              onClick={shuffleJokers}
              className="self-end py-2 px-6 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-widest text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
            >
              SHUFFLE AUGMENTS
            </button>
          </div>
        </aside>
        <aside className="col-span-2">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
              <h2 className="text-cyan-500 font-mono tracking-widest text-sm font-bold uppercase">
                Single-Use Hacks
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {availableConsumables.map((item) => (
                <ShopItem
                  onPurchase={async () => {
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
                  canAfford={credits < item.cost}
                />
              ))}
            </div>
            <button
              disabled={!maxConsumablesShuffle}
              onClick={shuffleConsumables}
              className="self-end py-2 px-6 border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-black transition-all duration-300 font-mono tracking-widest text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
            >
              SHUFFLE HACKS
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default BlackMarket;
