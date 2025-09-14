// Load environment variables first
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env file
dotenv.config({ path: join(__dirname, '..', '..', '.env') })

import { createClient } from '@supabase/supabase-js'

// Debug: Log environment variables
console.log('🔍 Checking Supabase environment variables...')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables:')
  console.error('SUPABASE_URL:', supabaseUrl || 'undefined')
  console.error('SUPABASE_ANON_KEY:', supabaseKey ? 'Set (length: ' + supabaseKey.length + ')' : 'undefined')
  throw new Error('Missing Supabase environment variables')
}

console.log('✅ Supabase environment variables loaded successfully')

export const supabase = createClient(supabaseUrl, supabaseKey)