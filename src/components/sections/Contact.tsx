import { ArrowUpRight, Download } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { profile, socialLinks } from "@/data";
import { assetPath } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let us talk about the role."
        description="Open to senior backend and platform engineering roles. The fastest route is email — I read everything."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        {/* --- Details ------------------------------------------------- */}
        <Reveal direction="right">
          <div className="flex h-full flex-col rounded-card border border-line bg-panel p-6 shadow-panel sm:p-8">
            <div>
              <h3 className="text-xl leading-tight font-semibold text-fg">{profile.name}</h3>
              <p className="mt-1.5 text-[0.9375rem] text-accent-bright">{profile.title}</p>
              <p className="mt-1 font-mono text-[0.75rem] text-fg-subtle">{profile.location}</p>
            </div>

            <ul className="mt-7 space-y-2.5">
              {socialLinks.map((link) => {
                const copyable = link.label === "Email" || link.label === "Phone";
                const copyValue = link.label === "Email" ? profile.email : profile.phone;

                return (
                  <li key={link.label} className="flex items-center gap-2">
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="group flex min-w-0 flex-1 items-center gap-3.5 rounded-lg border border-line bg-white/[0.02] px-4 py-3 transition-[border-color,background-color] duration-200 hover:border-line-strong hover:bg-white/[0.05]"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-subtle transition-colors duration-200 group-hover:text-accent">
                        <Icon name={link.icon} size={15} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.875rem] text-fg">
                          {link.handle}
                        </span>
                      </span>

                      {link.href.startsWith("http") ? (
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.8}
                          aria-hidden="true"
                          className="shrink-0 text-fg-subtle transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      ) : null}
                    </a>

                    {copyable ? (
                      <CopyButton
                        value={copyValue}
                        label={`Copy ${link.label.toLowerCase()}`}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 border-t border-line pt-6">
              <LinkButton
                href={assetPath(profile.resumePath)}
                download={profile.resumeFileName}
                variant="secondary"
                className="w-full"
              >
                <Download size={15} strokeWidth={1.8} aria-hidden="true" />
                Download résumé (PDF)
              </LinkButton>
            </div>
          </div>
        </Reveal>

        {/* --- Form ---------------------------------------------------- */}
        <Reveal direction="left" delay={0.08}>
          <div className="h-full rounded-card border border-line bg-panel p-6 shadow-panel sm:p-8">
            <h3 className="text-eyebrow text-fg-subtle">Send a message</h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
