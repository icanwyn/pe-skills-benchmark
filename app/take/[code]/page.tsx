import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { QuizForm } from "@/components/QuizForm";
import { prisma } from "@/lib/db";
import { getTest } from "@/lib/tests";

export default async function TakePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const session = await prisma.session.findUnique({
    where: { code: code.toUpperCase() },
  });
  if (!session) notFound();
  const test = getTest(session.testId);
  if (!test) notFound();

  if (session.status !== "open") {
    return (
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="mx-auto max-w-lg flex-1 px-4 py-12">
          <h1 className="text-2xl font-semibold">This test is closed</h1>
          <p className="mt-2 text-stone-600">Ask your teacher for a new class code.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <p className="text-sm text-stone-500">
          {test.grade} · {test.sport} · Code {session.code}
        </p>
        <h1 className="mt-1 text-2xl font-semibold">{test.title}</h1>
        <p className="mt-2 mb-8 text-sm text-stone-600">
          This is not a unit grade. Do your own work so your teacher can place you in the
          right practice group.
        </p>
        <QuizForm code={session.code} test={test} />
      </main>
    </div>
  );
}
