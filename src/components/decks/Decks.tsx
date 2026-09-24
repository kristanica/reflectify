import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, FileText, Lightbulb } from "lucide-react";
import { DeleteAction } from "./DeleteAction";
import { deleteDeck } from "@/actions/deleteDeck";

const MAX_ITEM_PER_PAGE = 4;

export default async function Decks({ currentPage }: { currentPage: number }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/login");
  }

  const [decks, deckCount] = await Promise.all([
    prisma.deck.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        sourceType: true,
      },

      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * MAX_ITEM_PER_PAGE,
      take: MAX_ITEM_PER_PAGE,
    }),
    prisma.deck.count({
      where: { userId },
    }),
  ]);

  const totalPages = Math.ceil(deckCount / MAX_ITEM_PER_PAGE);

  if (decks.length === 0 && currentPage === 1) {
    return (
      <div className="flex min-h-80 w-full flex-col items-center justify-center border border-dashed border-mocha-surface1 bg-mocha-base/30 px-5 py-20 text-center font-mono">
        <BookOpen className="w-8 h-8 mb-4 text-mocha-overlay1" />
        <h3 className="text-sm font-bold text-mocha-text uppercase">
          No Seeds Found
        </h3>
        <p className="mb-6 text-xs text-mocha-overlay1 max-w-sm mt-2 leading-relaxed">
          Your archives are empty. Ingest text files or PDFs to procedurally
          compile study modules.
        </p>
        <Link
          href="/decks/ingest"
          className="border border-mocha-surface2 hover:border-mocha-text text-mocha-overlay2 hover:text-mocha-text px-4 py-2 text-xs transition-colors"
        >
          Go to Ingest Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col justify-between gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {decks.map((seed) => (
          <div
            key={seed.id}
            className="flex min-h-60 flex-col justify-between space-y-4 border border-mocha-surface1 bg-mocha-base/60 p-5 font-mono text-xs transition-colors hover:border-mocha-mauve/50"
          >
            {/* Seed Info Header */}
            <div className="space-y-2 relative">
              <DeleteAction
                onDeleteAction={deleteDeck.bind(null, seed.id)}
                title={seed.title}
              />
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-mocha-overlay1 uppercase tracking-wider">
                  {seed.sourceType === "FILE" ? (
                    <>
                      <FileText className="w-3 h-3 inline-block" /> DOCUMENT
                      SEED
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-3 h-3 inline-block" /> TOPIC SEED
                    </>
                  )}
                </span>
              </div>
              <h3 className="text-sm font-bold text-mocha-text tracking-wide">
                {seed.title}
              </h3>
            </div>

            {/* Run Metrics */}
            <div className="grid grid-cols-2 gap-2 border border-mocha-surface1 bg-mocha-crust/35 p-3 text-[10px]">
              <div>
                <span className="text-mocha-overlay1">CREATED AT:</span>
                <p className="text-mocha-subtext1 mt-0.5">
                  {seed.createdAt.toDateString()}
                </p>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex gap-2 pt-2 border-t border-mocha-surface2">
              <Link
                href={`/decks/${seed.id}`}
                className="flex min-h-10 flex-1 items-center justify-center border border-mocha-mauve bg-mocha-mauve px-3 py-2 text-center font-bold uppercase tracking-[0.12em] text-mocha-crust transition-colors hover:bg-mocha-lavender"
              >
                START RUN
              </Link>
              <Link
                href={`/flashcards/${seed.id}?page=1`}
                className="flex min-h-10 flex-1 items-center justify-center border border-mocha-surface1 px-3 py-2 text-center font-bold uppercase tracking-[0.12em] text-mocha-overlay2 transition-colors hover:border-mocha-text hover:bg-mocha-surface0 hover:text-mocha-text"
              >
                STUDY CARDS
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-mocha-surface2 font-mono text-xs text-mocha-overlay2">
        <span>
          PAGE {currentPage} of {totalPages}
        </span>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/decks?page=${currentPage - 1}`}
            className={`flex min-h-10 items-center border border-mocha-surface1 px-3 py-1.5 uppercase ${currentPage > 1 ? "transition-colors hover:border-mocha-overlay1 hover:text-mocha-text" : "pointer-events-none cursor-not-allowed opacity-40"}`}
          >
            PREV
          </Link>

          <Link
            href={`/decks?page=${currentPage + 1}`}
            className={`flex min-h-10 items-center border border-mocha-surface1 px-3 py-1.5 uppercase ${currentPage < totalPages ? "transition-colors hover:border-mocha-overlay1 hover:text-mocha-text" : "pointer-events-none cursor-not-allowed opacity-40"}`}
          >
            NEXT
          </Link>
        </div>
      </div>
    </div>
  );
}
