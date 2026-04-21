"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-ga-event]");
      if (!el) return;
      const name = el.dataset.gaEvent;
      if (!name) return;
      const label = el.dataset.gaLabel;
      const category = el.dataset.gaCategory;
      trackEvent(name, {
        ...(label !== undefined ? { event_label: label } : {}),
        ...(category !== undefined ? { event_category: category } : {}),
      });
    };

    document.addEventListener("click", onClick, { capture: true });

    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = doc.scrollHeight - viewportHeight;
      if (scrollableHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent("scroll_depth", {
            event_label: `${threshold}%`,
            value: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
