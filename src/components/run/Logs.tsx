import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

const Logs = () => {
  const logs = useGameEngineStore((state) => state.logs);

  return (
    <>
      <h2 className="text-sm font-bold font-mono tracking-widest mb-2 text-mocha-yellow uppercase">
        [ LOGS RUN ]
      </h2>

      <div className="h-full w-full border-mocha-surface1 border mt-2 bg-mocha-base/20 py-2 px-3 overflow-y-auto text-xs flex flex-col">
        {[...logs].reverse().map((item, index) => {
          return (
            <p key={index} className="text-mocha-overlay1 mb-1">
              {item}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Logs;
