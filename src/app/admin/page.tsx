import { notFound } from "next/navigation";
import { isAdmin } from "@/features/admin/queries";
export default async function Admin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || !await isAdmin()) notFound();
  return <main className="p-8"><h1>Administration</h1><p>Manage the initial catalogue and product images in your hosted Supabase dashboard.</p></main>;
}
