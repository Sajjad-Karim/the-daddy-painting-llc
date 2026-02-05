/**
 * Shared service data for home grid and service detail pages.
 * imageKey is used to map to imported images in components.
 */
export const SERVICES = [
  {
    slug: "interior-painting",
    title: "INTERIOR PAINTING",
    body: "From single rooms to whole-house repaints. We ensure smooth walls, crisp trim lines, and perfect ceilings for your home in Easley or Greenville.",
    imageKey: "interior",
    detailDescription:
      "Our interior painting services transform your living spaces with precision and care. Whether you need a single room refresh or a complete whole-house repaint, our experienced team delivers smooth walls, crisp trim lines, and flawless ceilings. We use premium paints and proven techniques to ensure lasting beauty and durability for your home in Easley, Greenville, and surrounding areas.",
    detailPoints: [
      "Single-room and whole-house repaints",
      "Smooth walls, crisp trim, and perfect ceilings",
      "Premium paints and color consultation",
      "Minimal disruption and clean finish",
    ],
  },
  {
    slug: "exterior-painting",
    title: "EXTERIOR PAINTING",
    body: "Boost your curb appeal and protect your property from the weather. We use high-quality, durable paints designed to last.",
    imageKey: "exterior",
    detailDescription:
      "Protect and beautify your property with our exterior painting services. We boost curb appeal and shield your home from the elements using high-quality, durable paints designed to withstand South Carolina weather. Our team prepares surfaces properly and applies finishes that last for years.",
    detailPoints: [
      "Full exterior repaints and touch-ups",
      "Weather-resistant, durable finishes",
      "Surface prep and power washing",
      "Curb appeal that lasts",
    ],
  },
  {
    slug: "cabinet-painting",
    title: "CABINET PAINTING",
    body: "Don't replace refinish. We transform outdated kitchen and bathroom cabinets with a factory-like, durable finish.",
    imageKey: "cabinet",
    detailDescription:
      "Give your kitchen or bathroom a fresh look without the cost of replacement. We transform outdated cabinets with a factory-like, durable finish that looks and performs like new. Our process includes proper prep, priming, and top-coat application for a lasting result.",
    detailPoints: [
      "Kitchen and bathroom cabinet refinishing",
      "Factory-like, durable finish",
      "Color and finish options",
      "No replacement needed",
    ],
  },
  {
    slug: "deck-fence-staining",
    title: "DECK & FENCE STAINING",
    body: "Protect your outdoor wood structures. We specialize in staining, painting, and weatherproofing decks and fences.",
    imageKey: "deck",
    detailDescription:
      "Extend the life and beauty of your outdoor wood structures with our deck and fence staining services. We specialize in staining, painting, and weatherproofing to protect against sun, rain, and wear. From decks to fences, we deliver a finish that stands up to the elements.",
    detailPoints: [
      "Deck and fence staining and painting",
      "Weatherproofing and sealants",
      "Restoration of weathered wood",
      "Long-lasting protection",
    ],
  },
  {
    slug: "power-washing",
    title: "POWER WASHING",
    body: "Essential preparation for painting or general cleaning. We remove dirt, mold, and grime from siding, driveways, and walkways.",
    imageKey: "powerWash",
    detailDescription:
      "Essential preparation for painting or standalone cleaning—our power washing service removes dirt, mold, and grime from siding, driveways, and walkways. We use professional equipment and safe techniques to restore surfaces without damage, so your property looks its best.",
    detailPoints: [
      "Siding, driveways, and walkways",
      "Mold, mildew, and grime removal",
      "Safe, professional equipment",
      "Ideal prep before painting",
    ],
  },
  {
    slug: "drywall-repair",
    title: "DRYWALL REPAIR",
    body: "We patch holes, repair cracks, and match textures seamlessly before we paint, ensuring a flawless foundation.",
    imageKey: "drywall",
    detailDescription:
      "A flawless paint job starts with a smooth surface. We patch holes, repair cracks, and match textures seamlessly so your walls and ceilings are ready for paint. Our drywall repair ensures a perfect foundation for a professional finish.",
    detailPoints: [
      "Hole patching and crack repair",
      "Texture matching",
      "Smooth, paint-ready surfaces",
      "Seamless results",
    ],
  },
];

/**
 * Get a single service by slug.
 * @param {string} slug
 * @returns {Object|undefined}
 */
export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug);
