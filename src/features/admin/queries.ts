import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function isAdmin() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return false;
  const { data, error } = await client.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  return !error && !!data;
}
