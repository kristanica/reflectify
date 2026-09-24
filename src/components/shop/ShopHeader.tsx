import React from "react";

const ShopHeader = () => {
  return (
    <header className="border-b border-mocha-surface1 pb-5">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mocha-mauve">
          Relic exchange
        </p>
        <h1 className="mt-2 text-2xl font-black text-mocha-text sm:text-3xl">
          The Shop
        </h1>
        <p className="mt-2 text-sm leading-6 text-mocha-subtext0">
          Spend run currency on tools for the next encounter.
        </p>
      </div>
    </header>
  );
};

export default ShopHeader;
