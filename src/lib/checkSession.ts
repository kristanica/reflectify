import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./handlers";

async function checkSession(): Promise<Session | NextResponse> {
  const session = await getServerSession(authOptions);

  //   Check session
  if (!session?.user) {
    return NextResponse.json(
      {
        error: "UNAUTHORIZED",
      },
      {
        status: 401,
      },
    );
  }

  return session;
}

export default checkSession;
