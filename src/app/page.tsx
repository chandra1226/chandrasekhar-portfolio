import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { AchievementStats } from "@/components/sections/AchievementStats";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { Contact } from "@/components/sections/Contact";
import { EngineeringFocus } from "@/components/sections/EngineeringFocus";
import { EngineeringHighlights } from "@/components/sections/EngineeringHighlights";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

/**
 * Page composition. Section order here drives the story:
 * who -> where -> what -> how -> proof -> get in touch.
 *
 * The navbar's scroll-spy tracks the ids listed in `navItems`
 * (src/data/profile.ts); sections in between simply keep the surrounding
 * nav item active.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <ExperienceTimeline />
        <EngineeringFocus />
        <ArchitectureDiagram />
        <EngineeringHighlights />
        <Skills />
        <AchievementStats />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
