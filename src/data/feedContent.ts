// Feed content data - fetched from database with local fallbacks

import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';
import { QuizQuestion } from '@/data/quizzes';
import { supabase } from '@/integrations/supabase/client';

// ── Types ────────────────────────────────────────────────────────────────

export type FeedItem =
  | { type: 'quote'; data: { text: string; author: string; field: string } }
  | { type: 'insight'; data: { title: string; body: string; category: string; icon: string } }
  | { type: 'story'; data: { headline: string; body: string; genius: string } }
  | { type: 'connection'; data: { term: string; origin: string; meaning: string; modern: string } }
  | { type: 'whyStudy'; data: { subject: string; text: string; icon: string } }
  | { type: 'excerpt'; data: { text: string; workTitle: string; author: string; year: string | number; url: string } }
  | { type: 'quiz'; data: QuizQuestion & { clue?: string } };

// ── Genius quotes (derived from geniuses data, always local) ────────────

const geniusQuotes: FeedItem[] = geniuses.map(g => ({
  type: 'quote' as const,
  data: { text: g.famousQuote, author: g.name, field: g.field },
}));

// ── Why Study items (derived from path modules, always local) ───────────

export const whyStudyItems: FeedItem[] = pathModules.slice(0, 8).map(m => ({
  type: 'whyStudy' as const,
  data: { subject: m.name, text: m.whyStudy || m.introText || '', icon: m.icon },
}));

// ── Fetch content from database ─────────────────────────────────────────

export async function fetchFeedContent(): Promise<{
  allQuotes: FeedItem[];
  insights: FeedItem[];
  stories: FeedItem[];
  connections: FeedItem[];
  excerpts: FeedItem[];
  feedQuizQuestions: FeedItem[];
}> {
  try {
    const { data, error } = await supabase
      .from('feed_content')
      .select('type, data')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Failed to fetch feed content from DB, using empty arrays:', error);
      return {
        allQuotes: [...geniusQuotes],
        insights: [],
        stories: [],
        connections: [],
        excerpts: [],
        feedQuizQuestions: [],
      };
    }

    const items = data as { type: string; data: any }[];
    
    const dbQuotes: FeedItem[] = items
      .filter(i => i.type === 'quote')
      .map(i => ({ type: 'quote' as const, data: i.data }));

    const insights: FeedItem[] = items
      .filter(i => i.type === 'insight')
      .map(i => ({ type: 'insight' as const, data: i.data }));

    const stories: FeedItem[] = items
      .filter(i => i.type === 'story')
      .map(i => ({ type: 'story' as const, data: i.data }));

    const connections: FeedItem[] = items
      .filter(i => i.type === 'connection')
      .map(i => ({ type: 'connection' as const, data: i.data }));

    const excerpts: FeedItem[] = items
      .filter(i => i.type === 'excerpt')
      .map(i => ({ type: 'excerpt' as const, data: i.data }));

    const feedQuizQuestions: FeedItem[] = items
      .filter(i => i.type === 'quiz')
      .map(i => ({ type: 'quiz' as const, data: i.data }));

    return {
      allQuotes: [...geniusQuotes, ...dbQuotes],
      insights,
      stories,
      connections,
      excerpts,
      feedQuizQuestions,
    };
  } catch (err) {
    console.error('Error fetching feed content:', err);
    return {
      allQuotes: [...geniusQuotes],
      insights: [],
      stories: [],
      connections: [],
      excerpts: [],
      feedQuizQuestions: [],
    };
  }
}

// ── Quiz clues ──────────────────────────────────────────────────────────

export const quizClues: Record<string, string> = {
  'mill-greek': '"By age 3, Mill was reading Aesop\'s Fables in the original Greek..." — from his Autobiography',
  'mill-latin': '"I learnt Latin... at the same time with a considerable number of Greek authors." — Mill, Autobiography',
  'mill-logic': '"The purpose of logic is to show us the way to truth." — Mill on Aristotle\'s system',
  'euclid': '"A point is that which has no part. A line is breadthless length." — Euclid, Elements, Book I',
  'newton': '"Every body continues in its state of rest unless compelled to change..." — Newton, Principia',
  'einstein': '"The most incomprehensible thing about the world is that it is comprehensible." — Einstein',
  'tesla': '"I do not think there is any thrill like that felt by the inventor..." — Tesla, My Inventions',
  'curie': '"Nothing in life is to be feared, it is only to be understood." — Marie Curie',
  'davinci': '"Study painting and you study anatomy, optics, geometry, and history." — Da Vinci, Notebooks',
  'pascal': '"Man is but a reed, the most feeble thing in nature; but he is a thinking reed." — Pascal, Pensées',
  'leibniz': '"Music is the pleasure the human mind experiences from counting without being aware." — Leibniz',
  'aristotle': '"The unexamined life is not worth living." — derived from Aristotle',
  'goethe': '"Whatever you can do, or dream you can, begin it." — attributed to Goethe',
};

export function getClueForQuiz(lessonId: string): string | undefined {
  for (const [key, clue] of Object.entries(quizClues)) {
    if (lessonId.toLowerCase().includes(key)) return clue;
  }
  return undefined;
}

// Background gradients per card type
export const cardGradients: Record<string, string> = {
  quote: 'from-[hsl(217,30%,12%)] to-[hsl(217,30%,20%)]',
  insight: 'from-[hsl(40,33%,90%)] to-[hsl(40,25%,85%)]',
  story: 'from-[hsl(345,30%,15%)] to-[hsl(345,20%,22%)]',
  connection: 'from-[hsl(43,40%,18%)] to-[hsl(43,30%,12%)]',
  whyStudy: 'from-[hsl(152,30%,14%)] to-[hsl(152,20%,20%)]',
  excerpt: 'from-[hsl(259,25%,14%)] to-[hsl(259,20%,22%)]',
  quiz: 'from-[hsl(40,33%,92%)] to-[hsl(40,25%,88%)]',
};

export const darkTypes = new Set(['quote', 'story', 'connection', 'whyStudy', 'excerpt']);
