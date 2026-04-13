"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, CheckIcon } from "lucide-react";

const STEPS = [
  { number: 1, label: "Account" },
  { number: 2, label: "Profile" },
  { number: 3, label: "Templates" },
  { number: 4, label: "Contact" },
  { number: 5, label: "Live" },
];

interface OnboardingLayoutProps {
  currentStep: number;
  /** Hide the stepper (used on the success screen) */
  hideStepper?: boolean;
  children: React.ReactNode;
}

export function OnboardingLayout({ currentStep, hideStepper, children }: OnboardingLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f6fc", color: "#0d1117" }}>
      {!hideStepper && (
        <>
          {/* Top bar */}
          <header
            className="h-16 flex items-center border-b px-4"
            style={{ background: "#ffffff", borderColor: "#c9d1d9" }}
          >
            <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
              {/* Back button — hidden on step 1 */}
              <div className="w-20">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-sm font-body font-medium transition-colors"
                    style={{ color: "#484f58" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0d1117")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#484f58")}
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </div>

              {/* Groundwork wordmark */}
              <span className="font-display font-bold text-lg" style={{ color: "#16a34a" }}>
                Groundwork
              </span>

              {/* Step indicator */}
              <div className="w-20 text-right">
                <span className="text-sm font-body" style={{ color: "#8b949e" }}>
                  Step {currentStep} of 5
                </span>
              </div>
            </div>
          </header>

          {/* Progress stepper */}
          <div className="border-b px-4 py-4" style={{ background: "#ffffff", borderColor: "#c9d1d9" }}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                {STEPS.map((step, idx) => {
                  const isCompleted = step.number < currentStep;
                  const isCurrent = step.number === currentStep;

                  return (
                    <div key={step.number} className="flex items-center flex-1 last:flex-none">
                      {/* Step node */}
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
                          style={
                            isCompleted
                              ? { background: "#22c55e", color: "#ffffff" }
                              : isCurrent
                              ? {
                                  background: "#22c55e",
                                  color: "#ffffff",
                                  boxShadow: "0 0 0 3px #f0f6fc, 0 0 0 5px #22c55e",
                                }
                              : { background: "#c9d1d9", color: "#8b949e" }
                          }
                        >
                          {isCompleted ? <CheckIcon className="w-3.5 h-3.5" /> : step.number}
                        </div>
                        <span
                          className="text-xs font-body whitespace-nowrap hidden sm:block"
                          style={
                            isCompleted
                              ? { color: "#22c55e" }
                              : isCurrent
                              ? { color: "#0d1117", fontWeight: 500 }
                              : { color: "#8b949e" }
                          }
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Connector line */}
                      {idx < STEPS.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mx-1.5 mb-4 sm:mb-5 transition-colors"
                          style={{ background: isCompleted ? "#86efac" : "#c9d1d9" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-lg">{children}</div>
      </main>
    </div>
  );
}
