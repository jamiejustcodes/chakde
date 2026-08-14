import type { Metadata } from "next";
import type { Product } from "@/types";
import { siteConfig } from "@/config/site";

function absoluteUrl(src: string) {
  return src.startsWith("http") ? src : `${siteConfig.url}${src}`;
}

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${String(overrides.title)} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const description =
    typeof overrides.description === "string"
      ? overrides.description
      : siteConfig.description;

  const url = siteConfig.url;
  const ogImage = (overrides.openGraph as { images?: { url: string }[] })?.images?.[0]?.url
    ?? `${url}${siteConfig.ogImage}`;

  return {
    title,
    description,
    metadataBase: new URL(url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...overrides,
  };
}

export function buildProductMetadata(product: Product): Metadata {
  const title = product.seoTitle ?? product.name;
  const description = product.seoDescription ?? product.shortDescription;
  const url = `${siteConfig.url}/shop/${product.slug}`;
  const image = product.images[0];

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: image
        ? [
            {
              url: absoluteUrl(image.src),
              width: image.width,
              height: image.height,
              alt: image.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* JSON-LD helpers */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer service",
    },
  };
}

export function productSchema(product: Product) {
  const priceStr = (product.price / 100).toFixed(2);
  const availability = product.isAvailable
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    image: product.images.map((img) => absoluteUrl(img.src)),
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: priceStr,
      availability,
      url: `${siteConfig.url}/shop/${product.slug}`,
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
