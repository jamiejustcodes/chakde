"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getPrimaryImage } from "@/data/products";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function handleCheckout() {
    if (isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
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
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight text-foreground mb-10">
          Your Cart{" "}
          {totalItems > 0 && (
            <span className="text-muted-foreground font-medium text-2xl">
              ({totalItems})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <ShoppingBag size={64} className="text-muted-foreground/20" />
            <div>
              <p className="font-semibold text-lg">Your cart is empty</p>
              <p className="text-muted-foreground text-sm mt-1">
                Looks like you haven&apos;t added anything yet.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-7 py-3.5 rounded-full hover:bg-brand hover:text-brand-foreground transition-colors text-sm"
            >
              Browse the Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <ul className="divide-y divide-border">
                {items.map((item) => {
                  const image = getPrimaryImage(item.product, item.variant.color);
                  const variantLabel = item.product.colors.length > 1
                    ? `${item.variant.size} · ${item.variant.color}`
                    : item.variant.size;

                  return (
                  <li key={item.variant.id} className="py-6 flex gap-5">
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                          CHAKDE
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="font-semibold text-sm hover:text-brand transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {variantLabel}
                          </p>
                        </div>
                        <p className="font-bold text-sm flex-shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.variant.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variant.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variant.id)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="font-bold text-base text-foreground mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-brand">
                      {subtotal >= 5000 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border mt-5 pt-5 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-6 flex cursor-pointer items-center justify-center gap-2 bg-foreground text-background font-semibold py-4 rounded-xl hover:bg-brand hover:text-brand-foreground transition-colors disabled:cursor-wait disabled:opacity-70"
                >
                  {isCheckingOut ? "Opening Checkout" : "Checkout"}
                  <ArrowRight size={16} />
                </button>

                <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
                  ❤️ 10% of your order goes to the British Heart Foundation.
                  Secure checkout powered by Stripe.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
