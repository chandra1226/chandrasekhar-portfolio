"use client";

import { useEffect, useState } from "react";
import { useInViewOnce, useMotionSafe } from "@/lib/hooks";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds the count-up takes. */
  duration?: number;
  className?: string;
}

/** easeOutExpo — fast start, long settle. Reads as "counting up and landing". */
function easeOut(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Number that counts up the first time it scrolls into view.
 *
 * Renders the final value directly when motion is reduced, and always exposes
 * the final value to assistive tech so screen readers never announce a
 * mid-animation number.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: CounterProps) {
  // Fires while the counter is still below the fold, so the reset from the
  // prerendered final value back to zero happens off-screen.
  const [ref, inView] = useInViewOnce<HTMLSpanElement>("0px 0px 20% 0px");
  const motionSafe = useMotionSafe();
  const [counted, setCounted] = useState(0);

  // Derived rather than stored, so the static path never needs an effect.
  const display = motionSafe ? counted : value;

  useEffect(() => {
    if (!inView || !motionSafe) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounted(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, motionSafe, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}
