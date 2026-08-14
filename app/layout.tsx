import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartDrawer from "@/components/cart/CartDrawer";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import features from "@/config/features";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          {features.announcementBar && <AnnouncementBar />}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {features.cartDrawer && <CartDrawer />}
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
