import { describe, expect, it } from "vitest";
import { parseCart } from "@/features/cart/store";
const item = { productId: "demo-shorts", colour: "Washed Black", size: "M", quantity: 1 };
describe("Untrusted persisted preview bag", () => {
  it.each(["{broken", "null", "{}", "true"])("recovers from malformed storage %s", value => expect(parseCart(value)).toEqual([]));
  it("keeps valid variants and rejects unknown products, colours and sizes", () => {
    expect(parseCart(JSON.stringify([item, { ...item, productId: "unknown" }, { ...item, colour: "Pink" }, { ...item, size: "XXXS" }]))).toEqual([item]);
  });
  it("rejects invalid quantities and caps merged duplicates at the UI limit", () => {
    expect(parseCart(JSON.stringify([{ ...item, quantity: -1 }, { ...item, quantity: 1.5 }, { ...item, quantity: "2" }]))).toEqual([]);
    expect(parseCart(JSON.stringify([{ ...item, quantity: 7 }, { ...item, quantity: 9 }]))).toEqual([{ ...item, quantity: 10 }]);
  });
});
