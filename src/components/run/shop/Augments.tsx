import ShopItem from "@/components/ShopItem";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { useShallow } from "zustand/react/shallow";

const Augments = () => {
  const {
    credits,
    availableJokers,
    jokers,
    addConsumablesBrought,
    purchase,
    shuffleJokers,
    maxJokerShuffle,

  } = useGameEngineStore(
    useShallow((state) => ({
      credits: state.credits,
      availableJokers: state.availableJokers,
      jokers: state.jokers,
      addConsumablesBrought: state.addConsumablesBrought,
      purchase: state.purchase,
      shuffleJokers: state.shuffleJokers,
      maxJokerShuffle: state.maxJokerShuffle,
    })),
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-mocha-surface1 pb-4 gap-4">
        <h2 className="text-mocha-yellow font-mono tracking-widest text-sm font-bold uppercase">
          [ ILLEGAL AUGMENTS ]
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {availableJokers.map((item) => {
          const hasAlreadyJoker = jokers.some((j) => j.id === item.id);

          let dynamicText = `PURCHASE $${item.cost}`;
          const isBroke = credits < item.cost;
          if (hasAlreadyJoker) dynamicText = `CANNOT STACK`;
          else if (isBroke) dynamicText = "INSUFFICIENT FUNDS";
          return (
            <ShopItem
              onPurchase={() => {
                addConsumablesBrought(item);
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
          className="py-2 px-6 border border-mocha-yellow text-mocha-yellow hover:bg-mocha-yellow hover:text-black transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase disabled:opacity-30 disabled:border-mocha-surface2 disabled:text-mocha-overlay0 disabled:pointer-events-none rounded-sm"
        >
          SHUFFLE ({maxJokerShuffle})
        </button>
      </div>
    </div>
  );
};

export default Augments;
