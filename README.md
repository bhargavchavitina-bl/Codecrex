# CodeCrest

**Code. Climb. Crest.**

CodeCrest is a frontend interview-prep app for B.Tech students. It includes a pattern-based DSA roadmap, personal problem notes and revision flags, aptitude lessons, timed MCQ practice, progress tracking, and a local-calendar streak.

## Requirements and local setup

- Node.js 20 or later
- A Supabase project for cloud auth and synced progress (optional)

```bash
npm install
cp .env.example .env
npm run dev
```

Add the Supabase project URL and publishable/anon key to `.env` to enable Email/Password and Google sign-in and cloud progress. Without Supabase keys, choose **Continue as a guest**; progress and profile settings stay in this browser's localStorage. The client does not include a custom backend.

## Supabase setup

In Supabase, create a project and copy the Project URL and anon/public key from **Project Settings → API** into these Vite variables:

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL, such as `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | The project's publishable/anon key |

Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor. It creates the `user_progress` table and row-level security policies that limit access to the signed-in user's own row.

Enable Email auth and Google under **Authentication → Providers**. For Google, configure the OAuth client in Google Cloud, add its client ID and secret in Supabase, and add your local and production URLs to Supabase's allowed redirect URLs. For signup confirmation and password recovery, configure the Supabase email templates and redirect URLs for your app's deployed domain.

The anon/publishable key is intended for browser use. Never put a Supabase service-role key in this app. Row-level security is essential: do not rely on UI checks to protect user data.

## Routes

- Public: `/`, `/login`, `/signup`, `/forgot-password`
- Protected: `/dashboard`, `/dsa`, `/dsa/:topicId`, `/aptitude`, `/aptitude/:topicId`, `/test/:topicId`, `/test/:topicId/result`, `/profile`, `/streak`

## Content and scripts

- DSA topics and problem sheet: `src/data/topics.ts`, `src/data/problems.ts`
- Aptitude topics and original MCQs: `src/data/aptitude.ts`, `src/data/aptitude-expanded.ts`
- Lessons: `src/components/LearnContent.tsx`
- Check for unresolved LeetCode links: `npm run check:slugs`
- Validate MCQ schema, topic counts, duplicate IDs, and selected arithmetic answers: `npm run verify:mcqs`
- Typecheck, lint, and production build: `npm run typecheck`, `npm run lint`, `npm run build`

The slug check uses LeetCode's public problem URLs. If LeetCode rate limits or denies requests, the script reports those requests as inconclusive instead of incorrectly marking every slug broken. The curated seed uses free problem links; company names are text labels for practice context.

## Static deployment

`npm run build` writes to `dist/`. Deploy that directory to Vercel, Netlify, or GitHub Pages. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the host's environment settings if using Supabase. Configure the host to serve `index.html` for application routes (SPA fallback). For a GitHub Pages repository subpath, set Vite's `base` and configure a matching router basename.

## Future enhancements

- Peer leaderboard and opt-in cohort challenges
- Discussion threads and shared study notes
- Contextual AI hints that reveal progressively
- Larger aptitude banks, chart-based data interpretation, and detailed per-question timing analytics
