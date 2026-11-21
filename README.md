# CodeCrest

**Code. Climb. Crest.**

CodeCrest is a frontend interview-prep app for B.Tech students. It includes a pattern-based DSA roadmap, personal problem notes and revision flags, aptitude lessons, timed MCQ practice, progress tracking, and a local-calendar streak.

## Requirements and local setup

- Node.js 20 or later
- A Supabase project for cloud authentication and database synchronization (or explore immediately in guest mode)

```bash
npm install
cp .env.example .env
npm run dev
```

Add your Supabase project URL and anon/publishable key to `.env` to enable Email/Password, Google sign-in, and cloud progress sync. Without Supabase keys, choose **Continue as a guest**; progress and profile settings will stay saved in this browser's `localStorage`. The project uses Supabase exclusively for backend services (never Firebase).

## Supabase setup

Follow these steps to configure your Supabase backend:

1. **Create a project**: Sign in to [Supabase](https://supabase.com) and create a new project.
2. **Copy API credentials**: In your Supabase dashboard, go to **Project Settings → API**. Copy the **Project URL** and the **anon/public key** into your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
   ```
   *Note: Only use the anon/publishable key in frontend code. Never use or expose the `service_role` key.*

3. **Run database schema**: Open the **SQL Editor** in your Supabase dashboard, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it. This script creates:
   - `profiles` table with automatic profile creation trigger on signup.
   - `problem_progress` table for solved status, bookmarks, and revision notes.
   - `test_attempts` table for timed MCQ scores and question analytics.
   - `activity_log` table for local calendar streaks.
   - Strict Row-Level Security (RLS) policies and performance indexes ensuring users can only read and write their own data.

4. **Configure Authentication Providers**:
   - Go to **Authentication → Providers**.
   - **Email**: Ensure Email is enabled. Decide whether to require email confirmation (**Confirm email** toggle in Supabase). If enabled, users will see a confirmation screen with a "Resend email" option upon registration.
   - **Google**: To enable Google sign-in:
     1. Create an OAuth 2.0 Web Application client in Google Cloud Console.
     2. Add your Supabase callback URL (`https://<your-project-ref>.supabase.co/auth/v1/callback`) to Authorized redirect URIs in Google Cloud.
     3. Copy the Google Client ID and Client Secret into Supabase **Authentication → Providers → Google**, and enable the provider.

5. **Set Site URL & Redirect URLs**:
   - Under **Authentication → URL Configuration**:
     - Set **Site URL** to your local or primary deployed domain (e.g., `http://localhost:5173` or `https://your-domain.vercel.app`).
     - In **Redirect URLs**, add:
       - `http://localhost:5173/**`
       - `https://your-domain.vercel.app/**`

6. **Deploy & Environment Variables**:
   - In your hosting platform settings (Vercel, Netlify, etc.), set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - Redeploy your application.

## Routes

- **Public**: `/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`
- **Protected**: `/dashboard`, `/dsa`, `/dsa/:topicId`, `/aptitude`, `/aptitude/:topicId`, `/test/:topicId`, `/test/:topicId/result`, `/profile`, `/streak`

## Content and scripts

- DSA topics and problem sheet: `src/data/topics.ts`, `src/data/problems.ts`
- Aptitude topics and original MCQs: `src/data/aptitude.ts`, `src/data/aptitude-expanded.ts`
- Lessons: `src/components/LearnContent.tsx`
- Audit and validate DSA problem and pattern distribution: `npm run check:data`
- Check for unresolved LeetCode links: `npm run check:slugs`
- Validate MCQ schema, topic counts, duplicate IDs, and selected arithmetic answers: `npm run verify:mcqs`
- Typecheck, lint, and production build: `npm run typecheck`, `npm run lint`, `npm run build`
- Dev-only diagnostics route: `/auth-debug` (inspects Supabase env presence, session, last auth event, and database test select; stripped from production builds)

> Note on scripts: All validation scripts (`check:data`, `check:slugs`, `verify:mcqs`) use `tsx` to run TypeScript files directly across all supported Node versions (Node 20+). If invoking them directly with Node, Node 22.6+ is required with `--experimental-strip-types`.

## Static deployment

`npm run build` writes the production bundle to `dist/`. Deploy that directory to Vercel, Netlify, or GitHub Pages. SPA routing rewrites are configured in `vercel.json` and `public/_redirects`. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting platform's environment settings.

## Future enhancements

- Peer leaderboard and opt-in cohort challenges
- Discussion threads and shared study notes
- Contextual AI hints that reveal progressively
- Larger aptitude banks, chart-based data interpretation, and detailed per-question timing analytics
