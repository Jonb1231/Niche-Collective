import type { Product, Size } from "@/types/catalogue";
export const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const conceptFabric = "Concept garment. Fabric composition, weight and final construction are to be confirmed.";
const conceptCare = "Care instructions will be supplied with the final garment.";
const conceptProvenance = "AI-generated garment concept. Design, price and sizes are illustrative, not final product specifications.";
export const demoProducts: Product[] = [
  {
    id: "demo-tee", slug: "form-oversized-tee", name: "Form Oversized Tee", category: "T-shirts", price: 8500,
    description: "An oversized silhouette with a quiet presence. Dropped shoulders and a washed-black palette explore the foundation of an everyday uniform.",
    fabric: conceptFabric, care: conceptCare,
    colours: [{ name: "Washed Black", hex: "#292929", images: [{ src: "/images/tee-concept.png", alt: "AI-generated concept of a washed-black oversized T-shirt" }] }],
    sizes, status: "preview", provenance: conceptProvenance,
  },
  {
    id: "demo-shorts", slug: "denim-carpenter-shorts", name: "Denim Carpenter Shorts", category: "Shorts", price: 14500,
    description: "A relaxed carpenter silhouette with utility pockets and a tool loop. Tonal detailing meets the Niche Collective signature at the back pocket. Style NC–DS001.",
    fabric: "The supplied design specification calls for 100% cotton denim, a relaxed fit and back-pocket embroidery. This is a pre-production concept; final construction is not yet confirmed.",
    care: "Final wash and care instructions are awaiting sample approval.",
    colours: [
      { name: "Washed Black", hex: "#292929", images: [{ src: "/images/shorts-black-spec.png", alt: "Supplied washed-black carpenter shorts concept, front", crop: "front" }, { src: "/images/shorts-black-spec.png", alt: "Supplied washed-black carpenter shorts concept, back", crop: "back" }, { src: "/images/shorts-black-spec.png", alt: "Supplied embroidery concept detail", crop: "detail" }] },
      { name: "Washed Artichoke", hex: "#55594c", images: [{ src: "/images/shorts-artichoke-spec.png", alt: "Supplied artichoke carpenter shorts concept, front", crop: "front" }, { src: "/images/shorts-artichoke-spec.png", alt: "Supplied artichoke carpenter shorts concept, back", crop: "back" }, { src: "/images/shorts-artichoke-spec.png", alt: "Supplied artichoke embroidery concept detail", crop: "detail" }] },
    ], sizes, status: "preview", provenance: "Original supplied design concept. Preview price only; inventory and production availability are unconfirmed.",
  },
  {
    id: "demo-longsleeve", slug: "essential-long-sleeve", name: "Essential Long Sleeve", category: "Long sleeves", price: 11000,
    description: "A study in softer contrast. An easy long-sleeve silhouette in warm chalk, conceived as a considered layer for the everyday.",
    fabric: conceptFabric, care: conceptCare,
    colours: [{ name: "Chalk", hex: "#e5e0d2", images: [{ src: "/images/longsleeve-concept.png", alt: "AI-generated concept of a chalk long-sleeve shirt" }] }],
    sizes, status: "preview", provenance: conceptProvenance,
  },
  {
    id: "demo-pants", slug: "relaxed-track-pant", name: "Relaxed Track Pant", category: "Pants", price: 13500,
    description: "Ease, with intention. A relaxed straight leg and a restrained charcoal palette bring a sense of balance to the collection concept.",
    fabric: conceptFabric, care: conceptCare,
    colours: [{ name: "Charcoal", hex: "#424242", images: [{ src: "/images/pants-concept.png", alt: "AI-generated concept of charcoal relaxed tracksuit pants" }] }],
    sizes, status: "preview", provenance: conceptProvenance,
  },
];
// Measurements transcribed from the owner's NC–DS001 specification, in cm.
export const shortsMeasurements = [
  { size: "XS (28)", waist: 38, length: 45, hem: 27 },
  { size: "S (30)", waist: 40.5, length: 46.5, hem: 28 },
  { size: "M (32)", waist: 43, length: 48, hem: 29 },
  { size: "L (34)", waist: 45.5, length: 49.5, hem: 30 },
  { size: "XL (36)", waist: 48, length: 51, hem: 31 },
  { size: "XXL (38)", waist: 50.5, length: 52.5, hem: 32 },
];
