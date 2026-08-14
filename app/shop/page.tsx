import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ShopClient from "./ShopClient";

export const metadata: Metadata = buildMetadata({
  title: "Shop",
  description:
    "Browse the full CHAKDE collection. Premium T-Shirts, Hoodies, and Vests built for athletes and people who show up. Free UK delivery over £50.",
});

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}

function ShopSkeleton() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="h-8 w-48 bg-muted rounded-lg mb-4 animate-pulse" />
        <div className="h-12 w-64 bg-muted rounded-lg mb-12 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-product rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
