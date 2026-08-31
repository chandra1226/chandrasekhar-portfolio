# Bonumahanthi Chandrasekhar — Portfolio

Personal portfolio for a Senior Software Engineer working across backend
engineering, distributed systems and AI evaluation infrastructure.

**Live site:** https://chandra1226.github.io/chandrasekhar-portfolio/

---

## Overview

A single-page portfolio built as a fully static export — no server runtime, no
database, no CMS. Every word on the page comes from typed data files in
`src/data/`, so updating the site means editing an object and pushing; the
components never need to be touched.

The content is deliberately constrained to what the résumé supports. There are
no invented projects, no fabricated metrics and no placeholder testimonials.

## Features

- **Data-driven content** — experience, skills, achievements, highlights and
  projects all render from `src/data/`; adding a job is adding an object.
- **Animated hero terminal** — an illustrative evaluation-run transcript,
  labelled as such.
- **Interactive experience timeline** with an emphasised current role.
- **Conceptual pipeline diagram** that sweeps stage by stage as it scrolls in.
- **Achievement counters** that animate on first view.
- **Flash-free reveal system** — the prerendered HTML is the finished page, and
  the hidden starting state only exists once a blocking inline script confirms
  motion is wanted. Content never appears and then blinks out during hydration.
- **Reduced-motion support** that is real, not cosmetic: with
  `prefers-reduced-motion: reduce` the site renders fully settled and no
  animation runs at all.
- **Accessible by construction** — semantic landmarks, one `h1`, a skip link,
  visible focus rings, labelled controls, `inert` on the closed mobile drawer,
  and body text at 4.5:1 contrast or better.
- **SEO** — Open Graph and Twitter cards, canonical URL, `schema.org/Person`
  structured data, generated `sitemap.xml` and `robots.txt`, and a custom
  favicon set.
- **Contact form with no pretence** — it composes a `mailto:` rather than
  faking a submission to a backend that does not exist.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `@theme` |
| Animation | CSS transitions/keyframes for scroll + entrance work; Framer Motion for the navbar indicator and back-to-top |
| Icons | lucide-react, plus two hand-drawn brand marks |
| Fonts | IBM Plex Sans + IBM Plex Mono, self-hosted via `next/font` |
| Hosting | GitHub Pages via GitHub Actions |

Most of the motion is CSS rather than JavaScript on purpose: it removes a
hydration flash, keeps animation working when the main thread is busy, and
means the page ships less JS.

## Project structure

```
.
├─ .github/workflows/deploy.yml   Lint → type-check → build → publish to Pages
├─ public/
│  ├─ resume.pdf                  The downloadable résumé (replace in place)
│  └─ og.png                      Social preview card, 1200×630
├─ scripts/                       Optional Python helpers for og.png + favicons
└─ src/
   ├─ app/
   │  ├─ layout.tsx               Fonts, metadata, JSON-LD, skip link
   │  ├─ page.tsx                 Section composition — the page outline
   │  ├─ globals.css              Design tokens, base styles, motion system
   │  ├─ not-found.tsx            404
   │  ├─ sitemap.ts / robots.ts   Generated at build time
   │  └─ icon.svg / favicon.ico / apple-icon.png
   ├─ components/
   │  ├─ layout/                  Navbar, Footer, BackToTop
   │  ├─ sections/                One component per page section
   │  └─ ui/                      Section, Reveal, Button, TechBadge, Counter,
   │                              Terminal, Icon, CopyButton, MotionRuntime
   ├─ data/                       ← all editable content lives here
   │  ├─ types.ts                 Shapes for every content type
   │  ├─ profile.ts               Identity, contact, nav, education
   │  ├─ experience.ts            Career timeline
   │  ├─ skills.ts                Skill categories
   │  ├─ achievements.ts          Animated stats
   │  ├─ engineering.ts           Focus cards, pipeline stages, highlights
   │  ├─ projects.ts              Empty by default; section hides itself
   │  └─ site.ts                  SEO + deployment configuration
   └─ lib/                        cn, assetPath, date formatting, hooks
```

## Local setup

Requires Node 20.9+ (CI uses Node 24).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production static export into `out/` |
| `npm start` | Serves the built `out/` directory locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Lint + type-check + build — the same gates CI runs |

## Environment variables

Everything is optional; the site builds with none of them set. Copy
`.env.example` to `.env.local` to override a default.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | the GitHub Pages URL | Canonical URL used by SEO metadata, `sitemap.xml` and `robots.txt` |
| `NEXT_PUBLIC_BASE_PATH` | empty | Sub-path the site is served from. Set automatically by the deploy workflow; leave empty for a domain root |

`.env.local` is git-ignored. There are no secrets, API keys or tokens in this
project, and none are needed.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints,
type-checks, builds and publishes to GitHub Pages. Pull requests run the same
checks but do not publish.

```
edit content → git commit → git push → CI builds → live site updated
```

The base path is resolved at build time by `actions/configure-pages`, so the
same code deploys correctly to a project site, a user site or a custom domain.

### Deploying to Vercel instead

The project is a standard Next.js app and needs no changes:

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project**, import this repository, and deploy with the default
   settings (Vercel detects Next.js on its own).
3. Leave `NEXT_PUBLIC_BASE_PATH` unset — Vercel serves from the domain root.
4. Set `NEXT_PUBLIC_SITE_URL` to the Vercel URL so canonical tags and the
   sitemap match where the site actually lives.

Vercel then redeploys on every push, the same as the Pages workflow.

### Custom domain

1. Add a `CNAME` record at your DNS provider pointing to
   `chandra1226.github.io` (or an `A` record set to GitHub's Pages IPs for an
   apex domain).
2. In the repository: **Settings → Pages → Custom domain**, enter the domain
   and enable **Enforce HTTPS**.
3. Set `NEXT_PUBLIC_SITE_URL` to the new domain so metadata follows. The base
   path resolves to empty automatically on a custom domain.

## Editing the content

See **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** — it covers adding a job, adding a
project, adding a skill or achievement, changing links, replacing the résumé
and changing the theme, with copy-paste snippets for each.

The short version:

1. Edit the relevant file in `src/data/`.
2. Replace `public/resume.pdf` if the résumé changed.
3. `npm run dev` and check it.
4. `git add . && git commit -m "..." && git push`.
5. The deploy runs automatically.

## Licence

MIT for the code. The résumé, written content and personal details are not
covered — please do not reuse those.
