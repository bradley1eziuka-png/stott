import { MapPin, Phone } from "lucide-react";

import { BUSINESS_PHONE_TEL } from "@/lib/site-config";
import { ctaButton } from "./buttons";
import { SectionHeading } from "./section-heading";

// Only the locations the client's public listing already names. Trail Creek
// is the home base; the rest are communities served, not office locations.
const INDIANA = [
  "Michigan City",
  "Trail Creek",
  "LaPorte County",
  "Porter County",
  "Michiana Shores",
];
const MICHIGAN = ["New Buffalo", "Grand Beach"];

function Group({ title, items, home }: { title: string; items: string[]; home?: string }) {
  return (
    <div>
      <h3 className="eyebrow border-b-2 font-sans border-primary pb-3 text-primary">{title}</h3>
      <ul>
        {items.map((place) => (
          <li
            key={place}
            className="flex items-center justify-between gap-3 border-b border-border py-3 text-[1.02rem] font-semibold text-primary"
          >
            <span className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
              {place}
            </span>
            {home === place && (
              <span className="bg-accent px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                Home base
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceArea() {
  return (
    <section id="service-area" className="section-pad bg-background">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="Where we work"
            title="Local to Trail Creek. Serving the surrounding area."
          />
          <div className="t-body mt-5 space-y-3 text-muted-foreground">
            <p>
              Stotts Extravagant Painting is based in Trail Creek, Indiana, just outside Michigan
              City. We work with homeowners throughout Northwest Indiana and parts of Southwest
              Michigan.
            </p>
            <p>
              Not sure whether your home is within our service area? Give us a call. We'll let you
              know.
            </p>
          </div>
          <a
            href={BUSINESS_PHONE_TEL}
            className={`${ctaButton({ variant: "solid", size: "md" })} mt-7`}
          >
            <Phone />
            Call to check your area
          </a>
        </div>
        <div className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-6 lg:pt-2">
          <Group title="Northwest Indiana" items={INDIANA} home="Trail Creek" />
          <Group title="Southwest Michigan" items={MICHIGAN} />
        </div>
      </div>
    </section>
  );
}
