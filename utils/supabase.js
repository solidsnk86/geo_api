import { createClient } from '@supabase/supabase-js'
import { loadEnv } from './load-env'

loadEnv()
const supabase = createClient(
  process.env.SUPABASE_PUBLIC_URL,
  process.env.SUPABASE_PUBLIC_KEY
)

export default supabase
