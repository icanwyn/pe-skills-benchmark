import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
          Physical education
        </p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
          Skills benchmarks for grouping students
        </h1>
        <p className="mt-4 max-w-2xl text-stone-600">
          Start a 7th-grade softball or 8th-grade basketball check, share a short class
          code, and see who belongs in beginner, developing, or game-ready groups.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-stone-300 bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Teachers</h2>
            <p className="mt-2 text-sm text-stone-600">
              Create an account, pick a test, and share the code with your class. Results
              stay in your dashboard.
            </p>
            <Link
              href={session ? "/dashboard" : "/signup"}
              className="mt-5 inline-flex rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
            >
              {session ? "Open dashboard" : "Create a teacher account"}
            </Link>
          </div>
          <div className="rounded-xl border border-stone-300 bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Students</h2>
            <p className="mt-2 text-sm text-stone-600">
              No account needed. Enter the code your teacher writes on the board, then
              take the check.
            </p>
            <Link
              href="/join"
              className="mt-5 inline-flex rounded-md border border-stone-900 px-4 py-2.5 text-sm font-medium hover:bg-stone-100"
            >
              Enter class code
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
