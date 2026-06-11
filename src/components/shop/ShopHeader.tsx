import React from "react";

const ShopHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
      <div>
        <h2 className="text-xl font-bold font-mono tracking-widest text-[#f0a500] uppercase">
          [ THE SHOP ]
        </h2>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          INGESTED MATERIAL & PROCEDURAL RUN SEEDS
        </p>
      </div>
    </header>
  );
};

export default ShopHeader;
