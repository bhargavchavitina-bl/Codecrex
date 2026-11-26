-- ==============================================================================
-- CodeCrest Database Schema & Row Level Security Policies
-- ==============================================================================
-- Paste and run this entire file in your Supabase SQL Editor.
-- It creates all required tables, triggers, indexes, and strict RLS policies.
-- ==============================================================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Learner',
  college text not null default '',
  target_role text not null default 'Software Engineer',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = id);

-- Trigger to auto-create profile row on auth.users signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, college, target_role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'Learner'),
    coalesce(new.raw_user_meta_data->>'college', ''),
    coalesce(new.raw_user_meta_data->>'target_role', 'Software Engineer')
  )
  on conflict (id) do update set
    display_name = excluded.display_name,
    target_role = excluded.target_role;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. PROBLEM PROGRESS TABLE
create table if not exists public.problem_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  problem_id text not null,
  solved boolean not null default false,
  bookmarked boolean not null default false,
  revisit boolean not null default false,
  note text not null default '',
  solved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, problem_id)
);

alter table public.problem_progress enable row level security;

create policy "Users can view their own problem progress"
  on public.problem_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own problem progress"
  on public.problem_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own problem progress"
  on public.problem_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own problem progress"
  on public.problem_progress for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_problem_progress_user on public.problem_progress(user_id);
create index if not exists idx_problem_progress_user_solved on public.problem_progress(user_id, solved);

-- 3. TEST ATTEMPTS TABLE
create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  score int not null default 0,
  total int not null default 0,
  accuracy numeric not null default 0,
  duration_seconds int not null default 0,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.test_attempts enable row level security;

create policy "Users can view their own test attempts"
  on public.test_attempts for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own test attempts"
  on public.test_attempts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own test attempts"
  on public.test_attempts for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own test attempts"
  on public.test_attempts for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_test_attempts_user_created on public.test_attempts(user_id, created_at desc);

-- 4. ACTIVITY LOG TABLE (STREAKS)
create table if not exists public.activity_log (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  count int not null default 1,
  primary key (user_id, activity_date)
);

alter table public.activity_log enable row level security;

create policy "Users can view their own activity log"
  on public.activity_log for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own activity log"
  on public.activity_log for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own activity log"
  on public.activity_log for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own activity log"
  on public.activity_log for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_activity_log_user_date on public.activity_log(user_id, activity_date desc);

-- 5. SALAAR AI LEARNING AGENT TABLES (see supabase/migrations/003_salaar.sql)
create table if not exists public.salaar_learning_memory (
  user_id uuid primary key references auth.users(id) on delete cascade,
  studied_topics jsonb not null default '[]'::jsonb,
  weak_topics jsonb not null default '[]'::jsonb,
  struggled_questions jsonb not null default '[]'::jsonb,
  completed_questions jsonb not null default '[]'::jsonb,
  topic_performance jsonb not null default '{}'::jsonb,
  preferences jsonb not null default '{"explanationStyle":"simple","skillLevel":"intermediate","hintFirst":true,"dailyGoal":2}'::jsonb,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_date date,
  updated_at timestamptz not null default now()
);

alter table public.salaar_learning_memory enable row level security;

create policy "Users can view their own salaar memory"
  on public.salaar_learning_memory for select
  to authenticated using (auth.uid() = user_id);
create policy "Users can insert their own salaar memory"
  on public.salaar_learning_memory for insert
  to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own salaar memory"
  on public.salaar_learning_memory for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own salaar memory"
  on public.salaar_learning_memory for delete
  to authenticated using (auth.uid() = user_id);

create table if not exists public.salaar_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('dsa', 'aptitude')),
  topic_id text,
  title text not null default 'New study session',
  summary text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.salaar_conversations enable row level security;

create policy "Users can view their own salaar conversations"
  on public.salaar_conversations for select
  to authenticated using (auth.uid() = user_id);
create policy "Users can insert their own salaar conversations"
  on public.salaar_conversations for insert
  to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own salaar conversations"
  on public.salaar_conversations for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own salaar conversations"
  on public.salaar_conversations for delete
  to authenticated using (auth.uid() = user_id);

create index if not exists idx_salaar_conversations_user_updated
  on public.salaar_conversations(user_id, updated_at desc);

create table if not exists public.salaar_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.salaar_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  mode text not null check (mode in ('dsa', 'aptitude')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.salaar_messages enable row level security;

create policy "Users can view their own salaar messages"
  on public.salaar_messages for select
  to authenticated using (auth.uid() = user_id);
create policy "Users can insert their own salaar messages"
  on public.salaar_messages for insert
  to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own salaar messages"
  on public.salaar_messages for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own salaar messages"
  on public.salaar_messages for delete
  to authenticated using (auth.uid() = user_id);

create index if not exists idx_salaar_messages_conv_created
  on public.salaar_messages(conversation_id, created_at asc);

create table if not exists public.salaar_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (
    event_type in (
      'dsa_problem_solved',
      'aptitude_question_completed',
      'practice_session_completed',
      'meaningful_tutor_session'
    )
  ),
  category text not null check (category in ('dsa', 'aptitude', 'general')),
  topic_id text,
  question_id text,
  title text not null,
  dedupe_key text not null,
  activity_date date not null,
  timezone text not null default 'Asia/Kolkata',
  duration_seconds int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.salaar_activity_events enable row level security;

create policy "Users can view their own salaar activity"
  on public.salaar_activity_events for select
  to authenticated using (auth.uid() = user_id);
create policy "Users can insert their own salaar activity"
  on public.salaar_activity_events for insert
  to authenticated with check (auth.uid() = user_id);
create policy "Users can delete their own salaar activity"
  on public.salaar_activity_events for delete
  to authenticated using (auth.uid() = user_id);

create unique index if not exists idx_salaar_activity_user_dedupe
  on public.salaar_activity_events(user_id, dedupe_key);
create index if not exists idx_salaar_activity_user_date
  on public.salaar_activity_events(user_id, activity_date desc);

create table if not exists public.salaar_practice_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('dsa', 'aptitude')),
  topic_id text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  question_id text not null,
  question_title text not null,
  user_answer text,
  is_correct boolean not null default false,
  hints_used int not null default 0,
  solution_revealed boolean not null default false,
  activity_date date not null,
  created_at timestamptz not null default now()
);

alter table public.salaar_practice_attempts enable row level security;

create policy "Users can view their own salaar practice"
  on public.salaar_practice_attempts for select
  to authenticated using (auth.uid() = user_id);
create policy "Users can insert their own salaar practice"
  on public.salaar_practice_attempts for insert
  to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own salaar practice"
  on public.salaar_practice_attempts for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_salaar_practice_user_created
  on public.salaar_practice_attempts(user_id, created_at desc);
