-- Cyber Saathi - Supabase Schema setup

-- 1. Create profiles table (if using Supabase Auth, links to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create reports table
CREATE TABLE reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  report_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Nullable for anonymous demo submissions
  scam_type TEXT,
  phone_number TEXT,
  email TEXT,
  url TEXT,
  message TEXT,
  description TEXT,
  risk_level TEXT,
  status TEXT DEFAULT 'Submitted',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create suspicious_numbers table
CREATE TABLE suspicious_numbers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone_number TEXT UNIQUE NOT NULL,
  reports_count INTEGER DEFAULT 1,
  risk_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create suspicious_urls table
CREATE TABLE suspicious_urls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  reports_count INTEGER DEFAULT 1,
  risk_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create safety_articles table
CREATE TABLE safety_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security: Set up basic Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own reports. Allow anonymous inserts if user_id is null (optional fallback)
CREATE POLICY "Users can insert their own reports" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can view their own reports" ON reports FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reports" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can update reports" ON reports FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Suspicious Numbers RLS
ALTER TABLE suspicious_numbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view suspicious numbers" ON suspicious_numbers FOR SELECT USING (true);
CREATE POLICY "Admins can insert suspicious numbers" ON suspicious_numbers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can update suspicious numbers" ON suspicious_numbers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can delete suspicious numbers" ON suspicious_numbers FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Suspicious URLs RLS
ALTER TABLE suspicious_urls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view suspicious urls" ON suspicious_urls FOR SELECT USING (true);
CREATE POLICY "Admins can insert suspicious urls" ON suspicious_urls FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can update suspicious urls" ON suspicious_urls FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Admins can delete suspicious urls" ON suspicious_urls FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
