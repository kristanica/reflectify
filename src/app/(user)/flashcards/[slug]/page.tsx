"use server";

import { deleteFlashCardSet } from "@/actions/deleteFlashCardSet";
import { DeleteAction } from "@/components/decks/DeleteAction";
import FlashCardSetCard from "@/components/decks/FlashCardSetCard";
import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { durationFormat } from "@/lib/utils";
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
      <div className="flex flex-col flex-1 items-center justify-center rounded  bg-mocha-base/10 py-20 text-center font-mono">
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
    <section className="w-full flex flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      <p>
        Flashcards saves for deck:
        <span> {sets[0].deck.title}</span>
      </p>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className={`border border-mocha-surface1 px-3 py-1.5 rounded uppercase ${Number(page) > 1 ? "hover:border-mocha-overlay1 hover:text-mocha-text transition-colors" : "pointer-events-none cursor-not-allowed"}`}
          >
            PREV
          </Link>

          <Link
            href={`/decks?page=${Number(page) + 1}`}
            className={`border border-mocha-surface1 px-3 py-1.5 rounded uppercase ${Number(page) < totalPages ? "hover:border-mocha-overlay1 hover:text-mocha-text transition-colors" : "pointer-events-none cursor-not-allowed"}`}
          >
            NEXT
          </Link>
        </div>
      </div>
    </section>
  );
}
