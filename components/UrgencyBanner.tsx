"use client";
import { useState, useEffect } from "react";

export function UrgencyBanner() {
  // null = not yet mounted (SSR), true = visible, false = dismissed
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const dismissed =
      localStorage.getItem("urgency-banner-dismissed") === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!dismissed);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!visible) return null;

  return (
    <div className="bg-amber-600 text-white text-sm py-2 px-4 flex items-center justify-between w-full">
      <span className="mx-auto font-medium text-center">
        Founding member pricing — $49/mo locked in forever. Spots limited.
      </span>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem("urgency-banner-dismissed", "true");
          setVisible(false);
        }}
        aria-label="Dismiss banner"
        className="ml-4 flex-shrink-0 text-white/80 hover:text-white transition-colors text-lg leading-none"
      >
        &times;
      </button>
    </div>
  );
}
