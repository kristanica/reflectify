import StartSessionForm from "@/components/decks/StartSessionForm";
import prisma from "@/lib/prisma";

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
    <div className="flex flex-col flex-1 h-full items-center justify-center p-6 text-[#f0ede8] relative">
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
        <StartSessionForm deckId={slug}></StartSessionForm>
      </div>
    </div>
  );
};

export default page;
