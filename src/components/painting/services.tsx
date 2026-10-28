import { ArrowRight } from "lucide-react";

import type { ServiceKey } from "@/config";
import { SERVICE_LIST, type ServiceConfig } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

// Focal point per photo so each crop keeps the subject in frame.
const FOCUS: Record<ServiceKey, string> = {
  interior: "object-[18%_45%]",
  exterior: "object-[50%_55%]",
  deckFence: "object-[60%_50%]",
  drywall: "object-[45%_40%]",
  powerWashing: "object-[50%_30%]",
};

const num = (i: number) => String(i + 1).padStart(2, "0");

// Photo on top, text below: the photograph stays clean and the copy never
// sits on a muddy overlay.
function FeatureCard({ service, index }: { service: ServiceConfig; index: number }) {
  return (
    <a
      href={service.path}
      className="group flex flex-col overflow-hidden border border-border bg-white shadow-raised"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={service.cardImage}
          alt={service.cardAlt}
          loading="lazy"
          width={800}
          height={600}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]",
            FOCUS[service.key],
          )}
        />
        <span className="absolute inset-0 bg-accent/10 mix-blend-multiply" aria-hidden />
        <span
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/35 to-transparent"
          aria-hidden
        />
        <span className="absolute left-0 top-0 bg-primary px-3 py-1.5 font-display text-lg font-extrabold tracking-[0.1em] text-white">
          {num(index)}
        </span>
      </span>
      <span className="relative flex flex-1 flex-col p-5 sm:p-6">
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
          aria-hidden
        />
        <span className="t-card font-display font-extrabold uppercase text-primary">
          {service.title}
        </span>
        <span className="mt-3 flex-1 text-[0.97rem] leading-[1.65] text-muted-foreground">
          {service.shortDescription}
        </span>
        <span className="mt-5 inline-flex items-center gap-2 self-start font-display text-[1.05rem] font-extrabold uppercase tracking-[0.06em] text-accent">
          <span className="border-b-2 border-transparent group-hover:border-accent">
            {service.cardCta}
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 ease-spring group-hover:translate-x-1.5" />
        </span>
      </span>
    </a>
  );
}

function CompactCard({ service, index }: { service: ServiceConfig; index: number }) {
  return (
    <a
      href={service.path}
      className="group grid grid-cols-[6.5rem_1fr] overflow-hidden border border-border bg-white shadow-raised sm:grid-cols-[38%_1fr]"
    >
      <span className="relative block min-h-[9.5rem] overflow-hidden bg-secondary">
        <img
          src={service.cardImage}
          alt={service.cardAlt}
          loading="lazy"
          width={400}
          height={300}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]",
            FOCUS[service.key],
          )}
        />
        <span className="absolute inset-0 bg-accent/10 mix-blend-multiply" aria-hidden />
        <span className="absolute left-0 top-0 bg-primary px-3 py-1.5 font-display text-lg font-extrabold tracking-[0.1em] text-white">
          {num(index)}
        </span>
      </span>
      <span className="relative flex flex-col justify-center p-5 sm:p-6">
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
          aria-hidden
        />
        <span className="t-card font-display font-extrabold uppercase text-primary">
          {service.title}
        </span>
        <span className="mt-2 hidden text-[0.97rem] leading-[1.6] text-muted-foreground sm:block">
          {service.shortDescription}
        </span>
        <span className="mt-3 inline-flex items-center gap-2 font-display text-[1.05rem] font-extrabold uppercase tracking-[0.06em] text-accent">
          <span className="border-b-2 border-transparent group-hover:border-accent">
            {service.cardCta}
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 ease-spring group-hover:translate-x-1.5" />
        </span>
      </span>
    </a>
  );
}

export function Services() {
  const featured = SERVICE_LIST.filter((s) => s.priority);
  const others = SERVICE_LIST.filter((s) => !s.priority);
  return (
    <section id="services" className="section-pad bg-background">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Our painting & home services"
            title="What needs work around your home?"
          />
          <p className="t-body text-muted-foreground lg:col-span-5 lg:justify-self-end">
            From a single room to the outside of your house, we handle painting and related projects
            throughout the Michigan City area.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          {featured.map((s, i) => (
            <FeatureCard key={s.key} service={s} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:mt-6 lg:gap-6">
            {others.map((s, i) => (
              <CompactCard key={s.key} service={s} index={featured.length + i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
