-- Apply once to your hosted project after reviewing. No local database required.
create table public.collections (
 id uuid primary key default gen_random_uuid(), slug text not null unique,
 name text not null, active boolean not null default false
);
create table public.products (
 id uuid primary key default gen_random_uuid(), collection_id uuid references public.collections(id),
 slug text not null unique, name text not null, description text not null default '',
 active boolean not null default false
);
create table public.product_variants (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id),
 sku text not null unique, size text not null, color text not null,
 stripe_price_id text unique, stock integer not null default 0 check (stock >= 0),
 active boolean not null default false
);
create table public.orders (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
 stripe_session_id text not null unique, amount_total bigint not null check (amount_total >= 0),
 currency text not null, status text not null default 'paid_test' check (status = 'paid_test'),
 created_at timestamptz not null default now()
);
create table public.stripe_events (
 id text primary key, received_at timestamptz not null default now()
);
create table public.admin_users (user_id uuid primary key references auth.users(id));

alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.stripe_events enable row level security;
alter table public.admin_users enable row level security;

revoke all on public.collections, public.products, public.product_variants, public.orders, public.stripe_events, public.admin_users from anon, authenticated;
grant select on public.collections, public.products, public.product_variants to anon, authenticated;
grant select on public.orders, public.admin_users to authenticated;
grant all on public.collections, public.products, public.product_variants, public.orders, public.stripe_events, public.admin_users to service_role;
create policy "Visible collections" on public.collections for select to anon, authenticated using (active);
create policy "Visible products" on public.products for select to anon, authenticated using (active);
create policy "Visible variants" on public.product_variants for select to anon, authenticated
 using (active and exists (select 1 from public.products p where p.id = product_id and p.active));
create policy "Own orders" on public.orders for select to authenticated using ((select auth.uid()) = user_id);
create policy "Own admin membership" on public.admin_users for select to authenticated using ((select auth.uid()) = user_id);
-- No client insert/update/delete policies; catalogue maintenance uses the dashboard.
-- Admin membership is maintained only by a trusted operator, never user metadata.

create function public.record_test_payment(p_event_id text, p_session_id text, p_user_id uuid, p_amount bigint, p_currency text)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if p_event_id is null or p_session_id is null or p_user_id is null or p_amount is null or p_currency is null then
  raise exception 'Incomplete checkout session';
 end if;
 insert into public.stripe_events(id) values (p_event_id) on conflict do nothing;
 if not found then return; end if;
 insert into public.orders(user_id, stripe_session_id, amount_total, currency)
 values (p_user_id, p_session_id, p_amount, p_currency) on conflict (stripe_session_id) do nothing;
end;
$$;
revoke all on function public.record_test_payment(text,text,uuid,bigint,text) from public, anon, authenticated;
grant execute on function public.record_test_payment(text,text,uuid,bigint,text) to service_role;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "Product image reads" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
-- No client uploads. Upload through the Supabase dashboard; public images are not private documents.
