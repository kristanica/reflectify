import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { email, object, string, ZodError } from "zod";
import bcrypt from "bcryptjs";
const registerSchema = object({
  name: string().min(2),
  email: email(),
  password: string().min(8),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "Email Already in used",
        },
        {
          status: 409,
        },
      );
    }

    const hashpassed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashpassed,
      },

      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          error: e.issues.map((item) => item.message).join(","),
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
