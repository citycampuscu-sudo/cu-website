-- Disable RLS temporarily to fix policies
ALTER TABLE gallery_images DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public read gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public insert gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public update gallery" ON gallery_images;
DROP POLICY IF EXISTS "Public delete gallery" ON gallery_images;

-- Re-enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create new permissive policies
CREATE POLICY "Allow all operations" ON gallery_images
FOR ALL USING (true) WITH CHECK (true);