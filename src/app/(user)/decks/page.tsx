import DeckHeader from "@/components/decks/DeckHeader";
import DeckOwner from "@/components/decks/DeckOwner";
import Decks from "@/components/decks/Decks";

type PageProps = {
  searchParams: Promise<{
    page: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page || 1);

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <DeckHeader />
        <DeckOwner />
        <Decks currentPage={currentPage} />
      </div>
    </div>
  );
}
