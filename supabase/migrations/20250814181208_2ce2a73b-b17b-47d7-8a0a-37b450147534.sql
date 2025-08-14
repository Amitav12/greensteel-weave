-- Update RLS policies to use the security definer function
DROP POLICY IF EXISTS "Only admins can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Only admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

-- Create updated policies using the security definer function
CREATE POLICY "Only admins can view inquiries" 
ON public.inquiries 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update inquiries" 
ON public.inquiries 
FOR UPDATE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (public.is_admin());