import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { StartTestForm } from "@/components/StartTestForm";
import { requireTeacher } from "@/lib/auth";

export default async function NewSessionPage() {
  const teacher = await requireTeacher();
  if (!teacher) redirect("/login");
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader mode="teacher" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="text-2xl font-semibold">Start a test</h1>
        <p className="mt-1 mb-8 text-sm text-stone-600">
          Students join with the code. Results appear on the session page as they finish.
        </p>
        <StartTestForm />
      </main>
    </div>
  );
}
