import { Section, SectionHeading } from "@/components/ui/Section";
import { experiences } from "@/data";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceTimeline() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where the work has been done."
        description="Three roles, one thread: systems that have to keep being correct after they ship."
      />

      <div className="relative">
        {/* Rail. Fades out at the bottom so the timeline ends softly. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-line-strong via-line to-transparent"
        />

        <ol className="space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
