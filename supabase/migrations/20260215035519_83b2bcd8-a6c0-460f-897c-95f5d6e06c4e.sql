
-- Create feed_content table for dynamic feed management
CREATE TABLE public.feed_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feed_content ENABLE ROW LEVEL SECURITY;

-- Public read access (feed content is public, not user-specific)
CREATE POLICY "Feed content is publicly readable"
ON public.feed_content
FOR SELECT
USING (true);

-- No INSERT/UPDATE/DELETE policies = only service role can modify content

-- Index on type for filtering
CREATE INDEX idx_feed_content_type ON public.feed_content (type);
CREATE INDEX idx_feed_content_active ON public.feed_content (is_active) WHERE is_active = true;

-- Timestamp trigger
CREATE TRIGGER update_feed_content_updated_at
BEFORE UPDATE ON public.feed_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
