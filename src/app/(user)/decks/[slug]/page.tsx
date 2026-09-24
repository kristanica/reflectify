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
    <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-background p-4 sm:p-6">
      <div className="relative flex w-full max-w-xl flex-col border border-mocha-surface1 bg-mocha-base/70 p-5 sm:p-8">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-mocha-red">
            <span className="h-px w-8 bg-mocha-red/60" />
            System warning
            <span className="h-px w-8 bg-mocha-red/60" />
          </div>

          <h1 className="text-2xl font-black text-mocha-text sm:text-3xl">
            You&apos;re about to enter {deckInfo?.title}
          </h1>

          <p className="px-4 font-mono text-xs leading-6 text-mocha-subtext0">
            Once initiated, this sequence cannot be paused. All mistakes are
            permanent.
          </p>
        </div>
        {/* Action Buttons */}
        <StartSessionForm deckId={slug} />
      </div>
    </div>
  );
};

export default page;
