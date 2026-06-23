import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

const Logs = () => {
  const logs = useGameEngineStore((state) => state.logs);

  return (
    <>
      <h2 className="text-sm font-bold font-mono tracking-widest mb-2 text-yellow-500 uppercase ">
        [ LOGS RUN ]
      </h2>

      <div className="h-full w-full  border-zinc-800 border mt-2 bg-zinc-950/20 py-2 px-3 overflow-y-auto text-xs flex  flex-col">
        {[...logs].reverse().map((item, index) => (
          <p key={index} className="text-zinc-500 mb-1">
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

export default Logs;
