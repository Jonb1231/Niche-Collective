# Storefront implementation — 16 November 2026

The existing Next.js 16.4 / React / strict TypeScript / Tailwind v4 app now has a complete local design-preview storefront. No deployment, Git push, account provisioning or database mutation was performed. No dependencies were added.

## Routes and ownership

- `src/app/(storefront)/page.tsx`: full-viewport campaign, inaugural collection grid, original label editorial, lookbook feature and newsletter.
- `/shop`: category, size and colour filters; price/name sorting; empty state. All inaugural concepts share the same unconfirmed release, so “New arrivals” shows that collection.
- `/products/[slug]`: four concept detail pages, real supplied shorts colour artwork, gallery, size selection, original shorts measurements, Radix size dialog, fabric/care disclosures and related pieces.
- `/collections`, `/lookbook`, `/about`: editorial pages.
- `/cart`: variant-aware local browser bag, bounded quantity controls, removal, subtotal, disabled checkout. No fake orders.
- `/contact`, `/shipping`, `/returns`, `/privacy`: truthful launch-status information. Instagram points to the contact-page status until a verified handle is supplied.
- `/products` redirects to `/shop`. Existing auth, account, admin, checkout API and webhook boundaries remain intact.
- `src/components/`: shared header/footer, newsletter, image/card/detail components and progressive scroll reveals.
- `src/app/globals.css`: palette, type, spacing, editorial layout, responsive rules and reduced-motion treatment.
- `src/data/catalogue.ts` and `src/types/catalogue.ts`: separate typed demonstration data. Prices are integer AUD cents.
- `src/features/catalogue/storefront.ts`: replaceable server-only catalogue adapter. It intentionally stays demo even when auth credentials are added; the existing database schema lacks a full storefront price/image projection.
- `src/features/cart/`: React context plus validated browser-local persistence. The quantity cap of 10 is a UI limit, not a claimed stock count.
- `tests/cart.test.ts`, `tests/e2e/smoke.spec.ts`: corrupted storage, variant validation, responsive layouts and real browser interactions.

## Asset provenance

Original files were copied without modification from `C:\Users\Joaquin\Desktop\Niche Logos and Files`:

| Workspace file | Supplied file |
| --- | --- |
| `public/brand/wordmark.png` | Niche Collective Logo 2.png |
| `public/brand/monogram-original.png` | Niche Logo.png |
| `public/brand/signature-label.png` | Screenshot 2026-11-15 092909.png |
| `public/brand/plaque-label.png` | Screenshot 2026-11-15 093057.png |
| `public/images/shorts-black-spec.png` | Niche Collective Denim Shorts Tech Pack.png |
| `public/images/shorts-artichoke-spec.png` | Niche Collective Denim Shorts Spec Sheet.png |

The original wordmark is used in the header/footer and copied into `src/app/icon.png` as the browser icon. The supplied monogram has a baked-in checkerboard and no alpha channel, so it is preserved but not displayed as a transparent logo. A clean transparent monogram/vector is still needed for small icon applications. No replacement logo or cross was invented.

CSS windows isolate the garment views from the specification sheets; originals stay intact. The shorts composition and measurements come from those supplied concepts. Production approval, inventory and actual pricing are not assumed.

Generated assets, created with the **built-in imagegen tool**, saved in this repository:

- `public/images/campaign-concept.png`
- `public/images/tee-concept.png`
- `public/images/longsleeve-concept.png`
- `public/images/pants-concept.png`

These are labelled AI/concept previews in the site. They are not final Niche Collective garment or campaign photography. No competitor photography or graphics were used.

