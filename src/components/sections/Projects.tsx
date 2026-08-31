import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBadgeList } from "@/components/ui/TechBadge";
import { projects } from "@/data";

/**
 * Renders nothing while `projects` is empty, so the page never shows a
 * placeholder shell. Add an entry in `src/data/projects.ts` and the section
 * appears — no wiring needed.
 */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="projects">
      <SectionHeading
        index="06.1"
        eyebrow="Projects"
        title="Things I have built outside of work."
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 2) * 0.07} className="h-full">
            <article className="group flex h-full flex-col rounded-card border border-line bg-panel p-6 shadow-panel transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-panel-hi sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[1.0625rem] leading-snug font-semibold text-fg">
                  {project.title}
                </h3>
                {project.tag ? (
                  <span className="shrink-0 rounded-pill border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-fg-subtle">
                    {project.tag}
                  </span>
                ) : null}
              </div>

              <p className="mt-3 flex-1 text-[0.875rem] leading-[1.75] text-fg-muted">
                {project.description}
              </p>

              <TechBadgeList
                items={project.technologies}
                className="mt-6 border-t border-line pt-5"
              />

              {project.github || project.liveUrl ? (
                <div className="mt-5 flex flex-wrap gap-4">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] text-fg-muted transition-colors hover:text-accent-bright"
                    >
                      <Icon name="github" size={14} />
                      Source
                      <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] text-fg-muted transition-colors hover:text-accent-bright"
                    >
                      Live site
                      <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
