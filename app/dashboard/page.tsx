import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { requireTeacher } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getTest } from "@/lib/tests";

export default async function DashboardPage() {
  const teacher = await requireTeacher();
  if (!teacher) redirect("/login");

  const sessions = await prisma.session.findMany({
    where: { teacherId: teacher.id },
    include: { _count: { select: { responses: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader mode="teacher" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Your tests</h1>
            <p className="mt-1 text-sm text-stone-600">
              Start a check, write the code on the board, then open the session to group students.
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
          >
            Start a test
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-stone-400 bg-[var(--card)] p-10 text-center">
            <p className="font-medium">No tests yet</p>
            <p className="mt-1 text-sm text-stone-600">
              Start a softball or basketball benchmark to get a class code.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl border border-stone-300 bg-[var(--card)]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-300 bg-stone-50">
                <tr>
                  <th className="px-4 py-3 font-medium">Code</th>
                  <th className="px-4 py-3 font-medium">Test</th>
                  <th className="px-4 py-3 font-medium">Responses</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Started</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => {
                  const test = getTest(s.testId);
                  return (
                    <tr key={s.id} className="border-b border-stone-200 last:border-0">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/sessions/${s.id}`} className="font-mono font-semibold underline">
                          {s.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{s.title || test?.title}</td>
                      <td className="px-4 py-3">{s._count.responses}</td>
                      <td className="px-4 py-3 capitalize">{s.status}</td>
                      <td className="px-4 py-3 text-stone-600">
                        {s.createdAt.toLocaleString()}
                      </td>
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
