import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const next = sp?.next;
  const nextParam = typeof next === "string" ? `&next=${encodeURIComponent(next)}` : "";
  redirect(`/onboarding/step-1?mode=signin${nextParam}`);
}
