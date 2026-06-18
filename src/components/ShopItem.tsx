import React from "react";

const ShopItem = ({ id, name, description, cost, icon }: ShopItem) => {
  const canAfford = true;

  return (
    <div
      key={id}
      className="border border-zinc-800 bg-zinc-950/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-[#f0a500]/30 transition-all group"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            {name}
          </h3>
        </div>
        <p className="text-zinc-400 text-[11px] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
        <span className="text-[#f0a500] font-bold">🪙 {cost} GP</span>

        <button
          className={`px-3 py-1.5 border text-[10px] font-bold transition-all ${
            canAfford
              ? "border-[#f0a500] text-[#f0a500] hover:bg-[#f0a500] hover:text-black cursor-pointer"
              : "border-zinc-800 text-zinc-650 cursor-not-allowed"
          }`}
        >
          {canAfford ? "PURCHASE" : "LACK COINS"}
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
