CREATE TABLE public.user_cognitive_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  selected_goals TEXT[] NOT NULL DEFAULT '{}'::text[],
  mapped_topics TEXT[] NOT NULL DEFAULT '{}'::text[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint on user_id
ALTER TABLE public.user_cognitive_goals ADD CONSTRAINT user_cognitive_goals_user_id_key UNIQUE (user_id);

-- Enable RLS
ALTER TABLE public.user_cognitive_goals ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own goals" ON public.user_cognitive_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own goals" ON public.user_cognitive_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON public.user_cognitive_goals FOR UPDATE USING (auth.uid() = user_id);

-- Auto-update timestamp
CREATE TRIGGER update_user_cognitive_goals_updated_at
  BEFORE UPDATE ON public.user_cognitive_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();