import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/env";

// Bypasses RLS. Never use for ordinary user queries or import into client code.
export function createAdminClient() {
  const { url } = supabaseConfig();
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is required for webhook persistence");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
