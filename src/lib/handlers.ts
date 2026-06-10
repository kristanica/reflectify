import { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
// removed unused imports

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "lain@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Invalid Credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user?.password) {
          throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(
          password ?? "",
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Password invalid");
        }

        return {
          id: user.id,
          name: user.name,
          profile: user.profile,
          email: user.email,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role ?? "USER";
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
};
