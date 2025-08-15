
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service_type VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Create gallery_items table for images and videos
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    alt_text TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    features TEXT[],
    gradient VARCHAR(100),
    pricing JSONB,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0
);

-- Create trainer_info table
CREATE TABLE IF NOT EXISTS trainer_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    profile_image TEXT,
    certifications JSONB DEFAULT '[]'::jsonb,
    experience_years INTEGER DEFAULT 0,
    specializations TEXT[]
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    hours TEXT,
    social_links JSONB DEFAULT '{}'::jsonb
);

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    client_name VARCHAR(255) NOT NULL,
    client_image TEXT,
    story_title VARCHAR(255) NOT NULL,
    story_content TEXT NOT NULL,
    before_image TEXT,
    after_image TEXT,
    transformation_stats JSONB,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_service_type ON appointments(service_type);
CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_items_order ON gallery_items(order_index);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_success_stories_featured ON success_stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_success_stories_active ON success_stories(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and admin management
CREATE POLICY "Public can view active gallery items" ON gallery_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view trainer info" ON trainer_info
    FOR SELECT USING (true);

CREATE POLICY "Public can view contact info" ON contact_info
    FOR SELECT USING (true);

CREATE POLICY "Public can view active success stories" ON success_stories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Insert some default data
INSERT INTO trainer_info (name, title, bio, experience_years, specializations) VALUES
('Alex Johnson', 'Certified Personal Trainer', 'Passionate about helping clients achieve their fitness goals through personalized training programs.', 5, ARRAY['Strength Training', 'Weight Loss', 'Functional Fitness'])
ON CONFLICT DO NOTHING;

INSERT INTO contact_info (phone, email, address, hours) VALUES
('+1 (555) 123-4567', 'info@kinetictrainer.com', '123 Fitness Street, Healthy City, HC 12345', 'Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM')
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (title, description, icon, features, gradient, pricing, order_index) VALUES
('Strength Training', 'Build muscle and increase strength with personalized workout programs', '💪', ARRAY['Personalized Programs', 'Progress Tracking', 'Form Correction'], 'from-blue-500 to-purple-600', '{"single": 75, "package": 280}', 1),
('Cardio Conditioning', 'Improve cardiovascular health and endurance', '❤️', ARRAY['Heart Rate Monitoring', 'Endurance Building', 'Fat Burning'], 'from-red-500 to-pink-600', '{"single": 65, "package": 240}', 2),
('Functional Fitness', 'Train movements that help with daily activities', '🏃', ARRAY['Real-world Movements', 'Injury Prevention', 'Flexibility'], 'from-green-500 to-teal-600', '{"single": 70, "package": 260}', 3)
ON CONFLICT DO NOTHING;
