"use client";
import { Compass } from "lucide-react";
import TypeIt from "typeit-react";

const ShopOwner = () => {
  return (
    <aside className="border border-mocha-surface1 bg-mocha-base/70 p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-center gap-3 sm:min-w-56">
          <div className="flex size-14 shrink-0 items-center justify-center border border-mocha-yellow/50 bg-mocha-crust">
            <Compass className="size-6 text-mocha-yellow" aria-hidden="true" />
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-mocha-rosewater">
              Aurelius
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mocha-overlay1">
              Weaver of Shattered Shards
            </p>
          </div>
        </div>
        <div className="border-t border-mocha-surface1 pt-4 font-mono text-xs leading-6 text-mocha-subtext0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <TypeIt
            options={{
              speed: 25,
              waitUntilVisible: true,
            }}
          >
            Intellect is a fragile lantern, traveler, and the drafts of these
            archives blow cold. You will stumble. You will forget. The engines
            of recall wait in the shadows for your focus to fracture. My relics
            do not grant wisdom—they buy you moments. A second heartbeat. A
            frozen second. A glance in the mirror. Trade your coin, before the
            ink claims your final spark...
          </TypeIt>
        </div>
      </div>
    </aside>
  );
};

export default ShopOwner;
