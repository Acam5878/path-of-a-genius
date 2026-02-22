
-- Store device push tokens
CREATE TABLE public.device_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'ios', -- 'ios', 'android', 'web'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, token)
);

ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tokens" ON public.device_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tokens" ON public.device_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tokens" ON public.device_tokens FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tokens" ON public.device_tokens FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_device_tokens_updated_at BEFORE UPDATE ON public.device_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Store notification preferences per user
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  study_reminders BOOLEAN NOT NULL DEFAULT true,
  weekly_summary BOOLEAN NOT NULL DEFAULT true,
  achievement_alerts BOOLEAN NOT NULL DEFAULT true,
  reminder_time TEXT NOT NULL DEFAULT '09:00', -- HH:MM in user's local time
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prefs" ON public.notification_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own prefs" ON public.notification_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own prefs" ON public.notification_preferences FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
