import Balatro from "@/components/Balatro";
import Navigation from "@/components/landingPage/Navigation";
import PixelSnow from "@/components/PixelSnow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="relative h-screen bg-background overflow-hidden flex flex-col">
      <div className="relative z-99">
        <Navigation></Navigation>
      </div>

      <div className="absolute inset-0  w-full h-full">
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
        />
      </div>

      <section className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="flex items-center flex-col gap-4 text-center max-w-xl">
          <Label className="text-foreground text-4xl font-bold tracking-wider">
            CONQUER YOUR STUDIES
          </Label>
          <p className="text-xs text-white dark:text-white/40">
            An AI-powered study roguelike. Generate card decks, battle quizzes,
            earn gold, and level up your mind
          </p>
          <Button className="w-[50%] ">Start</Button>
        </div>
      </section>
    </main>
  );
}
