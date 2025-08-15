-- Add awards field to trainer_info table
ALTER TABLE trainer_info ADD COLUMN IF NOT EXISTS awards JSONB;

-- Update existing trainer data with demo awards
UPDATE trainer_info 
SET awards = '["2024 Elite Trainer of the Year", "Outstanding Client Transformation Award 2023", "Fitness Excellence Recognition 2022", "Best Personal Trainer - Regional 2021", "Community Health Impact Award 2020", "Top Fitness Professional 2019"]'
WHERE awards IS NULL OR awards = '[]'::jsonb;

