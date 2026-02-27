
CREATE TABLE public.challenge_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  opponent_id TEXT NOT NULL,
  opponent_name TEXT NOT NULL,
  opponent_iq INTEGER NOT NULL,
  user_score INTEGER NOT NULL DEFAULT 0,
  bot_score INTEGER NOT NULL DEFAULT 0,
  user_correct INTEGER NOT NULL DEFAULT 0,
  user_total INTEGER NOT NULL DEFAULT 0,
  bot_correct INTEGER NOT NULL DEFAULT 0,
  bot_total INTEGER NOT NULL DEFAULT 0,
  max_combo INTEGER NOT NULL DEFAULT 0,
  won BOOLEAN NOT NULL DEFAULT false,
  category_breakdown JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.challenge_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own challenge results"
  ON public.challenge_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own challenge results"
  ON public.challenge_results FOR SELECT
  USING (auth.uid() = user_id);
