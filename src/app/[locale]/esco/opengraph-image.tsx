import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ESCO — The city, written for you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0f0a 100%)",
          position: "relative",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180, 100, 80, 0.25), transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245, 245, 244, 0.6)",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#b46450",
            }}
          />
          BY INVITATION · NOW IN 4 EUROPEAN CITIES
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 140,
            fontStyle: "italic",
            color: "#f5f5f4",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          esco
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 48,
            color: "rgba(245, 245, 244, 0.75)",
            marginTop: 32,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
          }}
        >
          The city, written for you.
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 16,
            color: "rgba(245, 245, 244, 0.4)",
            letterSpacing: "0.1em",
          }}
        >
          <span>BY MIUTIFIN</span>
          <span style={{ color: "rgba(245, 245, 244, 0.2)" }}>·</span>
          <span style={{ color: "#b46450" }}>MIUTIFIN.COM/ESCO</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}