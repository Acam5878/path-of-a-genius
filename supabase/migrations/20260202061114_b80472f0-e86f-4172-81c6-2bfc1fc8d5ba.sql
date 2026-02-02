-- Create table for storing individual IQ test results
CREATE TABLE public.iq_test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  test_id TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage_score NUMERIC(5,2) NOT NULL,
  estimated_iq INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  question_count INTEGER NOT NULL,
  strength_areas TEXT[] DEFAULT '{}',
  improvement_areas TEXT[] DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for aggregated user IQ profile
CREATE TABLE public.user_iq_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  overall_iq INTEGER NOT NULL DEFAULT 100,
  verbal_iq INTEGER,
  numerical_iq INTEGER,
  spatial_iq INTEGER,
  logical_iq INTEGER,
  memory_iq INTEGER,
  pattern_recognition_iq INTEGER,
  total_tests_taken INTEGER NOT NULL DEFAULT 0,
  average_score NUMERIC(5,2) DEFAULT 0,
  last_test_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.iq_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_iq_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for iq_test_results
CREATE POLICY "Users can view their own test results"
  ON public.iq_test_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results"
  ON public.iq_test_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_iq_profiles
CREATE POLICY "Users can view their own IQ profile"
  ON public.user_iq_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own IQ profile"
  ON public.user_iq_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own IQ profile"
  ON public.user_iq_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for faster queries
CREATE INDEX idx_iq_test_results_user_id ON public.iq_test_results(user_id);
CREATE INDEX idx_iq_test_results_category ON public.iq_test_results(category);
CREATE INDEX idx_iq_test_results_completed_at ON public.iq_test_results(completed_at);

-- Trigger to update updated_at on user_iq_profiles
CREATE TRIGGER update_user_iq_profiles_updated_at
  BEFORE UPDATE ON public.user_iq_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();