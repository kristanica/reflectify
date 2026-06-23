import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center p-6 text-[#f0ede8] relative">
      <div className="w-full max-w-lg space-y-2  shadow-2xl rounded  sm:p-10 flex flex-col  relative  ">
        <div className="text-center space-y-4">
          <div className="text-[#f0a500] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#f0a500]/30"></span>
            System Warning
            <span className="w-8 h-px bg-[#f0a500]/30"></span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-zinc-100">
            NOT FOUND
          </h2>

          <p className="text-zinc-500  mt-2  text-xs font-mono leading-relaxed px-4">
            Seems like you navigated to a page that doesn&apos;t exist
          </p>
        </div>
        <Link
          href="/decks"
          className="w-full cursor-pointer text-center border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm disabled:opacity-50"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
