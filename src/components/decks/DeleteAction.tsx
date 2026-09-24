"use client";

import useModal from "@/hooks/useModal";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type DeleteResultProps = {
  message: string;
  ok: boolean;
};

export function DeleteAction({
  title,
  onDeleteAction,
}: {
  title: string;
  onDeleteAction: () => Promise<DeleteResultProps>;
}) {
  const { modalVisibility, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    const res = await onDeleteAction();
    if (res.ok) {
      toast.success(res.message);
      closeModal();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="absolute right-0">
      <button className="flex size-10 items-center justify-center text-mocha-red hover:bg-mocha-red/10" onClick={openModal} aria-label={`Delete ${title}`}>
        <Trash className="size-4" aria-hidden="true" />
      </button>

      {modalVisibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex w-[90%] max-w-md flex-col justify-between space-y-6 border border-mocha-surface1 bg-mocha-mantle/95 p-5 font-mono text-xs shadow-2xl sm:w-[50%]">
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
