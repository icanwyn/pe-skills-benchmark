import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";

export async function SiteHeader({ mode }: { mode?: "teacher" | "student" }) {
  const session = await getSession();
  return (
    <header className="border-b border-[var(--line)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={session ? "/dashboard" : "/"} className="font-semibold tracking-tight">
          PE Skills Benchmark
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {mode !== "teacher" && (
            <Link href="/join" className="text-[var(--muted)] hover:text-black">
              Student join
            </Link>
          )}
          {session ? (
            <>
              <Link href="/dashboard" className="text-[var(--muted)] hover:text-black">
                Dashboard
              </Link>
              <span className="hidden text-[var(--muted)] sm:inline">{session.name}</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="text-[var(--muted)] hover:text-black">
              Teacher login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
