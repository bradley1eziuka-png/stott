// ───────────────────────────────────────────────────────────────────────────
// Site config schema. Every business-specific value lives in
// site.config.json and is validated against this schema at startup, so a typo
// fails loudly instead of shipping a broken page.
// ───────────────────────────────────────────────────────────────────────────
import { z } from "zod";

export const SERVICE_KEYS = [
  "interior",
  "exterior",
  "deckFence",
  "drywall",
  "powerWashing",
] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const IMAGE_KEYS = [
  "hero",
  "interior",
  "exterior",
  "deckFence",
  "drywall",
  "powerWashing",
  "story",
] as const;
export type ImageKey = (typeof IMAGE_KEYS)[number];

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color like #142337");
const optionalText = z.string().default("");

const faq = z.object({ q: z.string().min(1), a: z.string().min(1) });
const hoursRow = z.object({ days: z.string().min(1), hours: z.string().min(1) });

export const siteConfigSchema = z.object({
  business: z.object({
    name: z.string().min(1),
    legalName: optionalText,
    owner: optionalText,
    shortName: optionalText,
    phone: z.string().min(7),
    email: optionalText,
    address: z
      .object({
        street: optionalText,
        city: optionalText,
        state: optionalText,
        zip: optionalText,
      })
      .default({}),
    // Only list areas the business confirmed. Empty = nothing is shown.
    serviceAreas: z.array(z.string()).default([]),
    hours: z.array(hoursRow).default([]),
    social: z
      .object({
        facebook: optionalText,
        instagram: optionalText,
        google: optionalText,
        yelp: optionalText,
        nextdoor: optionalText,
        youtube: optionalText,
      })
      .default({}),
  }),

  branding: z
    .object({
      // Leave src empty to keep the paintbrush mark. Example: "/logo.png"
      // src = full wordmark logo; markSrc = brush-only crop used on small screens.
      logo: z.object({ src: optionalText, markSrc: optionalText, alt: optionalText }).default({}),
      favicon: z.string().default("/favicon.svg"),
      // Leave empty to keep the master navy + gold palette.
      colors: z.object({ primary: hex.optional(), accent: hex.optional() }).default({}),
      // Override any image with a path under /public (e.g. "/images/hero.jpg") or a full URL.
      images: z.record(z.enum(IMAGE_KEYS), z.string()).default({}),
    })
    .default({}),

  services: z
    .object({
      // Order here = order in nav, footer, and homepage grid (first 3 on the homepage).
      enabled: z.array(z.enum(SERVICE_KEYS)).min(1),
      overrides: z
        .record(
          z.enum(SERVICE_KEYS),
          z.object({
            title: z.string().optional(),
            shortDescription: z.string().optional(),
          }),
        )
        .default({}),
    })
    .default({ enabled: [...SERVICE_KEYS], overrides: {} }),

  // Every field is optional; missing ones fall back to src/config/defaults.ts.
  content: z
    .object({
      hero: z
        .object({
          eyebrow: z.string().optional(),
          headline: z.string().optional(),
          tagline: z.string().optional(),
          subheadline: z.string().optional(),
        })
        .default({}),
      about: z
        .object({
          eyebrow: z.string().optional(),
          title: z.string().optional(),
          body: z.string().optional(),
          badgeTitle: z.string().optional(),
          badgeText: z.string().optional(),
        })
        .default({}),
      faqs: z.array(faq).optional(),
      footerBlurb: z.string().optional(),
      finalCta: z.object({ title: z.string().optional(), body: z.string().optional() }).default({}),
      // Provisional Google rating summary. verified=false until the owner confirms the live
      // Google Business Profile numbers. Omit the object to hide the rating everywhere.
      reviews: z
        .object({
          rating: z.string().min(1),
          count: z.number().int().positive(),
          source: z.string().default("Google"),
          url: optionalText,
          verified: z.boolean().default(false),
        })
        .optional(),
      // Real customer reviews only. Empty array = no written reviews are shown.
      testimonials: z
        .array(
          z.object({
            quote: z.string().min(1),
            author: z.string().min(1),
            detail: z.string().optional(),
          }),
        )
        .default([]),
    })
    .default({}),

  seo: z
    .object({
      // Production URL with no trailing slash, e.g. "https://example.com"
      siteUrl: optionalText,
      title: optionalText,
      description: optionalText,
      ogImage: optionalText,
      locale: z.string().default("en_US"),
    })
    .default({}),

  form: z
    .object({
      // demo = not connected (never reports success). See README → Estimate form.
      provider: z.enum(["demo", "formspree", "ghl-webhook"]).default("demo"),
      formspreeId: optionalText,
      webhookUrl: optionalText,
      showDemoNotice: z.boolean().default(true),
    })
    .default({}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
