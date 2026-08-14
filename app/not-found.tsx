import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground text-background">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <p className="text-[10rem] font-black leading-none text-background/5 select-none">
          404
        </p>
        <div className="-mt-10 relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Page not found.
          </h1>
          <p className="text-background/50 text-sm mb-8">
            The page you&apos;re looking for doesn&apos;t exist — but your
            potential does.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground font-semibold px-7 py-3.5 rounded-full hover:scale-[1.02] transition-transform text-sm"
            >
              Go Home
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-background/20 text-background/70 font-medium px-7 py-3.5 rounded-full hover:border-background/50 hover:text-background transition-colors text-sm"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
