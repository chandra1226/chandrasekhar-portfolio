/**
 * ===========================================================================
 *  SITE — SEO and deployment configuration.
 * ===========================================================================
 */

/** Used when nothing else resolves — the GitHub Pages project site. */
const FALLBACK_SITE_URL = "https://chandra1226.github.io/chandrasekhar-portfolio";

/**
 * Turn whatever an environment variable happens to contain into a URL that
 * `new URL()` will accept, or `null` if it cannot.
 *
 * This is defensive on purpose. `metadataBase: new URL(siteUrl)` runs at module
 * evaluation, so a malformed value does not degrade the page — it throws and
 * takes the whole build down. Three things reach here in practice:
 *
 *   ""                          a host that created the key with no value
 *                               (Vercel's import flow does this for every key
 *                               it finds in .env.example)
 *   "example.com"               a domain pasted without a protocol
 *   "https://example.com/"      correct, but with a trailing slash
 *
 * Only the third is valid input to `new URL`. All three should work.
 */
function normaliseSiteUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    // Keep any sub-path (GitHub Pages project sites need it), drop the
    // trailing slash so callers can append "/..." without doubling up.
    return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

/**
 * Canonical production URL, in precedence order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
 *   2. Vercel's own production domain, exposed automatically, so a Vercel
 *      deploy is correct with no configuration at all.
 *   3. The GitHub Pages URL.
 *
 * No trailing slash.
 */
export const siteUrl =
  normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseSiteUrl(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
  FALLBACK_SITE_URL;

/**
 * Sub-path the site is served from — "" on a domain root, "/repo-name" on a
 * GitHub Pages project site. Set automatically by the deploy workflow.
 *
 * Normalised the same way as the URL above: an empty or whitespace value means
 * "domain root", and a missing leading slash is added rather than silently
 * producing paths like `chandrasekhar-portfolioresume.pdf`.
 */
export const basePath = normaliseBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function normaliseBasePath(value: string | undefined): string {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

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
