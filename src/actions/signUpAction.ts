"use server";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/schema/registerSchema";
import bcrypt from "bcryptjs";
import { safeParse } from "zod";

const signUpAction = async (
  initialState: Auth,
  formData: FormData,
): Promise<Auth> => {
  const rawData = Object.fromEntries(formData.entries());

  console.log(formData.get("name") as string);
  const validated = safeParse(registerSchema, rawData);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues.map((issues) => issues.message).join(", "),
    };
  }

  const { password, email, name } = validated.data;

  const doesUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (doesUserExist) {
    return {
      success: false,
      error: "Email alread exists",
    };
  }

  const hashPass = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPass,
    },
  });

  return {
    success: true,
    error: "Signup success",
  };
};

export default signUpAction;
