import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ArrowRight, Heart, Users, Zap } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "The story behind CHAKDE — a premium athletic clothing brand built on Punjabi spirit, community values, and giving back to the British Heart Foundation.",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-24 px-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand" aria-hidden />
        <div className="container mx-auto lg:px-8 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-background/40 mb-4 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-background leading-none mb-6">
            CHAKDE.
          </h1>
          <p className="text-background/60 text-lg leading-relaxed max-w-xl">
            A word. A feeling. A movement.{" "}
            <em className="not-italic text-brand">Chakde</em> is Punjabi for
            encouragement — it&apos;s the thing you say when someone needs to
            hear &ldquo;you&apos;ve got this.&rdquo; We built a brand around
            that moment.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4" id="story">
        <div className="container mx-auto lg:px-8 max-w-3xl">
          <div className="prose prose-zinc max-w-none">
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-6">
              Where it started
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CHAKDE started in Walsall with a simple idea: clothing that
              carries a message worth wearing. In a world of generic gym
              apparel, we wanted to make something that spoke — that reminded
              people of what they&apos;re capable of every time they pulled it
              on.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The name comes from Punjabi, but the feeling is universal. That
              push you give someone when they need it. That voice in your head
              when the last rep gets hard. That energy you carry into every room
              you walk into. That&apos;s CHAKDE.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We&apos;re a small brand with a big heart — literally. From the
              beginning, we committed to donating{" "}
              {siteConfig.charity.percentage}% of every sale to the{" "}
              <a
                href={siteConfig.charity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                {siteConfig.charity.name}
              </a>
              . Because strength means lifting others up, not just yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-surface px-4" id="mission">
        <div className="container mx-auto lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-foreground mb-12 max-w-xl">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Encouragement",
                body: "Every piece of CHAKDE clothing carries a message. Not a logo for the sake of a logo — a genuine reminder that you can do hard things.",
              },
              {
                icon: Users,
                title: "Equality & Inclusion",
                body: "CHAKDE is for every body, every background, every fitness level. The gym shouldn't feel exclusive. Neither should the clothing you wear to it.",
              },
              {
                icon: Heart,
                title: "Giving Back",
                body: `${siteConfig.charity.percentage}% of every purchase goes to the ${siteConfig.charity.name}. No minimum. No caps. Every order counts.`,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-muted flex items-center justify-center">
                    <Icon size={20} className="text-brand" />
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto lg:px-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">
            Ready to move with purpose?
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Every purchase is a statement. Wear something that means something.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-8 py-4 rounded-full hover:bg-brand hover:text-brand-foreground transition-colors"
          >
            Shop the Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
