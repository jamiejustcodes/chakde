import type { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "CHAKDE",
  tagline: "You've Got This.",
  description:
    "Premium athletic clothing built on Punjabi spirit. Every purchase supports the British Heart Foundation. Move with purpose. Give back with pride.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chakdelife.co.uk",
  ogImage: "/og-default.jpg",
  email: "hello@chakdelife.co.uk",
  socials: {
    instagram: "https://www.instagram.com/chakdelife",
    facebook: "https://www.facebook.com/chakdelife",
  },
  charity: {
    name: "British Heart Foundation",
    percentage: 10,
    url: "https://www.bhf.org.uk",
  },
  address: {
    city: "Walsall",
    country: "United Kingdom",
  },
};

export const navItems: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Our Mission", href: "/about#mission" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "T-Shirts", href: "/shop?category=t-shirt" },
    { label: "Hoodies", href: "/shop?category=hoodie" },
    { label: "Vests", href: "/shop?category=vest" },
  ],
  info: [
    { label: "About CHAKDE", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy#cookies" },
  ],
};
