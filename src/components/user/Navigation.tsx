"use client";

import { BookOpen, Shield, Sparkles, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function Modal({ onToggle }: { onToggle: () => void }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="border w-[90%] sm:w-[50%] max-w-md border-zinc-800 bg-zinc-950/90 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors shadow-2xl">
        <header className="border-b border-zinc-800 pb-3 text-[12px] text-zinc-500 uppercase tracking-wider">
          System Warning
        </header>

        <div className="text-zinc-300 text-sm leading-relaxed">
          Are you sure you want to abandon this run?
          <br />
          <span className="text-red-400/80 mt-2 block">
            All unsaved progress and active streaks will be lost.
          </span>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            className="px-4 py-2 text-zinc-400 hover:text-zinc-100 transition-colors uppercase tracking-widest"
            onClick={onToggle}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onToggle();
              router.push("/decks");
            }}
            className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40 hover:border-red-800 rounded transition-all uppercase tracking-widest"
          >
            Abandon Run
          </button>
        </div>
      </div>
    </div>
  );
}

const Navigation = () => {
  const pathname = usePathname();

  const toggleExit = () => {
    setConfirmExit((prev) => !prev);
  };

  const [confirmExit, setConfirmExit] = useState<boolean>(false);
  const navItems = [
    { name: "Keep", href: "/dashboard", icon: Shield },
    { name: "Archives (Seeds)", href: "/decks", icon: BookOpen },
    { name: "Shop", href: "/shop", icon: Sparkles },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Player Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="flex inset-0 flex-row justify-between border-b py-2 px-7 w-full">
      <div>
        <p className="text-foreground font-bold tracking-widest">REFLECTIFY</p>
      </div>

      <nav>
        <ul className="flex flex-row gap-2  text-[12px] text-foreground/70 uppercase">
          {pathname === "/run" ? (
            <li
              className="flex flex-row px-3 py-1 border-x border-zinc-800 items-center justify-center transition-all hover:text-white 
                    
                       text-zinc-400"
            >
              <button onClick={toggleExit}>Exit</button>
            </li>
          ) : (
            navItems.map((item, index) => {
              const activeUrl =
                pathname === item.href || pathname.startsWith(item.href);

              return (
                <Link key={index} href={item.href}>
                  <li
                    className={`flex flex-row px-3 py-1 border-x border-zinc-800 items-center justify-center transition-all hover:text-white ${
                      activeUrl
                        ? "text-[#f0a500] font-bold border-[#f0a500]"
                        : "text-zinc-400"
                    }`}
                  >
                    <p>{item.name}</p>
                  </li>
                </Link>
              );
            })
          )}

          {confirmExit && <Modal onToggle={toggleExit}></Modal>}
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
