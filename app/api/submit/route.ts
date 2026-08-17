import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getTest } from "@/lib/tests";
import { groupFromScore, scoreAnswers } from "@/lib/scoring";

const schema = z.object({
  code: z.string().trim().min(4).max(8),
  studentName: z.string().trim().min(1).max(80),
  period: z.string().trim().min(1).max(20),
  answers: z.record(z.string(), z.string()),
  selfRatings: z.record(z.string(), z.string()),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter your name, period, and answers." }, { status: 400 });
  }
  const code = parsed.data.code.toUpperCase();
  const session = await prisma.session.findUnique({ where: { code } });
  if (!session) return NextResponse.json({ error: "That class code was not found." }, { status: 404 });
  if (session.status !== "open") {
    return NextResponse.json({ error: "This test is closed. Ask your teacher for a new code." }, { status: 403 });
  }
  const test = getTest(session.testId);
  if (!test) return NextResponse.json({ error: "This test is no longer available." }, { status: 404 });

  const { score, maxScore } = scoreAnswers(test, parsed.data.answers);
  const group = groupFromScore(score, maxScore);
  const saved = await prisma.response.create({
    data: {
      sessionId: session.id,
      studentName: parsed.data.studentName,
      period: parsed.data.period,
      answers: parsed.data.answers,
      selfRatings: parsed.data.selfRatings,
      score,
      maxScore,
      group,
    },
  });
  return NextResponse.json({ ok: true, id: saved.id });
}
