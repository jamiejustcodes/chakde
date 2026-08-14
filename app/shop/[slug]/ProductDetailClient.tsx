"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Info } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getImagesForColor } from "@/data/products";
import { cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import { staggerContainer, fadeUp } from "@/config/design-tokens";
import features from "@/config/features";
import { toast } from "sonner";

interface Props {
  product: Product;
  related: Product[];
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

export default function ProductDetailClient({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const { addItem, openCart } = useCart();

  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.color, v])).values()
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    uniqueColors[0]?.color ?? product.colors[0]
  );

  const hasColorOptions = uniqueColors.length > 1;
  const displayedImages = getImagesForColor(product, selectedColor);

  const availableSizesForColor = product.variants
    .filter((v) => !hasColorOptions || v.color === selectedColor)
    .map((v) => ({ size: v.size, inStock: v.inStock }));

  const selectedVariant: ProductVariant | undefined = product.variants.find(
    (v) =>
      (!hasColorOptions || v.color === selectedColor) &&
      v.size === selectedSize
  );

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (!selectedVariant) return;
    addItem(product, selectedVariant);
    const variantDescription = hasColorOptions
      ? `${selectedSize} / ${selectedColor}`
      : `${selectedSize}`;
    toast.success("Added to cart", {
      description: `${product.shortName} · ${variantDescription}`,
      action: { label: "View Cart", onClick: openCart },
    });
    openCart();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] text-muted-foreground font-sans uppercase tracking-[0.12em]">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft size={12} strokeWidth={2.5} />
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground font-semibold" aria-current="page">
                {product.shortName ?? product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-2">
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              {displayedImages[activeImage] ? (
                <Image
                  src={displayedImages[activeImage].src}
                  alt={displayedImages[activeImage].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-6xl text-muted-foreground/10 uppercase">
                    CHAKDE
                  </span>
                </div>
              )}
              {/* Sold out overlay */}
              {!product.isAvailable && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] bg-foreground text-background px-5 py-2.5 font-sans">
                    Sold Out
                  </span>
                </div>
              )}
              {/* Badge top-left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] bg-brand text-brand-foreground px-2.5 py-1 font-sans">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] bg-foreground text-background px-2.5 py-1 font-sans">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {displayedImages.length > 1 && (
              <div className="flex gap-2">
                {displayedImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      "relative w-20 h-24 overflow-hidden bg-muted transition-all",
                      activeImage === i
                        ? "ring-2 ring-brand ring-offset-2"
                        : "opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-24 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[0.9] text-foreground mb-3 uppercase">
                {product.name}
              </h1>

              <p className="text-2xl font-bold text-foreground mb-6 font-sans">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-sans">
                {product.description}
              </p>

              {/* Color selector */}
              {hasColorOptions && (
                <div className="mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground mb-3 font-sans">
                    Colour:{" "}
                    <span className="text-muted-foreground font-normal">{selectedColor}</span>
                  </p>
                  <div className="flex gap-2" role="radiogroup" aria-label="Select colour">
                    {uniqueColors.map((v) => {
                      const light = isLightColor(v.colorHex);
                      return (
                        <button
                          key={v.color}
                          role="radio"
                          aria-checked={selectedColor === v.color}
                          onClick={() => {
                            setSelectedColor(v.color);
                            setSelectedSize(null);
                            setActiveImage(0);
                          }}
                          title={v.color}
                          className={cn(
                            "w-8 h-8 border-2 transition-all",
                            selectedColor === v.color
                              ? "border-foreground scale-110"
                              : light
                              ? "border-border hover:border-foreground"
                              : "border-transparent hover:border-muted-foreground"
                          )}
                          style={{ backgroundColor: v.colorHex }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-[0.18em] font-sans",
                      sizeError && !selectedSize ? "text-destructive" : "text-foreground"
                    )}
                  >
                    Size{sizeError && !selectedSize ? " — Please select a size" : ""}
                  </p>
                  {features.sizeGuide && (
                    <button className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors font-sans">
                      <Info size={11} strokeWidth={2} />
                      Size guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
                  {availableSizesForColor.map(({ size, inStock }) => (
                    <button
                      key={size}
                      role="radio"
                      aria-checked={selectedSize === size}
                      disabled={!inStock}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={cn(
                        "min-w-[52px] h-12 px-3 text-xs font-semibold uppercase tracking-wider border transition-all font-sans",
                        !inStock && "opacity-30 cursor-not-allowed line-through",
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : inStock
                          ? "bg-background text-foreground border-border hover:border-foreground"
                          : "bg-muted text-muted-foreground border-border"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                className={cn(
                  "w-full flex items-center justify-center gap-3 py-5 font-sans font-semibold text-xs uppercase tracking-widest transition-all",
                  product.isAvailable
                    ? "bg-foreground text-background hover:bg-brand hover:text-brand-foreground active:scale-[0.99]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {product.isAvailable ? "Add to Cart" : "Sold Out"}
              </button>

              {/* Charity note */}
              <p className="text-center text-[10px] text-muted-foreground mt-4 font-sans uppercase tracking-wider">
                10% of this purchase supports the British Heart Foundation
              </p>

              {/* Product details */}
              <div className="mt-8 pt-8 border-t border-border space-y-3">
                <div className="flex gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24 flex-shrink-0 font-sans">Category</span>
                  <span className="text-xs capitalize text-foreground font-sans">{product.category}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24 flex-shrink-0 font-sans">SKU</span>
                  <span className="text-xs text-foreground font-sans">{product.id}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        {features.relatedProducts && related.length > 0 && (
          <section className="mt-20 lg:mt-28 pt-12 border-t border-border" aria-labelledby="related-heading">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
                <h2
                  id="related-heading"
                  className="font-display font-black text-3xl lg:text-4xl leading-tight text-foreground"
                >
                  You May Also Like
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
