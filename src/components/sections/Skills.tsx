import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { skillCategories } from "@/data";
import { cn } from "@/lib/utils";

export function Skills() {
  const total = skillCategories.reduce((sum, category) => sum + category.skills.length, 0);

  return (
    <Section id="skills">
      <SectionHeading
        index="05"
        eyebrow="Skills"
        title="The toolkit."
        description="Grouped by what it is actually for, rather than by how impressive the list looks."
        aside={
          <div className="flex items-center gap-3 rounded-card border border-line bg-panel px-5 py-4">
            <span className="font-mono text-2xl font-medium text-fg">{total}</span>
            <span className="max-w-[9rem] font-mono text-[0.6875rem] leading-tight text-fg-subtle">
              technologies &amp; practices across {skillCategories.length} areas
            </span>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {skillCategories.map((category, index) => {
          // An odd number of categories would leave a hole in the last row, so
          // the final card stretches across it.
          const spanFull =
            skillCategories.length % 2 === 1 && index === skillCategories.length - 1;

          return (
            <Reveal
              key={category.name}
              delay={index * 0.06}
              className={cn("h-full", spanFull && "md:col-span-2")}
            >
              <article className="group flex h-full flex-col rounded-card border border-line bg-panel p-6 shadow-panel transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-panel-hi sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/35">
                    <Icon name={category.icon} size={18} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[0.9375rem] leading-tight font-semibold text-fg sm:text-base">
                        {category.name}
                      </h3>
                      <span className="shrink-0 font-mono text-[0.6875rem] text-fg-subtle">
                        {String(category.skills.length).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-fg-subtle">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul
                  className={cn(
                    "mt-6 flex flex-wrap gap-2 border-t border-line pt-5",
                    spanFull && "md:gap-2.5",
                  )}
                >
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.025] px-3 py-1.5 text-[0.8125rem] text-fg-muted transition-[border-color,color,background-color] duration-200 hover:border-accent/30 hover:bg-accent/[0.07] hover:text-fg">
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-accent/50"
                        />
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
