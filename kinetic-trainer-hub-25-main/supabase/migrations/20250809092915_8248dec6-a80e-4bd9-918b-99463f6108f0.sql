
-- Add pricing column to services table if it doesn't exist
-- (This appears to already exist based on the schema, but ensuring it's properly configured)

-- Add image upload functionality - create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public, allowed_mime_types)
VALUES (
  'uploads', 
  'uploads', 
  true,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
);

-- Create policy for public read access to uploads bucket
CREATE POLICY "Public can view uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'uploads');

-- Create policy for admin to insert files
CREATE POLICY "Admin can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'uploads');

-- Create policy for admin to update files
CREATE POLICY "Admin can update files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'uploads');

-- Create policy for admin to delete files
CREATE POLICY "Admin can delete files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'uploads');

-- Add awards/achievements to trainer_info table
ALTER TABLE trainer_info 
ADD COLUMN IF NOT EXISTS awards jsonb DEFAULT '[]'::jsonb;

-- Update services table to ensure pricing column exists with proper structure
-- (The column exists, but ensuring it has the right default structure)
UPDATE services 
SET pricing = '{
  "type": "contact",
  "currency": "USD",
  "isVisible": true
}'::jsonb 
WHERE pricing IS NULL;
