/**
 * ===========================================================================
 *  SITE — SEO and deployment configuration.
 * ===========================================================================
 */

/**
 * Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in .env.local
 * (or in your host's environment settings) once you have a custom domain.
 * No trailing slash.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://chandra1226.github.io/chandrasekhar-portfolio"
).replace(/\/+$/, "");

/**
 * Sub-path the site is served from — "" on a domain root, "/repo-name" on a
 * GitHub Pages project site. Set automatically by the deploy workflow.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  title: "Bonumahanthi Chandrasekhar | Senior Software Engineer",
  shortTitle: "Bonumahanthi Chandrasekhar",
  description:
    "Senior Software Engineer building scalable backend systems in Java, Spring Boot and Python — microservices, Kafka event-driven workflows and Kubernetes across fintech and payments — alongside containerised AI evaluation infrastructure with automated verifiers and CI/CD validation.",
  keywords: [
    "Senior Software Engineer",
    "Backend Engineer",
    "Java",
    "Spring Boot",
    "Python",
    "Microservices",
    "Kafka",
    "Distributed Systems",
    "Docker",
    "Kubernetes",
    "Helm",
    "AWS",
    "CI/CD",
    "GitHub Actions",
    "AI Evaluation",
    "Mutation Testing",
    "Fintech",
    "Payments",
  ],
  locale: "en_IN",
} as const;
