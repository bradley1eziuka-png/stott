// SEO helpers: per-page head tags (title, description, canonical, Open Graph,
// Twitter) and LocalBusiness structured data, all driven by site.config.json.
import { DEFAULT_CONTENT } from "@/config/defaults";
import { siteConfig } from "@/config";
import { BUSINESS_NAME, BUSINESS_PHONE, LOCATION_LABEL, SITE_URL } from "./site-config";
import { IMAGES } from "./site-images";

const { business, seo } = siteConfig;

function absolute(pathOrUrl: string) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL ? `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}` : pathOrUrl;
}

export const HOME_TITLE =
  seo.title ||
  `${BUSINESS_NAME} | Professional Painting Services${LOCATION_LABEL ? ` in ${LOCATION_LABEL}` : ""}`;
export const HOME_DESCRIPTION = seo.description || DEFAULT_CONTENT.seo.description;
export const OG_FALLBACK = seo.ogImage || IMAGES.hero;

export function pageHead({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const ogImage = absolute(image || seo.ogImage || IMAGES.hero);
  const url = SITE_URL ? `${SITE_URL}${path === "/" ? "" : path}` : "";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BUSINESS_NAME },
      { property: "og:locale", content: seo.locale },
      ...(url ? [{ property: "og:url", content: url }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}

// schema.org HousePainter (a LocalBusiness subtype). Only fields the client
// actually provided are emitted — nothing is invented.
export function localBusinessJsonLd() {
  const a = business.address;
  const hasAddress = Boolean(a.street || a.city || a.state || a.zip);
  const sameAs = Object.values(business.social).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: BUSINESS_NAME,
    ...(business.legalName && { legalName: business.legalName }),
    telephone: BUSINESS_PHONE,
    image: absolute(seo.ogImage || IMAGES.hero),
    ...(SITE_URL && { url: SITE_URL }),
    ...(business.email && { email: business.email }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        ...(a.street && { streetAddress: a.street }),
        ...(a.city && { addressLocality: a.city }),
        ...(a.state && { addressRegion: a.state }),
        ...(a.zip && { postalCode: a.zip }),
        addressCountry: "US",
      },
    }),
    ...(business.serviceAreas.length > 0 && {
      areaServed: business.serviceAreas.map((name) => ({ "@type": "Place", name })),
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };
  return JSON.stringify(data);
}
