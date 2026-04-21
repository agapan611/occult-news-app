/**
 * GRIMOIRE カテゴリ別の関連書籍キーワード。
 * Amazon 検索へのリンクで使用。アフィリエイト ID 取得後は buildAmazonUrl 内で tag を付与可能。
 */
export const affiliateKeywords: Record<string, string[]> = {
  ancient_civilization: [
    "古代文明 オカルト",
    "ムー大陸",
    "超古代史",
  ],
  conspiracy: [
    "陰謀論 検証",
    "CIA 機密",
    "隠された歴史",
  ],
  mystery: [
    "未解決事件",
    "世界の謎",
    "怪事件 ファイル",
  ],
  unsolved_cases: [
    "未解決事件",
    "日本のミステリー",
    "失踪事件",
  ],
  science_occult: [
    "量子力学 意識",
    "超常現象 科学",
    "シンクロニシティ",
  ],
  ufo_uap: [
    "UFO 事件",
    "UAP 公式報告",
    "宇宙人 接触",
  ],
  mysticism: [
    "神秘主義",
    "タロット 意味",
    "魔術 図鑑",
  ],
  numerology: [
    "数秘術",
    "カバラ 入門",
    "象徴の辞典",
  ],
  paranormal: [
    "心霊現象",
    "幽霊 体験記",
    "怪奇現象",
  ],
  urban_legend: [
    "都市伝説",
    "怪談 実話",
    "ネットロア",
  ],
  ghost_stories: [
    "日本の怪談",
    "実話怪談",
    "妖怪事典",
  ],
  prophecy: [
    "予言書",
    "ノストラダムス",
    "世界の予言者",
  ],
};

/** 汎用フォールバック（カテゴリが見つからない場合） */
export const fallbackKeywords = [
  "オカルト 研究",
  "ムー 雑誌",
  "都市伝説 大全",
];

/** Amazon 検索 URL を生成。将来アソシエイトID が決まれば tag パラメータを付与できる */
export function buildAmazonSearchUrl(keyword: string): string {
  const params = new URLSearchParams({ k: keyword });
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  if (tag) params.set("tag", tag);
  return `https://www.amazon.co.jp/s?${params.toString()}`;
}

/** カテゴリからキーワード配列を取得（未定義ならフォールバック） */
export function getAffiliateKeywords(category: string): string[] {
  return affiliateKeywords[category] ?? fallbackKeywords;
}
