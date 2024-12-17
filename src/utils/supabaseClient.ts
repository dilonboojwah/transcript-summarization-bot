import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define your Supabase URL and Anon Key
const supabaseUrl: string = 'https://akinruqvrdxpkmjpzdll.supabase.co';
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraW5ydXF2cmR4cGttanB6ZGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjE4MTAsImV4cCI6MjA0OTMzNzgxMH0.UQjWqCdYluBoCwmJs40DpdmuBWBS0pPwnht_wkzpPgs';

// Initialize the Supabase client with proper types
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
