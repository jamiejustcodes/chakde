import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "CHAKDE terms and conditions of sale and use of our website.",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Last updated: 12 May 2026
          </p>
        </header>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          {[
            {
              title: "1. General",
              body: `By using ${siteConfig.url} and placing an order, you agree to these terms. CHAKDE is a trading name based in ${siteConfig.address.city}, ${siteConfig.address.country}.`,
            },
            {
              title: "2. Products",
              body: "We make every effort to display product colours and descriptions accurately. Due to monitor variations, colours may appear slightly different. Products are subject to availability.",
            },
            {
              title: "3. Pricing",
              body: "All prices are displayed in GBP and include UK VAT where applicable. We reserve the right to change prices at any time. Prices displayed at the time of your order will be honoured.",
            },
            {
              title: "4. Orders",
              body: "By placing an order you are making an offer to purchase. We reserve the right to decline any order, in which case we will issue a full refund.",
            },
            {
              title: "5. Payment",
              body: "All payments are processed securely through Stripe. We accept all major credit and debit cards. Payment must be received in full before goods are dispatched.",
            },
            {
              title: "6. Shipping",
              body: "Please see our Shipping & Returns page for delivery timelines and costs.",
            },
            {
              title: "7. Returns",
              body: "Please see our Shipping & Returns page for our returns policy.",
            },
            {
              title: "8. Intellectual property",
              body: "All content on this website — including logos, product images, and text — is the intellectual property of CHAKDE. You may not reproduce, distribute, or use our content without written permission.",
            },
            {
              title: "9. Limitation of liability",
              body: "To the extent permitted by law, CHAKDE is not liable for indirect, incidental, or consequential damages arising from the use of our products or website.",
            },
            {
              title: "10. Contact",
              body: `Questions? Email us at ${siteConfig.email}.`,
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-bold text-foreground mb-2">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
