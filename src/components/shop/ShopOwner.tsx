"use client";
import { ReflectifyLogo } from "../ReflectifyLogo";
import TypeIt from "typeit-react";

const ShopOwner = () => {
  return (
    <aside className="border-b py-5">
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-full border border-[#f0a500] bg-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.15)] overflow-hidden">
            <div className="text-[#f0a500] text-3xl">🧭</div>
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm  font-mono font-bold text-red-800">
              Aurelius
            </p>

            <p className="text-xs text-zinc-500 font-mono ">
              Weaver of the Shattered Shards{" "}
            </p>
          </div>
        </div>
        <div className="col-span-2 text-xs text-zinc-500 font-mono mt-1 text-left">
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
