-- ============================================================
-- NextGen Supplements — Supabase Schema + Seed Data
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABLES
-- ============================================================

create table if not exists public.products (
  id             bigserial primary key,
  name           text not null,
  slug           text not null unique,
  category       text not null,
  description    text not null default '',
  price          numeric(10, 2) not null,
  original_price numeric(10, 2),
  badge          text,
  image_url      text not null,
  image_alt      text not null default '',
  rating         int not null default 5 check (rating between 1 and 5),
  review_count   int not null default 0,
  is_featured    boolean not null default false,
  created_at     timestamptz not null default now()
);

create table if not exists public.goals (
  id          bigserial primary key,
  title       text not null,
  slug        text not null unique,
  description text not null default '',
  image_url   text not null,
  image_alt   text not null default '',
  sort_order  int not null default 0
);

create table if not exists public.newsletter_subscribers (
  id         bigserial primary key,
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. ROW LEVEL SECURITY
-- ============================================================

alter table public.products enable row level security;
alter table public.goals enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public read on products
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products for select
  using (true);

-- Public read on goals
drop policy if exists "Public can read goals" on public.goals;
create policy "Public can read goals"
  on public.goals for select
  using (true);

-- Anyone can subscribe to newsletter (insert only)
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  with check (true);

-- ============================================================
-- End of Schema
-- ============================================================
