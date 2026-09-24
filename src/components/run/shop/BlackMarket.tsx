"use client";

import BlackMarketOwner from "./BlackMarketOwner";
import Header from "@/components/Header";
import Augments from "./Augments";
import Consumables from "./Consumables";
import Inventory from "./Inventory";

const BlackMarket = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col space-y-5 overflow-y-auto p-4 text-mocha-text sm:p-6">
      {/* Header Block */}
      <div className="border-b border-mocha-surface1 pb-4 flex-none">
        <Header
          title="[ THE BLACK MARKET ]"
          description="Intellect is a fragile lantern, traveler, and the drafts of these archives blow cold."
        />
        <div className="mt-2">
          <BlackMarketOwner />
        </div>
      </div>

      {/* Main Layout Grid */}
      <section className="grid w-full gap-3 lg:grid-cols-3">
        <Augments></Augments>
        <Consumables></Consumables>
        <Inventory></Inventory>
      </section>
    </div>
  );
};

export default BlackMarket;
{
  /* RIGHT COLUMN: Inventory & Exit (1/4 Width) */
}
