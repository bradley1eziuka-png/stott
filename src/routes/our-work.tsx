import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/painting/site-layout";
import { PageHero } from "@/components/painting/page-hero";
import { WorkGallery } from "@/components/painting/work-gallery";
import { CtaBand } from "@/components/painting/cta-band";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/our-work")({
  head: () =>
    pageHead({
      title: "Painting Project Photos | Stotts Extravagant Painting, Michigan City Area",
      description:
        "Photos of exterior painting, interior painting, and fence and deck staining projects by Stotts Extravagant Painting, a family-owned painter in Trail Creek, Indiana.",
      path: "/our-work",
    }),
  component: OurWork,
});

function OurWork() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Our work" title="Take a look at the work we've done.">
        <p>
          Every project is a little different. Browse some of the homes, rooms, decks, and other
          surfaces we've worked on.
        </p>
      </PageHero>
      <section className="section-pad bg-background">
        <div className="container-page">
          <WorkGallery />
        </div>
      </section>
      <CtaBand
        title="See something like what you want?"
        body="Tell us about your project and we'll talk it through."
      />
    </SiteLayout>
  );
}
