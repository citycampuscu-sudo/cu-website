import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  password_hash: string
  role: 'admin' | 'user'
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  storage_path: string
  created_at: string
}

export interface Leader {
  id: string
  name: string
  position: string
  course: string
  year: string
  bio: string
  image: string
  created_at: string
}

export interface LeadershipRole {
  id: string
  role_type:
    | 'current_patron'
    | 'previous_patron'
    | 'alumni_director'
    | 'previous_chairperson'
    | 'focus_staff'
  name: string
  description: string
  year: string
  image_url?: string
  created_at: string
}

export interface Ministry {
  id: string
  name: string
  description: string
  icon: string
  leader: string
  activities: string
  contact?: string
  image_url?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  created_at: string
}

// NEW: Documents
export interface Document {
  id: string
  title: string
  description: string
  category: 'home' | 'alumni'
  file_url: string
  created_at: string
}
