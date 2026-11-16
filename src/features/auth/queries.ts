import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function currentUser() {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}
