import { NextResponse } from "next/server";
import { z } from "zod";
import { requireTeacher } from "@/lib/auth";
import { uniqueCode } from "@/lib/codes";
import { prisma } from "@/lib/db";
import { getTest } from "@/lib/tests";

const schema = z.object({
  testId: z.string(),
  title: z.string().trim().max(80).optional(),
});

export async function POST(req: Request) {
  const teacher = await requireTeacher();
  if (!teacher) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose a test." }, { status: 400 });
  const test = getTest(parsed.data.testId);
  if (!test) return NextResponse.json({ error: "Unknown test." }, { status: 400 });
  const code = await uniqueCode();
  const session = await prisma.session.create({
    data: {
      code,
      testId: test.id,
      title: parsed.data.title || `${test.grade} ${test.sport}`,
      teacherId: teacher.id,
    },
  });
  return NextResponse.json({ id: session.id, code: session.code });
}
