import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { assetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_80%)]"
      />

      <div className="relative text-center">
        <p className="text-eyebrow text-accent">404</p>
        <h1 className="mt-4 text-[clamp(1.75rem,5vw,2.5rem)] font-semibold">
          This route was never built.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
          The page you asked for does not exist. Everything worth seeing is on the
          home page.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href={assetPath("/")} variant="primary">
            Back to the portfolio
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
