import Link from "next/link";
import { ArrowRight, Crosshair, Layers3 } from "lucide-react";

import { ReflectifyLogo } from "../ReflectifyLogo";

const navOptions = [
  { name: "Signal", route: "#hero", icon: Crosshair },
  { name: "Engine", route: "#features", icon: Layers3 },
];

const Navigation = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 lg:px-10">
      <nav
        aria-label="Landing navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 border border-mocha-surface1/80 bg-mocha-crust/88 px-3 shadow-2xl shadow-black/25 backdrop-blur-md sm:px-4"
      >
        <Link
          href="#hero"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Reflectify home"
        >
          <span className="flex size-11 shrink-0 items-center justify-center border border-mocha-mauve/40 bg-mocha-base shadow-[0_0_18px_rgba(203,166,247,0.12)] transition-colors duration-300 group-hover:border-mocha-lavender">
            <ReflectifyLogo className="size-8" />
          </span>

          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="text-sm font-black uppercase tracking-[0.22em] text-mocha-rosewater">
              Reflectify
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-mocha-overlay1">
              Study roguelike
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 border border-mocha-surface1 bg-mocha-base/70 p-1 md:flex">
          {navOptions.map((nav) => {
            const Icon = nav.icon;

            return (
              <Link
                href={nav.route}
                key={nav.name}
                className="group flex h-10 items-center gap-2 px-4 text-xs font-bold uppercase tracking-[0.16em] text-mocha-subtext0 transition-colors duration-300 hover:bg-mocha-surface0 hover:text-mocha-lavender"
              >
                <Icon
                  className="size-4 text-mocha-overlay1 transition-colors duration-300 group-hover:text-mocha-sky"
                  aria-hidden="true"
                />
                {nav.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="#features"
            className="hidden h-11 items-center px-3 text-xs font-bold uppercase tracking-[0.16em] text-mocha-overlay1 transition-colors duration-300 hover:text-mocha-lavender sm:flex md:hidden"
          >
            Engine
          </Link>

          <Link
            href="/login"
            className="group inline-flex h-11 items-center justify-center gap-2 border border-mocha-mauve bg-mocha-mauve px-4 text-xs font-black uppercase tracking-[0.14em] text-mocha-crust transition-colors duration-300 hover:bg-mocha-lavender sm:px-5"
          >
            <span>Login</span>
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
