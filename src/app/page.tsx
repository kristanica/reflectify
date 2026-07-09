import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  DatabaseZap,
  FileUp,
  FlaskConical,
  ScrollText,
  ShieldAlert,
  Swords,
  Trophy,
  WandSparkles,
  Waypoints,
  Zap,
} from "lucide-react";

import Navigation from "@/components/landingPage/Navigation";
import PixelSnow from "@/components/PixelSnow";
import { ReflectifyLogo } from "@/components/ReflectifyLogo";
import { Button } from "@/components/ui/button";

const runStats = [
  { label: "Question depth", value: "24", tone: "text-mocha-mauve" },
  { label: "Queued encounters", value: "09", tone: "text-mocha-sky" },
  { label: "Credits earned", value: "168", tone: "text-mocha-green" },
];

const runMeters = [
  {
    label: "Concept mastery",
    value: "Adaptive",
    width: "w-[72%]",
    color: "bg-mocha-mauve",
  },
  {
    label: "JIT queue",
    value: "Refilling",
    width: "w-[86%]",
    color: "bg-mocha-sky",
  },
  {
    label: "Boss threat",
    value: "Synthesis",
    width: "w-[58%]",
    color: "bg-mocha-red",
  },
];

const loopSteps = [
  {
    icon: FileUp,
    title: "Ingest a seed",
    copy: "Upload a PDF or describe a topic. Reflectify strips away noise and turns the source into standalone concept facts.",
  },
  {
    icon: DatabaseZap,
    title: "Build the queue",
    copy: "The run engine pulls concepts just in time and asks the AI to forge questions for the current depth.",
  },
  {
    icon: Swords,
    title: "Survive the run",
    copy: "Answer, earn credits, lose lives, stack augments, and push until the board forces a harder encounter.",
  },
  {
    icon: ShieldAlert,
    title: "Face the boss",
    copy: "Every cycle can produce a synthesis question that combines multiple concepts before the next shop window.",
  },
];

const systems = [
  {
    icon: BrainCircuit,
    title: "Atomic concept extraction",
    copy: "Concepts are saved as testable facts so future questions can stay fair without needing hidden context.",
  },
  {
    icon: Zap,
    title: "Just-in-time generation",
    copy: "Questions are generated in batches while the player keeps moving through the active queue.",
  },
  {
    icon: Waypoints,
    title: "Depth-based escalation",
    copy: "The run decides when to move from recall to inversion, scenarios, and confusing combinations.",
  },
  {
    icon: FlaskConical,
    title: "Roguelike economy",
    copy: "Correct answers feed XP, credits, streaks, shop choices, and build-defining augments.",
  },
];

const principles = [
  "The source shapes the map; the run shapes the danger.",
  "Difficulty scaling belongs to gameplay, not the ingest form.",
  "Questions must be answerable from stored concepts, not model guesswork.",
];

