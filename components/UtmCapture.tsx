"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureUtmParameters } from "@/lib/utm";

/**
 * Client component that captures UTM parameters from URL and stores them
 * Include this component in any landing page layout to enable attribution tracking
 */
export function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      captureUtmParameters(searchParams);
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
}
