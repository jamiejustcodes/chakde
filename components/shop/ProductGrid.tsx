"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/config/design-tokens";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="col-span-full py-24 text-center">
        <p className="text-muted-foreground text-sm">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5"
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 3} />
      ))}
    </motion.div>
  );
}
