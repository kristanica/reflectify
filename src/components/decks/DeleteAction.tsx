"use client";

import { deleteDeck } from "@/actions/deleteDeck";
import useModal from "@/hooks/useModal";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteAction({
  deckId,
  title,
}: {
  deckId: string;
  title: string;
}) {
  const { modalVisibility, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    const res = await deleteDeck(deckId);

    if (res.ok) {
      toast.success("Deck deleted successfully");
      closeModal();
    } else {
      toast.error("Failed to delete deck", {
        description: res.message,
      });
    }
  };

  return (
    <div className="absolute right-0">
      <button onClick={openModal}>
        <Trash className="stroke-mocha-red size-4"></Trash>
      </button>

      {modalVisibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="border w-[90%] sm:w-[50%] max-w-md border-mocha-surface1 bg-mocha-mantle/90 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-6   shadow-2xl">
            <div className="leading-tight flex justify-center items-center flex-col gap-2">
              <p className="text-mocha-blue font-bold text-lg  tracking-tighter">
                Are you sure you want to delete {title}?
              </p>
              <small className="text-mocha-subtext1 font-mono">
                This action cannot be undone.
              </small>
            </div>
            <div className="flex justify-between items-center gap-5">
              <button
                className="text-mocha-maroon border-mocha-maroon border w-full py-2 px-4 hover:text-black hover:bg-mocha-maroon transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="text-mocha-overlay0 border-mocha-overlay0  border w-full py-2 px-4 hover:border-mocha-overlay2 hover:text-mocha-overlay2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
