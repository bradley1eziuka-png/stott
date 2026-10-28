// ───────────────────────────────────────────────────────────────────────────
// Service content for Stotts Extravagant Painting. Every service page is
// generated from this file so all five share one voice and layout.
//
// Copy rules: no invented credentials, years in business, warranties,
// equipment, product brands, or project locations. Describe the work the
// owner told us they do, in plain homeowner language.
//
// To hide a service, remove its key from site.config.json → services.enabled.
// ───────────────────────────────────────────────────────────────────────────

import { siteConfig, type ServiceKey } from "@/config";
import { PHOTOS, type Photo } from "./photos";
import { IMAGES } from "./site-images";

export type ServiceBenefit = { title: string; description: string };
export type ServiceFaq = { q: string; a: string };

export interface ServiceConfig {
  key: ServiceKey;
  slug: string;
  path: string;
  title: string;
  /** Short label for tight spaces (cards, footer). */
  shortTitle: string;
  eyebrow: string;
  /** Page H1. */
  headline: string;
  /** Relatable opening paragraph under the headline. */
  intro: string;
  /** Label for the homepage service card link. */
  cardCta: string;
  shortDescription: string;
  /** The three services the owner prioritized get larger placement. */
  priority: boolean;
  metaTitle: string;
  metaDescription: string;
  explanation: { title: string; paragraphs: string[] };
  includes: string[];
  benefits: ServiceBenefit[];
  gallery: Photo[];
  faqs: ServiceFaq[];
  related: ServiceKey[];
  heroImage: string;
  heroAlt: string;
  cardImage: string;
  cardAlt: string;
}

