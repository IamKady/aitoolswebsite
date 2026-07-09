import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "AIToolHunt";
  const description = searchParams.get("description") || "Find the Perfect AI Tool in Seconds";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1030 50%, #0f1a2a 100%)",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "white", fontSize: 24 }}>⚡</div>
          </div>
          <div style={{ color: "white", fontSize: 24, fontWeight: 700 }}>AIToolHunt</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.4,
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          {description}
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["500+ AI Tools", "30+ Categories", "10K+ Reviews"].map((stat) => (
            <div key={stat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>{stat}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
