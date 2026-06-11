import LeaderBoardOwner from "@/components/leaderboard/LeaderBoardOwner";
import LeaderBoardHeader from "@/components/leaderboard/LeaderBoardHeader";
import LeaderBoardItems from "@/components/leaderboard/LeaderBoardItems";

import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-[#f0ede8] overflow-y-auto">
      <LeaderBoardHeader></LeaderBoardHeader>
      <LeaderBoardOwner></LeaderBoardOwner>

      <LeaderBoardItems></LeaderBoardItems>
    </div>
  );
};

export default page;
