import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function listProducts() {
  const client = await createClient();
  const { data, error } = await client.from("products").select("id,slug,name,description").eq("active", true).order("name");
  if (error) throw new Error("Product catalogue could not be loaded");
  return data;
}
