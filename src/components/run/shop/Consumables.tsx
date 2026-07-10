import ShopItem from "@/components/ShopItem";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { useState } from "react";
import { set } from "zod/v3";
import { useShallow } from "zustand/react/shallow";

const Consumables = () => {
  const {
    credits,
    addConsumablesBrought,
    consumablesBrought,
    availableConsumables,
    purchase,
    maxConsumablesShuffle,
    shuffleConsumables,
  } = useGameEngineStore(
    useShallow((state) => ({
      credits: state.credits,
      availableConsumables: state.availableConsumables,
      addConsumablesBrought: state.addConsumablesBrought,
      consumablesBrought: state.consumblesBrought,
      purchase: state.purchase,
      maxConsumablesShuffle: state.maxConsumablesShuffle,
      shuffleConsumables: state.shuffleConsumables,
    })),
  );


  const [broughtLocally, setBroughtLocally] = useState<string[]>([]);

  return (
    <div className="">
      <div className="flex justify-between items-center border-b border-mocha-surface1 pb-4">
        <h2 className="text-mocha-sky font-mono tracking-widest text-sm font-bold uppercase">
          [ SINGLE-USE HACKS ]
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {availableConsumables.map((item) => {
          const hasBeenBroughtLocally = broughtLocally.some(
            (c) => c === item.id,
          );

          const isBroke = credits < item.cost;
          let dynamicText = `PURCHASE $${item.cost}`;
          if (hasBeenBroughtLocally) dynamicText = "SOLD OUT";
          else if (isBroke) dynamicText = "INSUFFICIENT FUNDS";
          return (
            <ShopItem
              onPurchase={async () => {
                if (hasBeenBroughtLocally) return;
                addConsumablesBrought(item);
                setBroughtLocally((prev) => [...prev, item.id]);
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
          className="py-2 px-6 border border-mocha-sky text-mocha-sky hover:bg-mocha-sky hover:text-black transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase disabled:opacity-30 disabled:border-mocha-surface2 disabled:text-mocha-overlay0 disabled:pointer-events-none rounded-sm"
        >
          SHUFFLE ({maxConsumablesShuffle})
        </button>
      </div>
    </div>
  );
};

export default Consumables;
