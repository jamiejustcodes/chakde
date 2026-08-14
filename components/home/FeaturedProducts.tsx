"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/config/design-tokens";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="py-20 lg:py-28 bg-surface-blue" aria-labelledby="featured-heading">
      <div className="container mx-auto px-4 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 lg:mb-16"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4 font-sans">
              The Collection
            </p>
            <h2
              id="featured-heading"
              className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-foreground"
            >
              Featured
              <br />
              Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors group font-sans pb-1 border-b border-transparent hover:border-foreground"
            aria-label="View all products"
          >
            View All
            <ArrowRight
              size={13}
              strokeWidth={2.5}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5"
        >
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:hidden"
        >
          <Link href="/shop" className="btn-dark w-full text-center">
            Shop All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
