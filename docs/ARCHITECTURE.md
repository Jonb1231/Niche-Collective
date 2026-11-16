# Application foundation

`src/app/(storefront)` holds public routes. `account`, `auth`, and `admin` have separate authentication boundaries. API handlers live in `src/app/api`.

`src/features` separates catalogue, collections, inventory, cart, checkout, orders, auth and admin. Queries run on the server with the signed-in user's Supabase client and RLS. `src/lib` owns service clients, configuration, storage and shared utilities; `src/components/ui` contains shadcn components.

Server Components are the default. Catalogue filters, product selectors, mobile navigation, the newsletter preview, scroll reveals and the React-context cart use Client Components. The cart persists validated variant selections in local storage. Native CSS provides motion, with reduced-motion support. No extra state or animation dependencies were added. See STOREFRONT.md for the data adapter and asset boundaries.

## Security boundaries

- Browser and normal server clients use the publishable key. Only verified webhook persistence uses the secret key, in a `server-only` module.
- Proxy refreshes auth cookies on private/auth/checkout routes. Every protected route independently verifies the user; proxy is not authorization.
- Admin membership comes from an RLS-protected table. There are no public catalogue, inventory, order, or admin writes. Initially, maintain data through the hosted dashboard.
- Checkout requires a signed-in user, same-site Origin, validated variant IDs and quantities, and server-resolved Stripe prices. Browser prices are rejected. Only Stripe test keys are accepted.
- Webhooks verify the unmodified body, signature and timestamp using Stripe's SDK, reject live events, and only record paid sessions. The database function atomically records the event and order. Unique event and session IDs make retries harmless. Persistence failures return 500 for Stripe retries.
- Storage exposes only public product imagery; client uploads are denied by the supplied policies. Use a separate private bucket with specific policies for customer documents.

## Explicit limits

The frontend is a complete design preview, not a live commerce service. Product and collection views use the typed demo adapter; adding Supabase credentials alone does not turn demo products into live inventory. Signup/password recovery, live catalogue projection, stock reservation, line-item snapshots, fulfilment, refunds, taxes, shipping and rate limiting remain future work. Stock is checked but not reserved or decremented; simultaneous test checkouts can exceed stock. Live payments are therefore blocked in code. The success URL does not confirm payment; account orders come from verified webhook records.

The migration is for a new hosted Supabase project. Review and apply it once. Existing hosted schemas/policies require reconciliation before use. Local tests exercise validation and webhook signatures; hosted RLS, auth, storage, SQL transactions and actual Stripe calls require credentials and separate integration checks.
