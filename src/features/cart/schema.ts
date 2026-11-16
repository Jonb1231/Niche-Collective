import { checkoutSchema } from "@/features/checkout/schema";
// Cart state belongs in an interactive component when the storefront gains add-to-cart.
// Reuse validation at the server boundary; browser prices are never trusted.
export const cartSchema = checkoutSchema;
