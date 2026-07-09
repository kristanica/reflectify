"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "../run/ExitRunModal";
import { navItems } from "@/lib/constants";

const Navigation = () => {
  const pathname = usePathname();

  const toggleExit = () => {
    setConfirmExit((prev) => !prev);
  };

  const [confirmExit, setConfirmExit] = useState<boolean>(false);

  return (
    <aside className="w-full md:flex md:items-center md:justify-between my-1 px-7 border-b py-2">
      <div className="hidden md:block ">
        <p className="text-foreground font-bold tracking-widest">REFLECTIFY</p>
      </div>

      <nav className="hidden md:block">
        <ul className="flex flex-row gap-2  text-[12px] text-foreground/70 uppercase">
          {pathname === "/run" ? (
            <li className="flex flex-row px-3 py-1 border-x border-mocha-surface1 items-center justify-center transition-all hover:text-mocha-text text-mocha-overlay2">
              <button onClick={toggleExit}>Exit</button>
            </li>
          ) : (
            navItems.map((item, index) => {
              const activeUrl =
                pathname === item.href || pathname.startsWith(item.href);

              return (
                <Link key={index} href={item.href}>
                  <li
                    className={`flex flex-row px-3 py-1   items-center justify-center transition-all hover:text-white ${
                      activeUrl
                        ? "text-primary font-bold border-primary  "
                        : "text-foreground border-muted "
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
