import IngestForm from "@/components/decks/ingest/IngestForm";
import IngestOwner from "@/components/decks/ingest/IngestOwner";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-mocha-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <IngestOwner />
        <IngestForm />
      </div>
    </div>
  );
};

export default Page;
