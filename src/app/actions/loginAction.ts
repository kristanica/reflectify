"use client";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

const loginAction = async (
  initialState: Auth,
  formData: FormData,
): Promise<Auth> => {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!email.trim() || !password.trim()) {
    return { success: false, error: "Email and Password required" };
  }

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    toast.error("Invalid Credentials");
    return { success: false, error: "Invalid Credentials. Try again" };
  }

  return { success: true, error: "" };
};

export default loginAction;
