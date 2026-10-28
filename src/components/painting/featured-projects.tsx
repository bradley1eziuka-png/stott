import { ArrowRight } from "lucide-react";

import { FEATURED } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { ctaButton } from "./buttons";
import { SectionHeading } from "./section-heading";

// 12-column editorial grid: one large feature, two stacked beside it, two
// wide tiles below. Small tiles on phones. Captions stay small.
const SPAN = [
  "col-span-2 aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto",
  "aspect-[4/3] md:col-span-5 md:aspect-auto",
  "aspect-[4/3] md:col-span-5 md:aspect-auto",
  "aspect-[4/3] md:col-span-6 md:aspect-auto",
  "aspect-[4/3] md:col-span-6 md:aspect-auto",
];

export function FeaturedProjects() {
  return (
    <section id="our-work" className="on-dark grain section-pad bg-primary text-white">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="A look at our work"
            title="See what we've been working on."
            description="These aren't stock photos. They're actual projects from Stotts Extravagant Painting."
            light
          />
          <div className="lg:col-span-4 lg:justify-self-end">
            <a href="/our-work" className={ctaButton({ variant: "outlineLight", size: "md" })}>
              See more of our work
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2.5 md:grid-cols-12 md:auto-rows-[190px] md:gap-3 lg:auto-rows-[230px]">
          {FEATURED.map((photo, i) => (
            <a
              key={photo.id}
              href="/our-work"
              aria-label={`View project gallery: ${photo.caption}`}
              className={cn("group relative block overflow-hidden bg-navy-soft", SPAN[i])}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={photo.width}
                height={photo.height}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
              />
              <span
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"
                aria-hidden
              />
              <span className="eyebrow absolute bottom-2.5 left-3 text-[0.68rem] tracking-[0.14em] text-white sm:bottom-3 sm:text-[0.72rem]">
                {photo.caption}
              </span>
              <span
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
