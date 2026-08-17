import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-lg flex-1 px-4 py-16">
        <h1 className="text-2xl font-semibold">Code not found</h1>
        <p className="mt-2 text-stone-600">Check the board and try again.</p>
        <Link href="/join" className="mt-6 inline-block underline">
          Back to join
        </Link>
      </main>
    </div>
  );
}
