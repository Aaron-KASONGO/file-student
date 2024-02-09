import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// https://xpzailnvldehhtpasctz.supabase.co/storage/v1/public/documents/docs/document_528
