import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SessionActions } from "@/components/SessionActions";
import { requireTeacher } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { groupLabel } from "@/lib/scoring";
import { getTest } from "@/lib/tests";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const teacher = await requireTeacher();
  if (!teacher) redirect("/login");
  const { id } = await params;
  const session = await prisma.session.findFirst({
    where: { id, teacherId: teacher.id },
    include: { responses: { orderBy: [{ period: "asc" }, { studentName: "asc" }] } },
  });
  if (!session) notFound();
  const test = getTest(session.testId);

  const groups = { A: 0, B: 0, C: 0 };
  for (const r of session.responses) {
    if (r.group === "A" || r.group === "B" || r.group === "C") groups[r.group] += 1;
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader mode="teacher" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Link href="/dashboard" className="text-sm text-stone-600 underline">
          Back to tests
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-stone-500">{test?.grade} · {test?.sport}</p>
            <h1 className="text-2xl font-semibold">{session.title}</h1>
          </div>
          <SessionActions id={session.id} status={session.status} code={session.code} />
        </div>

        <div className="mt-6 rounded-xl border border-stone-900 bg-stone-900 px-6 py-5 text-white">
          <p className="text-sm text-stone-300">Write this code on the board</p>
          <p className="mt-1 font-mono text-4xl font-semibold tracking-[0.25em]">{session.code}</p>
          <p className="mt-2 text-sm text-stone-300">
            Students go to this site, choose Student join, and enter the code.
            Status: {session.status}.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Group A · Beginner" value={groups.A} />
          <Stat label="Group B · Developing" value={groups.B} />
          <Stat label="Group C · Strong" value={groups.C} />
        </div>

        <h2 className="mt-10 text-lg font-semibold">Student results</h2>
        {session.responses.length === 0 ? (
          <p className="mt-3 text-sm text-stone-600">
            No submissions yet. Results show up here as students finish.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-stone-300 bg-[var(--card)]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-300 bg-stone-50">
                <tr>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Period</th>
                  <th className="px-3 py-2 font-medium">Score</th>
                  <th className="px-3 py-2 font-medium">Group</th>
                  <th className="px-3 py-2 font-medium">Self-ratings</th>
                </tr>
              </thead>
              <tbody>
                {session.responses.map((r) => {
                  const ratings = (r.selfRatings || {}) as Record<string, string>;
                  const ratingText =
                    test?.selfRatings
                      .map((s) => (ratings[s.id] ? `${s.label.split(" (")[0]}: ${ratings[s.id]}` : null))
                      .filter(Boolean)
                      .join(" · ") || "—";
                  return (
                    <tr key={r.id} className="border-b border-stone-200 last:border-0 align-top">
                      <td className="px-3 py-2 font-medium">{r.studentName}</td>
                      <td className="px-3 py-2">{r.period}</td>
                      <td className="px-3 py-2">
                        {r.score}/{r.maxScore}
                      </td>
                      <td className="px-3 py-2">
                        {r.group} · {groupLabel(r.group)}
                      </td>
                      <td className="px-3 py-2 text-stone-600">{ratingText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-stone-300 bg-[var(--card)] px-4 py-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
