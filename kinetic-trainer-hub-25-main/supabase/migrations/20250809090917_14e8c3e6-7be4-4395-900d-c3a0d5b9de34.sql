
-- Allow admin operations on appointments table
CREATE POLICY "Admin can view all appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Admin can update appointments" ON public.appointments FOR UPDATE USING (true);

-- Allow admin operations on services table  
CREATE POLICY "Admin can manage services" ON public.services FOR ALL USING (true);

-- Allow admin operations on gallery_items table
CREATE POLICY "Admin can manage gallery items" ON public.gallery_items FOR ALL USING (true);

-- Allow admin operations on trainer_info table
CREATE POLICY "Admin can manage trainer info" ON public.trainer_info FOR ALL USING (true);

-- Allow admin operations on contact_info table
CREATE POLICY "Admin can manage contact info" ON public.contact_info FOR ALL USING (true);

-- Allow admin operations on success_stories table
CREATE POLICY "Admin can manage success stories" ON public.success_stories FOR ALL USING (true);

-- Enable realtime for all tables so changes reflect instantly
ALTER TABLE public.appointments REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.gallery_items REPLICA IDENTITY FULL;
ALTER TABLE public.trainer_info REPLICA IDENTITY FULL;
ALTER TABLE public.contact_info REPLICA IDENTITY FULL;
ALTER TABLE public.success_stories REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trainer_info;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_info;
ALTER PUBLICATION supabase_realtime ADD TABLE public.success_stories;
