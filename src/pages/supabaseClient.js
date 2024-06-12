// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tyzhqkvauoujzwxwkqsg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5emhxa3ZhdW91anp3eHdrcXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzE0MDksImV4cCI6MjAzMzc0NzQwOX0.-Cvcfopgseqzk2vzmhCxvppnyEhk8RDVuqfkB67ppzU'

export const supabase = createClient(supabaseUrl, supabaseKey)
