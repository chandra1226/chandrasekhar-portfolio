import { Reveal } from "@/components/ui/Reveal";
import { TechBadgeList } from "@/components/ui/TechBadge";
import type { Experience } from "@/data";
import { cn, formatDateRange } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  /** Stagger index — drives the reveal delay. */
  index: number;
}

/** One role in the timeline: rail node, header, bullets and technologies. */
export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const isCurrent = experience.endDate.toLowerCase() === "present";
  const featured = Boolean(experience.featured);

  return (
    <li className="relative pl-8 sm:pl-12">
      {/* Rail node */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-7 left-0 grid h-[13px] w-[13px] -translate-x-1/2 place-items-center rounded-full border-2 bg-ink",
          featured ? "border-accent" : "border-line-strong",
        )}
      >
        <span
          className={cn(
            "h-[3px] w-[3px] rounded-full",
            featured ? "bg-accent" : "bg-fg-subtle",
          )}
        />
      </span>

      <Reveal delay={index * 0.08}>
        <article
          className={cn(
            "group rounded-card border p-6 transition-[border-color,background-color,box-shadow] duration-300 sm:p-7",
            featured
              ? "border-accent/25 bg-[linear-gradient(180deg,rgba(77,141,255,0.055),transparent_55%)] bg-panel shadow-lift hover:border-accent/40"
              : "border-line bg-panel shadow-panel hover:border-line-strong hover:bg-panel-hi",
          )}
        >
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[1.0625rem] leading-tight font-semibold text-fg sm:text-lg">
                  {experience.role}
                </h3>
                {experience.employmentType ? (
                  <span className="rounded-pill border border-line px-2 py-0.5 font-mono text-[0.625rem] tracking-wide text-fg-subtle">
                    {experience.employmentType}
                  </span>
                ) : null}
              </div>

              <p
                className={cn(
                  "mt-1.5 text-[0.9375rem] font-medium",
                  featured ? "text-accent-bright" : "text-fg-muted",
                )}
              >
                {experience.company}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-1.5 sm:items-end">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-pill border px-2.5 py-1 font-mono text-[0.6875rem] whitespace-nowrap",
                  isCurrent
                    ? "border-signal/25 bg-signal/10 text-signal"
                    : "border-line bg-white/[0.02] text-fg-subtle",
                )}
              >
                {isCurrent ? (
                  <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                ) : null}
                {formatDateRange(experience.startDate, experience.endDate)}
              </span>
              <span className="font-mono text-[0.6875rem] text-fg-subtle">
                {experience.location}
              </span>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-5 border-l-2 border-line pl-4 text-[0.875rem] leading-relaxed text-fg-muted italic">
            {experience.summary}
          </p>

          {/* Responsibilities */}
          <ul className="mt-5 space-y-3">
            {experience.responsibilities.map((item) => (
              <li key={item.slice(0, 48)} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-[0.55rem] h-1 w-1 shrink-0 rounded-full",
                    featured ? "bg-accent" : "bg-line-strong",
                  )}
                />
                <span className="text-[0.875rem] leading-[1.7] text-fg-muted sm:text-[0.9375rem]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <TechBadgeList
            items={experience.technologies}
            tone={featured ? "accent" : "default"}
            className="mt-6 border-t border-line pt-5"
          />
        </article>
      </Reveal>
    </li>
  );
}
