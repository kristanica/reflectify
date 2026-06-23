import PixelBackground from "@/components/background/PixelBackground";
import MobileNavigation from "@/components/user/MobileNavigation";
import Navigation from "@/components/user/Navigation";
import React, { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="hidden md:block">
        {/* <PixelBackground></PixelBackground> */}
      </div>

      <main className="relative z-99  h-screen w-full md:w-3xl lg:w-6xl flex flex-col bg-black m-auto border-l border-r ">
        <Navigation></Navigation>
        <div className="md:flex  md:flex-1 min-h-[90%] overflow-y-hidden">
          {children}
        </div>

        <MobileNavigation></MobileNavigation>
      </main>
    </div>
  );
}
