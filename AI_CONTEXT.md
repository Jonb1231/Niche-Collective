# Niche Collective — AI handoff

Last updated: 16 November 2026 (Australia/Brisbane).

Read this file when continuing work on another computer. It records project context, not credentials or a substitute for inspecting the current checkout. Follow `AGENTS.md`, inspect `git status`, and read the relevant source before editing. Update this handoff when material decisions or project status change.

## Repository and current checkpoint

- Repository: https://github.com/Jonb1231/Niche-Collective
- Current development branch: `chore/repository-hygiene`.
- Website checkpoint before this documentation commit: `cd41c86` (`V1 release`).
- The branch has been pushed and tracks `origin/chore/repository-hygiene`.
- At handoff, GitHub's default branch `main` still points to the initial setup (`db3bef3`). The completed preview is on the development branch, so opening the default GitHub page may show older files. Recheck remote state before assuming this is still true.
- The website has been built and tested locally. It has not been deployed. GitHub stores the source; pushing does not publish a running Next.js website.
- The working tree was clean before adding this handoff.

## Resume on another PC

Use Git from the repository root. If cloning for the first time:

```powershell
git clone --branch chore/repository-hygiene https://github.com/Jonb1231/Niche-Collective.git
cd Niche-Collective
```

For an existing clone, inspect and preserve local edits before switching or pulling:

```powershell
git status
git fetch origin
git switch chore/repository-hygiene
git pull --ff-only
```

Use Node.js 22+ and the committed npm lockfile:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. On non-Windows systems, use `npm` instead of `npm.cmd`. All storefront preview routes render without service credentials. Restore environment values privately on the new machine only if service integration is needed; they are intentionally not in Git. `.env.example` documents variable names.

The original local checkout was `C:\Users\Joaquin\Desktop\Nichde Collective\niche-collective` (the parent folder really is spelled `Nichde`). Other computers can use any checkout path. Assets referenced by the site are committed under `public/`; the original external asset folder and Codex-generated image locations are not runtime dependencies.

## Brand and design intent

Niche Collective is an independent luxury streetwear label established in 2026. The intended feel is refined, rebellious, understated and editorial. Preserve the original logo artwork exactly. Use near-black, charcoal, off-white, restrained silver and muted olive. Avoid a generic storefront template, gold accents, promotional clutter or excessive animation.

The homepage combines a full-viewport dark fashion campaign, large grotesk typography with Instrument Serif accents, off-white product grids, the supplied signature label, an editorial lookbook feature and a minimal newsletter. Geist and Instrument Serif use `next/font/google`. CSS provides restrained motion and respects reduced-motion preferences.

Creative references were Chrome Hearts, Corteiz, Cold Culture and Arc'teryx for broad quality and atmosphere only. No competitor graphics, copy or photography were used.

## Stack and important files

- Next.js 16.4.6 App Router, React 19.3, strict TypeScript, Tailwind v4, existing shadcn/Radix and Lucide components. Supabase and Stripe foundations are already present. Do not add Shopify, Medusa or unnecessary infrastructure.
- This Next.js release has changed APIs. Read the relevant bundled guides in `node_modules/next/dist/docs/` before modifying framework behavior, as required by `AGENTS.md`.
- `src/app/layout.tsx`: fonts, metadata, shared navigation/footer and cart provider. Metadata deliberately uses `noindex` during preview.
- `src/app/globals.css`: design tokens, editorial layouts, responsive rules, source-artwork display windows and motion.
- `src/app/(storefront)/`: homepage, `/shop`, `/collections`, `/lookbook`, `/about`, `/cart`, `/products/[slug]` and information routes (`/contact`, `/shipping`, `/returns`, `/privacy`). `/products` redirects to `/shop`.
- `src/components/navigation/header.tsx`: sticky header and accessible Radix mobile menu.
- `src/components/product/`: product cards, galleries, variant selectors, size guide and detail interface.
- `src/components/home/newsletter.tsx`: validated local preview with required consent; no persistence or subscription.
- `src/data/catalogue.ts`, `src/types/catalogue.ts`: four typed concept products and supplied shorts measurements; prices are integer AUD cents.
- `src/features/catalogue/storefront.ts`: replaceable server-only demo adapter. Existing Supabase queries remain separate. Adding credentials does not automatically switch the storefront to live data.
- `src/features/cart/`: shared React context, validated local-storage bag, variant-aware quantities/removal and preview subtotal. Storage key is `niche-collective-preview-bag-v1`; the cap of 10 is a UI limit, not inventory.
- `src/lib/supabase/`, `src/features/auth/`, `src/app/account/`, `src/app/admin/`: existing service/auth boundaries.
- `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`: existing server-side test checkout and verified webhook processing.
- `supabase/migrations/202611160001_foundation.sql`: foundation schema/RLS. Review before applying; no hosted migration execution was performed in this work.
- `docs/STOREFRONT.md`: detailed implementation map, asset provenance, exact image-generation prompts and launch checklist.
- `README.md`, `docs/ARCHITECTURE.md`, `docs/SETUP-REPORT.md`, `CONTRIBUTING.md`: setup, architecture, original environment repair and Git workflow.

