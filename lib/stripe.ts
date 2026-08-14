/**
 * Stripe configuration
 *
 * LIVE KEYS: Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
 * TEST KEYS: Use sk_test_... and pk_test_... values from your Stripe dashboard
 *
 * To switch between test and live:
 *   - Test:  STRIPE_SECRET_KEY=sk_test_...   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
 *   - Live:  STRIPE_SECRET_KEY=sk_live_...   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 *
 * Webhook secret: set STRIPE_WEBHOOK_SECRET to the value from `stripe listen --print-secret`
 * or from your Stripe dashboard webhook configuration.
 */

import Stripe from "stripe";
import type { CartItem } from "@/types";
import { siteConfig } from "@/config/site";
import { getPrimaryImage } from "@/data/products";

// Server-side Stripe instance (never expose secret key to the browser)
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local - see .env.example for reference."
    );
  }
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export function cartItemsToLineItems(items: CartItem[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return items.map((item) => {
    const image = getPrimaryImage(item.product, item.variant.color);
    const imageUrl = image?.src.startsWith("http")
      ? image.src
      : image
      ? `${siteUrl}${image.src}`
      : undefined;
    const variantLabel = item.product.colors.length > 1
      ? `${item.variant.size} / ${item.variant.color}`
      : item.variant.size;

    return {
      price_data: {
        currency: "gbp",
        unit_amount: item.product.price,
        product_data: {
          name: `${item.product.name} - ${variantLabel}`,
          description: item.product.shortDescription,
          images: imageUrl ? [imageUrl] : [],
          metadata: {
            product_id: item.product.id,
            variant_id: item.variant.id,
            size: item.variant.size,
            color: item.variant.color,
          },
        },
      },
      quantity: item.quantity,
    };
  });
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: cartItemsToLineItems(items),
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    shipping_address_collection: {
      allowed_countries: ["GB", "IE", "US", "CA", "AU"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "gbp" },
          display_name: "Standard UK Delivery",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 499, currency: "gbp" },
          display_name: "Express Delivery",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 2 },
          },
        },
      },
    ],
    metadata: {
      brand: "CHAKDE",
      charity_contribution: "10% to British Heart Foundation",
      ...metadata,
    },
    custom_text: {
      submit: {
        message: "CHAKDE donates 10% of profits to the British Heart Foundation.",
      },
    },
    allow_promotion_codes: true,
  });

  return session;
}
