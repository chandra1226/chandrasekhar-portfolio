import type { SkillCategory } from "./types";

/**
 * ===========================================================================
 *  SKILLS — grouped into cards.
 * ===========================================================================
 *  To add a skill, drop a string into the right `skills` array.
 *  To add a whole category, copy a block and pick an `icon` from
 *  `IconName` in ./types.ts.
 */
export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "terminal",
    description: "Day-to-day working languages.",
    skills: ["Python 3", "Java", "SQL / PL-SQL"],
  },
  {
    name: "Backend & Distributed Systems",
    icon: "server",
    description: "Service design, APIs and asynchronous workflows.",
    skills: [
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Distributed Systems",
      "Kafka",
      "Event-Driven Architecture",
      "Asynchronous Processing",
    ],
  },
  {
    name: "Cloud & Infrastructure",
    icon: "container",
    description: "Packaging, shipping and running services.",
    skills: ["AWS", "Docker", "Kubernetes", "Helm", "CI/CD", "GitHub Actions"],
  },
  {
    name: "Testing & Verification",
    icon: "shieldCheck",
    description: "Proving behaviour, not assuming it.",
    skills: ["pytest", "Automated Verification", "Mutation Testing"],
  },
  {
    name: "Core Engineering",
    icon: "cpu",
    description: "The fundamentals the rest is built on.",
    skills: [
      "Algorithms & Data Structures",
      "Debugging",
      "Root-Cause Analysis",
      "Bug Fixing",
      "Feature Implementation",
      "Codebase Refactoring",
      "Performance Optimization",
      "System Scalability",
      "Agile Practices",
    ],
  },
];
