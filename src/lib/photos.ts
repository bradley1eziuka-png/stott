// Client project photography. Every entry is a real photo supplied by the
// business (see /Images in the workspace); nothing here is stock or generated.
// Files are web-optimized copies in /public/images. Originals are untouched.
//
// Categories are only assigned where the photo clearly supports them. No
// before/after pairs, customer names, or project locations are implied.
export type PhotoCategory = "exterior" | "interior" | "deck-fence";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: PhotoCategory;
  width: number;
  height: number;
};

export const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  exterior: "Exterior Painting",
  interior: "Interior Painting",
  "deck-fence": "Deck & Fence Staining",
};

const p = (
  id: string,
  category: PhotoCategory,
  width: number,
  height: number,
  caption: string,
  alt: string,
): Photo => ({ id, src: `/images/${id}.webp`, alt, caption, category, width, height });

export const PHOTOS = {
  craftsmanPortrait: p(
    "hero-craftsman",
    "exterior",
    720,
    960,
    "Craftsman-style home",
    "Blue-gray craftsman-style home with painted siding, a timber-framed entry, and warm wood front door",
  ),
  craftsmanFront: p(
    "craftsman-front",
    "exterior",
    960,
    720,
    "Craftsman-style exterior",
    "Front view of a blue-gray craftsman home with a timber-framed entry and attached garage",
  ),
  blueLadder: p(
    "blue-ladder",
    "exterior",
    640,
    480,
    "Blue exterior with contrasting white trim",
    "Blue two-story home with crisp white trim and a tall entry, with ladders and a paint sprayer set up out front",
  ),
  blueBungalow: p(
    "blue-bungalow",
    "exterior",
    640,
    480,
    "Blue bungalow with white window trim",
    "Blue bungalow with bright white window trim and a red picket fence",
  ),
  blueGarage: p(
    "blue-garage",
    "exterior",
    640,
    480,
    "Blue garage with red doors",
    "Blue detached garage with red overhead doors and red trim beside a painted home",
  ),
  whiteColonial: p(
    "white-colonial",
    "exterior",
    640,
    480,
    "White colonial",
    "White two-story colonial home with dark shutters on a wooded lot",
  ),
  tanChimney: p(
    "tan-chimney",
    "exterior",
    640,
    480,
    "Tan siding and brick chimney",
    "Side of a home with clean tan-painted siding beside a white brick chimney",
  ),
  tanGable: p(
    "tan-gable",
    "exterior",
    640,
    480,
    "Tan gable siding",
    "Tan-painted gable-end siding with even coverage above a landscaped flower bed",
  ),
  poolDeck: p(
    "pool-deck",
    "deck-fence",
    640,
    480,
    "Backyard pool deck",
    "Tan-painted wood deck with railing surrounding a backyard pool",
  ),
  fenceStained: p(
    "fence-stained",
    "deck-fence",
    640,
    480,
    "Fence staining project",
    "Warm amber stained wood privacy fence around a backyard garden bed",
  ),
  interiorGray: p(
    "interior-gray",
    "interior",
    1200,
    900,
    "Gray walls, white trim",
    "Living room with smooth gray walls, bright white trim and panel molding, and built-in shelving",
  ),
  stairsWhite: p(
    "interior-stairs-white",
    "interior",
    1200,
    900,
    "Interior walls and staircase",
    "Staircase with wood railing and painted white walls, floors masked with blue tape",
  ),
  stairsTall: p(
    "interior-stairs-tall",
    "interior",
    900,
    1200,
    "Staircase and white walls",
    "Open staircase with wood treads and clean, painted white walls",
  ),
  bath: p(
    "interior-bath",
    "interior",
    1000,
    750,
    "Bathroom walls",
    "Bathroom with two-tone gray painted walls and a clean white chair rail",
  ),
  wall: p(
    "interior-wall",
    "interior",
    1000,
    750,
    "Smooth wall finish",
    "Close view of a smooth, evenly painted gray interior wall meeting a warm accent wall",
  ),
  van: p(
    "company-van",
    "exterior",
    640,
    480,
    "The Stotts work van",
    "White Stotts Extravagant Painting work van with the red paint-splatter logo parked beside a brick building",
  ),
} satisfies Record<string, Photo>;

// Gallery set: strongest real work, in display order. The work van and
// in-progress shots are used elsewhere on the site, not in the gallery.
export const GALLERY: Photo[] = [
  PHOTOS.craftsmanFront,
  PHOTOS.interiorGray,
  PHOTOS.blueBungalow,
  PHOTOS.fenceStained,
  PHOTOS.blueLadder,
  PHOTOS.stairsTall,
  PHOTOS.blueGarage,
  PHOTOS.poolDeck,
  PHOTOS.whiteColonial,
  PHOTOS.stairsWhite,
  PHOTOS.tanChimney,
  PHOTOS.bath,
  PHOTOS.craftsmanPortrait,
];

// Homepage preview: first tile is the large feature, the rest are small tiles.
export const FEATURED: Photo[] = [
  PHOTOS.blueBungalow,
  PHOTOS.blueGarage,
  PHOTOS.stairsTall,
  PHOTOS.whiteColonial,
  PHOTOS.poolDeck,
];
