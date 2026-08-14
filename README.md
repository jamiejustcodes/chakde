# CHAKDE — Production-Ready Ecommerce Site

Premium athletic clothing brand website built with Next.js 15, Tailwind CSS, shadcn/ui, Framer Motion, and Stripe.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment file and fill in your keys
cp .env.example .env.local

# 3. Run the development server
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your site's public URL (no trailing slash) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` or `sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...` or `pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |

**Switching between test and live Stripe:**
- Test: use `sk_test_...` / `pk_test_...` keys
- Live: swap to `sk_live_...` / `pk_live_...` — no code changes needed

---

## Project Structure

```
chakde/
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── shop/                # Shop listing + product detail
│   │   ├── page.tsx
│   │   └── [slug]/          # Product detail page
│   ├── cart/page.tsx        # Cart page (used when cartDrawer = false)
│   ├── checkout/            # Success + cancel pages
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── shipping/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx        # Custom 404
│   ├── sitemap.ts           # Auto-generated sitemap
│   ├── robots.ts            # robots.txt
│   ├── layout.tsx           # Root layout
│   └── api/
│       ├── checkout/        # POST → create Stripe session
│       └── webhooks/stripe/ # Stripe webhook handler
├── components/
│   ├── layout/              # Navbar, Footer, AnnouncementBar
│   ├── home/                # All homepage sections
│   ├── shop/                # ProductCard, ProductGrid
│   └── cart/                # CartDrawer
├── config/
│   ├── features.ts          # Feature flags ← EDIT HERE
│   ├── site.ts              # Brand config, nav, footer links
│   └── design-tokens.ts     # Framer Motion variants
├── data/
│   └── products.ts          # Product catalog ← ADD PRODUCTS HERE
├── lib/
│   ├── cart.tsx             # Cart context (useCart hook)
│   ├── stripe.ts            # Stripe helpers
│   ├── seo.ts               # Metadata builders + JSON-LD
│   └── utils.ts             # cn() utility
└── types/
    └── index.ts             # TypeScript types
```

---

## Feature Flags

Edit `config/features.ts` to toggle sections on/off:

```ts
const features = {
  announcementBar: true,   // top delivery/charity bar
  charitySection: true,    // homepage charity section
  testimonials: true,      // homepage reviews (replace placeholders first!)
  newsletter: true,        // homepage email signup
  instagramGallery: false, // IG grid (needs API token)
  sizeGuide: true,         // size guide modal on PDP
  relatedProducts: true,   // related products on PDP
  cartDrawer: true,        // true = slide drawer, false = /cart page
  showOutOfStock: true,    // show OOS products
};
```

---

## Product Data

All products live in `data/products.ts`. To add or edit a product:

1. Add a new entry following the `Product` type in `types/index.ts`
2. Add corresponding product images to `public/images/products/`
3. The shop page, product pages, sitemap, and structured data all update automatically

**CMS Integration Point:** Replace the `products` array export with a fetch from
Contentful / Sanity / Shopify Storefront API. The `Product` type is the stable contract.

---

## Stripe Webhooks (Local Dev)

```bash
# Install Stripe CLI
# https://docs.stripe.com/stripe-cli

# Start the local webhook listener
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook secret printed to the terminal into .env.local:
STRIPE_WEBHOOK_SECRET=whsec_...
```

To add Apple Pay / Google Pay: enable the Payment Request Button in Stripe dashboard
and update `payment_method_types` in `lib/stripe.ts`.

---

## Deploying

### Vercel (recommended)

```bash
vercel deploy
```

Add all environment variables in the Vercel dashboard under Project Settings → Environment Variables.

### Other platforms

Build the production app:
```bash
npm run build
npm start
```

---

## Assumptions & TODOs

### Prices (CONFIRM FROM LIVE SITE)
The following prices are estimates — update them in `data/products.ts`:
- T-shirts: £24.99 (2499 pence)
- Hoodies: £44.99 (4499 pence)
- Vests: £19.99 (1999 pence)

### Product Images
Replace placeholder image paths in `data/products.ts` with real CDN URLs or
add actual images to `public/images/products/`. Current paths follow the pattern:
`/images/products/{slug}-front.jpg`

### Sizes & Colors
Sizes (S/M/L/XL) and colors (Black/White/Grey) are assumed from the product names.
Confirm the actual available variants from the Wix/current site admin and update
the `variants` array in each product.

### Testimonials
`components/home/Testimonials.tsx` contains placeholder reviews — these must be
replaced with real verified customer reviews before going live, or set
`features.testimonials = false` in `config/features.ts`.

### Contact Form
The contact form in `app/contact/ContactForm.tsx` simulates submission.
Wire it up to Resend, SendGrid, or another email API.

### Newsletter
The newsletter form in `components/home/Newsletter.tsx` simulates signup.
Wire it up to Klaviyo, Mailchimp, or another ESP.

### Instagram Gallery
`features.instagramGallery = false` by default. Enable once you have an
Instagram Basic Display API token and add the fetch logic.

### OG Image
Add a branded `/public/og-default.jpg` (1200×630px) for social sharing.

---

## Architecture Decisions

1. **App Router + Server Components** — pages are server components by default,
   keeping client JS minimal. Only interactive components (`"use client"`) ship JS.

2. **Local product data** — Products live in `data/products.ts` rather than a CMS
   to keep the initial build simple and type-safe. The interface is CMS-ready.

3. **Cart in React context** — Cart state is client-only (no server sync needed
   until checkout). Using useReducer for predictable state transitions.

4. **Stripe Checkout (hosted)** — Uses Stripe's hosted checkout page rather than
   the Payment Element, which is faster to implement and immediately PCI compliant.
   The Payment Element path is documented in `lib/stripe.ts` for future migration.

5. **Feature flags as a config object** — Simple compile-time flags in
   `config/features.ts`. Easily swappable for LaunchDarkly / GrowthBook / env vars.

6. **Design tokens in both CSS and TS** — CSS custom properties for styling,
   `config/design-tokens.ts` for Framer Motion variants. Single source of truth.

7. **shadcn/ui used selectively** — Button and form primitives from shadcn, but
   most UI is custom to avoid generic default aesthetics.
