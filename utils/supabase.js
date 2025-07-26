import { createClient } from '@supabase/supabase-js'

process.loadEnvFile()

const supabase = createClient(
  process.env.SUPABASE_PUBLIC_URL,
  process.env.SUPABASE_PUBLIC_KEY
)

export default supabase
