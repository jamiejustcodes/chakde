"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { navItems } from "@/config/site";
import features from "@/config/features";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background border-b border-border transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[58px] lg:h-[66px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-display font-black text-[22px] lg:text-[24px] leading-none tracking-[-0.01em] uppercase text-foreground hover:opacity-60 transition-opacity"
            aria-label="CHAKDE — Home"
          >
            CHAKDE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.12em] font-sans transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={features.cartDrawer ? openCart : undefined}
              aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              className="relative p-2.5 text-foreground hover:opacity-60 transition-opacity focus-brand"
            >
              {!features.cartDrawer ? (
                <Link href="/cart" className="flex">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {totalItems > 0 && <CartBadge count={totalItems} />}
                </Link>
              ) : (
                <>
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {totalItems > 0 && <CartBadge count={totalItems} />}
                </>
              )}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden p-2.5 text-foreground hover:opacity-60 transition-opacity focus-brand"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav
              className="container mx-auto px-4 py-4 flex flex-col"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] font-sans transition-colors border-b border-border last:border-0",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/shop"
                className="mt-5 btn-dark w-full text-center"
              >
                Shop the Collection
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CartBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center bg-foreground text-background text-[9px] font-bold px-0.5 pointer-events-none font-sans">
      {count > 9 ? "9+" : count}
    </span>
  );
}
