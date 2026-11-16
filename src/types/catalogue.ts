export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type Category = "T-shirts" | "Long sleeves" | "Shorts" | "Pants";
export type ProductImage = { src: string; alt: string; crop?: "front" | "back" | "detail" };
export type ProductColour = { name: string; hex: string; images: ProductImage[] };
export type Product = {
  id: string; slug: string; name: string; category: Category; price: number;
  description: string; fabric: string; care: string; colours: ProductColour[];
  sizes: Size[]; status: "preview"; provenance: string;
};
