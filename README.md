# 🚀 Kanhaiya's Portfolio — Full-Stack Next.js App

Production portfolio with **real LLM chatbot**, **Supabase contact form**, and **admin dashboard**.

## ✨ Features

### 🎨 Frontend
- 4 themes (Neon Cyberpunk, Nothing OS, Elegant Dark, Classic Light) — visitor-switchable, persistence via localStorage
- Sections: Hero, About, Experience, Projects (4), Skills, Certifications, Education, Interests, Contact
- Custom cursor + particle background (neon theme)
- Typewriter effect cycling through 6 roles
- Smooth scroll animations
- Mobile responsive

### 🤖 Real LLM Chatbot
- Powered by **Hugging Face Inference** (gpt-oss-120b — same as your other apps)
- Pre-trained system prompt with FULL knowledge of Kanhaiya (projects, experience, education, certs, skills, run instructions)
- Multi-turn conversation with last-6-messages context
- Saves all conversations to Supabase for analytics

### 📧 Contact Form
- Saves submissions to Supabase `portfolio_messages` table
- Captures IP + User Agent
- Validation (name 2+ chars, valid email, message 10+ chars, max lengths)
- Source tracking (contact_form vs chatbot_lead)

### 🔒 Admin Dashboard (`/admin`)
- Password-protected (only YOU can access)
- View all messages with read/unread filter
- Mark read/unread, delete messages
- Reply via email button (pre-fills mailto)
- View chat conversation logs (analytics — see what visitors are asking)
- Stats: total messages, unread count, chat sessions, total questions

---

## 🚀 Deploy in 10 Minutes

### Step 1 — Run SQL Schema in Supabase

Use your **existing** Supabase project (the same one DocuMind/SnipURL/etc use).

1. Go to Supabase Dashboard → SQL Editor → New Query
2. Copy the contents of `supabase-schema.sql`
3. Paste and Run ✅

This creates 2 new tables: `portfolio_messages` and `portfolio_chats`.

### Step 2 — Generate Admin Password Hash

You'll need to set a password for accessing the admin dashboard.

```bash
cd portfolio
npm install
node scripts/generate-password-hash.js
```

Type your desired password (e.g. `MySecurePassword123`). It outputs a hash like:
```
$2a$10$abcdef...
```

**Copy this hash** — you'll paste it into Vercel env vars in step 4.

### Step 3 — Push to GitHub

1. Create a new repo: `kanhaiya772-portfolio`
2. Upload all files from this folder

### Step 4 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `kanhaiya772-portfolio`
3. **Project name:** `kanhaiya772` (so URL becomes `kanhaiya772.vercel.app`)
4. Add environment variables:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` (same as other apps) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable/anon key |
| `JWT_SECRET` | any random 40+ char string |
| `HF_TOKEN` | `hf_...` (same as DocuMind/etc) |
| `ADMIN_USERNAME` | `kanhaiya` (or your choice) |
| `ADMIN_PASSWORD_HASH` | the hash from Step 2 |

5. Click **Deploy** → live in 90 seconds 🎉

### Step 5 — Test

1. Visit `https://kanhaiya772.vercel.app`
2. Try the chatbot (click 💬 button bottom-right)
3. Submit the contact form
4. Login at `/login` with your username + password
5. View your message at `/admin`

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── files/                              ← Resume + cert PDFs (downloadable)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts              ← LLM chatbot endpoint (HF)
│   │   │   ├── contact/route.ts           ← Save messages to Supabase
│   │   │   ├── auth/{login,logout,me}/    ← Admin auth
│   │   │   └── admin/submissions/         ← List/update/delete messages
│   │   ├── admin/page.tsx                 ← Dashboard UI
│   │   ├── login/page.tsx                 ← Admin login
│   │   ├── globals.css                     ← All 4 themes + animations
│   │   ├── layout.tsx                     ← Root layout
│   │   └── page.tsx                       ← Main portfolio page
│   ├── components/
│   │   ├── Chatbot.tsx                    ← LLM chatbot with API calls
│   │   ├── ContactForm.tsx                ← Saves to Supabase
│   │   └── ClientEffects.tsx              ← Cursor, particles, typewriter, theme
│   └── lib/
│       ├── auth.ts                        ← JWT + bcrypt (admin only)
│       ├── hf.ts                          ← HF inference + KANHAIYA_SYSTEM_PROMPT
│       └── supabase.ts                    ← Supabase client
├── scripts/
│   └── generate-password-hash.js         ← Run once to make admin hash
├── supabase-schema.sql                    ← Run in Supabase SQL Editor
├── .env.example
└── package.json
```

---

## 🔧 Customization

### Update Chatbot Knowledge
Edit `src/lib/hf.ts` → the `KANHAIYA_SYSTEM_PROMPT` constant. Add facts, projects, anything new. The LLM will use this as context.

### Add New Project
Edit `src/app/page.tsx` — copy a `<div className="project-card">` block, update content. Also update `KANHAIYA_SYSTEM_PROMPT` so the chatbot knows about it.

### Change Themes
Edit CSS variables in `src/app/globals.css`. Each `[data-theme="X"]` block defines colors/fonts. Add a new theme button in `page.tsx`.

### Update Resume / Certificates
Replace files in `public/files/`. Filenames must stay the same (referenced by HTML).

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| Chatbot times out / doesn't respond | First call takes 15-20s (HF model warming). Subsequent calls are fast. |
| Contact form "Failed to save" | Check Supabase env vars on Vercel and that schema was run. |
| Admin login "Invalid credentials" | Re-run password generator script. Make sure ADMIN_PASSWORD_HASH is set on Vercel exactly as output. |
| Theme switcher doesn't persist | Make sure JavaScript is enabled. Check browser localStorage. |

---

## 🔒 Security Notes

- **Admin password** is bcrypt-hashed (10 rounds) — never stored in plain text
- **JWT sessions** in HTTP-only cookies (XSS-safe), 7-day expiry
- **Validation** on all form inputs (length limits, email regex)
- **IP + User Agent** logged for accountability
- **No public access** to admin endpoints — all require valid JWT

---

## 🤖 Chatbot System Prompt

The chatbot is **fully pre-trained** on Kanhaiya's information. It knows:
- ✅ All personal details (name, location, email, phone, languages)
- ✅ All 4 projects (DocuMind, SnipURL, FormCraft, DevTrack) — capabilities AND setup steps
- ✅ All 3 jobs (PwC, Amazon, Atharvo) with bullets
- ✅ All 3 education levels (B.Tech, Diploma, Class 10) with grades
- ✅ All 4 certifications with verify URLs
- ✅ All skills (AI/GenAI, Platforms, Languages, Frameworks, DBs)
- ✅ Achievements, hobbies, why-hire-me

You can edit/expand `KANHAIYA_SYSTEM_PROMPT` in `src/lib/hf.ts` anytime.

---

## 📊 Analytics

The admin dashboard tracks **chatbot conversations** so you can see:
- What questions visitors ask
- Whether the AI is answering correctly
- Common queries (improve system prompt accordingly)

---

**Built with ⚡ by Kanhaiya Chaudhary**

Questions? kanhiyachaudhary772@gmail.com
