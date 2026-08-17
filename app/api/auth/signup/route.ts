import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  password: z.string().min(8).max(80),
  school: z.string().trim().max(120).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, and a password of at least 8 characters." }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  const exists = await prisma.teacher.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "An account with that email already exists. Log in instead." }, { status: 409 });
  }
  const teacher = await prisma.teacher.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash: await hashPassword(parsed.data.password),
      school: parsed.data.school || null,
    },
  });
  await createSession({ teacherId: teacher.id, email: teacher.email, name: teacher.name });
  return NextResponse.json({ ok: true });
}
