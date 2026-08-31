# Content Guide

Everything on this site is rendered from plain data files in **`src/data/`**.
You should never need to open a React component to change what the site says.

The workflow is always the same:

```bash
npm run dev          # http://localhost:3000, updates as you type
# edit a file in src/data/
# check it in the browser
git add .
git commit -m "content: update experience"
git push             # GitHub Actions rebuilds and redeploys automatically
```

If you only want to publish and are confident in the change, `git push` alone
is enough — the deploy runs on every push to `main`.

---

## Where everything lives

| What you want to change | File |
| --- | --- |
| Name, title, tagline, hero paragraph, contact details, availability | `src/data/profile.ts` |
| About section paragraphs | `src/data/profile.ts` → `aboutParagraphs` |
| Social links (GitHub, LinkedIn, email, phone) | `src/data/profile.ts` → `socialLinks` |
| Navbar items | `src/data/profile.ts` → `navItems` |
| Education, spoken languages | `src/data/profile.ts` |
| Jobs / career timeline | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| Achievement numbers | `src/data/achievements.ts` |
| Engineering Focus cards, pipeline diagram, Engineering Highlights | `src/data/engineering.ts` |
| Projects | `src/data/projects.ts` |
| Page title, meta description, SEO keywords, site URL | `src/data/site.ts` |
| Colours, fonts, spacing, radii | `src/app/globals.css` |
| The résumé PDF | `public/resume.pdf` |
| Social preview image | `public/og.png` |

TypeScript will tell you immediately if a required field is missing — that is
the point of `src/data/types.ts`. A red squiggle means "this will not build",
so nothing broken can reach the live site.

---

## How to update your name

`src/data/profile.ts`:

```ts
export const profile = {
  name: "Bonumahanthi Chandrasekhar",
  shortName: "Chandrasekhar",   // navbar + footer
  title: "Senior Software Engineer",
  ...
};
```

The two-letter monogram in the navbar and footer (`BC`) is hard-coded in
`src/components/layout/Navbar.tsx` and `Footer.tsx` — search for `>BC<` if you
ever change your initials. Also update `MONOGRAM` in `scripts/generate-og.py`.

---

## How to update your summary

Two places, both in `src/data/profile.ts`:

- `profile.intro` — the paragraph in the hero.
- `profile.summary` — the lead line under the About heading.
- `aboutParagraphs` — the longer About prose. Add or remove array entries
  freely; the section renders however many you give it.

---

## How to add a new job

`src/data/experience.ts`. Copy an existing object, change the values, and put it
at the **top** of the array — the timeline renders newest first.

```ts
{
  id: "new-company",                    // any unique string
  company: "Example Company",
  role: "Senior Software Engineer",
  employmentType: "Full-time",          // optional; omit to hide the badge
  location: "Hyderabad, India",
  startDate: "01/2027",                 // "MM/YYYY" is auto-formatted to "Jan 2027"
  endDate: "Present",                   // "Present" turns the date pill green
  summary: "One line framing the company or the programme.",
  responsibilities: [
    "One bullet per idea.",
    "Keep them concrete and specific.",
  ],
  technologies: ["Java", "Spring Boot", "Kafka"],
  featured: true,                       // optional; adds the accent treatment
},
```

Only mark **one or two** roles as `featured` — the emphasis only works if it is
rare.

## How to remove a job

Delete its object from the array. Nothing else references it.

---

## How to add a project

`src/data/projects.ts` starts as an empty array, and the Projects section only
renders when there is at least one entry — so the site never shows an empty
shell. Add an object and the section appears:

```ts
export const projects: Project[] = [
  {
    title: "Example Project",
    description: "One or two sentences on what it does and why it exists.",
    technologies: ["Java", "Spring Boot", "Kafka"],
    github: "https://github.com/chandra1226/example",   // optional
    liveUrl: "https://example.com",                     // optional
    tag: "Open source",                                 // optional badge
  },
];
```

---

## How to add a skill

`src/data/skills.ts` — add a string to the right category:

```ts
{
  name: "Cloud & Infrastructure",
  icon: "container",
  description: "Packaging, shipping and running services.",
  skills: ["AWS", "Docker", "Kubernetes", "Helm", "CI/CD", "GitHub Actions", "Terraform"],
},
```

To add a whole new category, copy a block and pick an `icon` from the
`IconName` list in `src/data/types.ts`. The grid re-flows on its own, and the
last card stretches across the row when the count is odd.

---

## How to add an achievement

`src/data/achievements.ts`:

