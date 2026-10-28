import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteLayout } from "@/components/painting/site-layout";
import { ServicePage } from "@/components/painting/service-page";
import { isServiceEnabled, SERVICES } from "@/lib/services-data";
import { pageHead } from "@/lib/seo";

const service = SERVICES.deckFence;

export const Route = createFileRoute("/services/fence-deck-staining")({
  // Services removed from site.config.json → services.enabled return a 404.
  beforeLoad: () => {
    if (!isServiceEnabled("deckFence")) throw notFound();
  },
  head: () =>
    pageHead({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.path,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <ServicePage service={service} />
    </SiteLayout>
  );
}
