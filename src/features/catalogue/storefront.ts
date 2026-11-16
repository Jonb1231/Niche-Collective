import "server-only";
import { demoProducts } from "@/data/catalogue";
import type { Product } from "@/types/catalogue";
// Replace with a validated Supabase projection when prices, imagery and inventory
// are configured. Existing database queries remain separate; never mix demo stock.
export interface CatalogueSource {
  list(): Promise<Product[]>;
  find(slug: string): Promise<Product | undefined>;
}
export const catalogue: CatalogueSource = {
  async list() { return demoProducts; },
  async find(slug) { return demoProducts.find(product => product.slug === slug); },
};
