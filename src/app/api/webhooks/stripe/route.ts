import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripeClient } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  let event: Stripe.Event;
  try {
    // Raw body is required for Stripe's signature and timestamp verification.
    event = stripeClient().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  if (event.livemode) return NextResponse.json({ error: "Live payments are disabled" }, { status: 400 });
  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) return NextResponse.json({ received: true });
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") return NextResponse.json({ received: true });
  try {
    const { error } = await createAdminClient().rpc("record_test_payment", {
      p_event_id: event.id, p_session_id: session.id, p_user_id: session.client_reference_id,
      p_amount: session.amount_total, p_currency: session.currency,
    });
    if (error) throw error;
    return NextResponse.json({ received: true });
  } catch {
    // Fail so Stripe retries; database function commits event and order atomically.
    console.error("Verified Stripe event could not be persisted", event.id);
    return NextResponse.json({ error: "Persistence unavailable" }, { status: 500 });
  }
}
