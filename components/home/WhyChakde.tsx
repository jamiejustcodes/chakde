"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/config/design-tokens";

const values = [
  {
    num: "01",
    title: "Energy & Encouragement",
    body: "The word CHAKDE comes from Punjabi — a rallying cry. It means you're capable, you're ready, and you've got this. We put that spirit into every stitch.",
  },
  {
    num: "02",
    title: "Built for Everyone",
    body: "No gatekeeping. No body type requirements. CHAKDE is for anyone who shows up and puts in the work, regardless of where they started.",
  },
  {
    num: "03",
    title: "10% to British Heart Foundation",
    body: "Every purchase is an act of giving. We donate 10% of profits to the British Heart Foundation — because community means looking out for each other.",
  },
  {
    num: "04",
    title: "Premium Quality",
    body: "Engineered for performance, designed for life beyond the gym. Pieces that move with you, wash well, and hold their shape for the long run.",
  },
];

export default function WhyChakde() {
  return (
    <section
      className="py-20 lg:py-28 bg-foreground text-background overflow-hidden"
      aria-labelledby="why-chakde-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-background/35 mb-4 font-sans">
              Why CHAKDE
            </p>
            <h2
              id="why-chakde-heading"
              className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-background"
            >
              More Than
              <br />
              A Brand.
            </h2>
          </div>
          <p className="text-sm text-background/50 max-w-sm leading-relaxed lg:text-right font-sans">
            A movement built on Punjabi spirit, community strength, and the belief that
            what you wear should mean something.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {values.map((value) => (
            <motion.div
              key={value.num}
              variants={fadeUp}
              className="group grid grid-cols-[56px_1fr] lg:grid-cols-[80px_1fr_1fr] gap-4 lg:gap-8 py-7 lg:py-8 border-t border-white/10 last:border-b"
            >
              <span className="font-display font-black text-xl lg:text-2xl text-background/20 leading-none pt-0.5">
                {value.num}
              </span>

              <h3 className="font-display font-black text-2xl lg:text-3xl text-background leading-tight uppercase group-hover:opacity-60 transition-opacity self-start">
                {value.title}
              </h3>

              <p className="text-sm text-background/50 leading-relaxed col-start-2 lg:col-start-3 font-sans">
                {value.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
