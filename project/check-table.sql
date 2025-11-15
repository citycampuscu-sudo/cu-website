-- Check if table exists and its RLS status
SELECT schemaname, tablename, rowsecurity, hasrls 
FROM pg_tables 
LEFT JOIN pg_class ON pg_class.relname = pg_tables.tablename
WHERE tablename = 'gallery_images';

-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'gallery_images';

-- Recreate table without RLS
DROP TABLE IF EXISTS gallery_images;

CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Do NOT enable RLS at all