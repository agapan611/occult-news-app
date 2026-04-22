"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "occult-wire-cookie-consent";
const CONSENT_EVENT = "occult-wire-consent-change";

type Props = {
  projectId: string;
};

/**
 * Microsoft Clarity（ヒートマップ・セッションリプレイ）
 * - Cookie 同意済みのときのみ発火
 * - GoogleAnalytics.tsx と同じ同意フロー
 */
export default function MicrosoftClarity({ projectId }: Props) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setConsented(localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setConsented(false);
      }
    };
    check();
    window.addEventListener("storage", check);
    window.addEventListener(CONSENT_EVENT, check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener(CONSENT_EVENT, check);
    };
  }, []);

  if (!consented) return null;

  return (
    <Script id="ms-clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
