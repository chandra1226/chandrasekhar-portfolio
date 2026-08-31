import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const directionClass: Record<Direction, string> = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  none: "reveal-none",
};

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  direction?: Direction;
  className?: string;
}

/**
 * Scroll-triggered entrance, used by every section.
 *
 * Deliberately CSS-driven rather than JS-driven. The prerendered HTML has the
 * content in its final, visible state; the hidden starting state only exists
 * under `html.motion`, a class added by a blocking inline script before first
 * paint (see `MotionScript`). That ordering matters:
 *
 *   - no JavaScript, or reduced motion  ->  content is simply visible
 *   - JavaScript + motion allowed       ->  hidden before the first paint,
 *                                           so nothing ever flashes in and
 *                                           back out during hydration
 *
 * `RevealRuntime` adds `.is-visible` with one shared IntersectionObserver.
 */
export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as CSSProperties)
    : undefined;

  return (
    <div className={cn("reveal", directionClass[direction], className)} style={style}>
      {children}
    </div>
  );
}
