"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/config/design-tokens";

export default function Hero() {
  return (
    <section
      className="relative bg-background min-h-[100svh] flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* White right panel */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[38%] hidden lg:block bg-white"
        aria-hidden
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-24 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full lg:max-w-[52%]"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-8 font-sans"
          >
            Premium Athletic Clothing · Walsall, UK
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black uppercase text-foreground leading-[0.88] mb-7"
            style={{ fontSize: "clamp(76px, 11.5vw, 152px)", letterSpacing: "-0.01em" }}
          >
            <span className="block">YOU&apos;VE</span>
            <span className="block">GOT</span>
            <span className="block">THIS.</span>
          </motion.h1>

          {/* Rule */}
          <motion.div variants={fadeUp} className="w-10 h-px bg-border mb-7" />

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-muted-foreground max-w-[400px] leading-relaxed mb-10 font-sans"
          >
            CHAKDE — from the Punjabi word for encouragement and energy.
            Premium gear for people who show up and give back. 10% of every
            purchase goes to the British Heart Foundation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 items-center mb-14"
          >
            <Link href="/shop" className="btn-brand">
              Shop the Collection
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
            <Link href="/about" className="btn-outline">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 pt-8 border-t border-border"
          >
            {[
              { value: "10%", label: "Profits to BHF" },
              { value: "6", label: "Products" },
              { value: "100%", label: "Community driven" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-black text-[32px] text-foreground leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-[0.15em] font-sans">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/20"
        aria-hidden
      >
        <span className="text-[8px] uppercase tracking-[0.3em] font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-foreground/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
