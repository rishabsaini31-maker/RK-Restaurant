INSERT INTO public.profiles (id, email, name, role) 
VALUES ('f7a18553-d86a-4190-a7a7-ae569e134d38', 'admin@example.com', 'Rishab Admin', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
