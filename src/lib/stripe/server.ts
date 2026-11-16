import "server-only";
import Stripe from "stripe";

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  // This foundation intentionally cannot accept live payments before stock reservation/fulfilment exists.
  if (!key?.startsWith("sk_test_")) throw new Error("A Stripe test-mode secret key is required");
  return new Stripe(key, { maxNetworkRetries: 2 });
}
