"use client";

import { ArrowUp } from "lucide-react";
import { useMotionSafe, useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" control, revealed after the first viewport.
 *
 * It stays mounted and fades with a CSS transition rather than being added and
 * removed from the tree; `inert` keeps the hidden state out of the tab order
 * and the accessibility tree.
 */
export function BackToTop() {
  const visible = useScrolledPast(700);
  const motionSafe = useMotionSafe();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: motionSafe ? "smooth" : "auto" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!visible}
      className={cn(
        "fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full",
        "border border-line bg-panel/90 text-fg-muted shadow-lift backdrop-blur",
        "transition-[opacity,transform,border-color,color] duration-200 ease-out",
        "hover:border-accent/40 hover:text-fg sm:right-8 sm:bottom-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp size={17} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
