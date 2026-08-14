"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { staggerContainer, fadeUp } from "@/config/design-tokens";

/**
 * NOTE: No verified customer reviews were found on the current chakdelife.co.uk site.
 * These are placeholder entries that MUST be replaced with real verified reviews
 * before going live. Set features.testimonials = false until real data is available.
 */
const REVIEWS_PLACEHOLDER = [
  {
    id: "r1",
    name: "Marcus T.",
    location: "Birmingham",
    rating: 5,
    text: "The hoodie is incredible — heavy weight, perfect fit and the message actually hits different when you're having a tough morning.",
  },
  {
    id: "r2",
    name: "Priya S.",
    location: "London",
    rating: 5,
    text: "Love that the brand gives back. Quality is top-tier and knowing 10% goes to BHF makes wearing it feel even better.",
  },
  {
    id: "r3",
    name: "Jordan K.",
    location: "Manchester",
    rating: 5,
    text: "Wearing CHAKDE to every session now. The vest fits perfectly for lifting, and 'You've Got This' is an unexpected confidence boost.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20 lg:py-28 bg-surface-blue"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4 font-sans">
            Community
          </p>
          <h2
            id="testimonials-heading"
            className="font-display font-black text-5xl md:text-6xl leading-[0.9] text-foreground"
          >
            People Who
            <br />
            Show Up.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {REVIEWS_PLACEHOLDER.map((review) => (
            <motion.div
              key={review.id}
              variants={fadeUp}
              className="bg-background border border-border p-7 flex flex-col gap-5"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-foreground fill-foreground" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground leading-relaxed flex-1 font-sans">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider font-sans">
                  {review.name}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans">
                  {review.location}
                </p>
              </footer>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-[10px] text-muted-foreground mt-8 font-sans uppercase tracking-wider opacity-40">
          * Placeholder reviews — replace with real verified customer reviews before launch.
        </p>
      </div>
    </section>
  );
}
