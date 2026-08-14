import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shipping & Returns",
  description:
    "CHAKDE shipping and returns policy. Free UK delivery over £50, 30-day returns, and hassle-free exchanges.",
});

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <header className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3 block">
            Policies
          </span>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Shipping & Returns
          </h1>
        </header>

        <div className="prose prose-zinc max-w-none space-y-10 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground not-prose mb-4">
              Shipping
            </h2>
            <table className="w-full text-left border-collapse not-prose mb-6">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-foreground">Method</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-foreground">Timeline</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Standard UK", "3–5 business days", "Free over £50, otherwise £3.99"],
                  ["Express UK", "1–2 business days", "£4.99"],
                  ["International", "7–14 business days", "Calculated at checkout"],
                ].map(([method, time, cost]) => (
                  <tr key={method}>
                    <td className="py-3 pr-4 font-medium text-foreground text-sm">{method}</td>
                    <td className="py-3 pr-4 text-sm">{time}</td>
                    <td className="py-3 text-sm">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Orders are processed within 1–2 business days. You&apos;ll receive a
              dispatch confirmation email with tracking details once your order
              is on its way.
            </p>
            <p className="mt-3">
              We currently ship to the UK, Ireland, USA, Canada, and Australia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground not-prose mb-4">
              Returns
            </h2>
            <p>
              We accept returns within{" "}
              <strong className="text-foreground">30 days</strong> of delivery.
              To be eligible:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Items must be unworn and unwashed</li>
              <li>Original tags must be attached</li>
              <li>Items must be in original packaging where possible</li>
            </ul>
            <p className="mt-4">
              To start a return, email{" "}
              <a
                href="mailto:hello@chakdelife.co.uk"
                className="text-brand hover:underline"
              >
                hello@chakdelife.co.uk
              </a>{" "}
              with your order number and reason for return. We&apos;ll respond
              within 1 business day.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground not-prose mb-4">
              Exchanges
            </h2>
            <p>
              Need a different size or colour? Start the same process as a
              return and indicate what you&apos;d like instead. Subject to
              availability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground not-prose mb-4">
              Faulty or incorrect items
            </h2>
            <p>
              If you receive a faulty or incorrect item, contact us within 14
              days of delivery. We&apos;ll arrange a replacement or full refund
              at no cost to you, including return shipping.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
