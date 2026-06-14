import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const deckInfo = await prisma.deck.findFirst({
    where: {
      id: slug,
    },
    select: {
      title: true,
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 text-[#f0ede8] relative">
      {/* Background ambient glow (optional, adds atmosphere) */}
      <div className="w-full max-w-lg   shadow-2xl rounded  sm:p-10 flex flex-col  relative  ">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="text-[#f0a500] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#f0a500]/30"></span>
            System Warning
            <span className="w-8 h-px bg-[#f0a500]/30"></span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-zinc-100">
            You&apos;re about to enter {deckInfo?.title}
          </h2>

          <p className="text-zinc-500  mt-2  text-xs font-mono leading-relaxed px-4">
            Once initiated, this sequence cannot be paused. All mistakes are
            permanent.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 mt-4 border-t border-zinc-900/50">
          <Link
            href={`/run?deckId=${slug}`}
            className="flex-1 text-center border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm"
          >
            <span className="relative z-10">Initiate Run</span>
          </Link>

          <Link
            href="/decks"
            className="flex-1 text-center border border-zinc-800 hover:border-white text-zinc-400 hover:text-white py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm"
          >
            Abandon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
