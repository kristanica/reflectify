"use client";

import { AUGMENTS, CONSUMABLE_DATABASE } from "@/lib/mockData";
import BlackMarketOwner from "./BlackMarketOwner";
import Header from "@/components/Header";
import Augments from "./Augments";
import Consumables from "./Consumables";
import Inventory from "./Inventory";

const BlackMarket = () => {
  return (
    <div className="text-mocha-text h-full w-full flex flex-col flex-1 px-6 py-6 max-w-7xl mx-auto space-y-6 overflow-hidden">
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
      <section className="grid grid-cols-3   w-full space-x-3">
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
