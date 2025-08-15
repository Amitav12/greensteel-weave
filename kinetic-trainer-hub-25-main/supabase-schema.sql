-- Supabase SQL Schema for Kinetic Trainer Hub
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Appointments table
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

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    inquiry_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved'))
);

-- Pricing table
CREATE TABLE IF NOT EXISTS pricing (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    service_id VARCHAR(100) UNIQUE NOT NULL,
    service_title VARCHAR(255) NOT NULL,
    pricing_type VARCHAR(20) NOT NULL CHECK (pricing_type IN ('single', 'range', 'tiered', 'contact')),
    price_value DECIMAL(10,2),
    min_value DECIMAL(10,2),
    max_value DECIMAL(10,2),
    tiers JSONB,
    currency VARCHAR(3) DEFAULT 'USD',
    period VARCHAR(50),
    is_visible BOOLEAN DEFAULT true,
    updated_by VARCHAR(255)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_service_type ON appointments(service_type);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_type ON contact_inquiries(inquiry_type);

CREATE INDEX IF NOT EXISTS idx_pricing_service_id ON pricing(service_id);
CREATE INDEX IF NOT EXISTS idx_pricing_visible ON pricing(is_visible);

-- Row Level Security (RLS) policies
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

-- Public read access for pricing (visible items only)
CREATE POLICY "Public can view visible pricing" ON pricing
    FOR SELECT USING (is_visible = true);

-- Allow public to insert appointments and contact inquiries
CREATE POLICY "Public can insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert contact inquiries" ON contact_inquiries
    FOR INSERT WITH CHECK (true);

-- Insert default pricing data
INSERT INTO pricing (service_id, service_title, pricing_type, tiers, currency, period, is_visible) VALUES
('strength-training', 'Strength Training', 'tiered', 
 '[{"name": "Single Session", "price": 75, "description": "One-time training session"}, 
   {"name": "Monthly Package", "price": 280, "description": "4 sessions per month"}]'::jsonb, 
 'USD', 'session', true),

('cardio-conditioning', 'Cardio Conditioning', 'tiered', 
 '[{"name": "Single Session", "price": 65, "description": "One-time cardio session"}, 
   {"name": "Monthly Package", "price": 240, "description": "4 sessions per month"}]'::jsonb, 
 'USD', 'session', true),

('functional-fitness', 'Functional Fitness', 'tiered', 
 '[{"name": "Single Session", "price": 70, "description": "One-time functional training"}, 
   {"name": "Monthly Package", "price": 260, "description": "4 sessions per month"}]'::jsonb, 
 'USD', 'session', true),

('goal-specific-training', 'Goal-Specific Training', 'single', 
 NULL, 'USD', 'session', true)
 -- Add price_value for single pricing
 ON CONFLICT (service_id) DO UPDATE SET 
 price_value = 85;

UPDATE pricing SET price_value = 85 WHERE service_id = 'goal-specific-training';

INSERT INTO pricing (service_id, service_title, pricing_type, price_value, currency, period, is_visible) VALUES
('group-sessions', 'Group Sessions', 'single', 35, 'USD', 'session', true),
('flexible-scheduling', 'Flexible Scheduling', 'contact', NULL, 'USD', NULL, true)
ON CONFLICT (service_id) DO NOTHING;