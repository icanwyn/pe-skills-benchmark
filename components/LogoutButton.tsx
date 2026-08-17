"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="text-[var(--muted)] hover:text-black"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      Log out
    </button>
  );
}
