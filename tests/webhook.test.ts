import { beforeEach, describe, expect, it, vi } from "vitest";
import Stripe from "stripe";
const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => ({ rpc }) }));
import { POST } from "@/app/api/webhooks/stripe/route";

// Local synthetic test fixtures only, never application environment defaults.
const secret = "whsec_unit_test_only";
function request(body: string, signature?: string) {
  return new Request("http://localhost/api/webhooks/stripe", { method: "POST", body, headers: signature ? { "stripe-signature": signature } : {} });
}
function signed(paid = true) {
  const body = JSON.stringify({ id: "evt_unit", type: "checkout.session.completed", livemode: false,
    data: { object: { id: "cs_test_unit", payment_status: paid ? "paid" : "unpaid", client_reference_id: "cc194388-47f3-4415-9f36-459b493155e6", amount_total: 100, currency: "aud" } } });
  return request(body, Stripe.webhooks.generateTestHeaderString({ payload: body, secret }));
}
beforeEach(() => {
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_unit_only");
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", secret);
  rpc.mockReset().mockResolvedValue({ error: null });
});
describe("Webhook verification and retries", () => {
  it("rejects unsigned payloads before persistence", async () => { expect((await POST(request("{}"))).status).toBe(400); expect(rpc).not.toHaveBeenCalled(); });
  it("rejects forged signatures", async () => { expect((await POST(request("{}", "t=1,v1=forged"))).status).toBe(400); expect(rpc).not.toHaveBeenCalled(); });
  it("persists a verified paid event via the atomic database function", async () => { expect((await POST(signed())).status).toBe(200); expect(rpc).toHaveBeenCalledWith("record_test_payment", expect.objectContaining({ p_event_id: "evt_unit", p_session_id: "cs_test_unit" })); });
  it("does not fulfil unpaid checkouts", async () => { expect((await POST(signed(false))).status).toBe(200); expect(rpc).not.toHaveBeenCalled(); });
  it("returns a retryable failure if persistence fails", async () => { rpc.mockResolvedValue({ error: new Error("unavailable") }); expect((await POST(signed())).status).toBe(500); });
});
