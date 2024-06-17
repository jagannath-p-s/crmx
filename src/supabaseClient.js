// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rfsqevzzlnuhifwmorxv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmc3Fldnp6bG51aGlmd21vcnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MTQzNDcsImV4cCI6MjAzNDE5MDM0N30._MJkIGhERKagpMran5UcAUen3gULm7JVy_evgTtHrfQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
