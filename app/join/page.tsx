import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { JoinForm } from "@/components/JoinForm";

export default function JoinPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-12">
        <h1 className="text-2xl font-semibold">Join a class test</h1>
        <p className="mt-2 mb-6 text-sm text-stone-600">
          Type the code your teacher shared. You do not need an account.
        </p>
        <div className="rounded-xl border border-stone-300 bg-[var(--card)] p-6">
          <Suspense>
            <JoinForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
