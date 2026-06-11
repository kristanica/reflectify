import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/login"];

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const pathName = req.nextUrl.pathname;

    console.log("hit!", pathName);

    if (isLoggedIn && AUTH_ROUTES.includes(pathName)) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathName = req.nextUrl.pathname;

        if (AUTH_ROUTES.includes(pathName)) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
