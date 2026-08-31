"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * `true` when it is safe to animate.
 *
 * The server snapshot is `false`, so the prerendered HTML is the fully
 * settled, motion-free version of the page: it matches the first client render
 * exactly (no hydration mismatch), it is what a visitor who prefers reduced
 * motion keeps, and it is what search engines and no-JS visitors see.
 * Animation is opted into after hydration, and the media query is live — the
 * page reacts if the OS setting changes while it is open.
 */
export function useMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => !window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Scroll-spy for the navbar.
 *
 * Uses a single IntersectionObserver over all sections and picks the visible
 * one closest to the top of the viewport, which behaves far better than the
 * naive "last section that fired" approach when sections differ in height.
 */
export function useActiveSection(sectionIds: string[], offset = 96): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const pickActive = () => {
      const scrollY = window.scrollY;
      const atBottom =
        window.innerHeight + scrollY >= document.body.scrollHeight - 2;

      // At the very bottom the last section may never reach the trigger line.
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        }
      }
      setActive(current);
    };

    pickActive();

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        pickActive();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds, offset]);

  return active;
}

/** `true` once the page has been scrolled past `threshold` pixels. */
export function useScrolledPast(threshold = 8): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const check = () => setPast(window.scrollY > threshold);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return past;
}

/**
 * Fires once when the element first enters the viewport. Used by the counters
 * and the architecture diagram, which should play exactly one time.
 */
export function useInViewOnce<T extends HTMLElement>(
  rootMargin = "0px 0px -15% 0px",
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

/**
 * Locks body scroll while the mobile menu is open, restoring the previous
 * value on close so we never clobber a style the page already had.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
