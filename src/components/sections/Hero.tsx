import type { CSSProperties } from "react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Terminal, type TerminalLine } from "@/components/ui/Terminal";
import { profile, socialLinks } from "@/data";
import { assetPath } from "@/lib/utils";

/** Illustrative transcript — see the caption under the panel. */
const transcript: TerminalLine[] = [
  { kind: "command", text: "initialize-environment" },
  { kind: "ok", text: "container ready" },
  { kind: "ok", text: "verifier loaded" },
  { kind: "ok", text: "tests running" },
  { kind: "ok", text: "mutation suite passed" },
  { kind: "ok", text: "evaluation complete" },
];

const github = socialLinks.find((link) => link.label === "GitHub");
const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

/** Staggers the hero entrance; see the `.enter` rules in globals.css. */
const stagger = (seconds: number): CSSProperties =>
  ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* --- Background ------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[880px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(77,141,255,0.16),transparent_65%)] blur-2xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[380px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.07),transparent_70%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-10 lg:pt-40 lg:pb-32">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* --- Copy --------------------------------------------------- */}
          <div>
            <div className="enter flex" style={stagger(0)}>
              <span className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-2.5 text-[0.75rem] text-fg-muted">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                {profile.availability}
              </span>
            </div>

            <h1
              className="enter mt-7 text-[clamp(2.375rem,7vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
              style={stagger(0.08)}
            >
              <span className="text-gradient">Senior Software</span>
              <br />
              <span className="text-gradient">Engineer</span>
            </h1>

            <p
              className="enter mt-6 max-w-xl text-[1.0625rem] leading-[1.6] font-medium text-fg sm:text-[1.1875rem]"
              style={stagger(0.16)}
            >
              {profile.tagline}
            </p>

            <p
              className="enter mt-4 max-w-xl text-[0.9375rem] leading-[1.75] text-fg-muted sm:text-base"
              style={stagger(0.22)}
            >
              {profile.intro}
            </p>

            {/* Primary actions */}
            <div
              className="enter mt-9 flex flex-wrap items-center gap-2.5"
              style={stagger(0.3)}
            >
              <LinkButton href="#engineering" variant="primary">
                View my work
                <ArrowDown
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </LinkButton>

              <LinkButton
                href={assetPath(profile.resumePath)}
                download={profile.resumeFileName}
                variant="secondary"
              >
                <Download size={15} strokeWidth={1.8} aria-hidden="true" />
                Download résumé
              </LinkButton>
            </div>

            {/* Secondary actions — deliberately a size down, so the two rows
                read as a hierarchy rather than as five equal buttons that
                happened to wrap. */}
            <div
              className="enter mt-3 flex flex-wrap items-center gap-2"
              style={stagger(0.34)}
            >
              {github ? (
                <LinkButton
                  href={github.href}
                  variant="ghost"
                  size="sm"
                  className="border border-line"
                >
                  <Icon name="github" size={14} />
                  GitHub
                </LinkButton>
              ) : null}

              {linkedin ? (
                <LinkButton
                  href={linkedin.href}
                  variant="ghost"
                  size="sm"
                  className="border border-line"
                >
                  <Icon name="linkedin" size={14} />
                  LinkedIn
                </LinkButton>
              ) : null}

              <LinkButton
                href="#contact"
                variant="ghost"
                size="sm"
                className="border border-line"
              >
                Contact me
              </LinkButton>
            </div>

            {/* Meta strip */}
            <div
              className="enter mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[0.75rem] text-fg-subtle"
              style={stagger(0.38)}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} strokeWidth={1.7} aria-hidden="true" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                Java · Python · Kafka · Kubernetes
              </span>
            </div>
          </div>

          {/* --- Terminal ----------------------------------------------- */}
          <div className="enter relative" style={stagger(0.24)}>
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(77,141,255,0.12),transparent_70%)]"
            />
            <Terminal
              title="dynamo/evaluation-run"
              lines={transcript}
              caption="Conceptual visual representing the evaluation workflow described below — not a transcript of any real or proprietary system."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
