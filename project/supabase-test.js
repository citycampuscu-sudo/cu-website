// Test Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://byfhuxgemiyvntrysbpu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Zmh1eGdlbWl5dm50cnlzYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTkwNDQsImV4cCI6MjA3Nzg5NTA0NH0.ZbbLtVf97jG2KOTvlQrg5Eu3_7OXcR0rWOS24Hw5ouQ'

const supabase = createClient(supabaseUrl, supabaseKey)

// Test connection
async function testConnection() {
  console.log('Testing Supabase connection...')
  
  // Test database connection
  const { data, error } = await supabase.from('users').select('count')
  if (error) {
    console.error('Database connection failed:', error)
  } else {
    console.log('Database connection successful!')
  }
  
  // Test storage connection
  const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
  if (storageError) {
    console.error('Storage connection failed:', storageError)
  } else {
    console.log('Storage connection successful!')
    console.log('Available buckets:', buckets)
  }
}

testConnection()