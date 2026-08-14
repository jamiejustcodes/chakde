import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "CHAKDE privacy policy — how we collect, use, and protect your personal data.",
});

export default function PrivacyPage() {
  const updated = "12 May 2026";
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Last updated: {updated}
          </p>
        </header>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <PolicySection title="1. Who we are">
            CHAKDE (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a clothing brand based in{" "}
            {siteConfig.address.city}, {siteConfig.address.country}. Our
            website address is{" "}
            <a href={siteConfig.url} className="text-brand hover:underline">
              {siteConfig.url}
            </a>
            . For privacy queries, contact:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
          </PolicySection>

          <PolicySection title="2. Data we collect">
            We collect information you provide when placing an order (name,
            email, shipping address, payment details processed by Stripe), when
            you contact us, or when you sign up to our newsletter. We also
            collect standard analytics data (page views, device type, etc.)
            through privacy-respecting tools.
          </PolicySection>

          <PolicySection title="3. How we use your data">
            Your data is used to process and fulfil your orders, communicate
            with you about your purchase, send marketing emails if you opted in,
            and improve our website and service. We never sell your data to
            third parties.
          </PolicySection>

          <PolicySection title="4. Payment processing">
            All payments are processed by{" "}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Stripe
            </a>
            . We do not store card details on our servers. Stripe&apos;s
            privacy policy applies to payment data.
          </PolicySection>

          <PolicySection title="5. Cookies" id="cookies">
            We use essential cookies to operate the website (e.g., shopping
            cart state). We may use analytics cookies to understand how visitors
            use the site. You can manage cookie preferences in your browser
            settings.
          </PolicySection>

          <PolicySection title="6. Your rights">
            Under UK GDPR, you have the right to access, correct, or delete
            your personal data, and to object to or restrict its processing.
            Email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            to exercise any of these rights.
          </PolicySection>

          <PolicySection title="7. Contact us">
            Questions about this policy? Reach us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </PolicySection>
        </div>
      </div>
    </div>
  );
}

function PolicySection({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id}>
      <h2 className="text-base font-bold text-foreground mb-2">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
