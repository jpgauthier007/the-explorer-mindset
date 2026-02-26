import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work";
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
          background: "linear-gradient(135deg, #2F4A82, #23375E)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#F5F6F9",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            THE
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#CB4A33",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            EXPLORER
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#F5F6F9",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            MINDSET
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#C6BBC7",
          }}
        >
          A Guide to Growth for Your Life, Family, and Work
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 18,
            color: "#777F97",
          }}
        >
          By Jean-Philippe Gauthier
        </div>
      </div>
    ),
    { ...size }
  );
}
