import { ArrowRight } from "lucide-react";

import { PHOTOS } from "@/lib/photos";
import { BUSINESS_NAME, BUSINESS_OWNER } from "@/lib/site-config";
import { ctaButton } from "./buttons";
import { SectionHeading } from "./section-heading";

// Owner story. Homepage shows a ~100-word excerpt; the About page passes
// extended to show the full account.
export function Story({
  showLink = true,
  extended = false,
}: {
  showLink?: boolean;
  extended?: boolean;
}) {
  const photo = PHOTOS.van;
  return (
    <section id="story" className="section-pad bg-background">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <figure className="relative mx-auto w-full max-w-xl lg:col-span-5 lg:max-w-none">
          <div className="relative mr-3 sm:mr-4">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full border-2 border-primary sm:-bottom-4 sm:-right-4"
              aria-hidden
            />
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary shadow-float">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={photo.width}
                height={photo.height}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-[3px] w-6 bg-accent" aria-hidden />
            The {BUSINESS_NAME} work van{BUSINESS_OWNER && `, owned by ${BUSINESS_OWNER}`}
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Our story"
            title="A painting business built from the ground up."
          />
          <p className="mt-3 font-display text-xl font-bold uppercase tracking-[0.04em] text-accent sm:text-2xl">
            Meet Aron Stotts, the owner behind Stotts Extravagant Painting.
          </p>
          <div className="t-body mt-6 space-y-4 text-foreground/80">
            <p>
              Before starting Stotts Extravagant Painting, Aron Stotts was working for a painting
              company in Florida. When he moved back to Indiana, he decided to take what he'd
              learned and start a business of his own.
            </p>
            <p>
              It hasn't always been an easy road, and there's always more to learn. But the reason
              he started hasn't changed. He enjoys the work, he cares how the finished project
              looks, and he believes people should be able to get good painting work at a reasonable
              price.
            </p>
            {extended && (
              <>
                <p>
                  Building a business takes time, and Aron will tell you he still has ways to go.
                </p>
                <p>
                  For Aron, one of the best parts of the job is seeing how happy someone is when
                  they see their home afterward. That's what Stotts Extravagant Painting is built
                  around.
                </p>
              </>
            )}
          </div>
          {showLink && (
            <a href="/about" className={`${ctaButton({ variant: "solid", size: "md" })} mt-8`}>
              More about our company
              <ArrowRight />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
