"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice, getPrimaryImage } from "@/data/products";
import { slideFromRight } from "@/config/design-tokens";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } =
    useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm"
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <h2 className="font-sans font-semibold text-sm uppercase tracking-[0.12em]">
                  Your Bag ({totalItems})
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1.5 rounded-sm hover:bg-muted transition-colors"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
                  <ShoppingBag size={40} strokeWidth={1} className="text-muted-foreground/30" />
                  <div>
                    <p className="font-sans font-semibold text-sm uppercase tracking-wider">Your bag is empty</p>
                    <p className="text-xs text-muted-foreground mt-1 font-sans">
                      Add something motivating to get started.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-1 btn-dark text-[10px] px-6 py-3"
                  >
                    Browse the Collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => {
                    const image = getPrimaryImage(item.product, item.variant.color);
                    const variantLabel = item.product.colors.length > 1
                      ? `${item.variant.size} · ${item.variant.color}`
                      : item.variant.size;

                    return (
                    <li key={item.variant.id} className="py-5 flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-24 overflow-hidden bg-muted flex-shrink-0">
                        {image ? (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center text-[9px] text-muted-foreground font-display font-black uppercase">
                            CHAKDE
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-sans font-semibold text-xs uppercase tracking-wider hover:text-brand transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-sans uppercase tracking-wider">
                          {variantLabel}
                        </p>
                        <p className="text-sm font-bold mt-1 font-sans">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Qty + Remove */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus size={12} strokeWidth={2} />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold font-sans">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus size={12} strokeWidth={2} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variant.id)}
                            aria-label="Remove item"
                            className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors font-sans"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans">Subtotal</span>
                  <span className="font-bold text-base font-sans">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                  Shipping at checkout · 10% supports BHF
                </p>
                <CheckoutButton cartItems={items} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckoutButton({ cartItems }: { cartItems: ReturnType<typeof useCart>["items"] }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Stripe did not return a checkout URL");
    } catch (err) {
      toast.error("Checkout could not start", {
        description:
          err instanceof Error ? err.message : "Please check your Stripe keys and try again.",
      });
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full flex cursor-pointer items-center justify-center gap-2 bg-foreground text-background font-sans font-semibold text-[10px] uppercase tracking-widest py-5 hover:bg-brand hover:text-brand-foreground transition-colors focus-brand disabled:cursor-wait disabled:opacity-70"
    >
      {isLoading ? "Opening Checkout" : "Checkout"}
      <ArrowRight size={14} strokeWidth={2.5} />
    </button>
  );
}
