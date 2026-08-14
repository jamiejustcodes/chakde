import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={28} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-3">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          No charge has been made. Your cart is still saved — whenever
          you&apos;re ready, we&apos;re here.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-7 py-3.5 rounded-full hover:bg-brand hover:text-brand-foreground transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground font-medium px-7 py-3.5 rounded-full hover:border-foreground hover:text-foreground transition-colors text-sm"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
