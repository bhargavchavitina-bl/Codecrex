-- ==============================================================================
-- CodeCrex Migration 003: SALAAR AI Learning Agent Schema, Indexes & RLS
-- ==============================================================================
-- Idempotent migration for SALAAR AI Tutor conversations, learning memory,
-- practice tracking, and deduplicated local-timezone activity streaks.
-- ==============================================================================

-- 1. SALAAR LEARNING MEMORY TABLE (per-user personalization & streak snapshot)
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

drop policy if exists "Users can view their own salaar memory" on public.salaar_learning_memory;
create policy "Users can view their own salaar memory"
  on public.salaar_learning_memory for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own salaar memory" on public.salaar_learning_memory;
create policy "Users can insert their own salaar memory"
  on public.salaar_learning_memory for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own salaar memory" on public.salaar_learning_memory;
create policy "Users can update their own salaar memory"
  on public.salaar_learning_memory for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own salaar memory" on public.salaar_learning_memory;
create policy "Users can delete their own salaar memory"
  on public.salaar_learning_memory for delete
  to authenticated
  using (auth.uid() = user_id);

-- 2. SALAAR CONVERSATIONS TABLE
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

drop policy if exists "Users can view their own salaar conversations" on public.salaar_conversations;
create policy "Users can view their own salaar conversations"
  on public.salaar_conversations for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own salaar conversations" on public.salaar_conversations;
create policy "Users can insert their own salaar conversations"
  on public.salaar_conversations for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own salaar conversations" on public.salaar_conversations;
create policy "Users can update their own salaar conversations"
  on public.salaar_conversations for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own salaar conversations" on public.salaar_conversations;
create policy "Users can delete their own salaar conversations"
  on public.salaar_conversations for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_salaar_conversations_user_updated
  on public.salaar_conversations(user_id, updated_at desc);

-- 3. SALAAR MESSAGES TABLE
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

drop policy if exists "Users can view their own salaar messages" on public.salaar_messages;
create policy "Users can view their own salaar messages"
  on public.salaar_messages for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own salaar messages" on public.salaar_messages;
create policy "Users can insert their own salaar messages"
  on public.salaar_messages for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own salaar messages" on public.salaar_messages;
create policy "Users can update their own salaar messages"
  on public.salaar_messages for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own salaar messages" on public.salaar_messages;
create policy "Users can delete their own salaar messages"
  on public.salaar_messages for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_salaar_messages_conv_created
  on public.salaar_messages(conversation_id, created_at asc);

-- 4. SALAAR ACTIVITY EVENTS TABLE (Deduplicated qualifying activities)
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

drop policy if exists "Users can view their own salaar activity" on public.salaar_activity_events;
create policy "Users can view their own salaar activity"
  on public.salaar_activity_events for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own salaar activity" on public.salaar_activity_events;
create policy "Users can insert their own salaar activity"
  on public.salaar_activity_events for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own salaar activity" on public.salaar_activity_events;
create policy "Users can delete their own salaar activity"
  on public.salaar_activity_events for delete
  to authenticated
  using (auth.uid() = user_id);

create unique index if not exists idx_salaar_activity_user_dedupe
  on public.salaar_activity_events(user_id, dedupe_key);
create index if not exists idx_salaar_activity_user_date
  on public.salaar_activity_events(user_id, activity_date desc);

-- 5. SALAAR PRACTICE ATTEMPTS TABLE
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

drop policy if exists "Users can view their own salaar practice" on public.salaar_practice_attempts;
create policy "Users can view their own salaar practice"
  on public.salaar_practice_attempts for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own salaar practice" on public.salaar_practice_attempts;
create policy "Users can insert their own salaar practice"
  on public.salaar_practice_attempts for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own salaar practice" on public.salaar_practice_attempts;
create policy "Users can update their own salaar practice"
  on public.salaar_practice_attempts for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists idx_salaar_practice_user_created
  on public.salaar_practice_attempts(user_id, created_at desc);
