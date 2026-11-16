# Setup repair report — 16 November 2026

## Root causes

Node.js and Git were installed successfully before the original script failed. Both `C:\Program Files\nodejs\` and `C:\Program Files\Git\cmd` were present in the machine PATH but absent from the already-running tool process PATH. Refreshing the process PATH recovered Node 26.13.1, npm 11.20.0 and Git 2.56.0.windows.4. No reinstall or persistent PATH modification was necessary.

The WinGet diagnostic log `WinGet-2026-11-16-22-08-44.366.log` records `No app found matching input criteria` for `Stripe.StripeCLI`, followed by `0x8a150014` (decimal -1978335212). The original script treated this optional CLI failure as fatal, before scaffolding the application. The workspace initially contained only the setup script. The user's later `npm.cmd` attempt could not run because of the stale PATH; it did not install anything.

The current process also has all execution policy scopes Undefined, so normal script invocation is blocked by Windows' effective default. A child-process-only `-ExecutionPolicy Bypass` allowed script verification; no persistent policy was changed.

## Tool inventory

| Tool | Result |
| --- | --- |
| Node.js | Installed, recovered from stale PATH: 26.13.1 |
| npm | Installed alongside Node: 11.20.0 |
| Git | Installed, recovered from stale PATH: 2.56.0.windows.4 |
| WinGet | Available: 1.29.380; no package installs performed |
| VS Code | Available through the existing user installation |
| Stripe CLI | Unavailable on PATH; intentionally left optional and uninstalled |
| Supabase CLI | Initially unavailable; now project-local 3.1.0 via `npx.cmd supabase` |

## Files

Modified parent file: `../setup-niche-collective.ps1`.

Created application under `niche-collective/`, including:

- Scaffold/configuration: `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `eslint.config.mjs`, `AGENTS.md`, `.gitignore`, `.env.example`, `components.json`, `playwright.config.ts`, `vitest.config.mts`, generated public assets/favicon and `README.md`.
- Shared app shell: `src/app/layout.tsx`, `globals.css`, `loading.tsx`, `error.tsx`. The generated starter page is retained as `src/app/create-next-app-reference.tsx`.
- Storefront: `src/app/(storefront)/page.tsx`, `products/page.tsx`, `collections/page.tsx`, `cart/page.tsx`, `checkout/success/page.tsx`.
- Private/authentication routes: `src/app/account/page.tsx`, `admin/page.tsx`, `auth/login/page.tsx`, `auth/callback/route.ts`, `src/proxy.ts`.
- APIs: `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`.
- Service/utilities: `src/lib/env.ts`, `utils.ts`, `supabase/client.ts`, `supabase/server.ts`, `supabase/admin.ts`, `supabase/storage.ts`, `stripe/server.ts`.
- Feature modules: `src/features/{admin,auth,catalogue,collections,inventory,orders}/queries.ts`, `auth/actions.ts`, `{cart,checkout}/schema.ts`.
- UI: `src/components/ui/button.tsx` generated using the project-local shadcn CLI.
- Hosted schema: `supabase/migrations/202611160001_foundation.sql`.
- Tests: `tests/checkout.test.ts`, `webhook.test.ts`, `server-only.ts`, `e2e/smoke.spec.ts`.
- Documentation: `docs/ARCHITECTURE.md`, `docs/SETUP-REPORT.md`.

No user source files existed before scaffolding. No credentials, real `.env.local`, machine packages, Docker, WSL, editor extensions or deployment were created. Local `node_modules`, `.next` and test outputs are generated/ignored.

## Installed dependencies

Runtime: Next 16.4.6, React/React DOM 19.3.0, Supabase JS 2.119.0, Supabase SSR 0.12.7, Stripe SDK 23.1.0, Zod 4.6.7, GSAP 3.15.1, Motion 14.14.0, Lucide 1.73.0, Radix UI 1.8.1, class-variance-authority 0.7.1, clsx 2.1.1, cn 0.5.2, tailwind-merge 3.7.0 and server-only 0.0.1.

Development: Tailwind CSS/Turbopack 4.3.3, TypeScript 5.9.3, Node types 26.6.6, React types 19.3.0, ESLint 9.39.5, eslint-config-next 16.4.6, Vitest 4.1.12, Playwright 1.65.1, Supabase CLI 3.1.0 and shadcn CLI 4.23.0. Full resolved tree is in the lockfile. Zustand is deferred until needed.

## Verification

| Check | Result |
| --- | --- |
| Setup script PowerShell parser | Pass |
| Setup script rerun with process-only bypass | Pass; locked `npm ci` completed, app reused |
| `npm.cmd ls --depth=0` | Pass; no missing/invalid direct dependencies |
| `npm.cmd run typecheck` | Pass |
| `npm.cmd run lint` | Pass |
| `npm.cmd test` | 12 tests passed |
| `npm.cmd run build` | Pass; 14 static/prerender outputs generated |
| `npm.cmd run test:e2e` | 2 passed; production server and installed Edge browser |
| `npm.cmd run dev -- --hostname 127.0.0.1 --port 3101` | Started successfully; home and products HTTP 200 |
| `npx.cmd supabase --version` | 3.1.0 |
| `npm.cmd audit --omit=dev` | Zero production vulnerabilities |
| Full dependency audit | 12 dev-tool findings: 2 low, 10 moderate; compatible automatic fix did not resolve |

The latest Vitest initially conflicted with create-next-app's Node 20 types. The project now has Node 26 types and compatible Vitest 4. The bootstrap uses Vitest 4 so it also works with the scaffold's older types. Next.js Cache Components rejects legacy dynamic/runtime segment exports; those were removed, and a loading boundary supplies streaming support. The generated Next configuration remains enabled.

ESLint 9 emits an upstream end-of-support warning. No forced breaking tool upgrades/downgrades were applied. Review future compatible tooling updates separately.

## Remaining manual work

Supply hosted Supabase and Stripe **test** credentials, apply the reviewed SQL migration, configure Auth redirects/create a test user, add real test catalogue variants/Price IDs, and optionally install/login to Stripe CLI and supply its webhook signing secret. Follow `README.md` for exact instructions. Hosted database/RLS, Auth, Storage, real Checkout and webhook database transactions could not be integration-tested without credentials.

Live payments remain blocked until inventory reservations, line items and fulfilment are implemented. Nothing was deployed.

## Start development

```powershell
Set-Location 'C:\Users\Joaquin\Desktop\Nichde Collective\niche-collective'
$env:Path += ';' + [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
npm.cmd run dev
```

Open http://localhost:3000.
