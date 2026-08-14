"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, getPrimaryImage } from "@/data/products";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types";
import { fadeUp } from "@/config/design-tokens";

interface Props {
  product: Product;
  priority?: boolean;
}

function isLightColor(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const full = normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addItem, openCart } = useCart();
  const defaultVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];
  const isOutOfStock = !product.variants.some((v) => v.inStock);
  const uniqueVariants = product.variants.filter((v, i, arr) => arr.findIndex((x) => x.color === v.color) === i);
  const primaryImage = getPrimaryImage(product, defaultVariant?.color);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!defaultVariant || isOutOfStock) return;
    addItem(product, defaultVariant);
    openCart();
  }

  return (
    <motion.article variants={fadeUp} className="group">
      <Link
        href={`/shop/${product.slug}`}
        className="block focus-brand"
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
      >
        {/* Image container */}
        <div className="relative aspect-product overflow-hidden bg-[#F5F5F5] mb-3">
          {primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]">
              <span className="font-display font-black text-3xl text-foreground/10 uppercase tracking-tighter">
                CHAKDE
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5" aria-label="Product badges">
            {isOutOfStock && (
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] bg-foreground/80 text-background px-2 py-0.5 font-sans">
                Sold Out
              </span>
            )}
            {product.isNew && !isOutOfStock && (
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] bg-foreground text-background px-2 py-0.5 font-sans">
                New
              </span>
            )}
            {product.isBestSeller && !isOutOfStock && (
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] bg-foreground/75 text-background px-2 py-0.5 font-sans">
                Best Seller
              </span>
            )}
          </div>

          {/* QUICK ADD bar — slides up on hover */}
          {!isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              aria-label={`Quick add ${product.name} to cart`}
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-foreground text-background",
                "text-[10px] font-semibold uppercase tracking-[0.15em] py-3 font-sans",
                "translate-y-full group-hover:translate-y-0",
                "transition-transform duration-200 ease-out",
                "hover:bg-foreground/85"
              )}
            >
              Quick Add
            </button>
          )}
        </div>

        {/* Product info */}
        <div>
          <h3 className="font-sans text-xs font-semibold text-foreground group-hover:opacity-55 transition-opacity line-clamp-1 uppercase tracking-wider">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                "text-sm font-bold font-sans",
                isOutOfStock ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {formatPrice(product.price)}
            </span>
            {isOutOfStock && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans">
                Sold out
              </span>
            )}
          </div>
          {uniqueVariants.length > 1 && (
            <div className="flex gap-1 mt-2" aria-label="Available colours">
              {uniqueVariants.map((v) => (
                <span
                  key={v.color}
                  title={v.color}
                  style={{ backgroundColor: v.colorHex }}
                  className={cn(
                    "w-3 h-3 border",
                    isLightColor(v.colorHex) ? "border-border" : "border-border/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
