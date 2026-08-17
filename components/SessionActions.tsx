"use client";

import { useState } from "react";

export function SessionActions({
  id,
  status,
  code,
}: {
  id: string;
  status: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  const next = status === "open" ? "closed" : "open";

  async function copy() {
    const url = `${window.location.origin}/join?code=${code}`;
    await navigator.clipboard.writeText(`${code}  ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function toggle() {
    await fetch(`/api/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm hover:bg-stone-50"
      >
        {copied ? "Copied" : "Copy code and link"}
      </button>
      <button
        type="button"
        onClick={toggle}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm hover:bg-stone-50"
      >
        {status === "open" ? "Close test" : "Reopen test"}
      </button>
    </div>
  );
}
