import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://occult.ainiwa.jp";
const DEFAULT_TITLE = "OCCULT WIRE - オカルト視点ニュース";
const DEFAULT_DESCRIPTION =
  "普通のニュースをオカルト視点で読み解く。都市伝説・陰謀論・数秘術──AIキャラ「シュナ」と「ライカ」が見つけた偶然の一致をお届け。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | OCCULT WIRE",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "OCCULT WIRE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "OCCULT WIRE",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "ja_JP",
    images: [
      {
        url: "/shuna-raika.png",
        width: 1200,
        height: 630,
        alt: "OCCULT WIRE - シュナ & ライカ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: "@occult_wire",
    creator: "@occult_wire",
    images: ["/shuna-raika.png"],
  },
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
