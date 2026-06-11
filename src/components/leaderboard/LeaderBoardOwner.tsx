"use client";
import TypeIt from "typeit-react";

const LeaderBoardOwner = () => {
  return (
    <aside className="border-b py-5">
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-full border border-[#f0a500] bg-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.15)] overflow-hidden">
            <div className="text-[#f0a500] text-3xl">⚖️</div>
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm  font-mono font-bold text-red-800">Gideon</p>

            <p className="text-xs text-zinc-500 font-mono ">
              Arbiter of Recall
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
            Your name is a drop of ink on a vast ledger, traveler. Some names
            fade before the sun sets. Others are etched in gold. If you wish to
            rise above the dust of the forgotten, prove your focus in the runs.
            The ledger has no ears for excuses... only accuracy.
          </TypeIt>
        </div>
      </div>
    </aside>
  );
};

export default LeaderBoardOwner;
