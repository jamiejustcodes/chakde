"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { staggerContainer, fadeUp } from "@/config/design-tokens";
import { siteConfig } from "@/config/site";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Icon */}
          <motion.div variants={fadeUp}>
            <div className="w-20 h-20 rounded-full bg-brand-muted flex items-center justify-center">
              <CheckCircle size={40} className="text-brand" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
              Thank you for your order. You&apos;ll receive a confirmation email
              shortly with your order details and tracking information.
            </p>
          </motion.div>

          {/* Charity callout */}
          <motion.div
            variants={fadeUp}
            className="bg-brand-muted border border-brand/10 rounded-2xl p-6 w-full max-w-sm flex items-start gap-4"
          >
            <Heart size={20} className="text-brand fill-brand flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                Thank you for giving back
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {siteConfig.charity.percentage}% of your purchase will be
                donated to the{" "}
                <a
                  href={siteConfig.charity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  {siteConfig.charity.name}
                </a>
                . You&apos;ve made a difference.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-7 py-3.5 rounded-full hover:bg-brand hover:text-brand-foreground transition-colors text-sm"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-border text-muted-foreground font-medium px-7 py-3.5 rounded-full hover:border-foreground hover:text-foreground transition-colors text-sm"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
