"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  /** Announced to screen readers, e.g. "Copy email address". */
  label: string;
  className?: string;
}

/**
 * Copy-to-clipboard with a two-second confirmation.
 *
 * Falls back to a hidden textarea + `execCommand` where the async Clipboard API
 * is unavailable (older Safari, or any non-secure origin).
 */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      setCopied(true);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied outright; the address stays visible and
      // selectable next to the button, so there is nothing to recover from.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-subtle transition-colors duration-200 hover:border-line-strong hover:text-fg",
        copied && "border-signal/35 text-signal",
        className,
      )}
    >
      {copied ? (
        <Check size={14} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={14} strokeWidth={1.7} aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
