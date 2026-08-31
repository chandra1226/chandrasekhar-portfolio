"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data";
import { useActiveSection, useBodyScrollLock, useMotionSafe, useScrolledPast } from "@/lib/hooks";
import { assetPath, cn } from "@/lib/utils";

export function Navbar() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolledPast(12);
  const motionSafe = useMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-pill px-3.5 py-2 text-[0.8125rem] transition-colors",
                    isActive ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                  )}
                >
                  {/* The pill slides between items via a shared layout id. */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-pill border border-line bg-white/[0.045]"
                      transition={
                        motionSafe
                          ? { type: "spring", stiffness: 420, damping: 34 }
                          : { duration: 0 }
                      }
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
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
