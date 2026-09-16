import { ImageResponse } from "next/og";

export const alt = "Titan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#0a0612",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #ff2bd6, #39ff88, #ff2bd6)",
          }}
        />

        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: -8,
              top: 0,
              color: "#ff2bd6",
              opacity: 0.75,
              fontSize: 160,
              fontWeight: 800,
              letterSpacing: -4,
            }}
          >
            TITAN
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 8,
              top: 0,
              color: "#39ff88",
              opacity: 0.75,
              fontSize: 160,
              fontWeight: 800,
              letterSpacing: -4,
            }}
          >
            TITAN
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              color: "#ffffff",
              fontSize: 160,
              fontWeight: 800,
              letterSpacing: -4,
            }}
          >
            TITAN
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 34,
            color: "#9d94b8",
          }}
        >
          Website design &amp; development
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 28,
            color: "#39ff88",
            fontWeight: 600,
          }}
        >
          titanq.fyi
        </div>
      </div>
    ),
    { ...size }
  );
}
