import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          "/grimoire/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})-:rest",
        destination: "/grimoire/:rest",
        permanent: true,
      },
      {
        source: "/grimoire/category/ufo",
        destination: "/grimoire/category/ufo_uap",
        permanent: true,
      },
    ];
  },
  async headers() {
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://region1.google-analytics.com https://*.clarity.ms",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // Report-Only から enforce に昇格（2026-04-22、#49）
            // 外部リソースは va.vercel-scripts.com / googletagmanager / google-analytics / vercel-insights のみ、
            // それ以外の href 型リンク（x.com / forms.gle / ainiwa.jp 等）は遷移のため CSP 対象外
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
