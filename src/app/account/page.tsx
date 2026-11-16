import { redirect } from "next/navigation";
import { currentUser } from "@/features/auth/queries";
import { myOrders } from "@/features/orders/queries";
import { signOut } from "@/features/auth/actions";
export default async function Account() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) redirect("/auth/login");
  const user = await currentUser();
  if (!user) redirect("/auth/login");
  const orders = await myOrders();
  return <main className="p-8"><h1 className="text-3xl mb-8">Your account</h1><p>{user.email}</p><h2 className="mt-8">Test orders</h2>{orders.length ? orders.map(o => <p key={o.id}>{o.id} — {o.status} — {(o.amount_total / 100).toFixed(2)} {o.currency}</p>) : <p>No orders yet.</p>}<form action={signOut}><button className="border p-3 mt-8">Sign out</button></form></main>;
}
