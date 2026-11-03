// SEO helpers: per-page head tags (title, description, canonical, Open Graph,
// Twitter) and LocalBusiness structured data, all driven by site.config.json.
import { DEFAULT_CONTENT } from "@/config/defaults";
import { siteConfig } from "@/config";
import {
  BUSINESS_NAME,
  BUSINESS_OWNER,
  BUSINESS_PHONE,
  LOCATION_LABEL,
  SITE_URL,
} from "./site-config";
import { SERVICE_LIST } from "./services-data";
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
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: string;
}) {
  const ogImage = absolute(image || seo.ogImage || IMAGES.hero);
  const url = SITE_URL ? `${SITE_URL}${path}` : "";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { property: "og:image:alt", content: `${BUSINESS_NAME} logo` },
      { property: "og:site_name", content: BUSINESS_NAME },
      { property: "og:locale", content: seo.locale },
      ...(url ? [{ property: "og:url", content: url }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
    ...(jsonLd && { scripts: [{ type: "application/ld+json", children: jsonLd }] }),
  };
}

// ── Structured data ────────────────────────────────────────────────────────
// One linked @graph per page. Only facts the owner confirmed: name, phone,
// email, hours, Trail Creek (city-level only, no street address), service
// areas, services. No ratings or Review markup: the Google figures are not
// verified, and self-serving review markup is not eligible for rich results.
const BIZ_ID = `${SITE_URL}/#business`;
const SITE_ID = `${SITE_URL}/#website`;
const OWNER_ID = `${SITE_URL}/about#owner`;

const AREA_TYPES: Record<string, string> = {
  "Michigan City, IN": "City",
  "Trail Creek, IN": "City",
  "Michiana Shores, IN": "City",
  "New Buffalo, MI": "City",
  "Grand Beach, MI": "City",
  "LaPorte County, IN": "AdministrativeArea",
  "Porter County, IN": "AdministrativeArea",
};

function businessNode() {
  const a = business.address;
  const hasAddress = Boolean(a.street || a.city || a.state || a.zip);
  const sameAs = Object.values(business.social).filter(Boolean);
  return {
    "@type": "HousePainter",
    "@id": BIZ_ID,
    name: BUSINESS_NAME,
    ...(business.legalName && { legalName: business.legalName }),
    url: `${SITE_URL}/`,
    telephone: BUSINESS_PHONE,
    ...(business.email && { email: business.email }),
    image: absolute(seo.ogImage || IMAGES.hero),
    logo: absolute(siteConfig.branding.logo.src),
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
    // Mon–Fri 8–5, as confirmed by the owner (site.config.json → business.hours).
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: business.serviceAreas.map((name) => ({
      "@type": AREA_TYPES[name] ?? "Place",
      name,
    })),
    founder: { "@id": OWNER_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting services",
      itemListElement: SERVICE_LIST.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${SITE_URL}${s.path}` },
      })),
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

const ownerNode = () => ({
  "@type": "Person",
  "@id": OWNER_ID,
  name: BUSINESS_OWNER,
  jobTitle: "Owner",
  worksFor: { "@id": BIZ_ID },
});

/** Site-wide graph: business, website, owner. Rendered once in the root route. */
export function localBusinessJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      businessNode(),
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: `${SITE_URL}/`,
        name: BUSINESS_NAME,
        publisher: { "@id": BIZ_ID },
        inLanguage: "en-US",
      },
      ownerNode(),
    ],
  });
}

/** Per-service page: Service (provided by the business) + breadcrumb trail. */
export function serviceJsonLd(service: { title: string; path: string; metaDescription: string }) {
  const url = `${SITE_URL}${service.path}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        url,
        provider: { "@id": BIZ_ID },
        areaServed: business.serviceAreas.map((name) => ({
          "@type": AREA_TYPES[name] ?? "Place",
          name,
        })),
      },
      breadcrumbJson([
        ["Home", "/"],
        ["Services", "/#services"],
        [service.title, service.path],
      ]),
    ],
  });
}

function breadcrumbJson(items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
