import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient('https://feffferwogivtlwsrmof.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZmZmZXJ3b2dpdnRsd3NybW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MTAyNjAsImV4cCI6MTk5MzA4NjI2MH0.RBBdI0RxLQfzl1rjslOtJUla2IhCtGzV8dx7UfMsZZI');