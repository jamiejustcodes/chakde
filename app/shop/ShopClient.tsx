"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";
import features from "@/config/features";
import type { ProductCategory } from "@/types";
import { staggerContainer, fadeUp } from "@/config/design-tokens";

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "t-shirt", label: "T-Shirts" },
  { value: "hoodie", label: "Hoodies" },
  { value: "vest", label: "Vests" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    let result = products;
    if (!features.showOutOfStock) {
      result = result.filter((p) => p.variants.some((v) => v.inStock));
    }
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === (activeCategory as ProductCategory));
    }
    return result;
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Collection hero banner */}
      <div className="bg-foreground text-background py-14 lg:py-20 relative overflow-hidden">
        {/* Decorative right watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden>
          <span className="font-display font-black text-[120px] lg:text-[200px] leading-none text-white/[0.04] uppercase select-none">
            SHOP
          </span>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-4 lg:px-8 relative z-10"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand mb-3 font-sans">
            / The Collection
          </p>
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-background">
            All Products
          </h1>
          <p className="mt-4 text-background/50 text-sm max-w-md leading-relaxed font-sans">
            Built for movement. Made to inspire. Every purchase supports the British Heart Foundation.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-2 flex-wrap mb-10"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] font-sans transition-colors rounded-sm ${
                activeCategory === cat.value
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-2 opacity-40">
                  {products.filter((p) => p.category === cat.value).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <ProductGrid products={filtered} />
        </motion.div>
      </div>
    </div>
  );
}
