"use client";

import { navItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    pathname !== "/run" && (
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
        aria-label="Primary navigation"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          {navItems.map((item) => {
            const activeUrl =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={activeUrl ? "page" : undefined}
                  className={`flex min-h-12 flex-col items-center justify-center gap-1 border-t-2 px-1 py-1.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeUrl
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-5" aria-hidden="true" />
                  <span className="max-w-full truncate">
                    {item.name === "Archives (Seeds)"
                      ? "Archives"
                      : item.name === "Player Profile"
                        ? "Profile"
                        : item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
};

export default MobileNavigation;
