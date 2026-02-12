-- Add title column to user_lesson_notes for general notes
ALTER TABLE public.user_lesson_notes 
  ADD COLUMN title text,
  ALTER COLUMN lesson_id DROP NOT NULL,
  ALTER COLUMN module_id DROP NOT NULL;

-- Set default values for existing rows
UPDATE public.user_lesson_notes SET title = '' WHERE title IS NULL;