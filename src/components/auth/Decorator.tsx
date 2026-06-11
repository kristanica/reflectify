"use client";

import PixelSnow from "../PixelSnow";
import { Label } from "../ui/label";

const Decorator = () => {
  return (
    <>
      <PixelSnow
        color="#ffffff"
        flakeSize={0.009}
        minFlakeSize={1.25}
        pixelResolution={500}
        speed={0.3}
        density={0.15}
        direction={180}
        brightness={0.6}
        depthFade={7}
        farPlane={15}
        gamma={0.4545}
        variant="square"
      ></PixelSnow>
      <div className="flex absolute items-center justify-center gap-3 max-w-lg text-center flex-col p-8">
        <Label className=" text-4xl uppercase font-black tracking-widest text-amber-500">
          Reflectify
        </Label>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
          An AI-powered roguelike study companion. Complete daily quizzes,
          conquer custom decks, and power up your academic journey.
        </p>
      </div>
    </>
  );
};

export default Decorator;
