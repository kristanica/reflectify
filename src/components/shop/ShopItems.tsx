// components/shop/ShopItems.tsx
"use client";

import React, { useState } from "react";
import {
  Heart,
  SkipForward,
  Lightbulb,
  Snowflake,
  ScrollText,
  Coins,
} from "lucide-react";

const SHOP_ITEMS = [
  {
    id: "extra_life",
    name: "Extra Life",
    description: "Gain +1 life for your current study run.",
    cost: 50,
    icon: Heart,
  },
  {
    id: "skip_card",
    name: "Skip Card",
    description: "Skip a difficult question with no score penalty.",
    cost: 30,
    icon: SkipForward,
  },
  {
    id: "hint_reveal",
    name: "AI Clue Hint",
    description: "AI reveals a clue about the correct answer.",
    cost: 20,
    icon: Lightbulb,
  },
  {
    id: "freeze_timer",
    name: "Freeze Timer",
    description: "Add 10 seconds to the current question timer.",
    cost: 40,
    icon: Snowflake,
  },
  {
    id: "double_xp",
    name: "Double XP Scroll",
    description: "Earn 2x XP for the next 10 questions in a run.",
    cost: 100,
    icon: ScrollText,
  },
];

export default function ShopItems() {
  // Mock client-side gold balance for the mockup
  const [gold, setGold] = useState(120);

  const buyItem = (item: (typeof SHOP_ITEMS)[number]) => {
    if (gold >= item.cost) {
      setGold((prev) => prev - item.cost);
      alert(`Success: Acquired ${item.name}!`);
    } else {
      alert("Error: Insufficient gold coins.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Dynamic Gold Status HUD */}
      <div className="flex justify-end">
        <div className="flex min-h-11 items-center gap-1.5 border border-mocha-yellow/40 bg-mocha-base px-4 py-2 font-mono text-xs text-mocha-yellow">
          <Coins className="w-3.5 h-3.5" /> INVENTORY GOLD:{" "}
          <span className="text-mocha-text font-bold">{gold} GP</span>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SHOP_ITEMS.map((item) => {
          const canAfford = gold >= item.cost;
          return (
            <div
              key={item.id}
              className="group flex min-h-64 flex-col justify-between space-y-4 border border-mocha-surface1 bg-mocha-base/60 p-5 font-mono text-xs transition-colors hover:border-mocha-yellow/40"
            >
              {/* Top Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform text-mocha-yellow" />
                  <h3 className="text-sm font-bold text-mocha-text tracking-wide uppercase">
                    {item.name}
                  </h3>
                </div>
                <p className="text-mocha-overlay2 text-[11px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-3 border-t border-mocha-surface2">
                <span className="text-mocha-yellow font-bold">
                  <Coins className="mr-1 inline-block size-3.5" aria-hidden="true" />
                  {item.cost} GP
                </span>

                <button
                  onClick={() => buyItem(item)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 border text-[10px] font-bold transition-all ${
                    canAfford
                      ? "cursor-pointer border-mocha-yellow text-mocha-yellow hover:bg-mocha-yellow hover:text-black"
                      : "cursor-not-allowed border-mocha-surface1 text-mocha-overlay1 opacity-50"
                  }`}
                >
                  {canAfford ? "PURCHASE" : "LACK COINS"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
