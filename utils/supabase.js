import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const { SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY } = process.env

export const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY)
