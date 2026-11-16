import { NextResponse } from "next/server";
import { checkoutSchema } from "@/features/checkout/schema";
import { createClient } from "@/lib/supabase/server";
import { stripeClient } from "@/lib/stripe/server";
import { siteUrl } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const origin = new URL(siteUrl()).origin;
    if (request.headers.get("origin") !== origin) return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      return NextResponse.json({ error: "Test checkout is not configured" }, { status: 503 });
    }
    const client = await createClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    const input = checkoutSchema.safeParse(await request.json().catch(() => null));
    if (!input.success) return NextResponse.json({ error: "Invalid cart" }, { status: 400 });
    const { data: variants, error } = await client.from("product_variants")
      .select("id,stripe_price_id,stock,active,products!inner(active)").in("id", input.data.items.map(i => i.variantId))
      .eq("active", true).eq("products.active", true);
    if (error) throw error;
    const lines = input.data.items.map(item => {
      const variant = variants?.find(v => v.id === item.variantId);
      if (!variant?.stripe_price_id || variant.stock < item.quantity) throw new Error("Cart unavailable");
      return { price: variant.stripe_price_id as string, quantity: item.quantity };
    });
    // Prices are looked up server-side, never accepted from the browser.
    const session = await stripeClient().checkout.sessions.create({
      mode: "payment", line_items: lines, client_reference_id: user.id,
      success_url: `${origin}/checkout/success`, cancel_url: `${origin}/cart`,
    });
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.message === "Cart unavailable") return NextResponse.json({ error: "A cart item is unavailable" }, { status: 409 });
    console.error("Checkout failed");
    return NextResponse.json({ error: "Checkout unavailable; check server configuration" }, { status: 503 });
  }
}
