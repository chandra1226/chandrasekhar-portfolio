import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#04060c] hover:bg-accent-bright shadow-[0_10px_30px_-14px_var(--color-accent)]",
  secondary:
    "border border-line bg-white/[0.03] text-fg hover:border-line-strong hover:bg-white/[0.06]",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/[0.04]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

/**
 * Anchor styled as a button. External links get `rel="noreferrer"` and open in
 * a new tab automatically; in-page and `mailto:`/`tel:` links do not.
 */
export function LinkButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  href = "#",
  ...props
}: LinkButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/** Real `<button>` for in-page actions such as copy-to-clipboard. */
export function ActionButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