## Assets and honesty of preview content

Original assets were copied byte-for-byte from `C:\Users\Joaquin\Desktop\Niche Logos and Files` into `public/brand/` and `public/images/`. The supplied wordmark is used in the header/footer and `src/app/icon.png`. Keep these source assets intact.

`public/brand/monogram-original.png` contains an opaque checkerboard, not real transparency. It is preserved but intentionally not used as a transparent mark. A clean transparent or vector export is still required; do not invent a replacement logo.

The washed-black and washed-artichoke shorts sheets are original supplied concepts. CSS windows show front, back and embroidery details without changing the files. Shorts measurements were transcribed from the supplied specification and remain concept measurements.

The campaign, tee, long-sleeve and pants images are AI-generated placeholders saved in `public/images/*-concept.png`. They are labelled as concepts in the interface. They do not establish approved garment specifications, manufacturing claims or live inventory. Product prices and other sizes are illustrative. No reviews, sustainability certifications, delivery promises or founder history were fabricated.

## Commerce boundaries and remaining launch work

The current deliverable is a functional frontend preview. Users can explore products and use a persistent preview bag; checkout is disabled. The newsletter validates email and consent locally and explicitly states that no subscription or saved email is created.

Before enabling purchases:

1. Obtain approved products, prices, real SKU/variant availability, imagery, fabric/care details and final size guides. Replace concept imagery as appropriate.
2. Replace the demo catalogue adapter with a validated Supabase projection for products, variants, images, prices and stock. The current schema does not provide the complete storefront price/image model. Never send demo IDs or browser prices to checkout.
3. Finish and test stock reservation/decrement, order line snapshots, fulfilment, shipping and taxes. Existing Stripe code accepts test keys only, resolves prices server-side and verifies paid webhook events. It checks stock but does not reserve/decrement it. Keep live payments blocked until this is addressed.
4. Configure newsletter persistence and consent recording, with a truthful subscription result.
5. Supply verified contact details, Instagram URL and approved shipping/returns/privacy content. Current information pages explain the preview status.
6. Configure production metadata URL/social image and remove preview `noindex` only when ready for public launch.
7. Obtain the user's approval before deployment or merging into `main`. Authorization for the current handoff commit/push is not blanket approval for future publication.

Keep secrets out of code, logs, documentation and commits. Real `.env` files stay local. Authenticated service integration, hosted SQL/RLS/storage and real Stripe calls have not been verified with credentials in this work. No fake successful payment or order flows are permitted.

## Validation checkpoint

The storefront implementation passed the following before the handoff documentation change:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
```

Results: 18 unit tests, 7 Edge browser tests, successful TypeScript/lint/build. Browser coverage includes 375, 430, 768, 1280 and 1440px layouts; route rendering; filters/sorting/empty states; colour/image/size selection; size guide; cart persistence/quantities/removal; mobile navigation and focus; newsletter consent; reduced motion; malformed stored cart; unsigned webhook rejection.

Playwright uses the installed Microsoft Edge channel and starts/stops a production server on port 3100. Run the build before E2E. On another OS, adapt the existing Windows-specific `npm.cmd` webServer command and browser channel in `playwright.config.ts` if necessary. Screenshots and browser results under `test-results/` are ignored and must be regenerated on the other PC.

Product and information pages use Next.js 16.4's `ensureStatic = "navigation"` to resolve unknown routes before streaming. A prior invalid-product-URL React #419 error was resolved this way. Do not use `dynamicParams = false` with the project's enabled Cache Components; that combination fails the build.

No production Core Web Vitals field results or hosted integration results are claimed. Re-run checks appropriate to any new changes.

## Working with the owner

The owner prefers completing authorized work without repeated permission questions. Preserve their original branding and inspect existing work first. Make reversible local progress autonomously. Ask for approval when needed for deployment or merging into `main`; do not infer those permissions from a request to push a development branch. Push without force, and reconcile remote changes if a normal push is rejected.

Suggested opening prompt for the next AI session: "Read AGENTS.md and AI_CONTEXT.md, inspect the current branch and working tree, then help me continue the Niche Collective website from this handoff."
