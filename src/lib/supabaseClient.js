import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase only if valid environment variables are provided.
// This prevents errors when running in pure demo mode without a configured DB.
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
