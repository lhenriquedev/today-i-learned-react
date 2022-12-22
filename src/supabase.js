import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wnvjllhvwpewvbokaqzi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudmpsbGh2d3Bld3Zib2thcXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NzMzMTEsImV4cCI6MTk4NzA0OTMxMX0.DIqfqqFFQFgpUXKiIhYWHnxpc3YmxMOUlIQyvbmsRHU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
