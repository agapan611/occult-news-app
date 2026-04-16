import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCCULT WIRE - オカルト視点ニュース",
  description:
    "普通のニュースをオカルト視点で読み解く。都市伝説・陰謀論・数秘術──AIが見つけた「偶然の一致」をお届け。",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OCCULT WIRE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
