"use client";

import { useEffect, useRef } from "react";

/**
 * Giscus コメント欄（GitHub Discussions ベース）
 *
 * - data-* 属性経由で giscus.app の client.js を読み込む
 * - pathname マッピング: URL パスごとに Discussion が自動生成される
 * - theme は dark 固定（OCCULT WIRE の世界観優先）
 *
 * 参照: https://giscus.app/ja
 */
export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // 既に script が挿入されている場合はスキップ（StrictMode の二重呼び出し対策）
    if (container.querySelector("script[src='https://giscus.app/client.js']")) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "agapan611/occult-news-app");
    script.setAttribute("data-repo-id", "R_kgDOSEd4jg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOSEd4js4C7dtd");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "ja");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      // アンマウント時にスクリプト・iframe を掃除
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={ref} className="giscus-wrapper" />;
}
