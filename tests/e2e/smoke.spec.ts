import { test, expect } from "@playwright/test";

test("storefront, responsive layouts and routes work without credentials", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(`${page.url()}: ${error.message}`));
  for (const width of [375, 430, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "NOT MADE FOR EVERYONE." })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width === 375 || width === 1440) {
      await page.evaluate(async () => { await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => undefined))); });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.evaluate(async () => {
        await Promise.all(Array.from(document.images).map(image => {
          image.loading = "eager";
          return image.decode().catch(() => undefined);
        }));
      });
      await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true, animations: "disabled" });
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
  }
  for (const route of ["/shop", "/collections", "/lookbook", "/about", "/cart", "/contact", "/shipping", "/returns", "/privacy", "/auth/login", "/products/form-oversized-tee", "/products/denim-carpenter-shorts", "/products/essential-long-sleeve", "/products/relaxed-track-pant"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.goto("/products");
  await expect(page).toHaveURL(/\/shop$/);
  await page.goto("/products/nonexistent");
  await expect(page.getByRole("heading", { name: "A different direction." })).toBeVisible();
  expect(errors).toEqual([]);
});

test("filters, sorting and empty state work together", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Shorts", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByLabel("Colour", { exact: true }).selectOption("Chalk");
  await expect(page.getByRole("heading", { name: "No pieces match." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters", exact: true }).last().click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByLabel("Sort products").selectOption("price-desc");
  await expect(page.locator(".product-card").first()).toContainText("Denim Carpenter Shorts");
  await page.getByLabel("Size", { exact: true }).selectOption("XXL");
  await expect(page.locator(".product-card")).toHaveCount(4);
});

test("preview variants persist, quantities update and removal clears the bag", async ({ page }) => {
  await page.goto("/products/denim-carpenter-shorts");
  await page.getByRole("button", { name: "Add to preview bag" }).click();
  await expect(page.getByRole("status")).toContainText("Choose a size");
  await page.getByRole("button", { name: "Washed Artichoke", exact: true }).click();
  await page.getByRole("button", { name: "View back image" }).click();
  await expect(page.locator(".gallery-main img")).toHaveAttribute("alt", /artichoke.*back/);
  await page.getByRole("button", { name: "Size guide", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("40.5");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to preview bag" }).click();
  await expect(page.getByRole("link", { name: "Bag (1)", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "View bag", exact: true }).click();
  await expect(page.locator(".cart-item")).toContainText("Washed Artichoke / M");
  await page.getByRole("button", { name: "Increase quantity of Denim Carpenter Shorts" }).click();
  await expect(page.locator(".subtotal")).toContainText("$290");
  await page.reload();
  await expect(page.getByRole("link", { name: "Bag (2)", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Checkout coming soon" })).toBeDisabled();
  await page.getByRole("button", { name: "Decrease quantity of Denim Carpenter Shorts" }).click();
  await expect(page.locator(".subtotal")).toContainText("$145");
  await page.getByRole("button", { name: "Remove Denim Carpenter Shorts" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
});

test("mobile navigation, product and cart are usable at every target width", async ({ page }) => {
  for (const width of [375, 430, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/products/denim-carpenter-shorts");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("button", { name: "S", exact: true }).click();
    await page.getByRole("button", { name: "Add to preview bag" }).click();
    await page.getByRole("link", { name: "View bag", exact: true }).click();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 375) await page.screenshot({ path: "test-results/cart-375.png", fullPage: true });
    await page.getByRole("button", { name: "Remove Denim Carpenter Shorts" }).click();
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Shop", exact: false }).click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("newsletter validates consent and never claims a subscription", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email address", { exact: true }).fill("preview@example.com");
  await page.getByRole("button", { name: "Preview newsletter signup" }).click();
  await expect(page.locator(".form-message")).toBeEmpty();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preview newsletter signup" }).click();
  await expect(page.locator(".form-message")).toContainText("has not been saved or subscribed");
});

test("reduced motion and malformed stored bag are handled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.locator(".hero-image").evaluate(el => getComputedStyle(el).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.001);
  await page.evaluate(() => localStorage.setItem("niche-collective-preview-bag-v1", "{broken"));
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
});

test("unsigned webhooks are rejected", async ({ request }) => {
  const response = await request.post("/api/webhooks/stripe", { data: {} });
  expect(response.status()).toBe(400);
});
