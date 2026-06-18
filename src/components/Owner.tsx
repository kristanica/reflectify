import React from "react";
import TypeIt from "typeit-react";

const Header = ({ icon, ownerName, onwerDescription, quote }: Owner) => {
  return (
    <aside className="border-b py-5">
      <div className="grid grid-cols-3 place-items-center">
        <div className="flex items-center flex-col space-y-2">
          <div className="relative w-20 h-20 rounded-full border border-[#f0a500] bg-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(240,165,0,0.15)] overflow-hidden">
            <div className="text-[#f0a500] text-3xl">{icon}</div>
          </div>

          <div className="flex items-center flex-col">
            <p className="text-sm  font-mono font-bold text-red-800">
              {ownerName}
            </p>

            <p className="text-xs text-zinc-500 font-mono ">
              {onwerDescription}
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
            {quote}{" "}
          </TypeIt>
        </div>
      </div>
    </aside>
  );
};

export default Header;
