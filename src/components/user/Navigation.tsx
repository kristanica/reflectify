"use client";

import { BookOpen, Shield, Sparkles, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navigation = () => {
  const pathname = usePathname();

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
          {navItems.map((item, index) => {
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
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
