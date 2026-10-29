-- =====================================================
-- Cyber Saathi - Supabase Production Database Schema
-- Academic Project: Senior Citizen Cyber Safety Portal
-- Execution Order: Extensions -> Tables -> Functions -> RLS Policies -> Triggers
-- =====================================================

-- 0. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- STEP 1: CREATE ALL TABLES
-- =====================================================

-- 1. Profiles Table (links to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  report_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Nullable for anonymous/demo submissions
  scam_type TEXT,
  phone_number TEXT,
  email TEXT,
  url TEXT,
  message TEXT,
  description TEXT,
  risk_level TEXT DEFAULT 'HIGH RISK',
  status TEXT DEFAULT 'Submitted',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Suspicious Numbers Table
CREATE TABLE IF NOT EXISTS suspicious_numbers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone_number TEXT UNIQUE NOT NULL,
  reports_count INTEGER DEFAULT 1,
  risk_score INTEGER DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Suspicious URLs Table
CREATE TABLE IF NOT EXISTS suspicious_urls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  reports_count INTEGER DEFAULT 1,
  risk_score INTEGER DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Safety Articles Table
CREATE TABLE IF NOT EXISTS safety_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STEP 2: CREATE FUNCTIONS
-- =====================================================

-- Auto-create profile row upon user signup in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', 'Citizen'), 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 3: CONFIGURE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- 1. Profiles Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 2. Reports Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own reports" ON reports;
CREATE POLICY "Users can insert their own reports" ON reports FOR INSERT WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);

DROP POLICY IF EXISTS "Users can view their own reports" ON reports;
CREATE POLICY "Users can view their own reports" ON reports FOR SELECT USING (
  auth.uid() = user_id
);

DROP POLICY IF EXISTS "Public can view anonymous reports" ON reports;
CREATE POLICY "Public can view anonymous reports" ON reports FOR SELECT USING (
  user_id IS NULL
);

DROP POLICY IF EXISTS "Admins can view all reports" ON reports;
CREATE POLICY "Admins can view all reports" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update reports" ON reports;
CREATE POLICY "Admins can update reports" ON reports FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 3. Suspicious Numbers Security
ALTER TABLE suspicious_numbers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view suspicious numbers" ON suspicious_numbers;
CREATE POLICY "Public can view suspicious numbers" ON suspicious_numbers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert suspicious numbers" ON suspicious_numbers;
CREATE POLICY "Admins can insert suspicious numbers" ON suspicious_numbers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update suspicious numbers" ON suspicious_numbers;
CREATE POLICY "Admins can update suspicious numbers" ON suspicious_numbers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete suspicious numbers" ON suspicious_numbers;
CREATE POLICY "Admins can delete suspicious numbers" ON suspicious_numbers FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 4. Suspicious URLs Security
ALTER TABLE suspicious_urls ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view suspicious urls" ON suspicious_urls;
CREATE POLICY "Public can view suspicious urls" ON suspicious_urls FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert suspicious urls" ON suspicious_urls;
CREATE POLICY "Admins can insert suspicious urls" ON suspicious_urls FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update suspicious urls" ON suspicious_urls;
CREATE POLICY "Admins can update suspicious urls" ON suspicious_urls FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "Admins can delete suspicious urls" ON suspicious_urls;
CREATE POLICY "Admins can delete suspicious urls" ON suspicious_urls FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 5. Safety Articles Security
ALTER TABLE safety_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published safety articles" ON safety_articles;
CREATE POLICY "Public can view published safety articles" ON safety_articles FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admins can manage safety articles" ON safety_articles;
CREATE POLICY "Admins can manage safety articles" ON safety_articles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- =====================================================
-- STEP 4: CREATE TRIGGERS
-- =====================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- End of Schema Setup
-- =====================================================
