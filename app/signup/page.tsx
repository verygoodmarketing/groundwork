import { redirect } from "next/navigation";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const next = searchParams?.next;
  const nextParam = typeof next === "string" ? `&next=${encodeURIComponent(next)}` : "";
  redirect(`/onboarding/step-1${nextParam ? `?${nextParam.slice(1)}` : ""}`);
}
