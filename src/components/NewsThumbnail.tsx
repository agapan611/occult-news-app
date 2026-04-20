import type { ArticleType } from "@/lib/articles";

type Props = {
  category: string;
  type: ArticleType;
  className?: string;
};

type Palette = {
  from: string;
  to: string;
  stroke: string;
  glow: string;
};

const occultPalette: Palette = {
  from: "#1a0f2e",
  to: "#0f0a1f",
  stroke: "#a78bfa",
  glow: "#c4b5fd",
};

const newsPalette: Palette = {
  from: "#0f1a2e",
  to: "#0a1220",
  stroke: "#38bdf8",
  glow: "#7dd3fc",
};

function Symbol({ category, stroke, glow }: { category: string; stroke: string; glow: string }) {
  const s = stroke;
  const g = glow;
  switch (category) {
    case "ufo":
      return (
        <g fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round">
          <ellipse cx="40" cy="36" rx="20" ry="6" fill={s} fillOpacity="0.15" />
          <ellipse cx="40" cy="32" rx="11" ry="5" />
          <circle cx="40" cy="30" r="2.5" fill={g} />
          <line x1="28" y1="46" x2="24" y2="58" strokeOpacity="0.5" />
          <line x1="40" y1="46" x2="40" y2="60" strokeOpacity="0.5" />
          <line x1="52" y1="46" x2="56" y2="58" strokeOpacity="0.5" />
        </g>
      );
    case "uma":
    case "cryptid":
      return (
        <g fill={s} fillOpacity="0.7">
          <ellipse cx="28" cy="30" rx="3.5" ry="5" />
          <ellipse cx="24" cy="25" rx="1.5" ry="2" />
          <ellipse cx="32" cy="25" rx="1.5" ry="2" />
          <ellipse cx="22" cy="29" rx="1.5" ry="2" />
          <ellipse cx="34" cy="29" rx="1.5" ry="2" />
          <ellipse cx="52" cy="46" rx="3.5" ry="5" />
          <ellipse cx="48" cy="41" rx="1.5" ry="2" />
          <ellipse cx="56" cy="41" rx="1.5" ry="2" />
          <ellipse cx="46" cy="45" rx="1.5" ry="2" />
          <ellipse cx="58" cy="45" rx="1.5" ry="2" />
        </g>
      );
    case "ghost":
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 26 Q28 18 40 18 Q52 18 52 26 L52 52 L48 48 L44 52 L40 48 L36 52 L32 48 L28 52 Z" fill={s} fillOpacity="0.1" />
          <circle cx="35" cy="30" r="1.5" fill={s} />
          <circle cx="45" cy="30" r="1.5" fill={s} />
          <path d="M37 37 Q40 40 43 37" />
        </g>
      );
    case "urban_legend":
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round">
          <path d="M16 40 Q40 20 64 40 Q40 60 16 40 Z" fill={s} fillOpacity="0.1" />
          <circle cx="40" cy="40" r="8" />
          <circle cx="40" cy="40" r="4" fill={g} />
          <circle cx="40" cy="40" r="1.5" fill={s} />
        </g>
      );
    case "paranormal":
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round">
          <path d="M40 20 Q55 20 55 35 Q55 50 40 50 Q28 50 28 40 Q28 32 36 32 Q42 32 42 38 Q42 42 38 42" />
          <circle cx="40" cy="40" r="2" fill={g} />
        </g>
      );
    case "mystery":
      return (
        <g fill="none" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 30 Q32 22 40 22 Q48 22 48 30 Q48 36 40 38 L40 46" />
          <circle cx="40" cy="54" r="1.8" fill={s} />
        </g>
      );
    case "science":
      return (
        <g fill="none" stroke={s} strokeWidth="1.3" strokeLinecap="round">
          <circle cx="40" cy="40" r="3" fill={g} />
          <ellipse cx="40" cy="40" rx="18" ry="7" />
          <ellipse cx="40" cy="40" rx="18" ry="7" transform="rotate(60 40 40)" />
          <ellipse cx="40" cy="40" rx="18" ry="7" transform="rotate(-60 40 40)" />
        </g>
      );
    case "society":
      return (
        <g fill={s} fillOpacity="0.6" stroke={s} strokeWidth="1">
          <rect x="22" y="30" width="10" height="28" />
          <rect x="35" y="22" width="12" height="36" />
          <rect x="50" y="34" width="10" height="24" />
          <rect x="25" y="34" width="1.5" height="1.5" fill={g} fillOpacity="1" stroke="none" />
          <rect x="29" y="40" width="1.5" height="1.5" fill={g} fillOpacity="1" stroke="none" />
          <rect x="38" y="28" width="1.5" height="1.5" fill={g} fillOpacity="1" stroke="none" />
          <rect x="42" y="36" width="1.5" height="1.5" fill={g} fillOpacity="1" stroke="none" />
          <rect x="53" y="40" width="1.5" height="1.5" fill={g} fillOpacity="1" stroke="none" />
        </g>
      );
    case "politics":
      return (
        <g fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round">
          <line x1="40" y1="22" x2="40" y2="56" />
          <line x1="22" y1="32" x2="58" y2="32" />
          <path d="M18 32 L28 48 L12 48 Z" fill={s} fillOpacity="0.15" />
          <path d="M62 32 L52 48 L68 48 Z" fill={s} fillOpacity="0.15" />
          <circle cx="40" cy="22" r="2" fill={g} />
        </g>
      );
    case "economy":
      return (
        <g fill="none" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18,52 28,42 36,46 48,30 58,36 62,24" />
          <circle cx="62" cy="24" r="2" fill={g} />
          <line x1="18" y1="58" x2="62" y2="58" strokeOpacity="0.4" />
        </g>
      );
    case "tech":
      return (
        <g fill="none" stroke={s} strokeWidth="1.3" strokeLinecap="round">
          <rect x="28" y="28" width="24" height="24" rx="2" fill={s} fillOpacity="0.08" />
          <rect x="34" y="34" width="12" height="12" fill={g} fillOpacity="0.2" />
          <line x1="26" y1="34" x2="28" y2="34" />
          <line x1="26" y1="40" x2="28" y2="40" />
          <line x1="26" y1="46" x2="28" y2="46" />
          <line x1="52" y1="34" x2="54" y2="34" />
          <line x1="52" y1="40" x2="54" y2="40" />
          <line x1="52" y1="46" x2="54" y2="46" />
          <line x1="34" y1="26" x2="34" y2="28" />
          <line x1="40" y1="26" x2="40" y2="28" />
          <line x1="46" y1="26" x2="46" y2="28" />
          <line x1="34" y1="52" x2="34" y2="54" />
          <line x1="40" y1="52" x2="40" y2="54" />
          <line x1="46" y1="52" x2="46" y2="54" />
        </g>
      );
    case "world":
      return (
        <g fill="none" stroke={s} strokeWidth="1.3" strokeLinecap="round">
          <circle cx="40" cy="40" r="18" fill={s} fillOpacity="0.08" />
          <ellipse cx="40" cy="40" rx="18" ry="7" />
          <ellipse cx="40" cy="40" rx="7" ry="18" />
          <line x1="22" y1="40" x2="58" y2="40" />
          <circle cx="40" cy="40" r="2" fill={g} />
        </g>
      );
    case "sports":
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 24 L50 24 L50 36 Q50 44 40 44 Q30 44 30 36 Z" fill={s} fillOpacity="0.15" />
          <path d="M30 28 Q22 28 22 34 Q22 38 28 40" />
          <path d="M50 28 Q58 28 58 34 Q58 38 52 40" />
          <line x1="36" y1="44" x2="36" y2="54" />
          <line x1="44" y1="44" x2="44" y2="54" />
          <rect x="32" y="52" width="16" height="4" fill={s} fillOpacity="0.3" />
          <circle cx="40" cy="34" r="2" fill={g} />
        </g>
      );
    case "entertainment":
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 20 L45 34 L60 36 L48 45 L52 60 L40 52 L28 60 L32 45 L20 36 L35 34 Z" fill={s} fillOpacity="0.2" />
          <circle cx="40" cy="40" r="1.5" fill={g} />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round">
          <circle cx="40" cy="40" r="14" fill={s} fillOpacity="0.1" />
          <circle cx="40" cy="40" r="4" fill={g} />
        </g>
      );
  }
}

const occultCategories = new Set([
  "ufo", "uma", "ghost", "urban_legend", "paranormal", "mystery", "cryptid",
]);

export default function NewsThumbnail({ category, type, className }: Props) {
  const isOccult = type === "occult_news" || occultCategories.has(category);
  const palette = isOccult ? occultPalette : newsPalette;
  const gradId = `bg-${type}-${category}`.replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="80" height="80" fill={`url(#${gradId})`} />
      <circle cx="40" cy="40" r="26" fill={palette.stroke} fillOpacity="0.04" />
      <Symbol category={category} stroke={palette.stroke} glow={palette.glow} />
    </svg>
  );
}
