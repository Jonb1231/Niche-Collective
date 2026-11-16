import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function listCollections() {
  const client = await createClient();
  const { data, error } = await client.from("collections").select("id,slug,name").eq("active", true).order("name");
  if (error) throw new Error("Collections could not be loaded");
  return data;
}
