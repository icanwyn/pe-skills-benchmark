import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }
  const teacher = await prisma.teacher.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (!teacher || !(await verifyPassword(parsed.data.password, teacher.passwordHash))) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }
  await createSession({ teacherId: teacher.id, email: teacher.email, name: teacher.name });
  return NextResponse.json({ ok: true });
}
