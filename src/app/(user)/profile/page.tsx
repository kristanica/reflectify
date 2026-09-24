"use client";
import Profile from "@/components/profile/Profile";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const Page = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-mocha-text">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Profile />
        <div className="flex justify-end border-t border-mocha-surface1 pt-5">
          <Button
            variant="outline"
            className="min-h-11 border-mocha-red/50 font-mono text-xs font-bold uppercase tracking-[0.14em] text-mocha-red hover:bg-mocha-red/10"
            onClick={() => signOut({ redirect: true })}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
