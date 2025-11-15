-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery-images');

-- Create policy for public upload (since we're using anon key)
CREATE POLICY "Public upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

-- Create policy for public update
CREATE POLICY "Public update" ON storage.objects
FOR UPDATE USING (bucket_id = 'gallery-images');

-- Create policy for public delete
CREATE POLICY "Public delete" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery-images');

-- Enable RLS on custom tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Public read users" ON users FOR SELECT USING (true);

-- Create policies for gallery_images table
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public insert gallery" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update gallery" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Public delete gallery" ON gallery_images FOR DELETE USING (true);

-- Insert default admin user (password: MUKCCU2024!)
INSERT INTO users (email, password_hash, role) VALUES 
('admin@mukccu.org', 'MUKCCU2024!', 'admin');