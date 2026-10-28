import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/painting/site-layout";
import { PageHero } from "@/components/painting/page-hero";
import { Story } from "@/components/painting/story";
import { ServiceArea } from "@/components/painting/service-area";
import { CtaBand } from "@/components/painting/cta-band";
import { SectionHeading } from "@/components/painting/section-heading";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Aron Stotts & Stotts Extravagant Painting | Trail Creek, IN",
      description:
        "Aron Stotts learned to paint in Florida, moved back to Indiana, and started Stotts Extravagant Painting, a family-owned painting business in Trail Creek serving Michigan City.",
      path: "/about",
    }),
  component: About,
});

const MATTERS = [
  {
    title: "How it looks when it's done",
    body: "Aron cares about the finished project. The edges, the color, the way a room or a house looks when the work is over. That's the standard he holds the business to.",
  },
  {
    title: "A price that's fair",
    body: "He believes people should be able to get good painting work at a reasonable price, and that you should get a clear conversation about what you need.",
  },
  {
    title: "How you feel afterward",
    body: "One of his favorite parts of the job is seeing how happy someone is when they see their home after the work is done.",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About us" title="A painter who decided to start his own company.">
        <p>
          Stotts Extravagant Painting is a family-owned business based in Trail Creek, Indiana,
          started by Aron Stotts.
        </p>
      </PageHero>
      <Story showLink={false} extended />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What matters to Aron"
            title="Three things the business is built around"
          />
          <ul className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {MATTERS.map((m, i) => (
              <li key={m.title} className="bg-white p-7 sm:p-9">
                <span
                  className="font-display text-4xl font-extrabold leading-none text-accent"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-card mt-4">{m.title}</h3>
                <p className="mt-3 leading-[1.7] text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceArea />
      <CtaBand />
    </SiteLayout>
  );
}