const BASE_SERVICES = {
  interior: {
    key: "interior",
    slug: "interior-painting",
    path: "/services/interior-painting",
    title: "Interior Painting",
    shortTitle: "Interior",
    cardCta: "View interior painting",
    intro:
      "Maybe the paint is dated, scuffed, or just not you anymore. A new color on the walls can make a room feel brighter and more like your own. We paint interiors for homeowners in Michigan City, Trail Creek, and the surrounding area.",
    eyebrow: "Interior Painting",
    headline: "Ready to Change the Way a Room Feels?",
    shortDescription:
      "Tired of looking at the same walls? Whether you're changing colors or cleaning up a room that's seen better days, we'll help you get the look you're after.",
    priority: true,
    metaTitle: "Interior Painting in Michigan City, IN | Stotts Extravagant Painting",
    metaDescription:
      "Interior painting for homeowners in Michigan City, Trail Creek, and Northwest Indiana. Tell Stotts Extravagant Painting what you want your rooms to look like.",
    explanation: {
      title: "Start with what you're not happy with.",
      paragraphs: [
        "Tell us what bothers you about the room. Maybe it's a color you've lived with too long, walls that show years of wear, or a space you're about to put back together. We'll talk through what you want it to look like.",
        "Paint covers everything you see in a room, so the details matter: how clean the edges are, how even the walls look, how the trim sits against the color. Aron started this business because he cares about getting those things right.",
      ],
    },
    includes: [
      "Bedrooms, living rooms, and other living spaces",
      "Walls and ceilings",
      "Trim and doors",
      "Stairwells",
      "Color changes and room refreshes",
    ],
    benefits: [
      {
        title: "A room that feels newer",
        description: "New paint brightens a space and makes it feel cared for again.",
      },
      {
        title: "Walls that look even",
        description:
          "Smooth, consistent color with clean edges where walls meet trim and ceilings.",
      },
      {
        title: "A say in the result",
        description:
          "You tell us what you're after. We want to understand it before the work starts.",
      },
    ],
    gallery: [PHOTOS.interiorGray, PHOTOS.bath, PHOTOS.stairsTall],
    faqs: [
      {
        q: "Do I need to move my furniture?",
        a: "Ask us when you request your estimate. It depends on the room and the job.",
      },
      {
        q: "Can you help me think through colors?",
        a: "Yes, we're happy to talk it through. Tell us the feel you're after and what you like.",
      },
      {
        q: "How long will it take?",
        a: "That depends on how many rooms and how much needs to be done. Ask when you reach out.",
      },
    ],
    related: ["drywall", "exterior"],
    heroImage: IMAGES.interior,
    heroAlt:
      "Living room with smooth gray walls, bright white trim and panel molding, and built-in shelving",
    cardImage: IMAGES.interior,
    cardAlt:
      "Living room with smooth gray walls, bright white trim and panel molding, and built-in shelving",
  },

  exterior: {
    key: "exterior",
    slug: "exterior-painting",
    path: "/services/exterior-painting",
    title: "Exterior Painting",
    shortTitle: "Exterior",
    cardCta: "View exterior painting",
    intro:
      "Faded siding, worn trim, or paint that's seen better days can make a good house look tired. A repaint is one of the clearest ways to make a home look cared for again. We paint exteriors for homeowners across Northwest Indiana and Southwest Michigan.",
    eyebrow: "Exterior Painting",
    headline: "Is Your Home's Exterior Starting to Show Its Age?",
    shortDescription:
      "Faded siding, worn trim, or a house that's ready for a new color? Give your exterior the attention it needs to look good again.",
    priority: true,
    metaTitle: "Exterior House Painting in Michigan City, IN | Stotts Extravagant Painting",
    metaDescription:
      "Exterior painting for homes in Michigan City and Northwest Indiana. Faded siding, worn trim, or a new color: talk to a family-owned painter based in Trail Creek.",
    explanation: {
      title: "The outside is what everyone sees first.",
      paragraphs: [
        "It's what you see pulling into the driveway and what your neighbors see every day. A new color, cleaner trim, and even coverage change how the whole house looks from the street.",
        "Not sure how much your house needs? Tell us what you're seeing and we'll talk it through. If power washing makes sense first, we can help with that too.",
      ],
    },
    includes: ["Siding", "Window and door trim", "Garage doors", "Accent colors and details"],
    benefits: [
      {
        title: "A house that looks cared for",
        description: "Fresh paint on siding and trim lifts the whole look of a home.",
      },
      {
        title: "A color you're happy with",
        description: "Ready for something new? We'll talk through what you have in mind.",
      },
      {
        title: "Details that get attention",
        description: "Trim, doors, and accents matter as much as the big wall surfaces.",
      },
    ],
    gallery: [PHOTOS.craftsmanFront, PHOTOS.blueBungalow, PHOTOS.blueGarage, PHOTOS.whiteColonial],
    faqs: [
      {
        q: "When is the best time to paint an exterior?",
        a: "Weather matters for outdoor painting. Ask when you reach out and we'll talk through timing.",
      },
      {
        q: "Can you paint just the trim or the garage?",
        a: "Yes. Not every project is a whole-house repaint. Tell us what you have in mind.",
      },
      {
        q: "Do you do power washing first?",
        a: "We offer power washing, and it can make sense before painting. We'll talk through what your house needs.",
      },
    ],
    related: ["powerWashing", "deckFence"],
    heroImage: IMAGES.exterior,
    heroAlt:
      "Front view of a blue-gray craftsman home with a timber-framed entry and attached garage",
    cardImage: IMAGES.exterior,
    cardAlt:
      "Front view of a blue-gray craftsman home with a timber-framed entry and attached garage",
  },

  deckFence: {
    key: "deckFence",
    slug: "fence-deck-staining",
    path: "/services/fence-deck-staining",
    title: "Fence & Deck Staining",
    shortTitle: "Fence & Deck",
    cardCta: "View staining services",
    intro:
      "Sun, rain, and Lake Michigan winters are hard on outdoor wood. Over time, decks and fences fade, gray, and start to look worn. A fresh coat of stain can bring the color back and make the whole yard look better.",
    eyebrow: "Fence & Deck Staining",
    headline: "Your Deck and Fence Should Look Good, Too.",
    shortDescription:
      "Your deck and fence take a beating from the weather. A fresh coat of stain can make a noticeable difference in how your outdoor space looks.",
    priority: true,
    metaTitle: "Fence & Deck Staining in Michigan City, IN | Stotts Extravagant Painting",
    metaDescription:
      "Fence staining and deck staining for homeowners in Michigan City and Northwest Indiana. Bring tired outdoor wood back with Stotts Extravagant Painting.",
    explanation: {
      title: "Outdoor wood takes a beating.",
      paragraphs: [
        "A worn fence or deck is easy to ignore until company is coming. Staining can change how your backyard looks without replacing anything.",
        "We stain fences and decks for homeowners in Michigan City, Trail Creek, and the surrounding area. Not sure if yours is ready for it? Ask us.",
      ],
    },
    includes: ["Wood fences", "Wood decks", "Decks around pools and outdoor living areas"],
    benefits: [
      {
        title: "Color back in the wood",
        description: "Fading and graying give way to a richer, more even look.",
      },
      {
        title: "A better-looking yard",
        description: "A good fence and deck set off the landscaping and the house behind them.",
      },
      {
        title: "No replacement needed",
        description: "Often the wood is fine. It just needs a new finish.",
      },
    ],
    gallery: [PHOTOS.fenceStained, PHOTOS.poolDeck],
    faqs: [
      {
        q: "How do I know if my deck or fence needs staining?",
        a: "Fading, graying, and patchy color are the usual signs. Tell us what you're seeing.",
      },
      {
        q: "What's the difference between stain and paint?",
        a: "Stain soaks into the wood and shows the grain. Paint sits on the surface. Tell us the look you want and we'll talk it through.",
      },
      {
        q: "Does the weather matter?",
        a: "Yes. Outdoor work needs dry conditions, so timing depends on the forecast.",
      },
    ],
    related: ["powerWashing", "exterior"],
    heroImage: IMAGES.deckFence,
    heroAlt: "Warm amber stained wood privacy fence around a backyard garden bed",
    cardImage: IMAGES.deckFence,
    cardAlt: "Warm amber stained wood privacy fence around a backyard garden bed",
  },

  drywall: {
    key: "drywall",
    slug: "drywall-repair",
    path: "/services/drywall-repair",
    title: "Drywall Repair",
    shortTitle: "Drywall Repair",
    cardCta: "View drywall repair",
    intro:
      "A dent from a doorknob, a crack that keeps coming back, a patch left from an old project. Paint doesn't hide those. It tends to make them easier to see. We repair damaged drywall so the wall looks right once it's painted.",
    eyebrow: "Drywall Repair",
    headline: "That Hole in the Wall Isn't Going to Fix Itself.",
    shortDescription:
      "Holes, cracks, and damaged drywall can stand out even more after painting. We help get those problem areas ready for a better-looking finish.",
    priority: false,
    metaTitle: "Drywall Repair in Michigan City, IN | Stotts Extravagant Painting",
    metaDescription:
      "Drywall repair for painting projects in Michigan City and Northwest Indiana. Holes, cracks, and damaged walls fixed before paint, by a family-owned painter.",
    explanation: {
      title: "Fix it before you paint over it.",
      paragraphs: [
        "If you're repainting a room, repair work is part of getting a good finish. Patching problem areas first means the paint goes onto a more even wall.",
        "Our drywall work is repair for painting projects. If a job is bigger than that, we'll tell you honestly.",
      ],
    },
    includes: [
      "Holes and dents",
      "Cracks",
      "Damaged or uneven areas",
      "Getting repaired spots ready for paint",
    ],
    benefits: [
      {
        title: "Walls that look more uniform",
        description: "Repaired areas blend in instead of standing out.",
      },
      {
        title: "Repair and paint together",
        description: "Fixing the wall and painting it in the same project keeps things simple.",
      },
      {
        title: "A straight answer",
        description: "If something is outside what we do, we'll say so.",
      },
    ],
    gallery: [PHOTOS.stairsWhite, PHOTOS.wall],
    faqs: [
      {
        q: "Can you fix the wall and paint it?",
        a: "Yes. Repair and painting go together well, and it keeps the project in one place.",
      },
      {
        q: "Do you do major drywall work?",
        a: "Our drywall work is repair for painting projects. If it's bigger than that, we'll tell you.",
      },
    ],
    related: ["interior", "exterior"],
    heroImage: IMAGES.drywall,
    heroAlt: "Staircase with wood railing and painted white walls, floors masked with blue tape",
    cardImage: IMAGES.drywall,
    cardAlt: "Staircase with wood railing and painted white walls, floors masked with blue tape",
  },

  powerWashing: {
    key: "powerWashing",
    slug: "power-washing",
    path: "/services/power-washing",
    title: "Power Washing",
    shortTitle: "Power Washing",
    cardCta: "View power washing",
    intro:
      "Dirt, mildew, and buildup can make an otherwise good-looking house, deck, or fence look worn down. Sometimes cleaning is all it takes. Other times it's the first step before painting or staining.",
    eyebrow: "Power Washing",
    headline: "Sometimes, What Your Exterior Needs Is a Good Cleaning.",
    shortDescription:
      "Dirt and buildup can make an otherwise good-looking exterior seem worn down. Power washing helps clean up those surfaces.",
    priority: false,
    metaTitle: "Power Washing in Michigan City, IN | Stotts Extravagant Painting",
    metaDescription:
      "Power washing for siding, decks, and fences in Michigan City and Northwest Indiana. On its own or before painting or staining.",
    explanation: {
      title: "Clean surfaces look better and take paint better.",
      paragraphs: [
        "Power washing clears the grime that builds up on exterior surfaces. We offer it on its own, or as prep before painting or staining.",
        "Planning an exterior or deck project? Mention it when you reach out and we'll talk through whether washing makes sense first.",
      ],
    },
    includes: ["House siding", "Decks", "Fences", "Prep before painting or staining"],
    benefits: [
      {
        title: "A cleaner-looking exterior",
        description: "Less visible dirt and buildup on the surfaces you see every day.",
      },
      {
        title: "A better starting point",
        description: "Painting or staining goes onto a cleaner surface.",
      },
      {
        title: "Easy to add on",
        description: "Tell us about both and we'll look at them together.",
      },
    ],
    gallery: [PHOTOS.tanGable, PHOTOS.tanChimney],
    faqs: [
      {
        q: "Can you power wash before painting or staining?",
        a: "Yes. Cleaning first is a good starting point for either.",
      },
      { q: "Can I book power washing by itself?", a: "Yes. Tell us what you'd like cleaned." },
    ],
    related: ["exterior", "deckFence"],
    heroImage: IMAGES.powerWashing,
    heroAlt: "Tan gable-end siding with even coverage above a landscaped flower bed",
    cardImage: IMAGES.powerWashing,
    cardAlt: "Tan gable-end siding with even coverage above a landscaped flower bed",
  },
} satisfies Record<ServiceKey, ServiceConfig>;

// Apply per-client title/description overrides from site.config.json.
export const SERVICES = Object.fromEntries(
  Object.entries(BASE_SERVICES).map(([key, base]) => {
    const o = siteConfig.services.overrides[key as ServiceKey] ?? {};
    return [
      key,
      {
        ...base,
        ...(o.title ? { title: o.title } : {}),
        ...(o.shortDescription ? { shortDescription: o.shortDescription } : {}),
      },
    ];
  }),
) as Record<ServiceKey, ServiceConfig>;

export function isServiceEnabled(key: ServiceKey) {
  return siteConfig.services.enabled.includes(key);
}

// Ordered list for the header dropdown, footer links, and the home services grid.
export const SERVICE_LIST: ServiceConfig[] = siteConfig.services.enabled.map((k) => SERVICES[k]);
