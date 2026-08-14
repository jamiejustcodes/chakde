/**
 * CHAKDE product catalog.
 *
 * Live product colours, sizes, stock state, and images are sourced from
 * chakdelife.co.uk / UENI CDN and refreshed on 2026-05-18.
 */

import type { Product, ProductImage, ProductVariant } from "@/types";

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const HOODIE_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const VEST_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const colorHex: Record<string, string> = {
  Black: "#0A0A0A",
  Blue: "#0F6EA8",
  White: "#FFFFFF",
};

function colourCode(color: string) {
  return color.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function createVariants(
  prefix: string,
  sizes: string[],
  colors: string[]
): ProductVariant[] {
  return colors.flatMap((color) =>
    sizes.map((size) => ({
      id: `${prefix}-${colourCode(color)}-${size.toLowerCase()}`,
      size,
      color,
      colorHex: colorHex[color] ?? "#6B7280",
      inStock: true,
    }))
  );
}

const sizeGuide: ProductImage = {
  src: "https://img77.uenicdn.com/image/upload/v1723976160/business/2e56f211-facd-4f04-bc87-a3d7bac06b3d.png",
  alt: "CHAKDE size guide",
  width: 646,
  height: 271,
  isSizeGuide: true,
};

export const products: Product[] = [
  {
    id: "tshirt-dumbbell-logo",
    slug: "t-shirt-dumbbell-logo",
    name: "T-Shirt - Dumbbell Logo",
    shortName: "Dumbbell Logo Tee",
    price: 2100,
    description:
      "Our stylish lightweight cotton t-shirts are a modern classic fit. 100% ringspun cotton, lightweight 153 gsm material, taped neck and shoulders, twin-needle sleeve and bottom hems. Machine wash warm, inside out. Iron inside out.",
    shortDescription: "Lightweight cotton tee with small front logo and large back logo.",
    category: "t-shirt",
    design: "dumbbell-logo",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871848/business/b0a3980b-2f58-4e5f-aa6d-cd482e7e67a6.jpg",
        alt: "CHAKDE Dumbbell Logo blue T-shirt front view",
        width: 683,
        height: 1024,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871849/business/6c9f64a3-2125-460d-a2bc-5d3aef7889e6.jpg",
        alt: "CHAKDE Dumbbell Logo blue T-shirt back view",
        width: 683,
        height: 1024,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871848/business/ebff3ee5-f19b-490b-a6ce-ec762c528a06.jpg",
        alt: "CHAKDE Dumbbell Logo white T-shirt front view",
        width: 683,
        height: 1024,
        color: "White",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871848/business/e00c23aa-c698-44e5-b46e-91e50835bfc6.jpg",
        alt: "CHAKDE Dumbbell Logo white T-shirt back view",
        width: 683,
        height: 1024,
        color: "White",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871848/business/45a54921-177f-4500-b891-1a2da11f2c50.jpg",
        alt: "CHAKDE Dumbbell Logo black T-shirt front view",
        width: 683,
        height: 1024,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871848/business/07e5aa6e-e462-4684-8b9f-64cf90c804c1.jpg",
        alt: "CHAKDE Dumbbell Logo black T-shirt back view",
        width: 683,
        height: 1024,
        color: "Black",
      },
      sizeGuide,
    ],
    variants: createVariants("tdl", TSHIRT_SIZES, ["Blue", "Black", "White"]),
    sizes: TSHIRT_SIZES,
    colors: ["Blue", "Black", "White"],
    isAvailable: true,
    isBestSeller: true,
    tags: ["t-shirt", "dumbbell", "training", "gym"],
    seoTitle: "CHAKDE Dumbbell Logo T-Shirt | Premium Athletic Tee",
    seoDescription:
      "Shop the CHAKDE Dumbbell Logo T-Shirt. Lightweight cotton tee built for movement. 10% of profits support the British Heart Foundation.",
  },
  {
    id: "tshirt-ygt",
    slug: "t-shirt-ygt",
    name: "T-Shirt - You've Got This",
    shortName: "You've Got This Tee",
    price: 2100,
    description:
      "Our stylish lightweight cotton t-shirts are a modern classic fit. 100% ringspun cotton, lightweight 153 gsm material, taped neck and shoulders, twin-needle sleeve and bottom hems. Machine wash warm, inside out. Iron inside out.",
    shortDescription: "Lightweight cotton tee with the You've Got This back print.",
    category: "t-shirt",
    design: "ygt",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845702/business/e772d131-371d-46ec-9d66-0bdd4c0a2ab6.jpg",
        alt: "CHAKDE You've Got This black T-shirt front view",
        width: 683,
        height: 950,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845704/business/96150aed-d4d3-4f68-a41c-58b7aa6f989f.jpg",
        alt: "CHAKDE You've Got This black T-shirt back view",
        width: 832,
        height: 1167,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845703/business/ddb349e9-bb21-4d35-9e68-e0f71c5bfc05.jpg",
        alt: "CHAKDE You've Got This blue T-shirt front view",
        width: 683,
        height: 956,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845703/business/08099285-293b-456c-9149-0e5c12a10ada.jpg",
        alt: "CHAKDE You've Got This blue T-shirt back view",
        width: 683,
        height: 958,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845703/business/37518158-d4e4-43a0-8959-81cdb0c754c2.jpg",
        alt: "CHAKDE You've Got This white T-shirt front view",
        width: 796,
        height: 942,
        color: "White",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845703/business/7d0fbcfb-b8ba-4ff5-a92d-28188aa471a8.jpg",
        alt: "CHAKDE You've Got This white T-shirt back view",
        width: 683,
        height: 949,
        color: "White",
      },
      sizeGuide,
    ],
    variants: createVariants("tygt", TSHIRT_SIZES, ["Blue", "White", "Black"]),
    sizes: TSHIRT_SIZES,
    colors: ["Blue", "White", "Black"],
    isAvailable: true,
    isNew: true,
    tags: ["t-shirt", "slogan", "motivational", "you've got this"],
    seoTitle: "CHAKDE You've Got This T-Shirt | Motivational Athletic Tee",
    seoDescription:
      "The CHAKDE You've Got This T-Shirt. Bold, lightweight, and built to push you. 10% of profits support the British Heart Foundation.",
  },
  {
    id: "hoodie-dumbbell-logo",
    slug: "hoodie-dumbbell-logo",
    name: "Hoodie - Dumbbell Logo",
    shortName: "Dumbbell Logo Hoodie",
    price: 3999,
    description:
      "Our hoodies are versatile, with comfort and quality in mind for everyday wear. Double fabric hood, taped neck, soft fabric, 60% cotton and 40% polyester. Fabric weight 350 gsm.",
    shortDescription: "350 gsm pullover hoodie with small front logo and large back logo.",
    category: "hoodie",
    design: "dumbbell-logo",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764870999/business/33c60c87-5693-4ea5-9276-732ea146eeb8.jpg",
        alt: "CHAKDE Dumbbell Logo blue hoodie front view",
        width: 747,
        height: 1024,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764870999/business/4857f0be-77d6-431b-8e84-51eafc6aa914.jpg",
        alt: "CHAKDE Dumbbell Logo blue hoodie back view",
        width: 747,
        height: 1024,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764870999/business/a5d1195b-0fe1-4837-82da-d78a615e8cf9.jpg",
        alt: "CHAKDE Dumbbell Logo black hoodie front view",
        width: 747,
        height: 1024,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871960/business/cb76d1b2-6d35-4c88-a28b-d5601a87da95.jpg",
        alt: "CHAKDE Dumbbell Logo black hoodie back view",
        width: 585,
        height: 1024,
        color: "Black",
      },
      sizeGuide,
    ],
    variants: createVariants("hdl", HOODIE_SIZES, ["Blue", "Black"]),
    sizes: HOODIE_SIZES,
    colors: ["Blue", "Black"],
    isAvailable: true,
    isBestSeller: true,
    tags: ["hoodie", "pullover", "dumbbell", "fleece"],
    seoTitle: "CHAKDE Dumbbell Logo Hoodie | Premium Athletic Pullover",
    seoDescription:
      "The CHAKDE Dumbbell Logo Hoodie. Heavyweight fleece, clean aesthetic, built for the grind. 10% profits to British Heart Foundation.",
  },
  {
    id: "hoodie-ygt",
    slug: "hoodie-ygt",
    name: "Hoodie - You've Got This",
    shortName: "You've Got This Hoodie",
    price: 3999,
    description:
      "Our hoodies are versatile, with comfort and quality in mind for everyday wear. Double fabric hood, taped neck, soft fabric, 60% cotton and 40% polyester. Fabric weight 350 gsm.",
    shortDescription: "350 gsm pullover hoodie with the You've Got This back print.",
    category: "hoodie",
    design: "ygt",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845704/business/aceb62a6-6586-4a91-9130-3442680bd99c.jpg",
        alt: "CHAKDE You've Got This blue hoodie front view",
        width: 832,
        height: 1170,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764872234/business/0da02645-c074-4b76-b0d7-4c09e3122fbc.jpg",
        alt: "CHAKDE You've Got This blue hoodie back view",
        width: 747,
        height: 1024,
        color: "Blue",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764845704/business/2003de43-3680-43b2-a688-a59ccd99e7e5.jpg",
        alt: "CHAKDE You've Got This black hoodie front view",
        width: 832,
        height: 1164,
        color: "Black",
      },
      sizeGuide,
    ],
    variants: createVariants("hygt", HOODIE_SIZES, ["Blue", "Black"]),
    sizes: HOODIE_SIZES,
    colors: ["Blue", "Black"],
    isAvailable: true,
    isNew: true,
    tags: ["hoodie", "pullover", "slogan", "you've got this"],
    seoTitle: "CHAKDE You've Got This Hoodie | Motivational Athletic Pullover",
    seoDescription:
      "The CHAKDE You've Got This Hoodie. Heavyweight fleece with the message that matters. 10% profits to British Heart Foundation.",
  },
  {
    id: "vest-dumbbell-logo",
    slug: "vest-dumbbell-logo",
    name: "Vest - Dumbbell Logo",
    shortName: "Dumbbell Logo Vest",
    price: 2100,
    description:
      "Our stylish 140 gsm vests are lightweight with a sporty fit, with a small logo on the front and large logo on the back. 100% polyester. Machine wash warm, inside out. Iron inside out.",
    shortDescription: "Lightweight black training vest with small front logo and large back logo.",
    category: "vest",
    design: "dumbbell-logo",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871406/business/f03cf0cf-f4a9-4fbf-8ad3-91a1742cf06e.jpg",
        alt: "CHAKDE Dumbbell Logo black vest front view",
        width: 796,
        height: 1024,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871406/business/927a7a69-d123-4b84-974f-c2f010084d5d.jpg",
        alt: "CHAKDE Dumbbell Logo black vest back view",
        width: 796,
        height: 1024,
        color: "Black",
      },
    ],
    variants: createVariants("vdl", VEST_SIZES, ["Black"]),
    sizes: VEST_SIZES,
    colors: ["Black"],
    isAvailable: true,
    tags: ["vest", "tank", "dumbbell", "training"],
    seoTitle: "CHAKDE Dumbbell Logo Vest | Athletic Training Tank",
    seoDescription:
      "The CHAKDE Dumbbell Logo Vest. Breathable training vest for maximum movement. 10% profits to British Heart Foundation.",
  },
  {
    id: "vest-ygt",
    slug: "vest-ygt",
    name: "Vest - You've Got This",
    shortName: "You've Got This Vest",
    price: 2100,
    description:
      "Our stylish 140 gsm vests are lightweight with a sporty fit, with a small logo on the front and large logo on the back. 100% polyester. Machine wash warm, inside out. Iron inside out.",
    shortDescription: "Lightweight black training vest with the You've Got This back print.",
    category: "vest",
    design: "ygt",
    images: [
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871316/business/15a9051d-2034-421e-8ae1-a2a5bd8bb4bc.jpg",
        alt: "CHAKDE You've Got This black vest front view",
        width: 796,
        height: 1024,
        color: "Black",
      },
      {
        src: "https://img77.uenicdn.com/image/upload/v1764871315/business/b009e4d5-e728-43db-a1a4-d42e5563d0d3.jpg",
        alt: "CHAKDE You've Got This black vest back view",
        width: 796,
        height: 1024,
        color: "Black",
      },
    ],
    variants: createVariants("vygt", VEST_SIZES, ["Black"]),
    sizes: VEST_SIZES,
    colors: ["Black"],
    isAvailable: true,
    isNew: true,
    tags: ["vest", "tank", "slogan", "you've got this"],
    seoTitle: "CHAKDE You've Got This Vest | Motivational Training Tank",
    seoDescription:
      "The CHAKDE You've Got This Vest. Lightweight training tank with the message that moves you. 10% profits to British Heart Foundation.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.design === product.design)
    )
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter((p) => p.isBestSeller || p.isNew);
  return featured.slice(0, limit);
}

export function getImagesForColor(product: Product, color?: string): ProductImage[] {
  if (!color) return product.images;

  const colorImages = product.images.filter((image) => image.color === color);
  if (colorImages.length === 0) return product.images;

  const sharedImages = product.images.filter((image) => !image.color);
  return [...colorImages, ...sharedImages];
}

export function getPrimaryImage(
  product: Product,
  color?: string
): ProductImage | undefined {
  return getImagesForColor(product, color)[0] ?? product.images[0];
}

export function formatPrice(pence: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(pence / 100);
}
