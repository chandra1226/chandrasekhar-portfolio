import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { aboutParagraphs, education, languages, profile } from "@/data";
import { formatDateRange } from "@/lib/utils";

/** Compact "at a glance" rows shown beside the prose. */
const facts = [
  { icon: "mapPin", label: "Based in", value: profile.location },
  { icon: "server", label: "Primary stack", value: "Java · Spring Boot · Python" },
  { icon: "container", label: "Ships with", value: "Docker · Kubernetes · Helm" },
  { icon: "shieldCheck", label: "Verifies with", value: "pytest · Mutation testing" },
] as const;

export function About() {
  return (
    <Section id="about" tone="soft">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Backend engineering, and the infrastructure that grades it."
        description={profile.summary}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        {/* Prose */}
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 0.06}>
              <p className="text-[0.9375rem] leading-[1.8] text-fg-muted sm:text-base">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Side panel */}
        <Reveal direction="left" delay={0.1}>
          <div className="rounded-card border border-line bg-panel p-6 shadow-panel sm:p-7">
            <h3 className="text-eyebrow text-fg-subtle">At a glance</h3>

            <dl className="mt-5 space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-accent">
                    <Icon name={fact.icon} size={14} />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[0.6875rem] tracking-wide text-fg-subtle">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 text-[0.875rem] leading-snug text-fg">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* Education */}
            <div className="mt-7 border-t border-line pt-6">
              <h3 className="text-eyebrow text-fg-subtle">Education</h3>
              {education.map((entry) => (
                <div key={entry.institution} className="mt-4">
                  <p className="text-[0.875rem] leading-snug font-medium text-fg">
                    {entry.qualification}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">
                    {entry.institution}
                  </p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] text-fg-subtle">
                    {formatDateRange(entry.startDate, entry.endDate)} · {entry.location}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-7 border-t border-line pt-6">
              <h3 className="text-eyebrow text-fg-subtle">Languages</h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {languages.map((language) => (
                  <li key={language.name} className="text-[0.875rem] text-fg">
                    {language.name}
                    <span className="ml-1.5 font-mono text-[0.6875rem] text-fg-subtle">
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
