"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // EMAIL INTEGRATION POINT: POST to your email service (Resend, SendGrid, etc.)
    // For now, simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-muted flex items-center justify-center">
          <Check size={24} className="text-brand" />
        </div>
        <h3 className="font-bold text-foreground">Message sent!</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          We&apos;ll get back to you as soon as possible — usually within 1–2
          business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" id="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input-base"
          />
        </Field>
        <Field label="Email" id="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="input-base"
          />
        </Field>
      </div>

      <Field label="Subject" id="subject">
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="input-base"
        >
          <option value="">Select a topic</option>
          <option value="order">Order enquiry</option>
          <option value="returns">Returns / Refunds</option>
          <option value="wholesale">Wholesale</option>
          <option value="press">Press / Media</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help…"
          className="input-base resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold px-8 py-4 rounded-full hover:bg-brand hover:text-brand-foreground transition-colors text-sm disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
        <Send size={15} />
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
