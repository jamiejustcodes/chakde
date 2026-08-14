"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CharitySection() {
  return (
    <section
      className="py-20 lg:py-28 bg-surface-blue relative overflow-hidden"
      aria-labelledby="charity-heading"
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-8 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <span className="font-display font-black text-[220px] lg:text-[320px] leading-none text-foreground/[0.04] select-none">
          10%
        </span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4 font-sans">
            Giving Back
          </p>

          <h2
            id="charity-heading"
            className="font-display font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-foreground mb-8"
          >
            Every Purchase
            <br />
            Gives Back.
          </h2>

          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-xl mb-10 font-sans">
            We&apos;re proud to donate {siteConfig.charity.percentage}% of our profits to the{" "}
            <a
              href={siteConfig.charity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-foreground hover:opacity-60 transition-opacity"
            >
              {siteConfig.charity.name}
            </a>
            . Because being strong means lifting others up, too.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn-brand">
              Shop & Give Back
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
            <a
              href={siteConfig.charity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              About {siteConfig.charity.name}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
