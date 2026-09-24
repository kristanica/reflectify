import PixelSnow from "@/components/PixelSnow";
import MobileNavigation from "@/components/user/MobileNavigation";
import Navigation from "@/components/user/Navigation";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-mocha-crust">
      <PixelSnow
        color="#cba6f7"
        flakeSize={0.009}
        minFlakeSize={1.1}
        pixelResolution={380}
        speed={0.24}
        density={0.16}
        direction={180}
        brightness={0.62}
        depthFade={8}
        farPlane={16}
        gamma={0.4545}
        variant="square"
        maxFPS={30}
        className="pointer-events-none absolute inset-0 z-[-1]"
      />
      <div className="mx-auto flex h-dvh w-full max-w-360 overflow-hidden border-x border-border  ">
        <Navigation />

        <main className="min-w-0 flex-1 overflow-hidden pb-20 md:pb-0">
          {children}
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}
