import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Groundwork — Get Found Online. Get More Customers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#dcfce7",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#15803d", fontSize: 22, fontWeight: 800 }}>
              V
            </span>
          </div>
          <span
            style={{ color: "#f0f6fc", fontSize: 28, fontWeight: 700 }}
          >
            Groundwork
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "#f0f6fc",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Get Found Online.{" "}
          <span style={{ color: "#4ade80" }}>Get More Customers.</span>
        </h1>

        {/* Sub */}
        <p
          style={{
            color: "#8b949e",
            fontSize: 26,
            margin: 0,
            maxWidth: 700,
          }}
        >
          The all-in-one marketing platform for local service businesses.
        </p>

        {/* Pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
          }}
        >
          {["Website Builder", "Local SEO", "Lead Capture", "Email Marketing"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  color: "#c9d1d9",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
