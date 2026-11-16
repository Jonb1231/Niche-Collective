export const formatPrice = (cents: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(cents / 100);
