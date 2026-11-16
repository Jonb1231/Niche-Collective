import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function productImageUrl(path: string) {
  const client = await createClient();
  return client.storage.from("product-images").getPublicUrl(path).data.publicUrl;
}
