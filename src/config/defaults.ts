// ───────────────────────────────────────────────────────────────────────────
// Fallback copy for fields left empty in site.config.json → content.
// Business-specific copy for Stotts lives in the config and in
// src/lib/services-data.ts. Do not add business facts, licenses, years in
// business, ratings, or reviews here.
// ───────────────────────────────────────────────────────────────────────────

export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "Professional Painting Services",
    tagline: "",
    subheadline:
      "Interior and exterior painting, fence and deck staining, drywall repair, and power washing.",
  },
  about: {
    eyebrow: "Our Story",
    title: "A Painter Who Cares How Your Home Turns Out",
    body: "",
    badgeTitle: "",
    badgeText: "",
  },
  faqs: [
    {
      q: "How do I get started with a painting project?",
      a: "Share what you'd like painted and the look you're hoping for using the estimate form or by phone. A quick conversation about your space, goals, and timeline is the best first step.",
    },
    {
      q: "Can I request an estimate?",
      a: "Yes. Use the estimate form on the contact page or call us directly. Share a few details about your project and we'll take it from there.",
    },
  ],
  footerBlurb: "Professional interior and exterior painting.",
  finalCta: {
    title: "Have a Painting Project in Mind? Let's Talk About It.",
    body: "Tell us what you're looking to have done and we'll help you figure out the next step.",
  },
  seo: {
    description: "Professional interior and exterior painting. Request an estimate today.",
  },
} as const;

export const DEFAULT_IMAGES = {
  hero: "/images/hero-craftsman.webp",
  interior: "/images/interior-gray.webp",
  exterior: "/images/craftsman-front.webp",
  deckFence: "/images/fence-stained.webp",
  drywall: "/images/interior-stairs-white.webp",
  powerWashing: "/images/tan-gable.webp",
  story: "/images/company-van.webp",
} as const;
