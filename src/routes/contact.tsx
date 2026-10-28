import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { SiteLayout } from "@/components/painting/site-layout";
import { PageHero } from "@/components/painting/page-hero";
import { EstimateFormCard } from "@/components/painting/estimate-form";
import {
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  LOCATION_LABEL,
} from "@/lib/site-config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Get a Painting Estimate | Stotts Extravagant Painting, Michigan City Area",
      description:
        "Tell Stotts Extravagant Painting about your project, or call (219) 304-4259. Family-owned painter in Trail Creek serving Michigan City and Northwest Indiana.",
      path: "/contact",
    }),
  component: Contact,
});

const STEPS = [
  {
    title: "Tell us what you have in mind",
    body: "Send the form or give us a call. Share what you'd like done.",
  },
  {
    title: "We talk it through",
    body: "We'll get back to you to go over the details of your project.",
  },
  {
    title: "Decide on next steps",
    body: "From there, you decide if we're the right fit for the job.",
  },
];

function Contact() {
  const row = "flex items-start gap-4";
  const icon = "mt-1 size-6 shrink-0 text-accent";
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Tell us what you need painted.">
        <p>
          Have a room, exterior, fence, or deck that needs attention? Tell us a little about the
          project, and we'll take it from there.
        </p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <EstimateFormCard id="estimate" />
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <div className="border-2 border-primary bg-white p-7 shadow-raised sm:p-9">
              <h2 className="t-section">Reach us directly</h2>
              <ul className="mt-6 space-y-5 text-[1.05rem]">
                <li className={row}>
                  <Phone className={icon} aria-hidden />
                  <a
                    href={BUSINESS_PHONE_TEL}
                    className="font-display text-4xl font-extrabold leading-none tracking-[-0.01em] text-primary hover:text-accent"
                  >
                    {BUSINESS_PHONE}
                  </a>
                </li>
                {BUSINESS_EMAIL && (
                  <li className={row}>
                    <Mail className={icon} aria-hidden />
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="break-all font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                    >
                      {BUSINESS_EMAIL}
                    </a>
                  </li>
                )}
                <li className={row}>
                  <MapPin className={icon} aria-hidden />
                  <span>
                    <strong className="text-primary">
                      Based in {LOCATION_LABEL.replace(", IN", ", Indiana")}
                    </strong>
                    <br />
                    <span className="text-muted-foreground">
                      Serving Northwest Indiana &amp; Southwest Michigan
                    </span>
                  </span>
                </li>
                {BUSINESS_HOURS.map((h) => (
                  <li key={h.days} className={row}>
                    <Clock className={icon} aria-hidden />
                    <span>
                      <strong className="text-primary">{h.days}</strong>
                      <br />
                      <span className="text-muted-foreground">{h.hours}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="t-section">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center bg-primary font-display text-2xl font-black text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="t-card">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
