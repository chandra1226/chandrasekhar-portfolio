import { basePath } from "@/data/site";

/**
 * Tiny className joiner. Falsy values are dropped, so conditional classes can
 * be written inline: `cn("base", isActive && "text-accent")`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Resolve a path inside `public/` to a URL that survives a sub-path deploy.
 *
 * Next prefixes `basePath` onto routes and onto `next/image` sources, but NOT
 * onto raw strings such as `href="/resume.pdf"`. Anything pointing at a file in
 * `public/` must go through here, otherwise it 404s on GitHub Pages where the
 * site lives under `/<repo-name>`.
 */
export function assetPath(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalised}`;
}

/** Strip spaces and punctuation so a phone number is a valid `tel:` target. */
export function telHref(phone: string, countryCode = "+91"): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:${countryCode}${digits}`;
}

/**
 * "08/2026" -> "Aug 2026". Falls back to the raw string for anything that is
 * not in MM/YYYY form, so "Present" and "2026" both pass through untouched.
 */
export function formatMonthYear(value: string): string {
  const match = /^(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (!match) return value;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthIndex = Number(match[1]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return value;

  return `${months[monthIndex]} ${match[2]}`;
}

/** "08/2026" + "Present" -> "Aug 2026 — Present" */
export function formatDateRange(start: string, end: string): string {
  return `${formatMonthYear(start)} — ${formatMonthYear(end)}`;
}
