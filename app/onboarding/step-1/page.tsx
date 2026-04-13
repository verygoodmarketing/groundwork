"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Light-theme colour tokens (onboarding pages are always light)
const C = {
  bg: "#ffffff",
  bgPage: "#f0f6fc",
  border: "#c9d1d9",
  borderFocus: "#22c55e",
  text: "#0d1117",
  muted: "#8b949e",
  brand: "#22c55e",
  brandHover: "#16a34a",
  error: "#ef4444",
  errorBg: "#fef2f2",
  errorBorder: "#fca5a5",
  successBg: "#f0fdf4",
  successBorder: "#86efac",
  successText: "#16a34a",
};

// Shared input style
const inputCls =
  "w-full rounded-lg border px-4 py-3 text-sm font-body transition-colors outline-none focus:ring-2";
const inputStyle = {
  borderColor: C.border,
  background: C.bg,
  color: C.text,
};

function Step1Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");

  const modeParam = searchParams.get("mode");
  const [mode, setMode] = useState<"signup" | "signin">(
    modeParam === "signin" ? "signin" : "signup"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    callbackError ? "Authentication failed. Please try again." : null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supabase = createClient();

  const passwordLongEnough = password.length >= 8;

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        const nextParam = searchParams.get("next");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding/step-2`,
          },
        });
        if (error) throw error;
        // Store `next` in sessionStorage so after email confirmation the user
        // can be bounced to /pricing (or wherever) post-step-2 completion.
        if (nextParam) {
          sessionStorage.setItem("postOnboardingNext", nextParam);
        }
        setSuccessMessage(
          "Check your email — we sent you a confirmation link. Once confirmed you'll continue to step 2."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // If a `next` param was provided (e.g. from /pricing CTA), redirect there.
        // Otherwise route through the smart hub so returning users land on /dashboard.
        const nextParam = searchParams.get("next");
        router.push(nextParam ?? "/onboarding");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? formatAuthError(err.message)
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setGoogleLoading(true);
    setError(null);
    try {
      const nextParam = searchParams.get("next");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Pass `next` param so returning users from /pricing land back there after OAuth.
          redirectTo: `${window.location.origin}/auth/callback${nextParam ? `?next=${encodeURIComponent(nextParam)}` : ""}`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(
        "Couldn't connect to Google. Use email instead, or check that pop-ups aren't blocked."
      );
      // Focus the email field as fallback
      setTimeout(() => document.getElementById("email")?.focus(), 100);
      setGoogleLoading(false);
    }
  }

  function formatAuthError(msg: string): string {
    if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("user already exists"))
      return "That email already has an account. Sign in instead?";
    if (msg.toLowerCase().includes("invalid login credentials") || msg.toLowerCase().includes("invalid email or password"))
      return "Incorrect email or password.";
    if (msg.toLowerCase().includes("email not confirmed"))
      return "Please confirm your email before signing in.";
    return msg;
  }

  return (
    <OnboardingLayout currentStep={1}>
      <div
        className="rounded-xl border p-6 shadow-sm space-y-6"
        style={{ background: C.bg, borderColor: C.border }}
      >
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: C.text }}>
            {mode === "signup" ? "Create your account" : "Sign in to Versa"}
          </h1>
          <p className="font-body text-sm mt-1" style={{ color: C.muted }}>
            {mode === "signup"
              ? "It's free to try — no credit card required."
              : "Welcome back! Continue building your site."}
          </p>
        </div>

        {successMessage ? (
          <div
            className="rounded-lg border p-4 text-sm font-body"
            style={{ background: C.successBg, borderColor: C.successBorder, color: C.successText }}
          >
            {successMessage}
          </div>
        ) : (
          <>
            {error && (
              <div
                className="rounded-lg border p-4 text-sm font-body"
                style={{ background: C.errorBg, borderColor: C.errorBorder, color: C.error }}
              >
                {error}
                {error.includes("Sign in instead") && (
                  <button
                    type="button"
                    className="ml-1 underline font-medium"
                    style={{ color: C.error }}
                    onClick={() => { setMode("signin"); setError(null); }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium font-body transition-colors disabled:opacity-50"
              style={{ borderColor: C.border, background: C.bg, color: C.text }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.bgPage)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.bg)}
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: C.border }} />
              <span className="text-xs font-body" style={{ color: C.muted }}>or</span>
              <div className="flex-1 h-px" style={{ background: C.border }} />
            </div>

            {/* Email / password form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium font-body" style={{ color: C.text }}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium font-body" style={{ color: C.text }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputCls + " pr-10"}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.borderFocus)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password strength hint — only shown while typing */}
                {mode === "signup" && password.length > 0 && (
                  <p
                    className="text-xs font-body"
                    style={{ color: passwordLongEnough ? C.brand : C.muted }}
                  >
                    {passwordLongEnough ? "✓ 8+ characters" : `${8 - password.length} more characters needed`}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white font-body transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: C.brand }}
                onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = C.brandHover; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.brand)}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === "signup" ? "Create Account →" : "Sign in →"}
              </button>
            </form>

            <p className="text-center text-sm font-body" style={{ color: C.muted }}>
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(null); }}
                className="font-medium underline"
                style={{ color: C.brand }}
              >
                {mode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>

            {/* Terms / Privacy */}
            <p className="text-center text-xs font-body" style={{ color: C.muted }}>
              By continuing you agree to our{" "}
              <a href="/terms" className="underline" style={{ color: C.muted }}>Terms</a>
              {" "}and{" "}
              <a href="/privacy" className="underline" style={{ color: C.muted }}>Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </OnboardingLayout>
  );
}

export default function Step1Page() {
  return (
    <Suspense fallback={null}>
      <Step1Form />
    </Suspense>
  );
}
