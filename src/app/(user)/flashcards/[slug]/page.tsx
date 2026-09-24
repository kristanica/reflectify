"use server";

import FlashCardSetCard from "@/components/decks/FlashCardSetCard";
import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
};

const MAX_ITEM_PER_PAGE = 4;

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug }, { page }, user] = await Promise.all([
    params,
    searchParams,
    getServerSession(authOptions),
  ]);

  const [sets, totalSets] = await Promise.all([
    prisma.gameSession.findMany({
      where: {
        deckId: slug,
        userId: user?.user.id,
        flashCards: {
          some: {},
        },
      },

      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        flashCards: true,
        title: true,
        deck: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        startedAt: "desc",
      },
      skip: (Number(page) - 1) * MAX_ITEM_PER_PAGE,
      take: MAX_ITEM_PER_PAGE,
    }),
    prisma.gameSession.count({
      where: {
        deckId: slug,
        userId: user?.user.id,
        flashCards: {
          some: {},
        },
      },
    }),
  ]);
  if (!slug) {
    notFound();
  }

  const totalPages = Math.ceil(totalSets / MAX_ITEM_PER_PAGE);

  if (sets.length === 0) {
    return (
      <div className="flex h-full min-h-80 w-full flex-col items-center justify-center border border-dashed border-mocha-surface1 bg-mocha-base/30 px-5 py-20 text-center font-mono">
        <BookOpen className="w-8 h-8 mb-4 text-mocha-overlay1" />
        <h3 className="text-sm font-bold text-mocha-text uppercase">
          No Flash Card sets Found {slug}
        </h3>
        <p className="mb-6 text-xs text-mocha-overlay1 max-w-sm mt-2 leading-relaxed">
          Your archives are empty.
        </p>
        <Link
          href="/decks"
          className="border border-mocha-surface2 hover:border-mocha-text text-mocha-overlay2 hover:text-mocha-text px-4 py-2 text-xs transition-colors"
        >
          Go to Archive
        </Link>
      </div>
    );
  }

  return (
    <section className="h-full w-full overflow-y-auto bg-background text-mocha-text">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <header className="border-b border-mocha-surface1 pb-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mocha-mauve">
            Session memory
          </p>
          <h1 className="mt-2 text-2xl font-black text-mocha-text sm:text-3xl">
            {sets[0].deck.title}
          </h1>
          <p className="mt-2 text-sm text-mocha-subtext0">
            Flashcard sets saved from completed runs.
          </p>
        </header>

      <article className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sets.map((set) => (
          <div key={set.id}>
            <FlashCardSetCard
              slug={slug}
              id={set.id}
              title={set.title}
              endedAt={set.endedAt}
              startedAt={set.startedAt}
            ></FlashCardSetCard>
          </div>
        ))}
      </article>

      <div className="flex items-center justify-between pt-4 border-t border-mocha-surface2 font-mono text-xs text-mocha-overlay2">
        <span>
          PAGE {page} of {totalPages}
        </span>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/decks?page=${Number(page) - 1}`}
            className={`flex min-h-10 items-center border border-mocha-surface1 px-3 py-1.5 uppercase ${Number(page) > 1 ? "transition-colors hover:border-mocha-overlay1 hover:text-mocha-text" : "pointer-events-none cursor-not-allowed opacity-40"}`}
          >
            PREV
          </Link>

          <Link
            href={`/decks?page=${Number(page) + 1}`}
            className={`flex min-h-10 items-center border border-mocha-surface1 px-3 py-1.5 uppercase ${Number(page) < totalPages ? "transition-colors hover:border-mocha-overlay1 hover:text-mocha-text" : "pointer-events-none cursor-not-allowed opacity-40"}`}
          >
            NEXT
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
