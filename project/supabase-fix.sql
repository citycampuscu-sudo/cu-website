-- Create tables only if they don't exist
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bucket only if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public upload" ON storage.objects;
DROP POLICY IF EXISTS "Public update" ON storage.objects;
DROP POLICY IF EXISTS "Public delete" ON storage.objects;
DROP POLICY IF EXISTS "Public read users" ON users;
DROP POLICY IF EXISTS "Public read gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public insert gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public update gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public delete gallery" ON gallery_images;

-- Create new policies
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Public upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Public update" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images');
CREATE POLICY "Public delete" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images');

CREATE POLICY "Public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public insert gallery" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update gallery" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Public delete gallery" ON gallery_images FOR DELETE USING (true);

-- Insert admin user only if doesn't exist
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@mukccu.org', 'MUKCCU2024!', 'admin')
ON CONFLICT (email) DO NOTHING;