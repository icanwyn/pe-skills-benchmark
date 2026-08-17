"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BenchmarkTest } from "@/lib/tests";

const LETTERS = ["A", "B", "C", "D"] as const;

export function QuizForm({
  code,
  test,
}: {
  code: string;
  test: BenchmarkTest;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const studentName = String(form.get("studentName") || "").trim();
    const period = String(form.get("period") || "").trim();
    const answers: Record<string, string> = {};
    const selfRatings: Record<string, string> = {};
    for (const q of test.questions) {
      answers[String(q.id)] = String(form.get(`q-${q.id}`) || "").trim();
    }
    for (const s of test.selfRatings) {
      selfRatings[s.id] = String(form.get(`r-${s.id}`) || "");
    }
    if (!studentName || !period) {
      setError("Enter your name and period.");
      return;
    }
    setPending(true);
    setError("");
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, studentName, period, answers, selfRatings }),
    });
    const data = await res.json().catch(() => ({}));
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Could not submit.");
      return;
    }
    router.push(`/take/${code}/done`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-4 rounded-xl border border-stone-300 bg-[var(--card)] p-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input
            name="studentName"
            required
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-stone-900"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Period</span>
          <input
            name="period"
            required
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-stone-900"
          />
        </label>
      </div>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Part 1 · Multiple choice</h2>
        {test.questions
          .filter((q) => q.kind === "mc")
          .map((q) => (
            <fieldset key={q.id} className="rounded-xl border border-stone-300 bg-[var(--card)] p-5">
              <legend className="font-medium">
                {q.id}. {q.prompt}
              </legend>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, i) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-stone-200 px-3 py-2 hover:bg-stone-50"
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={LETTERS[i]}
                      required
                      className="mt-1"
                    />
                    <span>
                      <span className="font-medium">{LETTERS[i]})</span> {opt}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Part 2 · Fill in</h2>
        {test.questions
          .filter((q) => q.kind === "fill")
          .map((q) => (
            <label key={q.id} className="block rounded-xl border border-stone-300 bg-[var(--card)] p-5">
              <span className="font-medium">
                {q.id}. {q.prompt}
              </span>
              <input
                name={`q-${q.id}`}
                className="mt-3 w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-stone-900"
              />
            </label>
          ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Part 3 · How I rate my skills</h2>
        <p className="text-sm text-stone-600">Check one box in each row.</p>
        <div className="overflow-x-auto rounded-xl border border-stone-300 bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="border-b border-stone-300 bg-stone-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Skill</th>
                <th className="px-3 py-2 font-medium">Beginner</th>
                <th className="px-3 py-2 font-medium">Developing</th>
                <th className="px-3 py-2 font-medium">Confident</th>
              </tr>
            </thead>
            <tbody>
              {test.selfRatings.map((s) => (
                <tr key={s.id} className="border-b border-stone-200 last:border-0">
                  <td className="px-3 py-3">{s.label}</td>
                  {(["beginner", "developing", "confident"] as const).map((level) => (
                    <td key={level} className="px-3 py-3 text-center">
                      <input type="radio" name={`r-${s.id}`} value={level} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit to my teacher"}
      </button>
    </form>
  );
}
