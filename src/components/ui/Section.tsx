import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Adds the slightly lighter background used to alternate sections. */
  tone?: "base" | "soft";
  className?: string;
  /** Renders a hairline across the top of the section. */
  divider?: boolean;
}

/** Page section wrapper: consistent vertical rhythm, width and background. */
export function Section({
  id,
  children,
  tone = "base",
  className,
  divider = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        tone === "soft" && "bg-ink-soft",
        divider && "border-t border-line",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Two-digit index shown in the eyebrow, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Extra content shown on the right on wide screens. */
  aside?: ReactNode;
}

/**
 * Section header: mono index + eyebrow, a large title, an optional lead
 * paragraph, and a rule that ties the block together.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  aside,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-eyebrow text-accent">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="text-eyebrow text-fg-subtle">{eyebrow}</span>
          </div>

          <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.12] font-semibold">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 text-[0.975rem] leading-relaxed text-fg-muted sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-line-strong via-line to-transparent" />
    </Reveal>
  );
}
