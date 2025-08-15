-- Comprehensive Admin Dashboard Schema for Kinetic Trainer Hub
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    alt_text TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Success Stories Table
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

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    features TEXT[] NOT NULL,
    gradient VARCHAR(100) NOT NULL,
    pricing JSONB,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0
);

-- Appointments Table (Enhanced)
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

-- Contact Information Table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    hours TEXT NOT NULL,
    social_links JSONB NOT NULL
);

-- Trainer Information Table
CREATE TABLE IF NOT EXISTS trainer_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    profile_image TEXT,
    certifications JSONB NOT NULL,
    experience_years INTEGER NOT NULL,
    specializations TEXT[] NOT NULL,
    awards JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_active_order ON gallery_items(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_success_stories_active_featured ON success_stories(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_services_active_order ON services(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_appointments_status_date ON appointments(status, preferred_date);

-- Row Level Security (RLS) policies
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_info ENABLE ROW LEVEL SECURITY;

-- Public read access for active content
CREATE POLICY "Public can view active gallery items" ON gallery_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active success stories" ON success_stories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view contact info" ON contact_info
    FOR SELECT USING (true);

CREATE POLICY "Public can view trainer info" ON trainer_info
    FOR SELECT USING (true);

-- Allow public to insert appointments
CREATE POLICY "Public can insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Insert default data

-- Default Gallery Items
INSERT INTO gallery_items (title, type, url, alt_text, order_index) VALUES
('Client Transformation Results', 'image', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 'Amazing transformation results', 1),
('Training Session Video', 'video', 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', 'Intense training session', 2),
('Group Fitness Class', 'image', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 'Group training success', 3),
('Personal Training Session', 'image', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', 'One-on-one training', 4)
ON CONFLICT DO NOTHING;

-- Default Success Stories
INSERT INTO success_stories (client_name, story_title, story_content, transformation_stats, is_featured) VALUES
('Sarah Johnson', 'Lost 30 Pounds in 4 Months', 'Working with Alex transformed not just my body, but my entire relationship with fitness. The personalized approach and constant support made all the difference.', 
 '{"weight_lost": "30 lbs", "duration": "4 months", "body_fat_reduced": "8%"}', true),
('Mike Chen', 'From Couch to Marathon Runner', 'I never thought I could run a marathon. Alex''s training program gradually built my endurance and confidence. Crossed the finish line in under 4 hours!', 
 '{"marathon_time": "3:58", "training_duration": "8 months", "miles_per_week": "40"}', true),
('Lisa Rodriguez', 'Gained Strength and Confidence', 'After my injury, I thought my active days were over. Alex''s rehabilitation-focused training helped me come back stronger than ever.', 
 '{"strength_increase": "40%", "injury_recovery": "6 months", "confidence": "100%"}', false)
ON CONFLICT DO NOTHING;

-- Default Services
INSERT INTO services (title, description, icon, features, gradient, pricing, order_index) VALUES
('Strength Training', 'Build lean muscle and increase your power with personalized strength programs.', 'Dumbbell', 
 ARRAY['Custom workout plans', 'Progressive overload', 'Form correction'], 'from-primary to-primary-glow',
 '{"type": "tiered", "tiers": [{"name": "Single Session", "price": 75}, {"name": "Monthly Package", "price": 280}], "currency": "USD"}', 1),

('Cardio Conditioning', 'Improve cardiovascular health and endurance with engaging cardio workouts.', 'Heart',
 ARRAY['HIIT training', 'Endurance building', 'Fat burning'], 'from-secondary to-accent',
 '{"type": "tiered", "tiers": [{"name": "Single Session", "price": 65}, {"name": "Monthly Package", "price": 240}], "currency": "USD"}', 2),

('Functional Fitness', 'Enhance everyday movement patterns and athletic performance.', 'Zap',
 ARRAY['Movement quality', 'Injury prevention', 'Performance optimization'], 'from-accent to-primary',
 '{"type": "tiered", "tiers": [{"name": "Single Session", "price": 70}, {"name": "Monthly Package", "price": 260}], "currency": "USD"}', 3),

('Goal-Specific Training', 'Customized programs designed around your specific fitness objectives.', 'Target',
 ARRAY['Personalized approach', 'Regular assessments', 'Adaptive programming'], 'from-success to-secondary',
 '{"type": "single", "price": 85, "currency": "USD", "period": "session"}', 4),

('Group Sessions', 'Train with others in motivating small group environments.', 'Users',
 ARRAY['Social motivation', 'Shared experiences', 'Community support'], 'from-primary to-accent',
 '{"type": "single", "price": 35, "currency": "USD", "period": "session"}', 5),

('Flexible Scheduling', 'Training sessions that fit your busy lifestyle and schedule.', 'Clock',
 ARRAY['Online options', 'Flexible timing', '24/7 support'], 'from-secondary to-primary',
 '{"type": "contact", "currency": "USD"}', 6)
ON CONFLICT DO NOTHING;

-- Default Contact Information
INSERT INTO contact_info (phone, email, address, hours, social_links) VALUES
('+1 (555) 123-4567', 'info@kinetictrainer.com', '123 Fitness Street, Health City, HC 12345', 
 'Mon-Fri: 6AM - 10PM, Sat-Sun: 8AM - 8PM',
 '{"instagram": "https://instagram.com/kinetictrainer", "facebook": "https://facebook.com/kinetictrainer", "twitter": "https://twitter.com/kinetictrainer", "youtube": "https://youtube.com/kinetictrainer"}')
ON CONFLICT DO NOTHING;

-- Default Trainer Information
INSERT INTO trainer_info (name, title, bio, experience_years, certifications, specializations, awards) VALUES
('Prahallad Sahoo', 'Certified Personal Trainer',
 'Passionate about helping clients achieve their fitness goals through personalized training programs.',
 16,
 '[{"name": "ACE Certified Personal Trainer", "year": "2019", "organization": "American Council on Exercise"}, {"name": "NASM Corrective Exercise Specialist", "year": "2020", "organization": "National Academy of Sports Medicine"}, {"name": "Precision Nutrition Level 1 Coach", "year": "2021", "organization": "Precision Nutrition"}, {"name": "FMS Functional Movement Screen", "year": "2022", "organization": "Functional Movement Systems"}, {"name": "ACSM Exercise Physiologist", "year": "2023", "organization": "American College of Sports Medicine"}, {"name": "TRX Suspension Training Certification", "year": "2024", "organization": "TRX Training"}]',
 ARRAY['Strength Training', 'Weight Loss', 'Functional Fitness'],
 '["2024 Elite Trainer of the Year", "Outstanding Client Transformation Award 2023", "Fitness Excellence Recognition 2022", "Best Personal Trainer - Regional 2021", "Community Health Impact Award 2020", "Top Fitness Professional 2019"]')
ON CONFLICT DO NOTHING;