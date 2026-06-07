-- ============================================================
-- NextGen Supplements — Additional Schema
-- Adds: profiles (users) + inventory tables
-- Run AFTER schema.sql in your Supabase SQL Editor
-- ============================================================

-- ============================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with app-specific fields.
-- A trigger auto-creates a profile row on signup.
-- ============================================================

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text not null,
  full_name    text,
  phone        text,
  avatar_url   text,
  role         text not null default 'customer'
                 check (role in ('customer', 'admin', 'staff')),
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Trigger: keep updated_at fresh
drop trigger if exists profiles_updated_at on public.profiles;
drop trigger if exists inventory_updated_at on public.inventory;
drop function if exists public.handle_updated_at() cascade;

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Trigger: auto-create profile row when a new user signs up via Supabase Auth
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- INVENTORY TABLE
-- Tracks stock levels per product (one row per product).
-- ============================================================

create table if not exists public.inventory (
  id                  bigserial primary key,
  product_id          bigint not null unique references public.products (id) on delete cascade,
  sku                 text not null unique,
  quantity            int not null default 0 check (quantity >= 0),
  reserved_quantity   int not null default 0 check (reserved_quantity >= 0),
  low_stock_threshold int not null default 20,
  warehouse_location  text not null default 'MAIN-WH',
  updated_at          timestamptz not null default now()
);

-- (Trigger created earlier near the function definition)
create trigger inventory_updated_at
  before update on public.inventory
  for each row execute function public.handle_updated_at();

-- Computed helper view: available quantity and stock status
create or replace view public.inventory_status as
  select
    i.id,
    i.product_id,
    p.name             as product_name,
    p.category,
    i.sku,
    i.quantity,
    i.reserved_quantity,
    (i.quantity - i.reserved_quantity) as available_quantity,
    i.low_stock_threshold,
    i.warehouse_location,
    case
      when (i.quantity - i.reserved_quantity) = 0 then 'out_of_stock'
      when (i.quantity - i.reserved_quantity) <= i.low_stock_threshold then 'low_stock'
      else 'in_stock'
    end                as stock_status,
    i.updated_at
  from public.inventory i
  join public.products p on p.id = i.product_id;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.inventory enable row level security;

-- Users can read their own profile
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins can read all profiles
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Public can read inventory (for "in stock" indicators on product pages)
drop policy if exists "Public can read inventory" on public.inventory;
create policy "Public can read inventory"
  on public.inventory for select
  using (true);

-- Only admins/staff can modify inventory
drop policy if exists "Staff can manage inventory" on public.inventory;
create policy "Staff can manage inventory"
  on public.inventory for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'staff')
    )
  );
