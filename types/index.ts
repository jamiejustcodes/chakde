export type ProductCategory = "t-shirt" | "hoodie" | "vest";
export type ProductDesign = "dumbbell-logo" | "ygt"; // ygt = you've got this

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  inStock: boolean;
  stockCount?: number; // only used in dev/mock context
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  color?: string;
  isSizeGuide?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;          // GBP pence (e.g. 2499 = £24.99)
  description: string;
  shortDescription: string;
  category: ProductCategory;
  design: ProductDesign;
  images: ProductImage[];
  variants: ProductVariant[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isAvailable: boolean;   // overall availability gate
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CheckoutLineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description: string;
      images: string[];
      metadata: {
        product_id: string;
        variant_id: string;
        size: string;
        color: string;
      };
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  email: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
  charity: {
    name: string;
    percentage: number;
    url: string;
  };
  address: {
    city: string;
    country: string;
  };
}

export interface FeatureFlags {
  announcementBar: boolean;
  promoBanner: boolean;
  charitySection: boolean;
  testimonials: boolean;
  newsletter: boolean;
  instagramGallery: boolean;
  sizeGuide: boolean;
  relatedProducts: boolean;
  cartDrawer: boolean;       // true = drawer, false = cart page
  showOutOfStock: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