export default function Home() {
  return (
    <main className="dark min-h-screen overflow-hidden bg-mocha-crust text-mocha-text">
      <Navigation />

      <section
        id="hero"
        className="relative flex min-h-[94svh] items-center overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(203,166,247,0.2),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(137,220,235,0.12),transparent_24%),linear-gradient(180deg,rgba(17,17,27,0.18),var(--mocha-crust)_92%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.84fr)]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-mocha-mauve/30 bg-mocha-mauve/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-mocha-lavender">
              <WandSparkles className="size-4" aria-hidden="true" />
              Seed-driven study roguelike
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-mocha-text sm:text-6xl lg:text-7xl">
              Reflectify turns notes into runs you have to survive.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-mocha-subtext0 sm:text-lg">
              Ingest a file or topic, extract atomic concepts, and enter an
              AI-generated quiz run where depth, bosses, shop choices, XP, and
              credits decide how hard the next encounter becomes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 border-mocha-mauve bg-mocha-mauve px-5 font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust hover:bg-mocha-lavender"
              >
                <Link href="/login">
                  Enter the archive
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-mocha-surface2 bg-mocha-base/70 px-5 font-mono text-xs uppercase tracking-[0.14em] text-mocha-subtext0 hover:bg-mocha-surface0 hover:text-mocha-text"
              >
                <Link href="#systems">Inspect the engine</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {runStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-mocha-surface1 bg-mocha-base/70 p-4 font-mono"
                >
                  <p className={`text-2xl font-black ${stat.tone}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-mocha-overlay1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute inset-5 border border-mocha-mauve/20 bg-mocha-base/45" />
            <div className="relative border border-mocha-surface2 bg-mocha-crust/90 p-4 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-mocha-surface1 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center border border-mocha-mauve/35 bg-mocha-base">
                    <ReflectifyLogo className="size-9" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-mocha-rosewater">
                      Active run
                    </p>
                    <p className="text-xs text-mocha-overlay2">
                      Seed: Chemistry Unit 2
                    </p>
                  </div>
                </div>
                <div className="border border-mocha-teal/30 bg-mocha-teal/10 px-2 py-1 font-mono text-xs font-semibold text-mocha-teal">
                  LIVE
                </div>
              </div>

              <div className="grid gap-3 py-4">
                {runMeters.map((meter) => (
                  <div key={meter.label}>
                    <div className="mb-2 flex items-center justify-between font-mono text-xs">
                      <span className="font-semibold text-mocha-text">
                        {meter.label}
                      </span>
                      <span className="text-mocha-subtext0">{meter.value}</span>
                    </div>
                    <div className="h-2 bg-mocha-surface0">
                      <div className={`h-full ${meter.width} ${meter.color}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-mocha-surface1 bg-mocha-base p-4">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-mocha-sky">
                  <ShieldAlert className="size-4" aria-hidden="true" />
                  Boss synthesis incoming
                </div>
                <p className="text-sm leading-6 text-mocha-text">
                  A learner understands neutralization, pH scale direction, and
                  conjugate pairs. Which result follows when the reaction path
                  is pushed toward excess base?
                </p>
                <div className="mt-4 grid gap-2">
                  {[
                    ["Recall one definition", false],
                    ["Apply all linked facts", true],
                    ["Guess from outside context", false],
                  ].map(([answer, isCorrect]) => (
                    <div
                      key={String(answer)}
                      className={`border px-3 py-2 font-mono text-xs ${
                        isCorrect
                          ? "border-mocha-mauve bg-mocha-mauve/10 text-mocha-lavender"
                          : "border-mocha-surface1 text-mocha-overlay2"
                      }`}
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-mocha-surface1 bg-mocha-mantle px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {loopSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="border border-mocha-surface1 bg-mocha-base p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Icon
                    className="size-6 text-mocha-lavender"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs font-semibold text-mocha-overlay1">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-mocha-text">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-mocha-subtext0">
                  {step.copy}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="systems"
        className="bg-mocha-crust px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-mocha-mauve">
              The engine
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-mocha-text sm:text-4xl">
              Built around runs, not static flashcards.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mocha-subtext0">
              Reflectify keeps the source interpretation separate from the
              roguelike pressure system. The seed defines the map; the run
              decides the danger.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="border border-mocha-surface1 bg-mocha-base p-5"
                >
                  <Icon className="size-7 text-mocha-sky" aria-hidden="true" />
                  <h3 className="mt-5 text-base font-bold text-mocha-text">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-mocha-subtext0">
                    {feature.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-mocha-surface1 bg-mocha-mantle px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2 text-mocha-teal">
              <ScrollText className="size-5" aria-hidden="true" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Design rule
              </span>
            </div>
            <h2 className="text-2xl font-black text-mocha-text sm:text-3xl">
              Ingest improves the seed. Gameplay controls the trial.
            </h2>
            <p className="mt-3 text-sm leading-7 text-mocha-subtext0">
              That separation is what keeps Reflectify roguelike. A player can
              clarify the source material, but the run owns difficulty, format,
              bosses, and rewards.
            </p>
          </div>

          <div className="grid gap-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="flex items-start gap-3 border border-mocha-surface1 bg-mocha-base p-4"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-mocha-green"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-mocha-subtext0">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mocha-crust px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border border-mocha-surface1 bg-mocha-base p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-mocha-rosewater">
              <Trophy className="size-5" aria-hidden="true" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Ready when you are
              </span>
            </div>
            <h2 className="text-2xl font-black text-mocha-text sm:text-3xl">
              Bring a seed. Let the run decide how deep you go.
            </h2>
            <p className="mt-3 text-sm leading-6 text-mocha-subtext0">
              Start with your next chapter, a dense PDF, or the topic that
              refuses to stay learned.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 w-full border-mocha-mauve bg-mocha-mauve px-5 font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust hover:bg-mocha-lavender sm:w-auto"
          >
            <Link href="/login">
              Log in and play
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
