import { NextResponse } from "next/server";
import { requireTeacher } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  return PATCH(req, ctx);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const teacher = await requireTeacher();
  if (!teacher) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const status = body?.status === "closed" ? "closed" : body?.status === "open" ? "open" : null;
  if (!status) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  const session = await prisma.session.findFirst({
    where: { id, teacherId: teacher.id },
  });
  if (!session) return NextResponse.json({ error: "Not found." }, { status: 404 });
  await prisma.session.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, status });
}
