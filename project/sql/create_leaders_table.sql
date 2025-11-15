-- Create leaders table
CREATE TABLE IF NOT EXISTS leaders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  course TEXT,
  year TEXT,
  bio TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leadership_roles table for special roles
CREATE TABLE IF NOT EXISTS leadership_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_type TEXT NOT NULL, -- 'current_patron', 'previous_patron', 'alumni_director', 'previous_chairperson'
  name TEXT NOT NULL,
  description TEXT,
  year TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for leaders
CREATE POLICY "Allow public read access" ON leaders FOR SELECT USING (true);
CREATE POLICY "Allow admin insert" ON leaders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON leaders FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON leaders FOR DELETE USING (true);

-- Create policies for leadership_roles
CREATE POLICY "Allow public read access" ON leadership_roles FOR SELECT USING (true);
CREATE POLICY "Allow admin insert" ON leadership_roles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON leadership_roles FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON leadership_roles FOR DELETE USING (true);