-- Create storage bucket for classical music tracks
INSERT INTO storage.buckets (id, name, public)
VALUES ('classical-music', 'classical-music', true);

-- Allow public read access
CREATE POLICY "Classical music is publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'classical-music');

-- Allow authenticated users to upload (admin use)
CREATE POLICY "Authenticated users can upload classical music"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'classical-music' AND auth.role() = 'authenticated');