Geist and Instrument Serif are open-source fonts loaded and self-hosted by `next/font/google`; the initial build requires access to the Google font download service. Brand lettering remains supplied artwork. The reference sites informed broad atmosphere and navigation only: [Chrome Hearts](https://www.chromehearts.com/), [Corteiz](https://www.corteiz.com/), [Cold Culture](https://coldcultureworldwide.com/), [Arc'teryx](https://arcteryx.com/).

## Before public launch

1. Supply approved product names, prices, SKU/variant availability, fabric and care specifications, final size guides, original photography, contact email and Instagram URL.
2. Connect the storefront adapter to validated Supabase products, variants, image records and authoritative AUD prices. Keep unavailable variants disabled based on real stock. Do not send demo IDs to checkout.
3. Retain server-side Stripe pricing, authentication and webhook verification. Complete stock reservation/decrement, fulfilment, taxes, shipping, order snapshots and payment integration testing before enabling purchase. The inherited API is test-mode only.
4. Add newsletter persistence, consent recording and an actual subscription service. The existing form only validates locally and explicitly says it does not subscribe or save the email.
5. Publish approved shipping, returns and privacy information. No delivery or manufacturing promises are invented.
6. Configure production metadata URL/social image and remove the deliberate `noindex` preview flag only when ready to publish.
7. Obtain deployment approval. This implementation remains local.

## Local review and checks

Run `npm.cmd run dev` from the project folder and open http://localhost:3000.

Use `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test`, `npm.cmd run build`, then `npm.cmd run test:e2e`. Browser tests use installed Microsoft Edge and manage their own port-3100 production server. Responsive targets: 375, 430, 768, 1280 and 1440 pixels.

Browser screenshots are generated under ignored `test-results/`. Static screenshots disable motion and await image decoding so they capture the finished composition. Scroll reveals remain enabled during normal browsing.

Validation completed: TypeScript, ESLint, production build, 18 unit tests and 7 Edge browser tests. Browser checks cover the requested widths, all storefront routes, category/colour/size filters, sorting, empty states, variants, size-guide dismissal, saved cart quantities/removal, mobile menu focus, newsletter consent, reduced motion and malformed storage. Product and information pages use Next.js 16.4's `ensureStatic = "navigation"` so unknown URLs resolve before streaming the static route. No Core Web Vitals field measurements or hosted service integration tests are claimed.

## Image-generation prompts

### hero

Use case: photorealistic-natural. Asset type: wide cinematic website campaign placeholder for an independent luxury streetwear label. Original editorial photograph, ultra-wide landscape 3:2 or wider. Two adult fashion models in unbranded washed-black oversized streetwear, one wearing a short sleeve t-shirt and relaxed knee-length dark denim carpenter shorts, the other a charcoal long-sleeve top and relaxed black trousers. They stand in a monumental raw concrete parking structure after dark, oblique hard daylight cutting in from right, gritty analog 35mm grain, editorial high contrast, muted warm grey/black palette. One model centered-right in foreground, other right background, left third mostly atmospheric dark concrete negative space for headline overlay. Full body, calm independent attitude, believable fabric texture, candid low angle fashion camera, no text, no logos, no graphics, no watermark. This is concept imagery not a real campaign.

### tee

Use case: product-mockup. Asset type: luxury streetwear catalogue concept placeholder, square image. A single washed-black oversized short-sleeve t-shirt with dropped shoulders and subtle worn seams, no graphics or branding. Photorealistic top-down flat lay, neatly arranged with natural dimensional folds, garment fully visible and centered, generous margins, isolated on uniform warm pale grey background #e7e4df, subtle soft studio shadow, true fabric texture, expensive restrained catalogue photography. No props, no text, no watermark, no logos, no people.

### longsleeve

Use case: product-mockup. Asset type: luxury streetwear catalogue concept placeholder, square image. A single warm off-white oversized long-sleeve jersey shirt with slightly ribbed collar and cuffs, no graphics or branding. Photorealistic top-down flat lay, neatly arranged with natural dimensional folds, garment fully visible and centered, generous margins, isolated on uniform warm pale grey background #e7e4df, subtle soft studio shadow, true fabric texture, expensive restrained catalogue photography. No props, no text, no watermark, no logos, no people.

### pants

Use case: product-mockup. Asset type: luxury streetwear catalogue concept placeholder, square image. A single pair of charcoal black relaxed straight-leg tracksuit pants with a drawstring elastic waistband, subtle seams, no graphics or branding. Photorealistic top-down flat lay, neatly arranged with natural dimensional folds, garment fully visible and centered, generous margins, isolated on uniform warm pale grey background #e7e4df, subtle soft studio shadow, true fabric texture, expensive restrained catalogue photography. No props, no text, no watermark, no logos, no people.

