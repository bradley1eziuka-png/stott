import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/painting/site-layout";
import { Hero } from "@/components/painting/hero";
import { Trust } from "@/components/painting/trust";
import { Services } from "@/components/painting/services";
import { FeaturedProjects } from "@/components/painting/featured-projects";
import { Story } from "@/components/painting/story";
import { Reviews } from "@/components/painting/reviews";
import { ServiceArea } from "@/components/painting/service-area";
import { CtaBand } from "@/components/painting/cta-band";
import { HOME_DESCRIPTION, HOME_TITLE, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Trust />
      <Services />
      <FeaturedProjects />
      <Story />
      <Reviews />
      <ServiceArea />
      <CtaBand />
    </SiteLayout>
  );
}
