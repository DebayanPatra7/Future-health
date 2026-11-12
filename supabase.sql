-- Run this whole file once in Supabase: SQL Editor -> New query -> paste -> Run

-- 1. Tables ---------------------------------------------------------------
create table if not exists facilities (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  category text,
  price numeric(10,2) default 0,
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- user details table: one row per booking
create table if not exists bookings (
  id bigint generated always as identity primary key,
  facility_id bigint references facilities(id) on delete set null,
  facility_name text,
  full_name text not null,
  age int not null check (age between 0 and 120),
  gender text,
  phone text not null check (phone ~ '^[0-9]{10}$'),
  email text not null,
  address text not null,
  booking_date date not null,
  time_slot text,
  notes text,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz default now()
);

-- list of emails that are allowed to be admin
create table if not exists admins (
  email text primary key
);

-- 2. Admin check function -------------------------------------------------
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admins where email = (auth.jwt() ->> 'email')
  );
$$;

-- 3. Security (Row Level Security) ---------------------------------------
alter table facilities enable row level security;
alter table bookings   enable row level security;
alter table admins     enable row level security;   -- no policies = nobody can read it directly

-- facilities: everyone can view, only admin can add / edit / delete
drop policy if exists "facilities_select" on facilities;
drop policy if exists "facilities_insert" on facilities;
drop policy if exists "facilities_update" on facilities;
drop policy if exists "facilities_delete" on facilities;
create policy "facilities_select" on facilities for select using (true);
create policy "facilities_insert" on facilities for insert to authenticated with check (is_admin());
create policy "facilities_update" on facilities for update to authenticated using (is_admin()) with check (is_admin());
create policy "facilities_delete" on facilities for delete to authenticated using (is_admin());

-- bookings: anyone can create one, only admin can read / update
drop policy if exists "bookings_insert" on bookings;
drop policy if exists "bookings_select" on bookings;
drop policy if exists "bookings_update" on bookings;
create policy "bookings_insert" on bookings for insert to anon, authenticated with check (status = 'pending');
create policy "bookings_select" on bookings for select to authenticated using (is_admin());
create policy "bookings_update" on bookings for update to authenticated using (is_admin()) with check (is_admin());

-- 4. Make yourself admin (CHANGE THE EMAIL, then run) ---------------------
-- Create the same email + password first in: Authentication -> Users -> Add user
insert into admins (email) values ('your-admin-email@example.com')
on conflict do nothing;

-- 5. Optional sample facilities -------------------------------------------
insert into facilities (name, description, category, price) values
 ('General Consultation', 'Meet a general physician for checkup and advice.', 'Consultation', 300),
 ('Blood Test Lab', 'Complete blood count, sugar, cholesterol and more.', 'Lab', 500),
 ('X-Ray', 'Digital X-ray with same day report.', 'Imaging', 700);
