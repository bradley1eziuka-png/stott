import { Phone } from "lucide-react";
import type { ReactNode } from "react";

import { BUSINESS_PHONE_TEL } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ctaButton } from "./buttons";
import { Header } from "./header";
import { Footer } from "./footer";

// Shared chrome (header + footer + mobile action bar) used by every page.
// overflow-x-clip (not hidden) so the sticky header keeps working.
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />

      {/* Mobile action bar: the two things a visitor on a phone wants to do. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-white/95 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgb(23_23_23/0.45)] backdrop-blur lg:hidden">
        <a href={BUSINESS_PHONE_TEL} className={cn(ctaButton({ variant: "outline", size: "md" }))}>
          <Phone />
          Call Now
        </a>
        <a href="/contact#estimate" className={cn(ctaButton({ variant: "red", size: "md" }))}>
          Get Estimate
        </a>
      </div>
    </div>
  );
}
