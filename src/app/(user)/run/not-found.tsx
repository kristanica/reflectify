import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-background p-4 text-mocha-text sm:p-6">
      <div className="relative flex w-full max-w-lg flex-col border border-mocha-surface1 bg-mocha-base/70 p-5 sm:p-8">
        <div className="text-center space-y-4">
          <div className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-primary"></span>
            System Warning
            <span className="w-8 h-px bg-primary"></span>
          </div>

          <h1 className="text-2xl font-black tracking-wide text-mocha-red sm:text-3xl">
            NOT FOUND
          </h1>

          <p className="text-mocha-overlay1 mt-2 text-xs font-mono leading-relaxed px-4">
            Seems like you navigated to a page that doesn&apos;t exist
          </p>
        </div>
        <Link
          href="/decks"
          className="mt-5 flex min-h-11 w-full items-center justify-center border border-mocha-mauve bg-mocha-mauve px-4 py-2 text-center font-mono text-[10px] font-black uppercase tracking-[0.14em] text-mocha-crust transition-colors hover:bg-mocha-lavender"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
