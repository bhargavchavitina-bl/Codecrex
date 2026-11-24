# AGENTS.md — CodeCrest Developer & Agent Guidelines

## Critical Architecture Principles

### 1. Supabase for Auth & Data (Never Firebase)
- **CodeCrest strictly uses Supabase** for authentication (GoTrue) and PostgreSQL data storage with Row-Level Security (RLS).
- **No Firebase**: The project does not use Firebase, Firebase Auth, Firestore, or Firebase Cloud Functions. Do not add Firebase imports, SDKs, or configuration.
- Frontend authentication and database calls use `@supabase/supabase-js` via a single client initialized in `src/lib/supabase.ts`.
- **Security**: Only the publishable/anon key (`VITE_SUPABASE_ANON_KEY`) is used in the frontend. **Never expose or reference the Supabase `service_role` key** anywhere in client code.

### 2. Dual-Mode Architecture (Account vs Guest)
- **Account Mode**: Enabled when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present in `.env`. Authenticates via Supabase Email/Password. Reads and writes sync to Supabase tables via `src/lib/progressService.ts`.
- **Guest Mode**: Used **only** when Supabase environment variables are missing, or when a user explicitly clicks "Continue as a guest". Progress is stored in `localStorage` (`codecrest_guest_progress`).
- **Never silently fall back to guest mode**: When a login or cloud operation fails, report the error visibly to the user (via toast or inline error) rather than reverting the user to guest mode.
- **Guest-to-Account Migration**: When a guest later signs up or logs in, CodeCrest checks for existing guest progress and offers a one-click merge into their cloud account using non-destructive upserts (`progressService.mergeGuestDataToCloud`).

### 3. Database Schema & Row-Level Security (RLS)
The database structure is defined in [`supabase/schema.sql`](./supabase/schema.sql). All tables require RLS enabled:
- `profiles`: User details (`display_name`, `college`, `target_role`) keyed by `id uuid references auth.users(id) on delete cascade`. Populated automatically on signup by the trigger `handle_new_user()`.
- `problem_progress`: Problem status (`solved`, `bookmarked`, `revisit`, `note`, `solved_at`, `updated_at`) keyed by composite primary key `(user_id, problem_id)`.
- `test_attempts`: MCQ test attempts (`id uuid`, `user_id`, `topic_id`, `score`, `total`, `accuracy`, `duration_seconds`, `answers jsonb`, `created_at`).
- `activity_log`: Daily activity count used for streaks (`user_id`, `activity_date date`, `count int`, primary key `(user_id, activity_date)`).
- Policies ensure `auth.uid() = user_id` (or `auth.uid() = id` for `profiles`) for all SELECT, INSERT, UPDATE, DELETE operations.

### 4. Streaks & Timezones
- Daily streaks are recorded in `activity_log` based on the user's local timezone (defaulting to IST / `Asia/Kolkata`).
- Dates are formatted in `YYYY-MM-DD` (`en-CA` format) via `getLocalDateString()`.

### 5. Routing & Deployment
- Client routing uses React Router with SPA fallback (`vercel.json` and `public/_redirects`).
- Auth state is initialized on startup with `supabase.auth.getSession()` and updated via `supabase.auth.onAuthStateChange()`.
- Protected routes wait for `authReady: true` before redirecting to `/login`.
- OAuth redirect URL is configured to `${window.location.origin}/dashboard`.

### 6. Validation Scripts
Before committing or completing tasks:
- `npm run check:contrast`: WCAG AA (>= 4.5:1) contrast ratio audit for design tokens.
- `npm run check:data`: Problem and topic catalog integrity check.
- `npm run check:aptitude`: Comprehensive aptitude lesson, formula, and example validation.
- `npm run typecheck`: TypeScript typecheck without emitting output.
- `npm run lint`: ESLint verification.
- `npm run build`: Production bundle verification.

### 7. Theme & Visual Design
- **Light mode only**: CodeCrex is strictly light mode only. There is no dark mode toggle, no dark state in store, and no dark token block. The OS dark setting has no effect.
- **Monochrome Black-and-White Theme**: Strictly monochrome design tokens defined in `src/styles/tokens.css` with WCAG AA (>= 4.5:1) compliance for all token pairs. Status indicators use explicit shapes and text rather than color alone.
