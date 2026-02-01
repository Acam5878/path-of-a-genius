import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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
- Celebrate progress and encourage curiosity`;

    if (context) {
      systemPrompt += `\n\nCURRENT CONTEXT:
The student is studying "${context.subjectName}" from ${context.geniusName}'s curriculum.`;
      
      if (context.lessonTitle) {
        systemPrompt += `\nCurrent lesson: "${context.lessonTitle}"`;
      }
      
      if (context.lessonContent) {
        systemPrompt += `\n\nLesson content summary:\n${context.lessonContent.slice(0, 1000)}...`;
      }

      systemPrompt += `\n\nTailor your responses to this specific lesson and genius's teaching approach.`;
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
        max_tokens: 1000,
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
