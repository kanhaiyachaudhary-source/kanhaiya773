import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
  ip_address?: string;
  user_agent?: string;
  is_read: boolean;
  created_at: string;
}
