import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface TutorMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LessonContext {
  geniusId: string;
  geniusName: string;
  subjectId: string;
  subjectName: string;
  lessonId?: string;
  lessonTitle?: string;
  lessonContent?: string;
  userNotes?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log('Authenticated user:', userId);

    const { messages, context } = await req.json() as {
      messages: TutorMessage[];
      context: LessonContext | null;
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    // Build system prompt based on context
    let systemPrompt = `You are an expert tutor helping students learn like the greatest minds in history. 
Your teaching style combines:
- Socratic questioning to develop critical thinking
- Clear explanations with historical context
- Practical examples and exercises
- Encouragement and motivation

Guidelines:
- Keep responses concise but informative (2-4 paragraphs max)
- Use markdown formatting for clarity
- Include relevant historical anecdotes when helpful
- Ask follow-up questions to deepen understanding
- Celebrate progress and encourage curiosity
- NEVER use LaTeX notation (like $\\sigma$ or $\\varsigma$). Instead, use the actual Unicode Greek characters directly (σ, ς, α, β, γ, etc.)
- ALWAYS complete your thoughts fully. Never stop mid-sentence.
- Double-check all spelling, grammar, and syntax before responding.
- Proofread your answer for accuracy and completeness.`;

    if (context) {
      systemPrompt += `\n\nCURRENT CONTEXT:
The student is studying "${context.subjectName}" from ${context.geniusName}'s curriculum.`;
      
      if (context.lessonTitle) {
        systemPrompt += `\nCurrent lesson: "${context.lessonTitle}"`;
      }
      
      if (context.lessonContent) {
        systemPrompt += `\n\nLesson content summary:\n${context.lessonContent.slice(0, 1000)}...`;
      }

      if (context.userNotes && context.userNotes.trim()) {
        systemPrompt += `\n\nSTUDENT'S NOTES FOR THIS LESSON:
The student has taken the following notes. Use these to personalize your responses and build on their understanding:
---
${context.userNotes.slice(0, 1500)}
---`;
      }

      systemPrompt += `\n\nTailor your responses to this specific lesson and genius's teaching approach. If the student has notes, reference and build upon their existing understanding.`;
    }

    console.log('Sending request to Lovable AI Gateway');
    console.log('Context:', context ? `${context.geniusName} - ${context.subjectName}` : 'No context');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI service error: ${response.status}`);
    }

    console.log('Streaming response from AI Gateway');

    // Stream the response back
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('AI Tutor error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
