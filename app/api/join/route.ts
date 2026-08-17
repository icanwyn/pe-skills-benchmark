import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getTest } from "@/lib/tests";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code")?.trim().toUpperCase();
  if (!code) return NextResponse.json({ error: "Enter a class code." }, { status: 400 });
  const session = await prisma.session.findUnique({ where: { code } });
  if (!session) return NextResponse.json({ error: "That code was not found." }, { status: 404 });
  const test = getTest(session.testId);
  if (!test) return NextResponse.json({ error: "This test is no longer available." }, { status: 404 });
  return NextResponse.json({
    code: session.code,
    title: session.title,
    status: session.status,
    test: {
      id: test.id,
      title: test.title,
      grade: test.grade,
      sport: test.sport,
      blurb: test.blurb,
    },
  });
}
