/**
 * Shared content types.
 *
 * Every section of the site is rendered from the plain objects in this folder.
 * Adding, removing or reordering an entry here changes the site — no component
 * needs to be touched. TypeScript will tell you if a required field is missing.
 */

/** Icon keys understood by `src/components/ui/Icon.tsx`. */
export type IconName =
  | "activity"
  | "boxes"
  | "container"
  | "cpu"
  | "database"
  | "gauge"
  | "gitBranch"
  | "layers"
  | "lock"
  | "network"
  | "radio"
  | "server"
  | "shieldCheck"
  | "sparkles"
  | "terminal"
  | "workflow";

export interface SocialLink {
  /** Shown as the visible label, e.g. "GitHub". */
  label: string;
  /** Full URL including protocol. */
  href: string;
  icon: IconName | "github" | "linkedin" | "mail" | "phone" | "mapPin";
  /** Short text shown under the label in the contact section. */
  handle?: string;
}

export interface Experience {
  /** Stable id — also used as the React key. */
  id: string;
  company: string;
  role: string;
  /** e.g. "Freelance", "Full-time". Optional. */
  employmentType?: string;
  location: string;
  /** Free-form so "08/2026" or "2026" both work. */
  startDate: string;
  /** Use "Present" for a current role. */
  endDate: string;
  /** One or two sentences framing the company / programme. */
  summary: string;
  /** Bullet points. Keep each to one idea. */
  responsibilities: string[];
  technologies: string[];
  /** Renders this role with extra visual weight in the timeline. */
  featured?: boolean;
}

export interface SkillCategory {
  /** e.g. "Languages". */
  name: string;
  icon: IconName;
  /** Short line explaining the category. */
  description: string;
  skills: string[];
}

export interface Achievement {
  /** Numeric part of the stat — animates upward on scroll. */
  value: number;
  /** Rendered before the number, e.g. "" or "~". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "+". */
  suffix?: string;
  label: string;
  /** One line of context so the number is never ambiguous. */
  detail: string;
}

export interface EngineeringFocusArea {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  technologies: string[];
}

export interface Highlight {
  id: string;
  icon: IconName;
  title: string;
  /** Which role this came from — keeps every card traceable to the résumé. */
  context: string;
  description: string;
  technologies: string[];
}

export interface PipelineStage {
  id: string;
  label: string;
  icon: IconName;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  /** Optional repository URL. */
  github?: string;
  /** Optional live/demo URL. */
  liveUrl?: string;
  /** Optional badge, e.g. "Open source". */
  tag?: string;
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface NavItem {
  /** Visible label in the navbar. */
  label: string;
  /** DOM id of the target section, without the leading "#". */
  id: string;
}
