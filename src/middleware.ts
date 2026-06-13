import { getToken } from "next-auth/jwt";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/"];

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const pathName = req.nextUrl.pathname;

  console.log("user at ", pathName);

  if (AUTH_ROUTES.includes(pathName)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  const authMiddleWare = withAuth({
    callbacks: {
      authorized({ req, token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  });

  return authMiddleWare(req, event);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/decks/:path*",
    "/leaderboard/:path*",
    "/profile/:path*",
    "/shop/:path*",
    "/login",
    "/"
  ],
};
