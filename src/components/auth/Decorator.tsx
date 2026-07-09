"use client";

import { BrainCircuit, Layers3, Trophy } from "lucide-react";

import { ReflectifyLogo } from "../ReflectifyLogo";
import PixelSnow from "../PixelSnow";
import { Label } from "../ui/label";

const signalItems = [
  { icon: BrainCircuit, label: "AI concept extraction" },
  { icon: Layers3, label: "JIT question queue" },
  { icon: Trophy, label: "Run rewards and mastery" },
];

const Decorator = () => {
  return (
    <>
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
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(203,166,247,0.2),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(137,180,250,0.12),transparent_30%),linear-gradient(180deg,transparent,rgba(17,17,27,0.75))]" />

      <div className="absolute flex max-w-lg flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex size-24 items-center justify-center border border-mocha-mauve/40 bg-mocha-crust/70 shadow-[0_0_30px_rgba(203,166,247,0.14)]">
          <ReflectifyLogo className="size-16" />
        </div>

        <div className="space-y-3">
          <Label className="text-4xl font-black uppercase tracking-[0.24em] text-mocha-rosewater">
          Reflectify
          </Label>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-mocha-subtext0">
            An AI-powered study roguelike. Ingest a seed, enter the run, and
            survive questions forged from your own material.
          </p>
        </div>

        <div className="grid w-full max-w-md gap-2">
          {signalItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border border-mocha-surface1 bg-mocha-crust/70 px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.12em] text-mocha-subtext0"
              >
                <Icon className="size-4 text-mocha-lavender" aria-hidden="true" />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Decorator;
