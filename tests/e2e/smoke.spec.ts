import { test, expect } from "@playwright/test";
test("storefront starts without service credentials", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Niche Collective", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Products", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Products", exact: true })).toBeVisible();
});
test("unsigned webhooks are rejected", async ({ request }) => {
  const response = await request.post("/api/webhooks/stripe", { data: {} });
  expect(response.status()).toBe(400);
});
