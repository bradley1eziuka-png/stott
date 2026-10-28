import { ArrowRight } from "lucide-react";

import { COPY, REVIEWS } from "@/lib/site-config";
import { ctaButton } from "./buttons";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";

const FALLBACK_GOOGLE_URL =
  "https://www.google.com/search?q=Stotts+Extravagant+Painting+Trail+Creek+IN+reviews";

// Rating summary only. No written testimonials or reviewer names are shown
// unless real, verified ones are added to site.config.json → content.testimonials.
//
// TODO(launch): REVIEWS (5.0 / 17) came from a Google Business Profile
// screenshot in October 2026. Confirm the live numbers before publishing.
export function Reviews() {
  if (!REVIEWS) return null;
  const quotes = COPY.testimonials;
  return (
    <section id="reviews" className="section-pad bg-white">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="border-l-[6px] border-accent pl-6 sm:pl-8 lg:col-span-5">
            <div className="flex items-end gap-5">
              <p className="font-display text-[6.5rem] font-black leading-[0.8] tracking-[-0.02em] text-primary sm:text-[8rem]">
                {REVIEWS.rating}
              </p>
              <div className="pb-1">
                <Stars className="text-[1.5rem] text-accent sm:text-[1.75rem]" />
                <p className="eyebrow mt-2 text-muted-foreground">out of 5</p>
              </div>
            </div>
            <p className="mt-5 border-t border-border pt-4 font-display text-xl font-extrabold uppercase tracking-[0.06em] text-primary">
              {REVIEWS.count} {REVIEWS.source} reviews
            </p>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Hear from our customers"
              title="Don't just take our word for it."
              description="Choosing someone to work on your home is a big decision. See what customers have shared about their experience with Stotts Extravagant Painting."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={REVIEWS.url || FALLBACK_GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaButton({ variant: "red", size: "lg" })}
              >
                Read our Google reviews
                <ArrowRight />
              </a>
              <a href="/contact#estimate" className={ctaButton({ variant: "outline", size: "lg" })}>
                Request an estimate
              </a>
            </div>
          </div>
        </div>

        {quotes.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quotes.map((t) => (
              <figure
                key={`${t.author}-${t.quote.slice(0, 24)}`}
                className="border border-border bg-background p-7"
              >
                <blockquote className="leading-[1.7] text-foreground/85">“{t.quote}”</blockquote>
                <figcaption className="mt-5 font-display text-lg font-extrabold uppercase tracking-[0.05em] text-primary">
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
