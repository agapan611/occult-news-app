"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "occult-wire-cookie-consent";
const CONSENT_EVENT = "occult-wire-consent-change";

type Props = {
  gaId: string;
};

export default function GoogleAnalytics({ gaId }: Props) {
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
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
