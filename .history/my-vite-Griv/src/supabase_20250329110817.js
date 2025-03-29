import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sttpmwjxcnlfphnplylt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dHBtd2p4Y25sZnBobnBseWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMjY0NzYsImV4cCI6MjA1ODgwMjQ3Nn0.PveWFl7QQpdJSmyEdTsNMzChrysuaJmnoFUdfG0cV_4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
