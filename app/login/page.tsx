import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { SiteHeader } from "@/components/SiteHeader";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader mode="teacher" />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-12">
        <h1 className="text-2xl font-semibold">Teacher login</h1>
        <p className="mt-2 mb-6 text-sm text-stone-600">
          Use the email you signed up with.
        </p>
        <div className="rounded-xl border border-stone-300 bg-[var(--card)] p-6">
          <AuthForm mode="login" />
        </div>
      </main>
    </div>
  );
}
