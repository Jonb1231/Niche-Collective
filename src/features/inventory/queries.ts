import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function productVariants(productId: string) {
  const client = await createClient();
  const { data, error } = await client.from("product_variants").select("id,sku,size,color,stock").eq("product_id", productId).eq("active", true);
  if (error) throw new Error("Inventory could not be loaded");
  return data;
}
