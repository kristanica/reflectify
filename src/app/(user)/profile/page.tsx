import React from "react";
import Profile from "@/components/profile/Profile";
const Page = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-[#f0ede8] overflow-y-auto">
      <Profile></Profile>
    </div>
  );
};

export default Page;
