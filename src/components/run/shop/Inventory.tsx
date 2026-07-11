import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { Coins } from "lucide-react";
import { useAnimation } from "motion/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { motion } from "motion/react";
const Inventory = () => {
  const { jokers, consumables, credits, closeShop, shakeTrigger } =
    useGameEngineStore(
      useShallow((state) => ({
        jokers: state.jokers,
        consumables: state.consumables,
        closeShop: state.closeShop,
        shakeTrigger: state.shakeTrigger,
        credits: state.credits,

      })),
    );

  const animatedCredits = useAnimatedNumber({ val: credits });

  const goldControls = useAnimation();

  useEffect(() => {
    if (shakeTrigger > 0) {
      goldControls.start({
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        backgroundColor: ["rgba(0,0,0,0)", "#ff3333", "rgba(0,0,0,0)"],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }
  }, [goldControls, shakeTrigger]);

  return (
    <div className="space-y-2  overflow-y-auto  ">
      {/* Active Augments */}

      <motion.div
        animate={goldControls}
        className="place-self-start bg-mocha-mantle px-4 py-1.5 border border-mocha-yellow/50 rounded text-xs font-mono text-mocha-yellow font-bold tracking-widest "
      >
        <Coins className="w-3.5 h-3.5 inline-block" /> CREDITS: $
        <motion.span>{animatedCredits}</motion.span>
      </motion.div>

      <div className="border border-mocha-surface1 bg-mocha-base/40 p-5 rounded space-y-4 font-mono text-xs flex-none">
        <h3 className="font-bold text-mocha-yellow tracking-wider uppercase border-b border-mocha-surface1 pb-2">
          [ ACTIVE AUGMENTS ]
        </h3>

        {jokers.length === 0 ? (
          <p className="text-mocha-overlay1 text-[10px] uppercase tracking-widest">
            No active augments
          </p>
        ) : (
          <div className="">
            {jokers.map((joker) => (
              <div
                key={joker.id}
                title={joker.description}
                className="w-full flex items-center justify-between p-2.5 border border-mocha-surface1 bg-mocha-mantle rounded hover:border-mocha-sky/50 transition-colors group text-left cursor-help"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {joker.icon}
                  </span>
                  <span className="text-xs text-mocha-subtext1 group-hover:text-mocha-sky transition-colors hidden xl:inline-block">
                    {joker.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consumables (Hacks) */}
      <div className="border border-mocha-surface1 bg-mocha-base/40 p-5 rounded flex flex-col font-mono text-xs flex-none">
        <h3 className="font-bold text-mocha-sky tracking-wider uppercase border-b border-mocha-surface1 pb-2 mb-4">
          [ HACKS INVENTORY ]
        </h3>

        {consumables.length === 0 ? (
          <p className="text-mocha-overlay1 text-[10px] uppercase tracking-widest">
            No hacks available
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {consumables.map((c) => (
              <div
                key={c.id}
                title={c.description}
                className="w-full flex items-center justify-between p-2.5 border border-mocha-surface1 bg-mocha-mantle rounded hover:border-mocha-sky/50 transition-colors group text-left cursor-help"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <span className="text-xs text-mocha-subtext1 group-hover:text-mocha-sky transition-colors hidden xl:inline-block">
                    {c.name}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-mocha-overlay2 bg-mocha-surface1 px-2 py-1 rounded border border-mocha-surface1">
                  x{c.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* EXIT BUTTON */}
      <div className="mt-6 flex-none">
        <button
          onClick={closeShop}
          className="w-full py-3 border border-mocha-red/50 text-mocha-red hover:bg-mocha-red/10 hover:text-mocha-red hover:border-mocha-red transition-all duration-300 font-mono tracking-widest text-xs font-bold uppercase rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
        >
          [ EXIT SYSTEM ]
        </button>
      </div>
    </div>
  );
};

export default Inventory;
