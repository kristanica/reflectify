import AnimateAuth from "@/components/auth/AnimateAuth";
import Decorator from "@/components/auth/Decorator";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <main className="dark relative flex min-h-screen w-full overflow-hidden bg-mocha-crust text-mocha-text">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(203,166,247,0.14),transparent_28%),radial-gradient(circle_at_85%_85%,rgba(137,180,250,0.12),transparent_30%)]" />

      <Link
        href="/"
        className="absolute left-4 top-4 z-20 inline-flex h-10 items-center gap-2 border border-mocha-surface1 bg-mocha-base/75 px-3 text-xs font-bold uppercase tracking-[0.14em] text-mocha-overlay1 backdrop-blur-md transition-colors duration-300 hover:border-mocha-lavender/70 hover:text-mocha-lavender sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Home
      </Link>

      <section className="relative z-10 flex w-full items-center justify-center px-5 py-24 lg:w-[42%] lg:px-10">
        <div className="w-full max-w-xl   p-5  sm:p-8">
          <AnimateAuth />
        </div>
      </section>

      <section className="relative z-10 m-5 hidden flex-1 flex-col items-center justify-center overflow-hidden border border-mocha-surface1 bg-mocha-base/45 shadow-2xl shadow-black/35 lg:flex">
        <Decorator />
      </section>
    </main>
  );
};

export default Login;
