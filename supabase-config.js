const supabaseUrl = 'https://gxcdrkmveesttkyejzza.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Y2Rya212ZWVzdHRreWVqenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjAyMTgsImV4cCI6MjA3MzkzNjIxOH0.TtcwVbzaZmRVopUIQhnMvUc-l_s0muUiMxb_iXbSZuE';

import { createClient as supabaseCreateClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const createClient = () => supabaseCreateClient(supabaseUrl, supabaseKey);
