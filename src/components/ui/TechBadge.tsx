import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  /** `signal` is the green "verified" treatment used on CI/testing tags. */
  tone?: "default" | "accent" | "signal";
  className?: string;
}

const tones: Record<NonNullable<TechBadgeProps["tone"]>, string> = {
  default: "border-line bg-white/[0.025] text-fg-muted",
  accent: "border-accent/25 bg-accent/10 text-accent-bright",
  signal: "border-signal/25 bg-signal/10 text-signal",
};

/** Small monospace pill used for technologies throughout the site. */
export function TechBadge({ label, tone = "default", className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-tight whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Renders a technology list as a wrapping row of badges. */
export function TechBadgeList({
  items,
  tone,
  className,
}: {
  items: readonly string[];
  tone?: TechBadgeProps["tone"];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <TechBadge label={item} tone={tone} />
        </li>
      ))}
    </ul>
  );
}
