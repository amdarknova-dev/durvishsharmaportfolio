-- RUN THIS IN YOUR SUPABASE SQL EDITOR --

-- 1. Create the system_status table
create table if not exists public.system_status (
  id text primary key default 'current_status',
  is_available boolean default true,
  status_message text default 'Available for Hire',
  updated_at timestamp with time zone default now()
);

-- 2. Insert the initial status row
insert into public.system_status (id, is_available, status_message)
values ('current_status', true, 'Available for Hire')
on conflict (id) do nothing;

-- 3. Enable Realtime for this table
alter publication supabase_realtime add table system_status;

-- 4. Enable Row Level Security (optional but recommended for production)
-- For now, we allow public read access
alter table public.system_status enable row level security;
create policy "Allow public read access" on public.system_status for select using (true);
