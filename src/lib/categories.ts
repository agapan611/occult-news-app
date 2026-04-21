export const grimoireCategoryLabels: Record<string, string> = {
  numerology: "数秘術",
  ancient_civilization: "古代文明",
  mysticism: "神秘主義",
  ghost_stories: "心霊",
  prophecy: "予言",
  ufo_uap: "UFO/UAP",
  conspiracy: "陰謀論",
  uma: "UMA",
  urban_legend: "都市伝説",
  science_occult: "科学×オカルト",
  horror: "怪談",
  mystery: "ミステリー",
  unsolved_cases: "未解決事件",
};

export const grimoireCategoryDescriptions: Record<string, string> = {
  numerology: "数字と象徴の背後に隠された意味を読み解く。ピタゴラスから現代のシンクロニシティまで。",
  ancient_civilization: "アトランティス、ムー大陸、エジプト、マヤ──失われた文明の謎を追う。",
  mysticism: "神秘主義・秘教・魔術の系譜。錬金術、カバラ、ヘルメス主義。",
  ghost_stories: "心霊現象・幽霊目撃・怪異の記録。古今東西の霊的事件簿。",
  prophecy: "予言・予知・黙示。ノストラダムス、ファティマ、現代の予兆。",
  ufo_uap: "UFO・UAP目撃、異星人接触、政府の機密解除情報まで。",
  conspiracy: "世界を動かす影の勢力、情報統制、陰謀論の系譜を追う。",
  uma: "未確認動物──ネッシー、ビッグフット、日本のUMA事例。",
  urban_legend: "口承で広まる現代の怪談・都市伝説の起源と拡散を追う。",
  science_occult: "科学と超常現象の接点。量子論・シンクロニシティ・意識研究。",
  horror: "怪談・実話怪異譚──語り継がれる恐怖の記録。",
  mystery: "未解決事件・失踪・歴史の謎──解けない問いを追う。",
  unsolved_cases: "未解決のまま残る失踪・殺人・消失事件の記録を追う。",
};

export function getGrimoireCategoryLabel(slug: string): string {
  return grimoireCategoryLabels[slug] ?? slug;
}
