import type { FeatureFlags } from "@/types";

/**
 * Feature flag config — toggle any section or behaviour on/off here.
 * In production, these could be driven by a remote config service or
 * environment variables. For now they're a simple compile-time object.
 */
const features: FeatureFlags = {
  /* Layout */
  announcementBar: true,   // top bar: "Free UK delivery over £50 · 10% to BHF"
  promoBanner: false,      // dismissible sale/promo banner on shop

  /* Homepage sections */
  charitySection: true,    // "10% to British Heart Foundation" block
  testimonials: true,      // customer reviews carousel
  newsletter: true,        // email signup section
  instagramGallery: false, // @chakdelife grid (enable once IG token is wired up)

  /* Product pages */
  sizeGuide: true,         // size guide modal on PDP
  relatedProducts: true,   // "You may also like" on PDP

  /* Cart & checkout */
  cartDrawer: true,        // true = slide-out drawer · false = /cart page

  /* Catalog */
  showOutOfStock: true,    // show OOS items with a "Sold Out" badge
};

export default features;
