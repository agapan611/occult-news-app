import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const SITE_URL = "https://occult.ainiwa.jp";
const DEFAULT_TITLE = "OCCULT WIRE - オカルト視点ニュース";
const DEFAULT_DESCRIPTION =
  "普通のニュースをオカルト視点で読み解く。都市伝説・陰謀論・数秘術──AIキャラ「シュナ」と「ライカ」が見つけた偶然の一致をお届け。";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OCCULT WIRE",
  alternateName: "オカルト視点ニュース",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "ja",
  publisher: {
    "@type": "Organization",
    name: "OCCULT WIRE",
    url: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OCCULT WIRE",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/shuna-raika.png`,
    width: 1200,
    height: 630,
  },
  sameAs: ["https://x.com/occult_wire"],
};

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
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "OCCULT WIRE - GRIMOIRE" },
      ],
      "application/feed+json": [
        { url: "/feed.json", title: "OCCULT WIRE - GRIMOIRE (JSON Feed)" },
      ],
    },
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
  verification: {
    google: "pDRxt_ZZuGwtLTgRtrB3TelEzD4F5m5zlmT04g6Y9ro",
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
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${zenKakuGothicNew.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="min-h-dvh flex flex-col">
        {children}
        <ScrollToTop />
        <CookieConsent />
        <Analytics />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
