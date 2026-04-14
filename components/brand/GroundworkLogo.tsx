/**
 * Groundwork Brand Logo Components
 *
 * Concept B1 — The Strata, Polished
 * Approved design spec: VER-122#document-groundwork-logo-official
 */

// ─── Full Lockup (308×80) ─────────────────────────────────────────────────────

export function GroundworkLogoFull({
  width = 308,
  height = 80,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 308 80"
      width={width}
      height={height}
      className={className}
      aria-label="Groundwork"
      role="img"
    >
      <title>Groundwork</title>
      <g transform="translate(8, 14)">
        <rect x="9" y="0" width="38" height="7" rx="4" fill="#D97706" opacity="0.28" />
        <rect x="4" y="11" width="48" height="9" rx="4" fill="#D97706" opacity="0.52" />
        <rect x="2" y="24" width="52" height="11" rx="4" fill="#D97706" opacity="0.76" />
        <rect x="0" y="39" width="56" height="13" rx="4" fill="#D97706" opacity="1" />
      </g>
      <text
        x="84"
        y="41"
        fontFamily="Montserrat, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="27"
        letterSpacing="-1"
        fill="#1E293B"
      >
        Groundwork
      </text>
      <text
        x="86"
        y="60"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="10.5"
        letterSpacing="3.5"
        fill="#D97706"
      >
        FOR LOCAL BUSINESS
      </text>
    </svg>
  );
}

// ─── Full Lockup — Light variant (for dark backgrounds) ──────────────────────

export function GroundworkLogoFullLight({
  width = 308,
  height = 80,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 308 80"
      width={width}
      height={height}
      className={className}
      aria-label="Groundwork"
      role="img"
    >
      <title>Groundwork</title>
      <g transform="translate(8, 14)">
        <rect x="9" y="0" width="38" height="7" rx="4" fill="#D97706" opacity="0.28" />
        <rect x="4" y="11" width="48" height="9" rx="4" fill="#D97706" opacity="0.52" />
        <rect x="2" y="24" width="52" height="11" rx="4" fill="#D97706" opacity="0.76" />
        <rect x="0" y="39" width="56" height="13" rx="4" fill="#D97706" opacity="1" />
      </g>
      <text
        x="84"
        y="41"
        fontFamily="Montserrat, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="27"
        letterSpacing="-1"
        fill="#FFFFFF"
      >
        Groundwork
      </text>
      <text
        x="86"
        y="60"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="10.5"
        letterSpacing="3.5"
        fill="#D97706"
      >
        FOR LOCAL BUSINESS
      </text>
    </svg>
  );
}

// ─── Icon Mark (64×64) ────────────────────────────────────────────────────────

export function GroundworkIcon({
  width = 64,
  height = 64,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
      aria-label="Groundwork icon"
      role="img"
    >
      <title>Groundwork</title>
      <rect width="64" height="64" rx="12" fill="#1E293B" />
      <g transform="translate(4, 8)">
        <rect x="11" y="0" width="34" height="7" rx="4" fill="#D97706" opacity="0.28" />
        <rect x="6" y="11" width="44" height="9" rx="4" fill="#D97706" opacity="0.52" />
        <rect x="3" y="24" width="50" height="11" rx="4" fill="#D97706" opacity="0.76" />
        <rect x="0" y="39" width="56" height="13" rx="4" fill="#D97706" opacity="1" />
      </g>
    </svg>
  );
}

// ─── Wordmark Only (270×48) ───────────────────────────────────────────────────

export function GroundworkWordmark({
  width = 270,
  height = 48,
  className = "",
  color = "#1E293B",
}: {
  width?: number;
  height?: number;
  className?: string;
  /** Text color — use "#FFFFFF" for dark backgrounds */
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 270 48"
      width={width}
      height={height}
      className={className}
      aria-label="Groundwork"
      role="img"
    >
      <title>Groundwork</title>
      <rect x="0" y="3" width="5" height="34" fill="#D97706" rx="2.5" />
      <text
        x="16"
        y="33"
        fontFamily="Montserrat, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="27"
        letterSpacing="-1"
        fill={color}
      >
        Groundwork
      </text>
    </svg>
  );
}
