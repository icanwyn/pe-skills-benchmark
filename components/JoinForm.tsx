"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function JoinForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [code, setCode] = useState(params.get("code") ?? "");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const clean = code.trim().toUpperCase();
    const res = await fetch(`/api/join?code=${encodeURIComponent(clean)}`);
    const data = await res.json().catch(() => ({}));
    setPending(false);
    if (!res.ok) {
      setError(data.error || "Could not find that code.");
      return;
    }
    if (data.status !== "open") {
      setError("This test is closed. Ask your teacher for a new code.");
      return;
    }
    router.push(`/take/${clean}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Class code</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC123"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-center font-mono text-2xl tracking-[0.3em] outline-none focus:border-stone-900"
          required
        />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Join test"}
      </button>
    </form>
  );
}
