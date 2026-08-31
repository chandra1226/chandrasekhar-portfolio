import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { MotionScript, RevealRuntime } from "@/components/ui/MotionRuntime";
import { profile, site, siteUrl, socialLinks } from "@/data";
import "./globals.css";

/**
 * IBM Plex — an engineering typeface with real history, chosen over the usual
 * geometric sans so the site does not read as a template. Both faces are
 * self-hosted by next/font, so there is no render-blocking request to Google.
 */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.shortTitle}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  applicationName: site.shortTitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: site.title,
    description: site.description,
    siteName: site.shortTitle,
    locale: site.locale,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** schema.org Person, so search engines can read the profile structurally. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: `+91${profile.phone}`,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vizianagaram",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  sameAs: socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href),
  knowsAbout: [...site.keywords],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National Institute of Technology Srinagar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        {/* Must stay first: it runs before anything below is painted. */}
        <MotionScript />

        {/* First tab stop on the page. */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-pill focus:border focus:border-accent/40 focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>

        {children}

        <RevealRuntime />

        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
