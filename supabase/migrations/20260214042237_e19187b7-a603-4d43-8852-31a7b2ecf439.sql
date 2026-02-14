
-- Spaced Repetition System: review cards table
CREATE TABLE public.user_review_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  card_type TEXT NOT NULL DEFAULT 'flashcard', -- 'flashcard', 'matching', 'fill_blank'
  front TEXT NOT NULL, -- question/term
  back TEXT NOT NULL, -- answer/meaning
  extra_data JSONB, -- additional data for matching/fill_blank exercises
  ease_factor NUMERIC NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 1,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_review_cards ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own review cards"
ON public.user_review_cards FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own review cards"
ON public.user_review_cards FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own review cards"
ON public.user_review_cards FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own review cards"
ON public.user_review_cards FOR DELETE
USING (auth.uid() = user_id);

-- Index for efficient queries
CREATE INDEX idx_review_cards_user_next ON public.user_review_cards (user_id, next_review_at);
CREATE INDEX idx_review_cards_lesson ON public.user_review_cards (user_id, lesson_id);

-- Timestamp trigger
CREATE TRIGGER update_review_cards_updated_at
BEFORE UPDATE ON public.user_review_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
