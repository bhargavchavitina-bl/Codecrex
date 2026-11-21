-- ==============================================================================
-- CodeCrest Migration 002: Profiles Table, Trigger, RLS & Backfill
-- ==============================================================================
-- Idempotent script for public.profiles

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text default 'Learner',
  college text default '',
  target_role text default 'Software Engineer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure all required columns exist if table was previously created
alter table public.profiles add column if not exists email text default '';
alter table public.profiles add column if not exists display_name text default 'Learner';
alter table public.profiles add column if not exists college text default '';
alter table public.profiles add column if not exists target_role text default 'Software Engineer';
alter table public.profiles add column if not exists created_at timestamptz default now();
alter table public.profiles add column if not exists updated_at timestamptz default now();

alter table public.profiles enable row level security;

-- Idempotent RLS policies
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = id);

-- Trigger to auto-create profile row on auth.users signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, college, target_role, updated_at)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'Learner'),
    coalesce(new.raw_user_meta_data->>'college', ''),
    coalesce(new.raw_user_meta_data->>'target_role', 'Software Engineer'),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill any existing auth users who do not have a profile yet
insert into public.profiles (id, email, display_name, college, target_role, updated_at)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1), 'Learner'),
  coalesce(u.raw_user_meta_data->>'college', ''),
  coalesce(u.raw_user_meta_data->>'target_role', 'Software Engineer'),
  now()
from auth.users u
on conflict (id) do nothing;
