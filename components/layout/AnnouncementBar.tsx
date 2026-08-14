"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-foreground text-background text-[10px] font-semibold py-2.5 px-4 text-center relative uppercase tracking-[0.15em] font-sans">
      Free UK delivery on orders over £50&nbsp;&nbsp;·&nbsp;&nbsp;
      <Link
        href="/about#mission"
        className="underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        {siteConfig.charity.percentage}% of every purchase goes to the{" "}
        {siteConfig.charity.name}
      </Link>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-50 transition-opacity text-background/50"
      >
        <X size={13} strokeWidth={2} />
      </button>
    </div>
  );
}
