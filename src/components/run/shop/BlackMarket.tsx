"use client";

import { AUGMENT_DATABASE, CONSUMABLE_DATABASE } from "@/lib/mockData";
import BlackMarketOwner from "./BlackMarketOwner";
import Header from "@/components/Header";
import ShopItem from "@/components/ShopItem";
import { useState } from "react";

const BlackMarket = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRandomItems = (database: any[]) => {
    return [...database].sort(() => Math.random() - 0.5).slice(0, 3);
  };
  const [maxJokerShuffle, setMaxJokerShuffle] = useState<number>(3);
  const [maxConsumablesShuffle, setMaxConsumablesShuffle] = useState<number>(3);
  const [availableJokers, setAvailableJokers] = useState(() =>
    getRandomItems(AUGMENT_DATABASE),
  );
  const [availableConsumables, setAvailableConsumables] = useState(() =>
    getRandomItems(CONSUMABLE_DATABASE),
  );

  const shuffleJokers = () => {
    const shuffled = [...AUGMENT_DATABASE].sort(() => Math.random() - 0.5);

    setAvailableJokers(() => shuffled.slice(0, 3));
    setMaxJokerShuffle((prev) => prev - 1);
  };

  const shuffleConsumables = () => {
    const shuffled = [...CONSUMABLE_DATABASE].sort(() => Math.random() - 0.5);

    setAvailableConsumables(() => shuffled.slice(0, 3));
    setMaxConsumablesShuffle((prev) => prev - 1);
  };

  return (
    // 🚨 FIX: Added flex flex-col and space-y-8 to properly space out the sections
    <div className="text-white h-full w-full flex flex-col flex-1 px-10 py-5 space-y-8 overflow-y-auto">
      <div className="space-y-4">
        <Header
          title="[ THE BLACK MARKET ]"
          description="Intellect is a fragile lantern, traveler, and the drafts of these archives blow cold."
        />
        <BlackMarketOwner />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
          <h2 className="text-amber-500 font-mono tracking-widest text-sm font-bold uppercase">
            Available Augments
          </h2>
          <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
            Shuffles: {maxJokerShuffle}/3
          </span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {availableJokers.map((item) => (
            <ShopItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              icon={item.icon}
              type="PASSIVE"
              effect={item.effectType as Effects}
              value={item.value}
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

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
          <h2 className="text-cyan-500 font-mono tracking-widest text-sm font-bold uppercase">
            Single-Use Hacks
          </h2>
          <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
            Shuffles: {maxConsumablesShuffle}/3
          </span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {availableConsumables.map((item) => (
            <ShopItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              icon={item.icon}
              type="CONSUMABLE"
              effect="BONUS_CREDITS"
              value={0}
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
    </div>
  );
};

export default BlackMarket;
