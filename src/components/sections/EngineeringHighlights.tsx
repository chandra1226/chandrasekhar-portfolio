import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBadgeList } from "@/components/ui/TechBadge";
import { highlights } from "@/data";

export function EngineeringHighlights() {
  return (
    <Section id="highlights">
      <SectionHeading
        index="04"
        eyebrow="Engineering Highlights"
        title="Six pieces of work worth pointing at."
        description="Each one comes straight from a role on my résumé — no side-project filler."
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {highlights.map((highlight, index) => (
          <Reveal key={highlight.id} delay={(index % 3) * 0.07} className="h-full">
            <article className="group relative flex h-full flex-col rounded-card border border-line bg-panel p-6 shadow-panel transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-panel-hi">
              {/* Top hairline that brightens on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/35">
                  <Icon name={highlight.icon} size={16} />
                </span>
                <span className="truncate font-mono text-[0.6875rem] tracking-tight text-fg-subtle">
                  {highlight.context}
                </span>
              </div>

              <h3 className="mt-5 text-[1rem] leading-snug font-semibold text-fg">
                {highlight.title}
              </h3>

              <p className="mt-3 flex-1 text-[0.875rem] leading-[1.75] text-fg-muted">
                {highlight.description}
              </p>

              <TechBadgeList
                items={highlight.technologies}
                className="mt-6 border-t border-line pt-5"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
