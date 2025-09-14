import { createClient } from '@supabase/supabase-js'

// Прямое подключение к Supabase
const supabaseUrl = 'https://kxxpaaepxckfjofnqouo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHBhYWVweGNrZmpvZm5xb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTU5MDUsImV4cCI6MjA3MzQzMTkwNX0.sXuOJYT9FDUFmnMAARkyXPoM-75v3HHXMhS3_rNchlk'

console.log('🔗 Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key length:', supabaseKey.length)

const supabase = createClient(supabaseUrl, supabaseKey)

// Тест подключения
async function testConnection() {
  try {
    console.log('📡 Testing database connection...')
    
    // Простой запрос к базе данных
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('❌ Database error:', error.message)
      if (error.message.includes('relation "users" does not exist')) {
        console.log('💡 Table "users" does not exist yet. You need to create it.')
      }
    } else {
      console.log('✅ Database connection successful!')
      console.log('Data:', data)
    }
    
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
  }
}

testConnection()
