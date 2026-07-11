import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center p-6 text-mocha-text relative">
      <div className="w-full max-w-lg   bg-card  border shadow-xl rounded   sm:p-10 flex flex-col  relative  ">
        <div className="text-center space-y-4">
          <div className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-primary"></span>
            System Warning
            <span className="w-8 h-px bg-primary"></span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-chart-1">
            NOT FOUND
          </h2>

          <p className="text-mocha-overlay1 mt-2 text-xs font-mono leading-relaxed px-4">
            Seems like you navigated to a page that doesn&apos;t exist
          </p>
        </div>
        <Link
          href="/decks"
          className="w-full mt-5 cursor-pointer text-center border  border-primary hover:bg-primary hover:text-black text-primary py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm disabled:opacity-50"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