```ts
{
  value: 12,          // the number that counts up
  prefix: "",         // optional, e.g. "~"
  suffix: "%",        // optional, e.g. "%", "+", "-stage"
  label: "Short label",
  detail: "One line of context so the number is never ambiguous.",
},
```

Keep every figure defensible from your résumé. If you add or remove entries the
grid pads its last row automatically, so no empty tiles appear.

---

## How to update LinkedIn / GitHub / email / phone

`src/data/profile.ts` → `socialLinks`. The same array feeds the hero buttons,
the contact cards and the footer icons, plus the `sameAs` list in the
structured data that search engines read.

```ts
{
  label: "GitHub",
  href: "https://github.com/chandra1226",
  icon: "github",
  handle: "@chandra1226",   // the small line under the label
},
```

To add a new network (X, Stack Overflow, a blog):

1. Add the icon to `src/components/ui/Icon.tsx`.
2. Add its key to `IconName` in `src/data/types.ts`.
3. Add the object to `socialLinks`.

---

## How to replace your résumé

Drop the new PDF in as **`public/resume.pdf`**, replacing the old file. Keep the
name exactly `resume.pdf` and every download button keeps working.

To change the filename the browser suggests on download, edit
`profile.resumeFileName` in `src/data/profile.ts`.

---

## How to change the theme

All design tokens live at the top of `src/app/globals.css` in the `@theme`
block. Change a value there and the entire site follows — Tailwind generates
the utilities from these variables.

```css
@theme {
  --color-ink: #05070c;        /* page background        */
  --color-panel: #0b0f18;      /* cards                  */
  --color-line: #171d2a;       /* hairline borders       */
  --color-fg: #e9edf5;         /* headings               */
  --color-fg-muted: #99a3b8;   /* body copy              */
  --color-accent: #4d8dff;     /* primary accent         */
  --color-signal: #34d399;     /* the green "pass" state */
  --radius-card: 14px;
}
```

**A different accent colour** is a one-line change to `--color-accent` (and
`--color-accent-bright`, its hover shade).

**A different font**: `src/app/layout.tsx` imports IBM Plex Sans and IBM Plex
Mono from `next/font/google`. Swap the imports and keep the CSS variable names
(`--font-plex-sans`, `--font-plex-mono`) or update them in the `@theme` block
too.

If you change colours, re-check contrast. Body text should stay at 4.5:1 or
better against its background — `--color-fg-subtle` is deliberately tuned to
sit just above that line.

---

## The contact form

The form has **no backend**, on purpose. Rather than pretending to send, it
builds a `mailto:` link from the fields and opens the visitor's mail client,
and it says so under the button.

To wire up a real provider, edit `handleSubmit` in
`src/components/sections/ContactForm.tsx`:

```ts
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message }),
  });
};
```

Formspree, Web3Forms and Getform all work with a plain `fetch` and need no
server of your own — which matters, because this site is a fully static export
with no server runtime. Update the helper text under the button when you do,
so it stays truthful.

---

## Regenerating images (optional)

Both scripts need Python and Pillow (`pip install pillow`) and are entirely
optional — the committed images are already correct.

```bash
python scripts/generate-og.py       # rebuilds public/og.png (social preview)
python scripts/generate-icons.py    # rebuilds the favicon and apple icon
```

If you would rather not run them, just replace `public/og.png` with your own
1200×630 PNG.

---

## How to deploy changes

```bash
git add .
git commit -m "content: update experience"
git push
```

That is it. The `Build & Deploy` workflow in `.github/workflows/deploy.yml`
runs lint, type-check and build, then publishes to GitHub Pages. Watch it under
the repository's **Actions** tab; a green tick means the live site is updated,
usually within a couple of minutes.

Pull requests get the same lint/type-check/build run but are not published, so
you can open a PR to check a risky change before it goes live.

### Before you push (optional but quick)

```bash
npm run check
```

Runs lint, type-check and a production build — exactly what CI runs. If that
passes locally, the deploy will pass too.

---

## Adding a whole new section later

The pattern is deliberately repetitive so it is easy to copy:

1. Add the content type to `src/data/types.ts`.
2. Add the data file (or extend an existing one) and export it from
   `src/data/index.ts`.
3. Copy an existing section component from `src/components/sections/` —
   `EngineeringHighlights.tsx` is the simplest card grid — and point it at your
   data.
4. Render it in `src/app/page.tsx`.
5. If it should appear in the navbar, add `{ label: "...", id: "..." }` to
   `navItems` in `src/data/profile.ts`. The scroll-spy picks it up
   automatically; the `id` must match the section's `id`.

Section numbering (the `01`, `02`, … in the eyebrows) is passed as the `index`
prop to `SectionHeading`, so renumber the ones after it.
