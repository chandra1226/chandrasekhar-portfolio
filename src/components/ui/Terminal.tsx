import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  kind: "command" | "ok" | "note";
  text: string;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  /** Small caption under the panel. */
  caption?: string;
  className?: string;
}

/** Seconds between one line appearing and the next. */
const LINE_DELAY = 0.42;
const FIRST_LINE_DELAY = 0.45;

/**
 * Terminal-styled panel whose lines type themselves in on load.
 *
 * The stagger is pure CSS (`.enter` + `--enter-delay`), so the panel ships no
 * JavaScript, the prerendered HTML already contains the finished transcript,
 * and a visitor who prefers reduced motion simply gets the finished state.
 *
 * The transcript is illustrative set dressing for the hero, not a recording of
 * a real session — `caption` is the place to say so.
 */
export function Terminal({ title = "evaluation-run", lines, caption, className }: TerminalProps) {
  const delay = (seconds: number): CSSProperties =>
    ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

  const caretDelay = FIRST_LINE_DELAY + lines.length * LINE_DELAY;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-hidden rounded-card border border-line bg-panel shadow-panel">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2c3444]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2c3444]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2c3444]" />
          </div>
          <span className="truncate font-mono text-[0.6875rem] tracking-tight text-fg-subtle">
            {title}
          </span>
          <span className="ml-auto rounded-pill border border-line px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.14em] text-fg-subtle uppercase">
            illustrative
          </span>
        </div>

        {/* Transcript */}
        <div className="px-4 py-4 font-mono text-[0.75rem] leading-[1.9] sm:px-5 sm:text-[0.8125rem]">
          <ol className="space-y-0.5">
            {lines.map((line, index) => (
              <li
                key={line.text}
                className="enter flex items-start gap-2"
                style={delay(FIRST_LINE_DELAY + index * LINE_DELAY)}
              >
                {line.kind === "command" ? (
                  <>
                    <span className="shrink-0 text-accent select-none">$</span>
                    <span className="text-fg">{line.text}</span>
                  </>
                ) : line.kind === "ok" ? (
                  <>
                    <span className="shrink-0 text-signal select-none">✓</span>
                    <span className="text-fg-muted">{line.text}</span>
                  </>
                ) : (
                  <span className="pl-4 text-fg-subtle">{line.text}</span>
                )}
              </li>
            ))}
          </ol>

          {/* Prompt caret, after the transcript has finished. */}
          <div
            className="enter mt-1 flex items-center gap-2"
            style={delay(caretDelay)}
            aria-hidden="true"
          >
            <span className="text-accent select-none">$</span>
            <span className="animate-caret inline-block h-[1.05em] w-[0.5em] translate-y-[0.12em] bg-fg-muted" />
          </div>
        </div>
      </div>

      {caption ? (
        <p className="px-1 font-mono text-[0.6875rem] leading-relaxed text-fg-subtle">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
