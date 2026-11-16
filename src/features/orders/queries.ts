import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function myOrders() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error("Authentication required");
  const { data, error } = await client.from("orders").select("id,amount_total,currency,status,created_at").eq("user_id", user.id).order("created_at", { ascending: false });
  if (error) throw new Error("Orders could not be loaded");
  return data;
}
