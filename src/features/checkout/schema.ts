import { z } from "zod";

export const checkoutSchema = z.object({
  items: z.array(z.object({ variantId: z.uuid(), quantity: z.number().int().min(1).max(10) }).strict()).min(1).max(20),
}).strict().superRefine(({ items }, ctx) => {
  if (new Set(items.map(item => item.variantId)).size !== items.length) {
    ctx.addIssue({ code: "custom", message: "Duplicate variants are not allowed" });
  }
});
