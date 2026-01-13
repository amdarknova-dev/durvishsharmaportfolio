import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase Project URL and Anon Key
// You can find these in your Supabase Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hdumatptezljxglpoyye.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zr2yhMUcSwmJ_tULbHTxMQ_4ilQV8kh';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
