"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";
import { profile } from "@/data";

const fieldClass =
  "w-full rounded-lg border border-line bg-ink/60 px-3.5 py-2.5 text-[0.875rem] text-fg " +
  "placeholder:text-fg-subtle transition-colors duration-200 " +
  "hover:border-line-strong focus:border-accent/50 focus:outline-none";

const labelClass = "mb-2 block font-mono text-[0.6875rem] tracking-wide text-fg-subtle";

/**
 * Contact form with no backend.
 *
 * There is deliberately no API route or third-party form service wired up, so
 * rather than pretending to submit, this composes a `mailto:` link from the
 * fields and hands it to the visitor's mail client. The form is honest about
 * that in the helper text below the button.
 *
 * To switch to a real provider (Formspree, Resend, Web3Forms...), replace the
 * body of `handleSubmit` with a fetch to your endpoint — see CONTENT_GUIDE.md.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [message.trim(), "", "—", name.trim(), email.trim()].filter(
      (line, index) => index < 2 || line !== "",
    );

    const href =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(subject.trim() || `Portfolio enquiry from ${name.trim() || "a visitor"}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    setOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Senior Backend Engineer role"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="A few lines about the role or the problem you are solving."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <ActionButton type="submit" variant="primary">
          <Send size={15} strokeWidth={1.8} aria-hidden="true" />
          Compose email
        </ActionButton>

        <p className="max-w-xs font-mono text-[0.6875rem] leading-relaxed text-fg-subtle">
          {opened
            ? "Your mail client should have opened with the message ready to send."
            : "Opens your own mail app with this message pre-filled — nothing is sent from this site."}
        </p>
      </div>
    </form>
  );
}
