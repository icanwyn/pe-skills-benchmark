"use client";

import { useState } from "react";
import { TESTS } from "@/lib/tests";

export function StartTestForm() {
  const [testId, setTestId] = useState(TESTS[0].id);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testId, title }),
    });
    const data = await res.json().catch(() => ({}));
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Could not start the test.");
      return;
    }
    window.location.href = `/dashboard/sessions/${data.id}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className="grid gap-3 md:grid-cols-2">
        {TESTS.map((t) => (
          <label
            key={t.id}
            className={`cursor-pointer rounded-xl border p-5 ${
              testId === t.id ? "border-stone-900 bg-white" : "border-stone-300 bg-[var(--card)]"
            }`}
          >
            <input
              type="radio"
              name="testId"
              value={t.id}
              checked={testId === t.id}
              onChange={() => setTestId(t.id)}
              className="sr-only"
            />
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              {t.grade}
            </p>
            <p className="mt-1 font-semibold">{t.title}</p>
            <p className="mt-2 text-sm text-stone-600">{t.blurb}</p>
            <p className="mt-3 text-xs text-stone-500">20 questions · multiple choice and fill-in</p>
          </label>
        ))}
      </fieldset>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Session name (optional)</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Period 2 · August 17"
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-stone-900"
        />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {pending ? "Starting…" : "Start and get a class code"}
      </button>
    </form>
  );
}
