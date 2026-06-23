"use client";

import { navItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    pathname !== "/run" && (
      <nav className="md:hidden min-h-[10%] absolute left-1/2 -translate-x-1/2 bottom-0 py-5  w-full flex items-center justify-center dark:bg-black border-t">
        <ul className="flex flex-row gap-2  text-[12px] text-foreground/70 uppercase">
          {navItems.map((item, index) => {
            const activeUrl =
              pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link key={index} href={item.href}>
                <li
                  className={`flex flex-row px-3 py-1  items-center justify-center transition-all hover:text-white ${
                    activeUrl ? "text-[#f0a500] font-bold " : "text-white"
                  }`}
                >
                  <item.icon></item.icon>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    )
  );
};

export default MobileNavigation;
