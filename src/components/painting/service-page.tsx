import { ArrowRight, Check, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BUSINESS_PHONE, BUSINESS_PHONE_TEL, REVIEWS } from "@/lib/site-config";
import { Stars } from "./stars";
import { SERVICES, isServiceEnabled, type ServiceConfig } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { ctaButton } from "./buttons";
import { CtaBand } from "./cta-band";
import { SectionHeading } from "./section-heading";

// One layout for all five services: split hero, explanation + included list,
// homeowner benefits, real project photos, FAQ, related services, CTA.
export function ServicePage({ service }: { service: ServiceConfig }) {
  const related = service.related.filter(isServiceEnabled).map((k) => SERVICES[k]);
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-background">
        <div className="container-page grid items-center gap-10 pb-12 pt-8 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm font-semibold text-muted-foreground"
            >
              <a href="/" className="hover:text-accent hover:underline">
                Home
              </a>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <a href="/#services" className="hover:text-accent hover:underline">
                Services
              </a>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-primary" aria-current="page">
                {service.shortTitle}
              </span>
            </nav>
            <p className="rise mb-5 flex items-center gap-3 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-[3px] w-9 bg-accent" aria-hidden />
              {service.eyebrow}
            </p>
            <h1 className="rise t-page" style={{ ["--d" as string]: "70ms" }}>
              {service.headline}
            </h1>
            <p
              className="rise mt-5 max-w-xl text-lg leading-[1.7] text-foreground/80"
              style={{ ["--d" as string]: "150ms" }}
            >
              {service.intro}
            </p>
            <div
              className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ ["--d" as string]: "230ms" }}
            >
              <a href="/contact#estimate" className={ctaButton({ variant: "red", size: "lg" })}>
                Get a painting estimate
                <ArrowRight />
              </a>
              <a
                href={BUSINESS_PHONE_TEL}
                className={ctaButton({ variant: "outline", size: "lg" })}
              >
                <Phone />
                Call {BUSINESS_PHONE}
              </a>
            </div>
            <p
              className="rise mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-sm font-semibold text-foreground/80"
              style={{ ["--d" as string]: "300ms" }}
            >
              Family-Owned • Based in Trail Creek, IN
              {REVIEWS && (
                <span className="inline-flex items-center gap-2">
                  <Stars className="text-accent" /> {REVIEWS.rating} on {REVIEWS.source} (
                  {REVIEWS.count} reviews)
                </span>
              )}
            </p>
          </div>

          <div className="rise relative lg:col-span-6" style={{ ["--d" as string]: "160ms" }}>
            <div className="relative mr-3.5 sm:mr-5">
              <div
                className="absolute -bottom-3.5 -right-3.5 h-full w-full bg-accent sm:-bottom-5 sm:-right-5"
                aria-hidden
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary shadow-float">
                <img
                  src={service.heroImage}
                  alt={service.heroAlt}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation + what's included */}
      <section className="on-dark grain bg-primary text-white">
        <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={service.shortTitle} title={service.explanation.title} light />
            <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-[1.75] text-white/80">
              {service.explanation.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border-2 border-white/20 p-7 sm:p-9">
              <h3 className="t-card text-red-bright">What we can help with</h3>
              <ul className="mt-5 space-y-3.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.02rem] text-white/90">
                    <Check className="mt-1 size-5 shrink-0 text-red-bright" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-background">
        <div className="container-page">
          <SectionHeading
            eyebrow="What it does for your home"
            title="What you can look forward to"
          />
          <ul className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {service.benefits.map((b, i) => (
              <li key={b.title} className="bg-white p-7 sm:p-9">
                <span
                  className="font-display text-4xl font-extrabold leading-none text-accent"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-card mt-4">{b.title}</h3>
                <p className="mt-3 text-[1rem] leading-[1.7] text-muted-foreground">
                  {b.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Real project photos */}
      {service.gallery.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Our work" title="Some of our projects" />
              <a href="/our-work" className={ctaButton({ variant: "outline", size: "md" })}>
                See more of our work
                <ArrowRight />
              </a>
            </div>
            <div
              className={cn(
                "mt-10 grid gap-4",
                service.gallery.length === 2 && "sm:grid-cols-2",
                service.gallery.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {service.gallery.map((photo) => (
                <figure
                  key={photo.id}
                  className="group relative overflow-hidden bg-secondary shadow-raised"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      photo.height > photo.width ? "aspect-[3/4]" : "aspect-[4/3]",
                    )}
                  />
                  <figcaption className="on-dark absolute bottom-0 left-0 bg-primary px-3.5 py-1.5 font-display text-base font-extrabold uppercase tracking-[0.06em] text-white">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-pad bg-background">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Common questions" title="Before you call" />
          </div>
          <Accordion type="single" collapsible className="lg:col-span-7">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-b-2 border-primary/15"
              >
                <AccordionTrigger className="py-5 text-left font-display text-[1.3rem] font-extrabold uppercase leading-tight sm:text-[1.5rem] text-primary hover:text-accent hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[1.02rem] leading-[1.75] text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-border bg-white py-14 sm:py-16">
          <div className="container-page">
            <h2 className="t-section">Related services</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.key}>
                  <a
                    href={r.path}
                    className="group flex items-center justify-between gap-4 border-2 border-primary p-5 hover:bg-primary hover:text-white sm:p-6"
                  >
                    <span>
                      <span className="block t-card font-display font-extrabold uppercase">
                        {r.title}
                      </span>
                      <span className="mt-2 block text-[0.95rem] opacity-75">
                        {r.shortDescription}
                      </span>
                    </span>
                    <ArrowRight className="size-6 shrink-0 text-accent transition-transform duration-300 ease-spring group-hover:translate-x-1.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
