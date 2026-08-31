"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data";
import { useActiveSection, useBodyScrollLock, useScrolledPast } from "@/lib/hooks";
import { assetPath, cn } from "@/lib/utils";

interface PillBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function Navbar() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolledPast(12);
  const [menuOpen, setMenuOpen] = useState(false);

  // The active-item pill is one element that slides between links, positioned
  // from the active link's own box. A CSS transition does the movement, which
  // is why this needs no animation library.
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<PillBox | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const target = list.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
      if (!target) return;
      setPill({
        left: target.offsetLeft,
        top: target.offsetTop,
        width: target.offsetWidth,
        height: target.offsetHeight,
      });
    };

    measure();

    // Fonts land after first paint and change the link widths.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useBodyScrollLock(menuOpen);

  // Escape closes the mobile menu, as expected of any overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"
      >
        {/* Wordmark */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2.5 rounded-md"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-panel font-mono text-[0.8125rem] font-medium text-accent transition-colors group-hover:border-accent/40"
          >
            BC
          </span>
          <span className="hidden text-sm font-medium text-fg sm:block">
            {profile.shortName}
          </span>
        </a>

        {/* Desktop links */}
        <ul ref={listRef} className="relative hidden items-center gap-0.5 lg:flex">
          {/* The sliding indicator. Hidden until it has been measured, so it
              fades in rather than jumping from the corner on first paint. */}
          <span
            aria-hidden="true"
            style={
              pill
                ? { left: pill.left, top: pill.top, width: pill.width, height: pill.height }
                : undefined
            }
            className={cn(
              "absolute rounded-pill border border-line bg-white/[0.045]",
              "transition-[left,top,width,height,opacity] duration-300 ease-out",
              pill ? "opacity-100" : "opacity-0",
            )}
          />

          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-nav-id={item.id}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-pill px-3.5 py-2 text-[0.8125rem] transition-colors",
                    isActive ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Résumé CTA — hidden on the narrowest screens, where it would crowd. */}
          <a
            href={assetPath(profile.resumePath)}
            download={profile.resumeFileName}
            className="hidden h-9 items-center gap-1.5 rounded-pill border border-line bg-white/[0.03] px-3.5 text-[0.8125rem] text-fg transition-colors hover:border-line-strong hover:bg-white/[0.06] sm:inline-flex"
          >
            <Download size={14} strokeWidth={1.8} aria-hidden="true" />
            Résumé
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-pill border border-line bg-white/[0.03] text-fg transition-colors hover:border-line-strong lg:hidden"
          >
            {menuOpen ? (
              <X size={16} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={16} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/*
        Mobile drawer.

        The open/close animation is a CSS `grid-template-rows: 0fr -> 1fr`
        transition rather than a JS height animation: no measurement, no
        animation frames, no exit-animation bookkeeping. `inert` keeps the
        closed drawer out of the tab order and the accessibility tree while
        leaving it in the DOM, so the transition still has something to play.
      */}
      <div
        id="mobile-nav"
        inert={!menuOpen}
        className={cn(
          "grid overflow-hidden border-t bg-ink/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          menuOpen
            ? "grid-rows-[1fr] border-line opacity-100"
            : "grid-rows-[0fr] border-transparent opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="mx-auto flex w-full max-w-[1180px] flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-[0.9375rem] transition-colors",
                    active === item.id
                      ? "bg-white/[0.05] text-fg"
                      : "text-fg-muted hover:bg-white/[0.03] hover:text-fg",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1 w-1 rounded-full transition-colors",
                      active === item.id ? "bg-accent" : "bg-line-strong",
                    )}
                  />
                  {item.label}
                </a>
              </li>
            ))}

            <li className="mt-2 border-t border-line pt-3">
              <a
                href={assetPath(profile.resumePath)}
                download={profile.resumeFileName}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-[0.9375rem] text-accent"
              >
                <Download size={16} strokeWidth={1.8} aria-hidden="true" />
                Download résumé
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
