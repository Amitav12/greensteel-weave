-- Insert the logged-in user as an admin
INSERT INTO admin_users (user_id, email, is_active, created_at)
VALUES ('16aa7f79-35f8-4b1b-9065-06cf406a442b', 'amit4war@gmail.com', true, now())
ON CONFLICT (user_id) DO UPDATE SET
  email = EXCLUDED.email,
  is_active = true,
  updated_at = now();