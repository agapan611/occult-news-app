import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getStoryById } from "@/lib/stories";

export const alt = "OCCULT WIRE - GRIMOIRE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const authorLabel = (author: string) =>
  author === "shuna" ? "シュナ" : author === "raika" ? "ライカ" : "シュナ & ライカ";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStoryById(id);

  const font = await readFile(
    join(process.cwd(), "public/fonts/NotoSansJP-Bold.ttf"),
  );

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
            fontFamily: "Noto Sans JP",
          }}
        >
          OCCULT WIRE
        </div>
      ),
      {
        ...size,
        fonts: [{ name: "Noto Sans JP", data: font, style: "normal", weight: 700 }],
      },
    );
  }

  const author = authorLabel(story.author);
  // 日本語サブセットフォントに含まれない罫線系文字(U+2500等)を、
  // OGPレンダリング時のみ全角ダッシュに置換（実際の記事タイトルは変更しない）
  const displayTitle = story.title
    .replace(/[─━]+/g, "ー")
    .replace(/[―]+/g, "ー");
  const titleSize = displayTitle.length > 44 ? 46 : displayTitle.length > 28 ? 58 : 68;
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
          {displayTitle}
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
