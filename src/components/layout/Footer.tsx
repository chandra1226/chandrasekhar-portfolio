import { Icon } from "@/components/ui/Icon";
import { navItems, profile, socialLinks } from "@/data";

export function Footer() {
  const year = new Date().getFullYear();
  const externalLinks = socialLinks.filter((link) => link.href.startsWith("http"));

  return (
    <footer className="relative border-t border-line bg-ink-soft">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-2.5 rounded-md">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-panel font-mono text-[0.8125rem] font-medium text-accent"
              >
                BC
              </span>
              <span className="text-sm font-medium text-fg">{profile.name}</span>
            </a>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-fg-subtle">
              {profile.tagline}
            </p>
          </div>

          {/* Site map */}
          <nav aria-label="Footer" className="min-w-0">
            <h2 className="text-eyebrow text-fg-subtle">Sections</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 md:grid-cols-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <h2 className="text-eyebrow text-fg-subtle">Elsewhere</h2>
            <ul className="mt-4 flex gap-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${link.label} profile`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.02] text-fg-subtle transition-[border-color,color,background-color] duration-200 hover:border-line-strong hover:bg-white/[0.05] hover:text-fg"
                  >
                    <Icon name={link.icon} size={16} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.02] text-fg-subtle transition-[border-color,color,background-color] duration-200 hover:border-line-strong hover:bg-white/[0.05] hover:text-fg"
                >
                  <Icon name="mail" size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-fg-subtle">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] text-fg-subtle">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
