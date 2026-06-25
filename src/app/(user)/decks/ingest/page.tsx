import IngestForm from "@/components/decks/ingest/IngestForm";
import IngestOwner from "@/components/decks/ingest/IngestOwner";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      <IngestOwner></IngestOwner>

      <IngestForm></IngestForm>
    </div>
  );
};

export default Page;
