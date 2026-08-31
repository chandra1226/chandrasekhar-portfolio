"use client";

import { useEffect } from "react";

/**
 * Blocking inline script, rendered as the first child of `<body>`.
 *
 * It runs while the browser is still parsing the document, so `html.motion` is
 * present before anything paints. That is what lets the reveal animations
 * start hidden without the prerendered content ever flashing into view first.
 *
 * If JavaScript is off, or the visitor prefers reduced motion, the class is
 * never added and every `.reveal` element stays in its plain visible state.
 */
export function MotionScript() {
  const script =
    "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)" +
    "document.documentElement.classList.add('motion')}catch(e){}";

  return (
    <script
      // Static, developer-authored string — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

/**
 * One IntersectionObserver for the whole page rather than one per component.
 *
 * It watches `.reveal` (scroll entrances) and `.js-activate` (the architecture
 * pipeline sweep), adding `.is-visible` and then unobserving, so the observer
 * empties itself as the visitor scrolls. Everything it drives is styled in CSS
 * — this only decides *when*.
 */
export function RevealRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .js-activate"),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return null;
}
