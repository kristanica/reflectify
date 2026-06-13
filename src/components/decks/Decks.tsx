import { authOptions } from "@/lib/handlers";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
      <div className="flex flex-col items-center justify-center rounded border border-dashed border-zinc-800 bg-zinc-950/10 py-20 text-center font-mono">
        <span className="text-3xl mb-4">📖</span>
        <h3 className="text-sm font-bold text-white uppercase">
          No Seeds Found
        </h3>
        <p className="mb-6 text-xs text-zinc-500 max-w-sm mt-2 leading-relaxed">
          Your archives are empty. Ingest text files or PDFs to procedurally
          compile study modules.
        </p>
        <Link
          href="/decks/ingest"
          className="border border-zinc-700 hover:border-white text-zinc-400 hover:text-white px-4 py-2 text-xs transition-colors"
        >
          Go to Ingest Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[480px] justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decks.map((seed) => (
          <div
            key={seed.id}
            className="border border-zinc-800 bg-zinc-950/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-zinc-750 transition-all"
          >
            {/* Seed Info Header */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {seed.sourceType === "FILE"
                    ? "📄 DOCUMENT SEED"
                    : "💡 TOPIC SEED"}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {seed.title}
              </h3>
            </div>

            {/* Run Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-950/60 p-3 border border-zinc-900 rounded text-[10px]">
              <div>
                <span className="text-zinc-500">CREATED AT:</span>
                <p className="text-zinc-300 mt-0.5">
                  {seed.createdAt.toDateString()}
                </p>
              </div>
              <div>
                <span className="text-emerald-400">ACCURACY:</span>
                <p>100% </p>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex gap-2 pt-2 border-t border-zinc-900">
              <Link
                href={`/run?deckId=${seed.id}`}
                className="flex-1 text-center border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm"
              >
                START RUN
              </Link>
              <Link
                href={`/flashcards/${seed.id}`}
                className="flex-1 text-center border border-zinc-800 hover:border-white text-zinc-400 hover:text-white py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm"
              >
                STUDY CARDS
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-zinc-900 font-mono text-xs text-zinc-400">
        <span>
          PAGE {currentPage} of {totalPages}
        </span>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/decks?page=${currentPage - 1}`}
            className={`border border-zinc-800  px-3 py-1.5 rounded  uppercase ${currentPage > 1 ? "hover:border-zinc-500 hover:text-white transition-colors" : "pointer-events-none cursor-not-allowed"}`}
          >
            PREV
          </Link>

          <Link
            href={`/decks?page=${currentPage + 1}`}
            className={`border border-zinc-800  px-3 py-1.5 rounded  uppercase ${currentPage < totalPages ? "hover:border-zinc-500 hover:text-white transition-colors" : "pointer-events-none cursor-not-allowed"}`}
          >
            NEXT
          </Link>
        </div>
      </div>
    </div>
  );
}
