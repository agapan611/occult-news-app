"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "occult-wire-cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  const setConsent = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(new Event("occult-wire-consent-change"));
    } catch {
      // localStorage unavailable (private mode etc) → gracefully ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-card-border bg-background/95 px-4 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-lg flex-col gap-3">
        <div>
          <h2
            id="cookie-consent-title"
            className="mb-1 text-sm font-bold text-accent"
          >
            Cookie について
          </h2>
          <p
            id="cookie-consent-desc"
            className="text-[11px] leading-relaxed text-foreground/80"
          >
            当サイトでは将来的にアクセス解析のため Cookie・類似技術を使用する場合があります。
            現在は匿名アクセス解析（Cookieless）のみ有効です。詳細は{" "}
            <Link
              href="/legal"
              className="underline underline-offset-2 hover:text-accent"
            >
              プライバシーポリシー
            </Link>
            {" "}をご覧ください。
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="flex-1 rounded-md bg-accent px-3 py-2 text-xs font-bold text-background transition-colors hover:bg-accent-dim"
          >
            同意する
          </button>
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="flex-1 rounded-md border border-card-border px-3 py-2 text-xs text-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            必要なもののみ
          </button>
        </div>
      </div>
    </div>
  );
}
