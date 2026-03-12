import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0D0F14",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* T — white */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#F5F6F9",
            fontFamily: "sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          T
        </span>
        {/* E — orange */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#CB4A33",
            fontFamily: "sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          E
        </span>
        {/* M — white */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#F5F6F9",
            fontFamily: "sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
