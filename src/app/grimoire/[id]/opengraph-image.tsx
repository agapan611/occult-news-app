import { ImageResponse } from "next/og";
import { getStoryById } from "@/lib/stories";

export const alt = "OCCULT WIRE - GRIMOIRE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadJpFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    },
  ).then((r) => r.text());

  const urlMatch = css.match(/src:\s*url\(([^)]+\.(?:ttf|otf))\)/);
  if (!urlMatch) throw new Error("Japanese font URL not found in Google Fonts CSS");
  return fetch(urlMatch[1]).then((r) => r.arrayBuffer());
}

const authorLabel = (author: string) =>
  author === "shuna" ? "シュナ" : author === "raika" ? "ライカ" : "シュナ & ライカ";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0a0a0f",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}
        >
          OCCULT WIRE
        </div>
      ),
      size,
    );
  }

  const font = await loadJpFont();
  const author = authorLabel(story.author);
  const titleSize = story.title.length > 44 ? 46 : story.title.length > 28 ? 58 : 68;
  const accentColor = story.author === "raika" ? "#38bdf8" : "#ef4444";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a1a 55%, #0a0a0f 100%)",
          color: "#fff",
          fontFamily: "Noto Sans JP",
          padding: "56px 72px",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(239,68,68,0.12) 0%, transparent 42%), radial-gradient(circle at 85% 80%, rgba(56,189,248,0.10) 0%, transparent 42%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div style={{ width: 10, height: 44, background: accentColor, display: "flex" }} />
          <div
            style={{
              fontSize: 30,
              letterSpacing: "0.35em",
              color: accentColor,
              fontWeight: 700,
              display: "flex",
            }}
          >
            OCCULT WIRE
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 22,
              color: "#9ca3af",
              letterSpacing: "0.25em",
              display: "flex",
            }}
          >
            GRIMOIRE
          </div>
        </div>

        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#fff",
            display: "flex",
            zIndex: 1,
            textShadow: "0 2px 24px rgba(0,0,0,0.8)",
          }}
        >
          {story.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#e5e7eb" }}>
            <div style={{ color: accentColor, fontSize: 36, display: "flex" }}>✦</div>
            <div style={{ display: "flex" }}>by {author}</div>
          </div>
          <div style={{ fontSize: 22, color: "#6b7280", letterSpacing: "0.15em", display: "flex" }}>
            occult.ainiwa.jp
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans JP", data: font, style: "normal", weight: 700 }],
    },
  );
}
