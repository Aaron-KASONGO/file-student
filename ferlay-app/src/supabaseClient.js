import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xpzailnvldehhtpasctz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwemFpbG52bGRlaGh0cGFzY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDYyNjgsImV4cCI6MjAxODQ4MjI2OH0.H8ZU58XpvvrhijBwtiR0VMB9-h64Jl_NfXrVI6NwtCg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)