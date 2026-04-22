import Image from "next/image";

type Tier = {
  min: number;
  label: string;
  message: string;
  color: string;
  barFrom: string;
  barTo: string;
};

// 高めのレンジ（35〜92）だけを使う——静かすぎない、振り切れすぎない
const TIERS: Tier[] = [
  {
    min: 85,
    label: "CRITICAL",
    message: "今夜、何かが境界を越える。",
    color: "text-accent",
    barFrom: "from-accent",
    barTo: "to-rose-400",
  },
  {
    min: 70,
    label: "HIGH",
    message: "薄い膜の向こうから、視線を感じる日。",
    color: "text-accent",
    barFrom: "from-accent",
    barTo: "to-amber-400",
  },
  {
    min: 55,
    label: "MEDIUM",
    message: "静かにざわついている。耳を澄まして。",
    color: "text-cyan",
    barFrom: "from-cyan",
    barTo: "to-accent",
  },
  {
    min: 40,
    label: "LOW",
    message: "穏やかな夜。それでも目は離さずに。",
    color: "text-cyan",
    barFrom: "from-cyan/70",
    barTo: "to-cyan",
  },
  {
    min: 0,
    label: "CALM",
    message: "珍しく凪いだ日——こういう時こそ、近い。",
    color: "text-muted",
    barFrom: "from-cyan/40",
    barTo: "to-cyan/70",
  },
];

function resolveTier(level: number): Tier {
  return TIERS.find((t) => level >= t.min) ?? TIERS[TIERS.length - 1];
}

/** 日付文字列から0-100の決定値を作る（日替わり固定値） */
function hashDateToLevel(dateStr: string): number {
  let h = 2166136261;
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const positive = Math.abs(h) % 58; // 0..57
  return 35 + positive; // 35..92
}

/** 日本時間 (JST, UTC+9) で今日の日付を取得 */
function getTodayInJst(): { ymd: string; display: string } {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(jst.getUTCDate()).padStart(2, "0");
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const wd = weekdays[jst.getUTCDay()];
  return {
    ymd: `${y}-${m}-${d}`,
    display: `${y}.${m}.${d} (${wd})`,
  };
}

export default function Hero() {
  const today = getTodayInJst();
  const level = hashDateToLevel(today.ymd);
  const tier = resolveTier(level);

  return (
    <section
      aria-label="今日のオカルト度"
      className="relative overflow-hidden border-b border-card-border"
    >
      {/* 背景: キャラ画像（薄くブラー）+ 暗色グラデ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/shuna-raika-hero.webp"
          alt=""
          fill
          priority
          quality={70}
          sizes="(max-width: 768px) 100vw, 512px"
          className="object-cover object-center opacity-[0.14] blur-[6px] scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
      </div>

      <div className="mx-auto max-w-lg px-4 py-5">
        {/* キャッチコピー */}
        <div className="mb-3 text-center">
          <p className="text-[11px] tracking-[0.22em] italic text-foreground/80">
            見えないものに、
            <span className="text-accent not-italic font-bold">輪郭</span>
            を。
          </p>
        </div>

        {/* ゲージカード */}
        <div className="rounded-xl border border-card-border/70 bg-card/60 p-3 backdrop-blur-sm">
          {/* 上段: 日付 + ラベル */}
          <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.3em]">
            <span className="text-muted">{today.display}</span>
            <span className={`font-bold ${tier.color}`}>{tier.label}</span>
          </div>

          {/* タイトル + 値 */}
          <div className="mb-2 flex items-baseline gap-2">
            <h2 className="text-xs tracking-[0.25em] text-foreground/80">
              今日のオカルト度
            </h2>
            <span className={`ml-auto text-2xl font-bold leading-none ${tier.color}`}>
              {level}
              <span className="ml-0.5 text-[10px] font-normal tracking-wider text-muted">
                / 100
              </span>
            </span>
          </div>

          {/* ゲージ */}
          <div
            role="progressbar"
            aria-valuenow={level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`今日のオカルト度 ${level} / 100`}
            className="relative mb-2 h-1.5 overflow-hidden rounded-full bg-background/80"
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${tier.barFrom} ${tier.barTo}`}
              style={{ width: `${level}%` }}
            />
          </div>

          {/* メッセージ */}
          <p className="text-[11px] italic leading-relaxed text-foreground/75">
            {tier.message}
          </p>
        </div>
      </div>
    </section>
  );
}
