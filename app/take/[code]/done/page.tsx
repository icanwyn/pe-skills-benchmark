import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default async function DonePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-lg flex-1 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">You are done</h1>
        <p className="mt-3 text-stone-600">
          Your answers were sent to your teacher. You can close this page.
        </p>
        <Link href="/join" className="mt-8 inline-block text-sm underline">
          Enter a different code
        </Link>
      </main>
    </div>
  );
}
