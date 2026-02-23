import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tffarasvdtqhwvuggant.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZmFyYXN2ZHRxaHd2dWdnYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODk5NzYsImV4cCI6MjA4NzA2NTk3Nn0.3aQZjurZt4Rr-5ND15UQSy1RBk2BFa1YQnziEeCPqK0",
);
