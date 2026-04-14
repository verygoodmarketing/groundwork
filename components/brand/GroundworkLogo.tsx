/**
 * Groundwork Brand Logo Components
 *
 * Using final PNG assets from /public/brand/
 * Assets delivered: VER-163 (replaces SVG-based approach from VER-122/VER-123)
 */

import Image from "next/image";

// ─── Full Lockup — Light variant (for dark backgrounds) ──────────────────────

export function GroundworkLogoFullLight({
  width = 220,
  height = 57,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/logo-horizontal-light.png"
      alt="GroundWork"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

// ─── Full Lockup (for light backgrounds) ─────────────────────────────────────

export function GroundworkLogoFull({
  width = 220,
  height = 57,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/logo-horizontal-light.png"
      alt="GroundWork"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

// ─── Icon Mark ────────────────────────────────────────────────────────────────

export function GroundworkIcon({
  width = 40,
  height = 40,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/logo-icon-only.png"
      alt="GroundWork"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

// ─── Wordmark Only ────────────────────────────────────────────────────────────

export function GroundworkWordmark({
  width = 200,
  height = 52,
  className = "",
  color = "light",
}: {
  width?: number;
  height?: number;
  className?: string;
  /** "light" = white wordmark for dark backgrounds, "dark" = dark wordmark for light backgrounds */
  color?: string;
}) {
  const src =
    color === "dark"
      ? "/brand/logo-wordmark-tagline-dark.png"
      : "/brand/logo-wordmark-tagline-dark.png";
  return (
    <Image
      src={src}
      alt="GroundWork"
      width={width}
      height={height}
      className={className}
    />
  );
}
