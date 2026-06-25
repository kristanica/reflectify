"use client";

import { useGameEngineStore } from "@/store/useGameEngineStore";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const Toast = () => {
  const toasts = useGameEngineStore((state) => state.toasts);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => {
          const colors: Record<string, string> = {
            error:
              "border-mocha-red text-mocha-red bg-mocha-red/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
            itemused:
              "border-mocha-green text-mocha-green bg-mocha-green/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
            system:
              "border-mocha-yellow text-mocha-yellow bg-mocha-yellow/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
          };

          return (
            <motion.div
              key={toast.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -30,
                  scale: 0.9,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                },
                exit: {
                  opacity: 0,
                  y: -20,
                  scale: 0.9,
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`border-t-2 border-b-2 px-8 py-3 font-mono text-xs md:text-sm uppercase backdrop-blur-md min-w-75 text-center ${colors[toast.type]}`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="opacity-50">[{toast.type}]</span>
                <span className="leading-tight tracking-wider">
                  {toast.message}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
