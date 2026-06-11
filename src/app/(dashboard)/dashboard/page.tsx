"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/login" })} // Redirects user back to login after signing out
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Dashboard;
