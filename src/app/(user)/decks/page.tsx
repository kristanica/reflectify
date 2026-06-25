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
    <div className="w-full flex flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      <DeckHeader></DeckHeader>
      <DeckOwner></DeckOwner>

      <Decks currentPage={currentPage}></Decks>
    </div>
  );
}
