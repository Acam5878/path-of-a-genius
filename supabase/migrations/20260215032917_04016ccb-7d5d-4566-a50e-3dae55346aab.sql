
-- Create table for user feed topic preferences
CREATE TABLE public.user_feed_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  selected_topics TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_feed_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own feed preferences"
  ON public.user_feed_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feed preferences"
  ON public.user_feed_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feed preferences"
  ON public.user_feed_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_feed_preferences_updated_at
  BEFORE UPDATE ON public.user_feed_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
