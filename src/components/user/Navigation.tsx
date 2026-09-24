"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "../run/ExitRunModal";
import { navItems } from "@/lib/constants";
import { LogOut, Sparkles } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();

  const toggleExit = () => {
    setConfirmExit((prev) => !prev);
  };

  const [confirmExit, setConfirmExit] = useState<boolean>(false);

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="border-b border-border px-5 py-5">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-10 items-center justify-center border border-primary/40 bg-background text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-[0.16em] text-foreground">
              REFLECTIFY
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Study roguelike
            </span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5" aria-label="Primary navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Expedition
        </p>
        <ul className="space-y-1">
          {pathname === "/run" ? (
            <li>
              <button
                type="button"
                onClick={toggleExit}
                className="flex min-h-11 w-full items-center gap-3 border border-destructive/30 px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Exit current run
              </button>
            </li>
          ) : (
            navItems.map((item) => {
              const activeUrl =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={activeUrl ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeUrl
                        ? "border-primary/45 bg-primary/10 text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="size-[18px]" aria-hidden="true" />
                    <span>{item.name}</span>
                    {activeUrl && (
                      <span
                        className="ml-auto h-4 w-0.5 bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>

      <div className="border-t border-border px-5 py-4 text-[10px] leading-relaxed text-muted-foreground">
        <span className="font-mono uppercase tracking-[0.16em] text-mocha-yellow">
          Archive online
        </span>
        <p className="mt-1">Every run strengthens the map.</p>
      </div>

      {confirmExit && <Modal onToggle={toggleExit} />}
    </aside>
  );
};

export default Navigation;
