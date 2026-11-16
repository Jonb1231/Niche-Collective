# Niche Collective

Local Next.js App Router + TypeScript + Tailwind CSS v4 development foundation, using hosted Supabase and Stripe test mode. No Docker, WSL, local database or deployment is required.

## Start on this computer

```powershell
Set-Location 'C:\Users\Joaquin\Desktop\Nichde Collective\niche-collective'
# Repair an already-open terminal's PATH without changing Windows settings:
$env:Path += ';' + [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
npm.cmd run dev
```

Open http://localhost:3000. The homepage, catalogue connection messages and login connection message work before credentials exist. Stop with Ctrl+C. Use Node 22+; the verified installation is Node 26.13.1/npm 11.20.0.

## Hosted service setup

1. Create or select your hosted Supabase project. In the app directory, copy the template only if your local file is absent:

   ```powershell
   if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
   ```

2. Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the project Connect/API panel. Set the server-only `SUPABASE_SECRET_KEY` from your own project's secret API key. Never expose it in browser code.
3. Review `supabase/migrations/202611160001_foundation.sql`, then apply it once through the hosted SQL Editor in a new project. It creates catalogue, inventory, test orders, admin membership, event deduplication, strict RLS and the public product-images bucket. Do not apply blindly over an existing production schema.
4. Configure Supabase Auth Site URL as `http://localhost:3000` and allow `http://localhost:3000/auth/callback`. Create a confirmed test user in the Auth dashboard to use `/auth/login`. Signup and password recovery UI are future work. The PKCE callback is ready for later OAuth/magic-link entry flows.
5. Add collections, products and variants through the dashboard. Explicitly mark public records active, set stock and attach each variant's real **test-mode** Stripe Price ID. Keep your Stripe price currencies consistent. Upload public imagery to `product-images`; client uploads are denied.
6. Set `STRIPE_SECRET_KEY` to your own `sk_test_...` key and `NEXT_PUBLIC_SITE_URL=http://localhost:3000`. Live keys are blocked. No publishable Stripe browser key is needed for the server-created hosted Checkout URL.
7. Optional CLI installation, from the workspace parent (project-local, no administrator access):

   ```powershell
   Set-Location 'C:\Users\Joaquin\Desktop\Nichde Collective'
   powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\setup-niche-collective.ps1 -InstallStripeCLI
   Set-Location .\niche-collective
   npx.cmd stripe login
   npx.cmd stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Copy the listener's `whsec_...` value into `STRIPE_WEBHOOK_SECRET` in `.env.local`, then restart the dev server. The setup script uses the official npm distribution linked by https://docs.stripe.com/cli/install. CLI failure emits a warning and does not block the app. No Stripe CLI was installed during the initial repair.
8. Sign in, then test the API from the same browser origin with actual variant IDs:

   ```javascript
   const response = await fetch('/api/checkout', {
     method: 'POST', headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ items: [{ variantId: 'YOUR_REAL_VARIANT_UUID', quantity: 1 }] })
   });
   const result = await response.json();
   if (response.ok && result.url) location.assign(result.url);
   else console.error(result);
   ```

   Complete a test payment using Stripe's test card details. Confirm the verified event creates exactly one order and retries do not duplicate it. Generic `stripe trigger` sessions lack the app's user reference; use a session created by this app to test order persistence. The return page is not proof of payment. Review `/account` after webhook processing.

Restart dev after environment changes. Rebuild production after changing public environment values; missing-configuration catalogue/private routes may be prerendered during a credential-free build.

## Checks

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
npm.cmd audit --omit=dev
```

Playwright starts and stops a production server on port 3100 and uses this computer's installed Edge browser (`channel: msedge`). On another computer, install Edge or change the config to bundled Chromium and run `npx.cmd playwright install chromium`.

The initial repair passed typecheck, ESLint, 12 unit tests, production build and 2 Playwright smoke tests with no credentials. Unit tests verify checkout validation and actual SDK webhook signatures, unpaid events and persistence retry responses. Database/RLS/auth/storage/live service integration is unverified until credentials and the migration are supplied. SQL idempotency is implemented in the database but has not been executed against a hosted instance.

Production dependency audit: zero vulnerabilities. The complete audit reports 12 development-tool findings (2 low, 10 moderate) in shadcn/ts-morph/deepmerge and TypeScript ESLint/minimatch chains. `npm audit fix` did not resolve them; no forced breaking downgrade was applied.

## Setup script

From the parent directory:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\setup-niche-collective.ps1
```

The bypass applies only to the child process; no permanent policy is changed. It refreshes process PATH, verifies Node/npm, reuses the app, restores the locked dependency tree, adds only missing dependencies and preserves source/configuration/environment files. It does not install system packages, VS Code extensions, Docker or global npm tools. `-SkipToolInstall` skips optional CLI additions. Git/WinGet/VS Code are diagnosed but not required to run an existing app. Other package-manager lockfiles are preserved and produce an actionable stop rather than creating an npm lockfile alongside them.

The script scaffolds a standard Next app when the target is absent. The service integration files in this repository are the maintained application source; the setup script does not regenerate or overwrite them.

See `docs/ARCHITECTURE.md` for module boundaries and limitations and `docs/SETUP-REPORT.md` for the environment repair report. Stock reservations and fulfilment must be designed before enabling real payments. Zustand is deferred until needed for interactive shared cart state.
