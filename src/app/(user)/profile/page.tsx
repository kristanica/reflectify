"use client";
import Profile from "@/components/profile/Profile";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const Page = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      <Profile></Profile>

      <Button onClick={() => signOut({ redirect: true })}>SIGNOUT</Button>
    </div>
  );
};

export default Page;
