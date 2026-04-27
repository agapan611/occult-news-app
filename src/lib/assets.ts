/**
 * 共有アセット（Cloudflare R2）の URL 一元管理。
 *
 * 画像の実体は ainiwa-assets バケットにあり、
 * ローカルの source of truth は C:/クラウドコード/shared-assets/。
 *
 * 差し替え手順:
 *   1. shared-assets/ 内のファイルを更新
 *   2. shared-assets で `node sync.mjs` を実行
 *   3. ここのキーを追加したら commit/push → Vercel 自動デプロイ
 *
 * ルール: ~/.claude/rules/ainiwa_family.md / ainiwa_assets.md
 */

const R2_BASE = "https://pub-481c073fb7994d50ab97163e55cad4d5.r2.dev";

export const ASSETS = {
  characters: {
    shuna: `${R2_BASE}/characters/shuna/bust.png`,
    raika: `${R2_BASE}/characters/raika/bust.png`,
    shunaBust: `${R2_BASE}/characters/shuna/bust.png`,
    shunaFull: `${R2_BASE}/characters/shuna/full.png`,
    shunaSd: `${R2_BASE}/characters/shuna/sd.png`,
    raikaBust: `${R2_BASE}/characters/raika/bust.png`,
    raikaFull: `${R2_BASE}/characters/raika/full.png`,
    raikaSd: `${R2_BASE}/characters/raika/sd.png`,
  },
  banners: {
    shunaRaika: `${R2_BASE}/banners/occult-wire-banner.png`,
    shunaRaikaHeader: `${R2_BASE}/banners/occult-wire-banner.png`,
    shunaRaikaHero: `${R2_BASE}/banners/occult-wire-banner.png`,
  },
} as const;
