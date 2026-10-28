import { ArrowRight, Phone } from "lucide-react";

import { BUSINESS_PHONE, BUSINESS_PHONE_TEL, COPY } from "@/lib/site-config";
import { ctaButton } from "./buttons";

// Closing call to action used on every page.
export function CtaBand({ title, body }: { title?: string; body?: string }) {
  return (
    <section
      id="estimate-cta"
      className="on-red grain relative overflow-hidden bg-accent text-white"
    >
      <div className="container-page grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <h2 className="t-page text-white">{title ?? COPY.finalCta.title}</h2>
          <div className="mt-4 max-w-lg space-y-3 text-lg leading-[1.65] text-white/90">
            {(body ?? COPY.finalCta.body).split("\n\n").map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
          <a
            href="/contact#estimate"
            className={
              ctaButton({ variant: "white", size: "lg" }) + " whitespace-nowrap lg:w-[19rem]"
            }
          >
            Request an estimate
            <ArrowRight />
          </a>
          <a
            href={BUSINESS_PHONE_TEL}
            className={
              ctaButton({ variant: "outlineLight", size: "lg" }) + " whitespace-nowrap lg:w-[19rem]"
            }
          >
            <Phone />
            Call {BUSINESS_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
