import { listCollections } from "@/features/collections/queries";
export default async function Collections() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return <main className="p-8"><h1>Collections</h1><p>Connect Supabase to load collections.</p></main>;
  const collections = await listCollections();
  return <main className="p-8"><h1 className="text-3xl mb-8">Collections</h1>{collections.length ? collections.map(c => <p key={c.id}>{c.name}</p>) : <p>No collections published yet.</p>}</main>;
}
