"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      className="py-20 lg:py-24 bg-foreground"
      aria-labelledby="newsletter-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
        >
          <div className="max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-background/35 mb-4 font-sans">
              Stay in the Loop
            </p>
            <h2
              id="newsletter-heading"
              className="font-display font-black text-4xl lg:text-5xl leading-[0.9] text-background mb-3"
            >
              Join the
              <br />
              Community.
            </h2>
            <p className="text-xs text-background/40 leading-relaxed font-sans">
              New drops, early access, and occasional motivation. No spam — just energy.
            </p>
          </div>

          <div className="max-w-md w-full lg:flex-1">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-background font-semibold font-sans"
              >
                <span className="w-8 h-8 flex items-center justify-center border border-background/20">
                  <Check size={15} className="text-background" />
                </span>
                You&apos;re in. Let&apos;s go.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-0"
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-4 bg-white/8 border border-white/15 text-background text-sm placeholder:text-background/30 focus:outline-none focus:border-white/50 transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-sans font-bold text-[11px] uppercase tracking-[0.08em] px-7 py-4 hover:opacity-85 transition-opacity disabled:opacity-60 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : (
                    <>
                      Subscribe
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
