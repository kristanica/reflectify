import Toast from "@/components/Toast";
import React, { ReactNode } from "react";

const RunLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toast></Toast>
      {children}
    </>
  );
};

export default RunLayout;
