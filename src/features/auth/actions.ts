"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(form: FormData) {
  const input = z.object({ email: z.email(), password: z.string().min(1).max(256) }).safeParse(Object.fromEntries(form));
  if (!input.success) redirect("/auth/login?error=invalid");
  const client = await createClient();
  const { error } = await client.auth.signInWithPassword(input.data);
  if (error) redirect("/auth/login?error=credentials");
  redirect("/account");
}
export async function signOut() {
  const client = await createClient();
  const { error } = await client.auth.signOut();
  if (error) throw new Error("Sign out failed");
  redirect("/");
}
