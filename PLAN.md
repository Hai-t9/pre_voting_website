# 🗺️ Full Plan: Next.js + Supabase Landing Page

A complete end-to-end plan to build, deploy, and host a landing page with a voting feature.

---

## Table of Contents

- [Phase 0 — Prerequisites](#phase-0--prerequisites)
- [Phase 1 — Scaffold the Next.js Project](#phase-1--scaffold-the-nextjs-project)
- [Phase 2 — Set Up Supabase Database](#phase-2--set-up-supabase-database)
  - [2d — Inactivity Policy & Fix](#2d--important-supabase-free-tier-inactivity-policy)
- [Phase 3 — Connect Next.js to Supabase](#phase-3--connect-nextjs-to-supabase)
- [Phase 4 — Build the Landing Page Layout](#phase-4--build-the-landing-page-layout)
- [Phase 5 — Build the Voting Form + API](#phase-5--build-the-voting-form--api)
  - [5b — Keep-Alive Route](#5b--keep-alive-api-route-prevents-supabase-from-pausing)
- [Phase 6 — Style Everything with Tailwind](#phase-6--style-everything-with-tailwind)
- [Phase 7 — Test Locally](#phase-7--test-locally)
- [Phase 8 — Deploy to Vercel](#phase-8--deploy-to-vercel)
  - [8c — Cron Job to Keep DB Alive](#8c--set-up-a-cron-job-to-keep-supabase-alive-free)
- [Phase 9 — Domain + Polish](#phase-9--domain--polish)
- [Timeline](#-timeline)

---

## Phase 0 — Prerequisites (30 min)

| What | Details |
|---|---|
| **Install Node.js** | Download from [nodejs.org](https://nodejs.org) (v18 or later). Verify with `node -v` |
| **Install Git** | `sudo apt install git` (Linux) or download from [git-scm.com](https://git-scm.com) |
| **Code Editor** | Zed — already set up |
| **Create GitHub account** | [github.com](https://github.com) (free) |
| **Create Supabase account** | [supabase.com](https://supabase.com) (free) |
| **Create Vercel account** | [vercel.com](https://vercel.com) (free, sign in with GitHub) |
| **Buy a domain** (optional now) | [cloudflare.com](https://cloudflare.com) — ~$8–12/yr |

---

## Phase 1 — Scaffold the Next.js Project (15 min)

```bash
# In your project directory
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

This gives you:
- ✅ TypeScript
- ✅ Tailwind CSS (styling)
- ✅ App Router (modern Next.js routing)
- ✅ `/src` directory structure

**Resulting structure:**
```
pre_voting_website/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   └── ...
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Phase 2 — Set Up Supabase Database (20 min)

### 2a — Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name: `voting-site`
3. Database password: generate a strong one (save it!)
4. Region: pick the closest to your audience
5. Wait ~2 minutes for it to spin up

### 2b — Create the `votes` table

In the Supabase dashboard → **SQL Editor** → run this:

```sql
CREATE TABLE votes (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  city       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent duplicate votes by the same email
CREATE UNIQUE INDEX idx_votes_email ON votes (email);
```

### 2c — Get your API keys

Supabase Dashboard → **Project Settings** → **API** → copy:
- `Project URL` (looks like `https://xxxxx.supabase.co`)
- `anon public key` (safe to use in the browser)

### 2d — ⚠️ Important: Supabase Free Tier Inactivity Policy

Supabase **pauses your project after 7 days of inactivity** on the free tier.

| Detail | What happens |
|---|---|
| **After 7 days with no DB activity** | Your project gets **paused** (read-only / inactive) |
| **Data deleted?** | **No** — data is safe, just inaccessible until you unpause |
| **How to unpause** | One click in Supabase dashboard → **Reactivate project** |
| **Prevent it** | Make at least 1 DB query per week (e.g., a keep-alive cron job) |

**Don't worry** — there's a fix! We'll add a free Vercel Cron Job in [Phase 8](#phase-8--deploy-to-vercel) that keeps it alive automatically. Or you can just unpause with one click if it ever pauses.

---

## Phase 3 — Connect Next.js to Supabase (15 min)

Install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Create an environment file at the root of your project:

```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
```

Create a Supabase client helper:

**`src/lib/supabase.ts`**
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## Phase 4 — Build the Landing Page Layout

Build the following sections on the homepage (`src/app/page.tsx`):

### Sections

1. **Hero** — Name / tagline of the person
2. **Projects Showcase** — Grid of project cards (image + title + description)
3. **Vote Section** — Form (name, email, city) + vote button
4. **Footer** — Social links, copyright

### Example project data

**`src/data/projects.ts`**
```ts
export const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack web application built with Next.js",
    image: "/projects/alpha.jpg",
    tags: ["Next.js", "Tailwind", "Postgres"],
  },
  {
    title: "Project Beta",
    description: "Mobile-first design system",
    image: "/projects/beta.jpg",
    tags: ["React Native", "Figma"],
  },
  // Add 4–6 projects
]
```

---

## Phase 5 — Build the Voting Form + API (30 min)

### 5a — API Route (handles the vote submission)

**`src/app/api/vote/route.ts`**
```ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, city } = await request.json()

  // Validate
  if (!name || !email || !city) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('votes')
    .insert({ name, email, city })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
```

### 5b — Keep-Alive API Route (prevents Supabase from pausing)

Add this route so your database doesn't get paused after 7 days of inactivity:

**`src/app/api/keep-alive/route.ts`**
```ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  // Simple lightweight query to keep the DB active
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'alive', voteCount: count })
}
```

This route does a cheap `SELECT count(*)` query — enough to reset the 7-day inactivity timer.

### 5c — Frontend form component

**`src/components/VoteForm.tsx`** — A form with:
- Name input
- Email input
- City input
- Vote button
- Success / error feedback (inline message)

**States to handle:**
| State | UI |
|---|---|
| Default | Empty form, "Vote" button enabled |
| Loading | Button shows spinner or "Submitting..." |
| Success | "Thanks for voting! 🎉" message |
| Error | "Something went wrong, try again" |
| Duplicate | "You've already voted!" |

---

## Phase 6 — Style Everything with Tailwind (ongoing)

Use Tailwind utility classes for a clean, professional look:

- **Color palette**: Pick 2–3 brand colors (e.g. slate/blue/amber)
- **Typography**: Tailwind's `prose` for text, `text-4xl` for headings
- **Layout**: `max-w-6xl mx-auto` for centered content
- **Cards**: `rounded-xl shadow-md border` for project cards
- **Form**: `rounded-lg border px-4 py-2` for inputs
- **Button**: `bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition`

**Optional component libraries:**
- [daisyUI](https://daisyui.com) — class-based, very easy
- [shadcn/ui](https://ui.shadcn.com) — more polished, popular

---

## Phase 7 — Test Locally (15 min)

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- [ ] ✅ Page loads and looks good
- [ ] ✅ Projects display correctly
- [ ] ✅ Fill form → click "Vote" → see success message
- [ ] ✅ Check Supabase dashboard → **Table Editor** → `votes` table → see the new row
- [ ] ✅ Try submitting duplicate email → see "already voted" message
- [ ] ✅ Mobile responsive layout works

---

## Phase 8 — Deploy to Vercel (15 min)

### Option A: Direct CLI deploy

```bash
npm i -g vercel
vercel
# Follow prompts — it detects Next.js automatically
# Set environment variables when asked:
#   NEXT_PUBLIC_SUPABASE_URL = ...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY = ...
```

### Option B: GitHub + Vercel (recommended)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create voting-site --public --push
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your GitHub repo → Vercel auto-detects Next.js → **Deploy**

3. Add environment variables in Vercel dashboard: Project Settings → Environment Variables

**Your site is live at:** `https://your-project.vercel.app` 🎉

### 8c — Set up a Cron Job to keep Supabase alive (free)

Create a `vercel.json` file at your project root to schedule the keep-alive route once a week:

**`vercel.json`**
```json
{
  "crons": [
    {
      "path": "/api/keep-alive",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

This runs every Sunday at midnight — a single lightweight query that resets the 7-day inactivity timer on Supabase.

> **Note:** Vercel Cron Jobs are free on the Hobby plan (up to 2 cron jobs). No credit card needed.

---

## Phase 9 — Domain + Polish (30 min)

### 9a — Connect a custom domain

1. Buy the domain on [Cloudflare Registrar](https://cloudflare.com) (~$8–12/yr)
2. In Vercel dashboard → your project → **Domains** → enter your domain
3. Vercel gives you a `CNAME` record to add
4. Add that record in **Cloudflare DNS**
5. Wait 5–10 minutes → domain resolves ✅

### 9b — Post-launch polish

- [ ] ✅ Add a favicon (`public/favicon.ico`)
- [ ] ✅ Meta tags for SEO (title, description, OG image)
- [ ] ✅ Google Analytics or [Plausible](https://plausible.io) for traffic tracking
- [ ] ✅ Responsive design check (mobile / tablet / desktop)
- [ ] ✅ Vote count display (optional): `SELECT COUNT(*) FROM votes`
- [ ] ✅ Rate limiting to prevent spam voting

---

## 📊 Timeline

```
Day 1 ──────────────────────────────────────
  Phase 0  Set up accounts & tools    30 min
  Phase 1  Scaffold Next.js            15 min
  Phase 2  Set up Supabase             20 min
  Phase 3  Connect Supabase            15 min
  Phase 4  Build landing page layout   45 min
  Phase 5  Voting form + API           30 min
  Phase 6  Styling                     45 min
  Phase 7  Test locally                15 min

Day 2 ──────────────────────────────────────
  Phase 8  Deploy to Vercel            15 min
  Phase 9  Domain + polish             30 min
  ──────────────────────────────────────
  TOTAL: ~4 hours
```

---

## Quick Reference — Key Commands

```bash
# Development
npm run dev           # Start local dev server (http://localhost:3000)

# Dependencies
npm install @supabase/supabase-js   # Supabase client

# Deployment
npm i -g vercel       # Install Vercel CLI
vercel                # Deploy to Vercel

# Git
git init
git add .
git commit -m "message"
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Cloudflare Registrar](https://cloudflare.com/products/registrar/)
