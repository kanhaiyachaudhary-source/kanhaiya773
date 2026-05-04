-- ═══════════════════════════════════════════════════════════════
-- Kanhaiya's Portfolio — Supabase Schema
-- Run this in Supabase SQL Editor (your existing project)
-- ═══════════════════════════════════════════════════════════════

-- CONTACT FORM SUBMISSIONS
create table if not exists portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  source text default 'contact_form',  -- 'contact_form' or 'chatbot_lead'
  ip_address text,
  user_agent text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_portfolio_messages_created on portfolio_messages(created_at desc);
create index if not exists idx_portfolio_messages_unread on portfolio_messages(is_read, created_at desc);

alter table portfolio_messages disable row level security;

-- CHATBOT CONVERSATION LOG (analytics — see what visitors ask)
create table if not exists portfolio_chats (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  user_message text not null,
  bot_reply text,
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists idx_portfolio_chats_session on portfolio_chats(session_id, created_at);
create index if not exists idx_portfolio_chats_created on portfolio_chats(created_at desc);

alter table portfolio_chats disable row level security;

-- Done! Tables created:
--   ✅ portfolio_messages — contact form submissions
--   ✅ portfolio_chats    — chatbot conversation logs (for you to analyze later)
