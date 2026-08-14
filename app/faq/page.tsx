import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about CHAKDE — orders, shipping, returns, sizing, and more.",
});

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does UK delivery take?",
        a: "Standard UK delivery typically takes 3–5 business days. Express delivery (1–2 business days) is available at checkout.",
      },
      {
        q: "Do you offer free delivery?",
        a: "Yes — free standard UK delivery on all orders over £50.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship to the UK, Ireland, USA, Canada, and Australia. More countries coming soon.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be cancelled or amended within 1 hour of placing. After that, we begin processing and may not be able to make changes. Contact us immediately at hello@chakdelife.co.uk.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached.",
      },
      {
        q: "How do I start a return?",
        a: "Email hello@chakdelife.co.uk with your order number and reason for return. We'll guide you through the process.",
      },
      {
        q: "Are return shipping costs covered?",
        a: "Return shipping is the customer's responsibility unless the item is faulty or we made an error.",
      },
    ],
  },
  {
    category: "Sizing",
    items: [
      {
        q: "How does CHAKDE clothing fit?",
        a: "Our garments are designed with a comfortable, slightly relaxed fit. If you prefer a more fitted look, we recommend sizing down.",
      },
      {
        q: "Do you have a size guide?",
        a: "Yes — size guide information is available on each product page.",
      },
    ],
  },
  {
    category: "The CHAKDE Mission",
    items: [
      {
        q: "How does the charity donation work?",
        a: "10% of every order's profit is donated to the British Heart Foundation. No minimums, no caps — every single purchase contributes.",
      },
      {
        q: "What does 'CHAKDE' mean?",
        a: "CHAKDE is a Punjabi word meaning encouragement, energy, and 'let's go / you've got this.' It's a rallying cry — one that fits perfectly with what we stand for.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <header className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3 block">
            Help
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            FAQ
          </h1>
          <p className="mt-3 text-muted-foreground text-sm max-w-md">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="/contact"
              className="text-brand hover:underline"
            >
              Contact us
            </a>{" "}
            and we&apos;ll get back to you quickly.
          </p>
        </header>

        <div className="space-y-12">
          {faqs.map((section) => (
            <section key={section.category} aria-labelledby={`faq-${section.category}`}>
              <h2
                id={`faq-${section.category}`}
                className="text-lg font-bold text-foreground mb-5 pb-3 border-b border-border"
              >
                {section.category}
              </h2>
              <dl className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.q}>
                    <dt className="text-sm font-semibold text-foreground mb-1.5">
                      {item.q}
                    </dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
