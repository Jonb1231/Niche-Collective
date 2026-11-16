import { demoProducts } from "@/data/catalogue";
import type { Size } from "@/types/catalogue";
export type CartItem = { productId: string; colour: string; size: Size; quantity: number };
export const CART_KEY = "niche-collective-preview-bag-v1";
export const MAX_QUANTITY = 10; // UI limit, not a stock representation.
export const itemKey = (item: Omit<CartItem, "quantity">) => `${item.productId}:${item.colour}:${item.size}`;
export function parseCart(value: string | null): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return [];
    const result: CartItem[] = [];
    for (const item of parsed.slice(0, 100)) {
      if (!item || typeof item !== "object") continue;
      const product = demoProducts.find(p => p.id === item.productId);
      if (!product || !product.sizes.includes(item.size) || !product.colours.some(c => c.name === item.colour) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
      const existing = result.find(row => itemKey(row) === itemKey(item));
      const quantity = Math.min(item.quantity, MAX_QUANTITY);
      if (existing) existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY);
      else result.push({ productId: product.id, colour: item.colour, size: item.size, quantity });
    }
    return result;
  } catch { return []; }
}
