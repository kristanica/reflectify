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
        className="place-self-start border border-mocha-yellow/50 bg-mocha-mantle px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-mocha-yellow"
      >
        <Coins className="w-3.5 h-3.5 inline-block" /> CREDITS: $
        <motion.span>{animatedCredits}</motion.span>
      </motion.div>

      <div className="flex-none space-y-4 border border-mocha-surface1 bg-mocha-base/40 p-5 font-mono text-xs">
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
                className="group flex w-full cursor-help items-center justify-between border border-mocha-surface1 bg-mocha-mantle p-2.5 text-left transition-colors hover:border-mocha-sky/50"
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
      <div className="flex flex-none flex-col border border-mocha-surface1 bg-mocha-base/40 p-5 font-mono text-xs">
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
                className="group flex w-full cursor-help items-center justify-between border border-mocha-surface1 bg-mocha-mantle p-2.5 text-left transition-colors hover:border-mocha-sky/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <span className="text-xs text-mocha-subtext1 group-hover:text-mocha-sky transition-colors hidden xl:inline-block">
                    {c.name}
                  </span>
                </div>
                <span className="border border-mocha-surface1 bg-mocha-surface1 px-2 py-1 text-[10px] font-bold text-mocha-overlay2">
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
          className="min-h-12 w-full border border-mocha-red/50 py-3 font-mono text-xs font-bold uppercase tracking-widest text-mocha-red transition-colors duration-300 hover:border-mocha-red hover:bg-mocha-red/10 hover:text-mocha-red"
        >
          [ EXIT SYSTEM ]
        </button>
      </div>
    </div>
  );
};

export default Inventory;
