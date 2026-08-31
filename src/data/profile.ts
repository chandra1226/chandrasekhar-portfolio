import type { EducationEntry, LanguageEntry, NavItem, SocialLink } from "./types";

/**
 * ===========================================================================
 *  PROFILE — the single place to edit who you are.
 * ===========================================================================
 *  Everything here is rendered somewhere on the site. Change a string, save,
 *  and the page updates. See CONTENT_GUIDE.md for a walkthrough.
 */
export const profile = {
  name: "Bonumahanthi Chandrasekhar",
  /** Used in the navbar mark and the footer. */
  shortName: "Chandrasekhar",
  title: "Senior Software Engineer",
  /** The one-line positioning statement under the hero headline. */
  tagline: "Building scalable backend systems & AI evaluation infrastructure.",
  /** Hero paragraph. Keep it to three or four sentences. */
  intro:
    "I build backend services in Java and Python — and the reproducible, containerised environments used to evaluate how well AI models write code. My work runs from Spring Boot microservices moving card transactions in production to hardened verifier harnesses that execute untrusted code under dropped privileges.",
  /** Résumé summary, reused in the About section. */
  summary:
    "Senior Software Engineer with hands-on experience building and evaluating reproducible software environments for AI model training, alongside a backend engineering background in Java and Python across fintech and payments systems.",
  location: "Vizianagaram, Andhra Pradesh, India",
  email: "bonumahanthic@gmail.com",
  phone: "6304984975",
  /** Tel: links strip spaces automatically — write it however you like. */
  phoneDisplay: "+91 63049 84975",
  /** Path to the PDF in `public/`. Replace the file, keep the path. */
  resumePath: "/resume.pdf",
  /** Filename the browser suggests when the résumé is downloaded. */
  resumeFileName: "Bonumahanthi-Chandrasekhar-Senior-Software-Engineer.pdf",
  /** Current availability line shown in the hero status pill. */
  availability: "Open to Senior Backend / Platform roles",
} as const;

/** About section paragraphs. Add or remove entries freely. */
export const aboutParagraphs: string[] = [
  "I started in backend engineering and stayed there because I like systems that have to be correct under load. At HPS I work on payments — Switch, Acquirer and Issuer platforms, Mastercard integrations, Kafka workflows that carry transactions — where a subtle bug is not a rendering glitch, it is money in the wrong place.",
  "In parallel I author containerised reinforcement-learning evaluation tasks for Handshake AI's Project Dynamo, a benchmark programme measuring how well frontier models write code. Each task is a small production-shaped Python service with a golden reference solution and an automated pass/fail verifier, shipped inside a Docker environment that has to run untrusted third-party code safely.",
  "The two halves reinforce each other. Payments taught me what production reliability actually costs; evaluation work taught me to write tests that cannot be fooled — I mutate my own rules, up to 58 single-clause mutants per task, to prove the verifier catches every one. Debugging, root-cause analysis and refactoring are the parts of the job I enjoy most.",
];

/**
 * Social & contact links. `icon` maps to `src/components/ui/Icon.tsx`.
 * To add a new one (Twitter/X, Stack Overflow, a blog) just append an object
 * and add the matching icon key.
 */
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/chandra1226",
    icon: "github",
    handle: "@chandra1226",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chandrasekhar-bonumahanthi-5407a51b9",
    icon: "linkedin",
    handle: "chandrasekhar-bonumahanthi",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "mail",
    handle: profile.email,
  },
  {
    label: "Phone",
    href: `tel:+91${profile.phone}`,
    icon: "phone",
    handle: profile.phoneDisplay,
  },
];

/** Navbar / scroll-spy sections, in page order. */
export const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Engineering", id: "engineering" },
  { label: "Skills", id: "skills" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export const education: EducationEntry[] = [
  {
    institution: "National Institute of Technology Srinagar",
    qualification: "B.Tech in Mechanical Engineering",
    location: "Srinagar, India",
    startDate: "08/2019",
    endDate: "06/2023",
  },
];

export const languages: LanguageEntry[] = [
  { name: "English", level: "Proficient" },
  { name: "Hindi", level: "Proficient" },
];
