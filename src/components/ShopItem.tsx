import React from "react";
import { Coins } from "lucide-react";

const ShopItem = ({
  id,
  name,
  description,
  cost,
  icon,
  onPurchase,
  canAfford,
  dynamicText,
  isSold,
}: ShopItem & {
  onPurchase: () => void;
  canAfford: boolean;
  isSold?: boolean;
  dynamicText?: string;
}) => {
  return (
    <div
      key={id}
      className="border border-mocha-surface1 bg-mocha-base/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-mocha-yellow/30 transition-all group"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <h3 className="text-sm font-bold text-mocha-text tracking-wide uppercase">
            {name}
          </h3>
        </div>
        <p className="text-mocha-overlay2 text-[11px] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-3 border-t border-mocha-surface2">
        <span className="text-mocha-yellow font-bold flex items-center gap-1">
          <Coins className="w-3.5 h-3.5" /> {cost} GP
        </span>

        <button
          onClick={onPurchase}
          disabled={!canAfford || isSold}
          className={`px-3 py-1.5 border text-[10px] font-bold transition-all ${
            canAfford && !isSold
              ? "border-mocha-yellow text-mocha-yellow hover:bg-mocha-yellow hover:text-black cursor-pointer"
              : "border-mocha-surface1 text-mocha-overlay1 cursor-not-allowed"
          }`}
        >
          {dynamicText || `BUY $${cost}`}
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
