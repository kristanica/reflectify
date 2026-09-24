// app/(app)/dashboard/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Coins,
  Flame,
  Play,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import prisma from "@/lib/prisma";
import checkSession from "@/lib/checkSession";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { calculateXpForLevel } from "@/lib/progressionUtils";
import HeatMap from "@/components/dashboard/HeatMap";

export default async function DashboardPage() {
  const session = await checkSession();
  if (session instanceof NextResponse) {
    redirect("/api/auth/signin");
  }

  const [userStat, decks, globalStats, heatMap] = await Promise.all([
    prisma.user.findFirstOrThrow({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        xp: true,
        currency: true,
        level: true,
      },
    }),

    prisma.deck.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),

    prisma.gameSession.aggregate({
      where: { userId: session.user.id },
      _count: { id: true },
      _sum: { correctCount: true, incorrectCount: true },
    }),

    prisma.gameSession.findMany({
      where: {
        userId: session.user.id,
        startedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      select: {
        startedAt: true,
      },
    }),
  ]);

  const totalQuestions =
    (globalStats._sum.correctCount || 0) +
    (globalStats._sum.incorrectCount || 0);
  const globalAccuracy =
    totalQuestions > 0
      ? Math.round(
          ((globalStats._sum.correctCount || 0) / totalQuestions) * 100,
        )
      : 0;

  const currentLevelXp = calculateXpForLevel(userStat.level);
  const nextLevelXp = calculateXpForLevel(userStat.level + 1);
  const xpInCurrentLevel = Math.max(0, userStat.xp - currentLevelXp);
  const xpRequiredForNextLevel = nextLevelXp - currentLevelXp;
  const progressPercentage = Math.min(
    100,
    (xpInCurrentLevel / xpRequiredForNextLevel) * 100,
  );
  const primaryDeck = decks[0];

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha-yellow">
              <Shield className="size-3.5" aria-hidden="true" />
              The Keep
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Your next expedition is ready.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Resume a study seed, forge a new one, or review your recent
              progress.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-mocha-surface1 bg-mocha-base/70 px-3 py-2 font-mono text-xs text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Archive synchronized
          </div>
        </header>

        <section
          aria-labelledby="next-action-heading"
          className="relative overflow-hidden border border-mocha-mauve/35 bg-mocha-base/70 p-5 sm:p-7"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-mocha-mauve" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Next action
              </p>
              <h2
                id="next-action-heading"
                className="mt-3 text-xl font-semibold text-foreground sm:text-2xl"
              >
                {primaryDeck ? primaryDeck.title : "Create your first seed"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {primaryDeck
                  ? `Last mapped ${primaryDeck.createdAt.toDateString()}. Enter the seed setup to begin a new procedural run.`
                  : "Your archives are empty. Ingest a document or topic to generate concepts and unlock your first run."}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={primaryDeck ? `/decks/${primaryDeck.id}` : "/decks/ingest"}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-mocha-mauve bg-mocha-mauve px-4 py-2.5 font-mono text-xs font-black uppercase tracking-[0.14em] text-mocha-crust transition-colors hover:bg-mocha-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {primaryDeck ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Sparkles className="size-4" aria-hidden="true" />
                )}
                {primaryDeck ? "Start run" : "Create seed"}
              </Link>
              {primaryDeck && (
                <Link
                  href="/decks/ingest"
                  className="inline-flex min-h-11 items-center justify-center border border-mocha-surface2 bg-mocha-base/60 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-mocha-subtext0 transition-colors hover:bg-mocha-surface0 hover:text-mocha-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  New seed
                </Link>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="progress-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Player status
              </p>
              <h2 id="progress-heading" className="mt-1 text-base font-semibold">
                Progress at a glance
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {xpInCurrentLevel} / {xpRequiredForNextLevel} XP
            </span>
          </div>

          <div
            className="h-2 overflow-hidden bg-mocha-surface0"
            role="progressbar"
            aria-label={`Level ${userStat.level} experience progress`}
            aria-valuemin={0}
            aria-valuemax={xpRequiredForNextLevel}
            aria-valuenow={Math.round(xpInCurrentLevel)}
          >
            <div
              className="h-full bg-mocha-mauve transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Shield} label="Level" value={userStat.level} />
            <StatCard
              icon={Coins}
              label="Gold"
              value={userStat.currency}
              tone="text-mocha-yellow"
            />
            <StatCard
              icon={Flame}
              label="Streak"
              value="5 days"
              tone="text-mocha-red"
            />
            <StatCard
              icon={Target}
              label="Accuracy"
              value={`${globalAccuracy}%`}
              tone="text-mocha-green"
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <section
            aria-labelledby="seeds-heading"
            className="border border-mocha-surface1 bg-mocha-base/70 p-5 lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Current study seeds
                </p>
                <h2 id="seeds-heading" className="mt-1 text-base font-semibold">
                  Return to the archives
                </h2>
              </div>
              <Link
                href="/decks"
                className="inline-flex min-h-11 items-center gap-1.5 border border-transparent px-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View all
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-4 space-y-2">
              {decks.length === 0 ? (
                <div className="border border-dashed border-mocha-surface1 bg-mocha-crust/30 px-4 py-8 text-center">
                  <BookOpen className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium">No seeds mapped yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Create a seed to begin your first expedition.
                  </p>
                </div>
              ) : (
                decks.map((deck, index) => (
                  <Link
                    href={`/decks/${deck.id}`}
                    key={deck.id}
                    className="group flex min-h-16 items-center gap-3 border border-mocha-surface1 bg-mocha-crust/30 p-3 transition-colors hover:border-mocha-mauve/50 hover:bg-mocha-mauve/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center border border-mocha-surface1 bg-mocha-base text-muted-foreground group-hover:border-mocha-mauve/50 group-hover:text-primary">
                      <BookOpen className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {deck.title}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {index === 0 ? "Most recent" : "Archived"} · {deck.createdAt.toDateString()}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transform-none" aria-hidden="true" />
                  </Link>
                ))
              )}
            </div>
          </section>

          <section
            aria-labelledby="metrics-heading"
            className="border border-mocha-surface1 bg-mocha-base/70 p-5 lg:col-span-5"
          >
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-primary" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Run record
                </p>
                <h2 id="metrics-heading" className="mt-1 text-base font-semibold">
                  Expedition metrics
                </h2>
              </div>
            </div>

            <dl className="mt-5 divide-y divide-border/70">
              <MetricRow label="Total runs" value={globalStats._count.id} />
              <MetricRow label="Questions answered" value={totalQuestions} />
              <MetricRow label="Global accuracy" value={`${globalAccuracy}%`} />
            </dl>
          </section>

          <HeatMap sessions={heatMap} />
        </div>
      </div>
    </div>
  );
}

type IconComponent = React.ComponentType<{
  className?: string;
  "aria-hidden"?: React.AriaAttributes["aria-hidden"];
}>;

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "text-foreground",
}: {
  icon: IconComponent;
  label: string;
  value: string | number;
  tone?: string;
}) {
  return (
    <div className="border border-mocha-surface1 bg-mocha-base/70 p-3 sm:p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p className={`mt-2 text-lg font-semibold sm:text-xl ${tone}`}>{value}</p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-mono text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
