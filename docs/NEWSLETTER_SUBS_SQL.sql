-- RUN THIS IN YOUR SUPABASE SQL EDITOR --

-- 1. Create the newsletter_subs table
create table if not exists public.newsletter_subs (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security
alter table public.newsletter_subs enable row level security;

-- 3. Create a policy to allow anyone to insert (but not read)
create policy "Allow anyone to subscribe" on public.newsletter_subs for insert with check (true);

-- 4. Create a policy for anon users to select (optional, usually you don't want this but for testing it's fine)
-- create policy "Allow public read access" on public.newsletter_subs for select using (true);
