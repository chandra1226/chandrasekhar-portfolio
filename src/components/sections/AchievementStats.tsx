import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { achievements } from "@/data";

export function AchievementStats() {
  // The grid draws its hairlines with a 1px gap over a lighter background, so
  // a partial last row would show through as an empty lighter tile. Pad the
  // row out to a multiple of three (the widest column count) and hide the
  // padding on the single-column layout, where it would be an empty band.
  const fillerCount = (3 - (achievements.length % 3)) % 3;

  return (
    <Section id="achievements" tone="soft">
      <SectionHeading
        index="06"
        eyebrow="Achievements"
        title="Numbers I can stand behind."
        description="Every figure here maps to something specific on my résumé — nothing rounded up for effect."
      />

      <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal
            key={achievement.label}
            delay={(index % 3) * 0.08}
            className="bg-panel"
          >
            <div className="group h-full p-6 transition-colors duration-300 hover:bg-panel-hi sm:p-8">
              <div className="flex items-baseline gap-1">
                <Counter
                  value={achievement.value}
                  prefix={achievement.prefix}
                  suffix={achievement.suffix}
                  className="font-mono text-[clamp(2.25rem,5vw,3rem)] leading-none font-medium tracking-tight text-fg tabular-nums"
                />
              </div>

              <h3 className="mt-4 text-[0.9375rem] leading-snug font-semibold text-fg">
                {achievement.label}
              </h3>

              <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-subtle">
                {achievement.detail}
              </p>

              <span
                aria-hidden="true"
                className="mt-5 block h-px w-10 bg-line-strong transition-[width,background-color] duration-500 group-hover:w-20 group-hover:bg-accent/60"
              />
            </div>
          </Reveal>
        ))}

        {Array.from({ length: fillerCount }, (_, index) => (
          <div key={`filler-${index}`} aria-hidden="true" className="hidden bg-panel sm:block" />
        ))}
      </div>
    </Section>
  );
}
