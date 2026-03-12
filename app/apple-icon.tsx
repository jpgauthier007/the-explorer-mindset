import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0D0F14",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* TEM wordmark */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#F5F6F9",
              fontFamily: "sans-serif",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            T
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#CB4A33",
              fontFamily: "sans-serif",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            E
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#F5F6F9",
              fontFamily: "sans-serif",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            M
          </span>
        </div>
        {/* Accent dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#CB4A33",
            marginTop: 12,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
