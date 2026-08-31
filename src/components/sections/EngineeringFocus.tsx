import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBadgeList } from "@/components/ui/TechBadge";
import { focusAreas } from "@/data";

export function EngineeringFocus() {
  return (
    <Section id="engineering" tone="soft">
      <SectionHeading
        index="03"
        eyebrow="Engineering Focus"
        title="Four things I build."
        description="The areas where most of my day goes, and the tools each one runs on."
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {focusAreas.map((area, index) => (
          <Reveal key={area.id} delay={index * 0.07} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-panel p-6 shadow-panel transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-panel-hi sm:p-7">
              {/* Corner glow on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(77,141,255,0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/35 group-hover:text-accent-bright">
                <Icon name={area.icon} size={20} />
              </span>

              <h3 className="mt-5 text-[1.0625rem] leading-tight font-semibold text-fg">
                {area.title}
              </h3>

              <p className="mt-3 flex-1 text-[0.875rem] leading-[1.75] text-fg-muted sm:text-[0.9375rem]">
                {area.description}
              </p>

              <TechBadgeList
                items={area.technologies}
                className="mt-6 border-t border-line pt-5"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
