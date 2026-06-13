import PixelBackground from "@/components/background/PixelBackground";
import Navigation from "@/components/user/Navigation";
import React, { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="hidden md:block">
        {/* <PixelBackground></PixelBackground> */}
      </div>

      <main className="relative z-99  h-screen w-full md:w-3xl lg:w-5xl bg-black mx-auto border-l border-r ">
        <Navigation></Navigation>
        <div className="flex">{children}</div>
      </main>
    </div>
  );
}
