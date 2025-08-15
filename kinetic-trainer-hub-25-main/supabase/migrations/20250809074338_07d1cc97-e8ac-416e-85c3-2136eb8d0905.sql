
-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public access to view files
CREATE POLICY IF NOT EXISTS "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

-- Create policy to allow authenticated users to upload files
CREATE POLICY IF NOT EXISTS "Authenticated users can upload media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update files
CREATE POLICY IF NOT EXISTS "Authenticated users can update media" ON storage.objects
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete files
CREATE POLICY IF NOT EXISTS "Authenticated users can delete media" ON storage.objects
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Add RLS policies to allow admin operations on all tables
CREATE POLICY IF NOT EXISTS "Authenticated users can manage gallery" ON gallery_items
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can manage services" ON services
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can manage trainer info" ON trainer_info
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authenticated users can manage success stories" ON success_stories
FOR ALL USING (auth.role() = 'authenticated');

-- Enable real-time updates for all tables
ALTER TABLE gallery_items REPLICA IDENTITY FULL;
ALTER TABLE services REPLICA IDENTITY FULL;
ALTER TABLE trainer_info REPLICA IDENTITY FULL;
ALTER TABLE success_stories REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE gallery_items;
ALTER PUBLICATION supabase_realtime ADD TABLE services;
ALTER PUBLICATION supabase_realtime ADD TABLE trainer_info;
ALTER PUBLICATION supabase_realtime ADD TABLE success_stories;
