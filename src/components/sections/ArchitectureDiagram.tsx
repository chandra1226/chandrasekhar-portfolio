import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pipelineStages } from "@/data";
import { cn } from "@/lib/utils";

/** Seconds between one stage lighting up and the next. */
const STAGE_DELAY = 0.16;

/**
 * Conceptual pipeline visualisation.
 *
 * The accent sweep down the pipeline is CSS-only: the resting state is the
 * finished, fully lit diagram, and `html.motion` is what makes it start
 * unlit and light up once `.js-activate` picks up `.is-visible`. So a visitor
 * with JavaScript off, or reduced motion on, sees a complete and perfectly
 * legible diagram rather than a half-rendered one.
 */
export function ArchitectureDiagram() {
  const stageDelay = (index: number): CSSProperties =>
    ({ "--stage-delay": `${index * STAGE_DELAY}s` }) as CSSProperties;

  return (
    <section id="architecture" className="relative w-full border-t border-line bg-ink-soft">
      {/* Faint grid, masked so it never fights with the content. */}
      <div
        aria-hidden="true"
        className="bg-grid-fine pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_80%)]"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="pipeline js-activate grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* --- Explainer -------------------------------------------- */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="text-eyebrow text-accent">03.1</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                <span className="text-eyebrow text-fg-subtle">Evaluation Pipeline</span>
              </div>

              <h2 className="mt-5 text-[clamp(1.625rem,3.4vw,2.25rem)] leading-[1.15] font-semibold">
                How an evaluation task gets built.
              </h2>

              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-fg-muted">
                Every task starts as a production-shaped engineering problem and ends as a
                reproducible pass/fail signal. Each step has to hold before the next one is
                allowed to matter — a verifier that cannot survive mutation testing is not a
                verifier.
              </p>

              <div className="mt-7 rounded-card border border-line bg-panel/70 p-5">
                <p className="font-mono text-[0.6875rem] leading-relaxed text-fg-subtle">
                  <span className="text-warn">note</span> — conceptual visualisation of the
                  workflow described in my Handshake AI experience. It is not a diagram of any
                  proprietary system or architecture.
                </p>
              </div>
            </div>
          </Reveal>

          {/* --- Pipeline --------------------------------------------- */}
          <div>
            <ol className="relative">
              {pipelineStages.map((stage, index) => {
                const isLast = index === pipelineStages.length - 1;

                return (
                  <li key={stage.id} className="relative flex gap-4 sm:gap-5">
                    {/* Node + connector column */}
                    <div className="flex flex-col items-center">
                      <span
                        className="stage-node grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
                        style={stageDelay(index)}
                      >
                        <Icon name={stage.icon} size={18} />
                      </span>

                      {!isLast ? (
                        <span
                          aria-hidden="true"
                          className="relative my-1 w-px flex-1 overflow-hidden bg-line"
                        >
                          <span
                            className="stage-connector absolute inset-0 origin-top bg-gradient-to-b from-accent/70 to-accent/20"
                            style={stageDelay(index + 1)}
                          />
                        </span>
                      ) : null}
                    </div>

                    {/* Stage copy */}
                    <div className={cn("min-w-0 pb-8", isLast && "pb-0")}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span
                          className="stage-index font-mono text-[0.625rem] tracking-[0.16em]"
                          style={stageDelay(index)}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[0.9375rem] leading-tight font-semibold text-fg sm:text-base">
                          {stage.label}
                        </h3>
                      </div>

                      <p className="mt-1.5 max-w-lg text-[0.8125rem] leading-relaxed text-fg-muted sm:text-[0.875rem]">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
