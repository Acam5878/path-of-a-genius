// Feed content data - fetched from database with local fallbacks

import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';
import { QuizQuestion } from '@/data/quizzes';
import { supabase } from '@/integrations/supabase/client';
import { verbalQuestionBank, logicalQuestionBank, patternQuestionBank, spatialQuestionBank } from '@/data/iqQuestionBank';

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

// ── IQ Training questions (converted from IQ bank to feed quiz format) ──

function iqToFeedQuiz(questions: typeof verbalQuestionBank, limit: number): FeedItem[] {
  return questions
    .filter(q => q.options && q.options.length >= 2)
    .slice(0, limit)
    .map(q => ({
      type: 'quiz' as const,
      data: {
        id: `iq-${q.id}`,
        question: q.question,
        options: q.options!,
        correctAnswer: q.options!.indexOf(String(q.correctAnswer)),
        explanation: q.explanation || 'Great cognitive exercise!',
      },
    }));
}

const iqFeedQuestions: FeedItem[] = [
  ...iqToFeedQuiz(verbalQuestionBank, 8),
  ...iqToFeedQuiz(logicalQuestionBank, 8),
  ...iqToFeedQuiz(patternQuestionBank, 5),
  ...iqToFeedQuiz(spatialQuestionBank, 4),
];

// ── Literature quotes (always local) ────────────────────────────────────

const literatureQuotes: FeedItem[] = [
  { type: 'quote' as const, data: { text: 'The only way to do great work is to love what you do.', author: 'Leonardo da Vinci', field: 'Art & Literature' } },
  { type: 'quote' as const, data: { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', field: 'Physics & Literature' } },
  { type: 'quote' as const, data: { text: 'The unexamined life is not worth living.', author: 'Socrates', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'I think, therefore I am.', author: 'René Descartes', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'To be, or not to be, that is the question.', author: 'William Shakespeare', field: 'Literature' } },
  { type: 'quote' as const, data: { text: 'The mind is not a vessel to be filled, but a fire to be kindled.', author: 'Plutarch', field: 'Literature & Philosophy' } },
  { type: 'quote' as const, data: { text: 'One cannot step twice in the same river.', author: 'Heraclitus', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein', field: 'Physics & Literature' } },
  { type: 'quote' as const, data: { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela', field: 'Literature & Education' } },
  { type: 'quote' as const, data: { text: 'A room without books is like a body without a soul.', author: 'Marcus Tullius Cicero', field: 'Literature' } },
  { type: 'quote' as const, data: { text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.', author: 'Aristotle', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Man is born free, and everywhere he is in chains.', author: 'Jean-Jacques Rousseau', field: 'Literature & Philosophy' } },
  { type: 'quote' as const, data: { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'The pen is mightier than the sword.', author: 'Edward Bulwer-Lytton', field: 'Literature' } },
];

// ── Literature quiz questions ───────────────────────────────────────────

const literatureFeedQuizzes: FeedItem[] = [
  { type: 'quiz' as const, data: { id: 'fq-lit-1', question: 'Who wrote "The Republic"?', options: ['Socrates', 'Plato', 'Aristotle', 'Homer'], correctAnswer: 1, explanation: 'Plato wrote The Republic, exploring justice, the ideal state, and the philosopher-king.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-2', question: 'Which ancient work begins with "Sing, O goddess, the anger of Achilles"?', options: ['The Odyssey', 'The Iliad', 'The Aeneid', 'Metamorphoses'], correctAnswer: 1, explanation: 'The Iliad by Homer begins with this famous invocation about the wrath of Achilles.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-3', question: '"Cogito, ergo sum" was written by which philosopher?', options: ['Spinoza', 'Leibniz', 'Descartes', 'Locke'], correctAnswer: 2, explanation: '"I think, therefore I am" is the foundational statement by René Descartes in his Meditations.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-4', question: 'Who wrote "Principia Mathematica" (1687)?', options: ['Leibniz', 'Newton', 'Galileo', 'Euler'], correctAnswer: 1, explanation: 'Isaac Newton\'s Principia laid the foundations of classical mechanics and universal gravitation.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-5', question: 'Which Shakespeare play features the line "All the world\'s a stage"?', options: ['Hamlet', 'Macbeth', 'As You Like It', 'The Tempest'], correctAnswer: 2, explanation: 'The famous monologue appears in As You Like It, spoken by the character Jaques.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-6', question: '"Pensées" is a collection of fragments by which thinker?', options: ['Montaigne', 'Pascal', 'Voltaire', 'Rousseau'], correctAnswer: 1, explanation: 'Blaise Pascal\'s Pensées is a defence of the Christian religion, left incomplete at his death.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-7', question: 'Who wrote "Faust", considered one of the greatest works of German literature?', options: ['Schiller', 'Goethe', 'Hegel', 'Kant'], correctAnswer: 1, explanation: 'Johann Wolfgang von Goethe wrote Faust over the course of almost 60 years.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-8', question: 'The term "Utopia" was coined by which writer?', options: ['Plato', 'Thomas More', 'Francis Bacon', 'Machiavelli'], correctAnswer: 1, explanation: 'Thomas More coined "Utopia" in his 1516 book describing an ideal island society.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-9', question: 'Who wrote "On Liberty" (1859)?', options: ['John Locke', 'John Stuart Mill', 'Thomas Hobbes', 'Adam Smith'], correctAnswer: 1, explanation: 'John Stuart Mill\'s On Liberty is a foundational text on individual freedom and the limits of authority.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-10', question: '"Eureka!" is attributed to which ancient thinker?', options: ['Pythagoras', 'Archimedes', 'Euclid', 'Thales'], correctAnswer: 1, explanation: 'Archimedes reportedly shouted "Eureka!" upon discovering the principle of buoyancy while bathing.' } },
];

// ── Fetch content from database ─────────────────────────────────────────

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      console.warn('Failed to fetch feed content from DB, using empty arrays:', error);
      return {
        allQuotes: shuffle([...geniusQuotes, ...literatureQuotes]),
        insights: [],
        stories: [],
        connections: [],
        excerpts: [],
        feedQuizQuestions: shuffle([...iqFeedQuestions, ...literatureFeedQuizzes]),
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
      allQuotes: shuffle([...geniusQuotes, ...literatureQuotes, ...dbQuotes]),
      insights: shuffle(insights),
      stories: shuffle(stories),
      connections: shuffle(connections),
      excerpts: shuffle(excerpts),
      feedQuizQuestions: shuffle([...iqFeedQuestions, ...literatureFeedQuizzes, ...feedQuizQuestions]),
    };
  } catch (err) {
    console.error('Error fetching feed content:', err);
    return {
      allQuotes: shuffle([...geniusQuotes, ...literatureQuotes]),
      insights: [],
      stories: [],
      connections: [],
      excerpts: [],
      feedQuizQuestions: shuffle([...iqFeedQuestions, ...literatureFeedQuizzes]),
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
