// app/(app)/decks/page.tsx
import DeckHeader from "@/components/decks/DeckHeader";
import DeckOwner from "@/components/decks/DeckOwner";
import Link from "next/link";

// Dummy data representing uploaded "Seeds" in your database
const sampleSeeds = [
  {
    id: "deck_1",
    title: "Javascript Async Operations",
    sourceType: "DOCUMENT",
    cardCount: 42,
    createdAt: "2026-06-10",
    lastReviewed: "2026-06-11",
    accuracy: 68,
  },
  {
    id: "deck_2",
    title: "Cellular Biology & ATP",
    sourceType: "TOPIC",
    cardCount: 28,
    createdAt: "2026-06-08",
    lastReviewed: "Never",
    accuracy: 92,
  },
  {
    id: "deck_3",
    title: "World War II - Pacific Theatre",
    sourceType: "DOCUMENT",
    cardCount: 50,
    createdAt: "2026-06-01",
    lastReviewed: "2026-06-05",
    accuracy: 45,
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-[#f0ede8] overflow-y-auto">
      {/* 1. Header & Quick Actions */}
      <DeckHeader></DeckHeader>

      <DeckOwner></DeckOwner>
      {/* 2. Seeds Grid */}
      {sampleSeeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleSeeds.map((seed) => (
            <div
              key={seed.id}
              className="border border-zinc-800 bg-zinc-950/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-zinc-750 transition-all"
            >
              {/* Seed Info Header */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {seed.sourceType === "DOCUMENT"
                      ? "📄 DOCUMENT SEED"
                      : "💡 TOPIC SEED"}
                  </span>
                  <span className="text-zinc-400">{seed.cardCount} CARDS</span>
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {seed.title}
                </h3>
              </div>

              {/* Run Metrics */}
              <div className="grid grid-cols-2 gap-2 bg-zinc-950/60 p-3 border border-zinc-900 rounded text-[10px]">
                <div>
                  <span className="text-zinc-500">LAST PLAYED:</span>
                  <p className="text-zinc-300 mt-0.5">{seed.lastReviewed}</p>
                </div>
                <div>
                  <span className="text-zinc-500">ACCURACY:</span>
                  <p
                    className={`mt-0.5 font-bold ${
                      seed.accuracy >= 80
                        ? "text-emerald-400"
                        : seed.accuracy >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {seed.accuracy}%
                  </p>
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
      ) : (
        /* Empty State */
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
            href="/upload"
            className="border border-zinc-700 hover:border-white text-zinc-400 hover:text-white px-4 py-2 text-xs transition-colors"
          >
            Go to Ingest Terminal
          </Link>
        </div>
      )}
    </div>
  );
}
