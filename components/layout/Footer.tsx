import Link from "next/link";
import { siteConfig, footerLinks } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-black text-3xl leading-none text-background hover:opacity-60 transition-opacity uppercase"
            >
              CHAKDE
            </Link>
            <p className="mt-4 text-xs text-background/50 leading-relaxed max-w-[200px] font-sans">
              Premium athletic clothing built on Punjabi spirit. Move with purpose. Give back with pride.
            </p>
            <div className="flex gap-2.5 mt-5">
              {siteConfig.socials.instagram && (
                <SocialLink
                  href={siteConfig.socials.instagram}
                  label="Follow CHAKDE on Instagram"
                >
                  <IconInstagram />
                </SocialLink>
              )}
              {siteConfig.socials.facebook && (
                <SocialLink
                  href={siteConfig.socials.facebook}
                  label="Follow CHAKDE on Facebook"
                >
                  <IconFacebook />
                </SocialLink>
              )}
            </div>
          </div>

          <FooterGroup title="Shop" links={footerLinks.shop} />
          <FooterGroup title="Company" links={footerLinks.info} />
          <FooterGroup title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] text-background/30 font-sans uppercase tracking-[0.12em]">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            {siteConfig.charity.percentage}% of profits donated to the{" "}
            <a
              href={siteConfig.charity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-background/60 transition-colors"
            >
              {siteConfig.charity.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[9px] font-semibold uppercase tracking-[0.22em] text-background/30 mb-5 font-sans">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-background/60 hover:text-background transition-colors font-sans"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center bg-white/8 text-background/50 hover:bg-background hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}
