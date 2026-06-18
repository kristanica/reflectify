// components/shop/ShopItems.tsx
"use client";

import React, { useState } from "react";

const SHOP_ITEMS = [
  {
    id: "extra_life",
    name: "Extra Life",
    description: "Gain +1 life for your current study run.",
    cost: 50,
    icon: "❤️",
  },
  {
    id: "skip_card",
    name: "Skip Card",
    description: "Skip a difficult question with no score penalty.",
    cost: 30,
    icon: "⏭️",
  },
  {
    id: "hint_reveal",
    name: "AI Clue Hint",
    description: "AI reveals a clue about the correct answer.",
    cost: 20,
    icon: "💡",
  },
  {
    id: "freeze_timer",
    name: "Freeze Timer",
    description: "Add 10 seconds to the current question timer.",
    cost: 40,
    icon: "❄️",
  },
  {
    id: "double_xp",
    name: "Double XP Scroll",
    description: "Earn 2x XP for the next 10 questions in a run.",
    cost: 100,
    icon: "📜",
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
    <div className="space-y-6">
      {/* Dynamic Gold Status HUD */}
      <div className="flex justify-end pr-2">
        <div className="border border-[#f0a500]/40 bg-zinc-950 px-4 py-2 rounded text-xs font-mono text-[#f0a500] shadow-[0_0_10px_rgba(240,165,0,0.1)]">
          🪙 INVENTORY GOLD:{" "}
          <span className="text-white font-bold">{gold} GP</span>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {SHOP_ITEMS.map((item) => {
          const canAfford = gold >= item.cost;
          return (
            <div
              key={item.id}
              className="border border-zinc-800 bg-zinc-950/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-[#f0a500]/30 transition-all group"
            >
              {/* Top Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    {item.name}
                  </h3>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
                <span className="text-[#f0a500] font-bold">
                  🪙 {item.cost} GP
                </span>

                <button
                  onClick={() => buyItem(item)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 border text-[10px] font-bold transition-all ${
                    !canAfford
                      ? "border-[#f0a500] text-[#f0a500] hover:bg-[#f0a500] hover:text-black cursor-pointer"
                      : "border-zinc-800 text-zinc-650 cursor-not-allowed"
                  }`}
                >
                  {!canAfford ? "PURCHASE" : "LACK COINS"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
