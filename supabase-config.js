// supabase-config.js

const supabaseUrl = "https://gxcdrkmveesttkyejzza.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Y2Rya212ZWVzdHRreWVqenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjAyMTgsImV4cCI6MjA3MzkzNjIxOH0.TtcwVbzaZmRVopUIQhnMvUc-l_s0muUiMxb_iXbSZuE';

export function createClient() {
  if (!window.supabase) {
    throw new Error("Supabase SDK not loaded. Check script order in index.html");
  }

  return window.supabase.createClient(supabaseUrl, supabaseAnonKey);
}
