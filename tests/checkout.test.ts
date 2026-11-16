import { describe, it, expect } from "vitest";
import { checkoutSchema } from "@/features/checkout/schema";
const item = { variantId: "cc194388-47f3-4415-9f36-459b493155e6", quantity: 1 };
describe("Checkout trust boundary", () => {
  it("accepts a variant and quantity", () => expect(checkoutSchema.safeParse({ items: [item] }).success).toBe(true));
  it.each([0, -1, 1.5, 11])("rejects quantity %s", quantity => expect(checkoutSchema.safeParse({ items: [{ ...item, quantity }] }).success).toBe(false));
  it("rejects browser-supplied prices", () => expect(checkoutSchema.safeParse({ items: [{ ...item, price: 1 }] }).success).toBe(false));
  it("rejects duplicate variants that could bypass per-item stock checks", () => expect(checkoutSchema.safeParse({ items: [item, item] }).success).toBe(false));
});
