import { email, object, string, type infer as zInfer } from "zod";

export const registerSchema = object({
  name: string()
    .min(1, { message: "Username is required" })
    .min(2, { message: "Username must be 2 characters long" }),
  email: email({ message: "invalid email format" }).min(1, {
    message: "Email is required",
  }),
  password: string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: string().min(8, {
    message: "Confirm Password must be at least 8 characters long",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"],
});

export type Register = zInfer<typeof registerSchema>;
