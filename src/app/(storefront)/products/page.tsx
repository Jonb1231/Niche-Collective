import { listProducts } from "@/features/catalogue/queries";
export default async function Products() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return <main className="p-8"><h1>Products</h1><p>Connect Supabase to load your catalogue.</p></main>;
  const products = await listProducts();
  return <main className="p-8"><h1 className="text-3xl mb-8">Products</h1>{products.length ? products.map(p => <article key={p.id} className="mb-6"><h2>{p.name}</h2><p>{p.description}</p></article>) : <p>No products published yet.</p>}</main>;
}
