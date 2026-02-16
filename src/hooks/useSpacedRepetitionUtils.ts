// Standalone utility for generating and saving spaced repetition cards
// Extracted from useSpacedRepetition to allow lazy-loading without React hooks

import { supabase } from '@/integrations/supabase/client';

interface VocabEntry {
  term: string;
  meaning: string;
  pronunciation?: string;
  greekRoot?: string;
  latinRoot?: string;
  derivatives?: string;
}

interface ClassicalConnection {
  term: string;
  language: string;
  original: string;
  meaning: string;
}

interface PathLessonLike {
  id: string;
  moduleId: string;
  vocabularyTable?: VocabEntry[];
  keyPoints?: string[];
  classicalConnections?: ClassicalConnection[];
}

function generateCardsFromLesson(lesson: PathLessonLike) {
  const cards: { lesson_id: string; module_id: string; card_type: string; front: string; back: string; extra_data: any }[] = [];

  if (lesson.vocabularyTable) {
    for (const entry of lesson.vocabularyTable) {
      cards.push({
        lesson_id: lesson.id,
        module_id: lesson.moduleId,
        card_type: 'flashcard',
        front: entry.term,
        back: entry.meaning,
        extra_data: { pronunciation: entry.pronunciation, greekRoot: entry.greekRoot, latinRoot: entry.latinRoot, derivatives: entry.derivatives },
      });
    }
  }

  if (lesson.keyPoints && lesson.keyPoints.length >= 2) {
    for (const point of lesson.keyPoints) {
      const colonIdx = point.indexOf(':');
      if (colonIdx > 0 && colonIdx < point.length - 5) {
        const front = point.substring(0, colonIdx + 2) + '___';
        const back = point.substring(colonIdx + 2).trim();
        cards.push({
          lesson_id: lesson.id,
          module_id: lesson.moduleId,
          card_type: 'fill_blank',
          front,
          back,
          extra_data: { fullText: point },
        });
      }
    }
  }

  if (lesson.classicalConnections && lesson.classicalConnections.length >= 3) {
    const connections = lesson.classicalConnections.slice(0, 6);
    cards.push({
      lesson_id: lesson.id,
      module_id: lesson.moduleId,
      card_type: 'matching',
      front: 'Match the terms to their classical roots',
      back: JSON.stringify(connections.map(c => ({ term: c.term, match: c.original + ' — ' + c.meaning }))),
      extra_data: { language: connections[0]?.language },
    });
  }

  return cards;
}

export async function generateAndSaveCards(userId: string, lessonId: string) {
  const { pathLessons } = await import('@/data/pathCurriculum');
  const lesson = pathLessons.find(l => l.id === lessonId);
  if (!lesson) return;

  // Check if cards already exist
  const { data: existing } = await supabase
    .from('user_review_cards')
    .select('id')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .limit(1);

  if (existing && existing.length > 0) return;

  const newCards = generateCardsFromLesson(lesson);
  if (newCards.length === 0) return;

  const rows = newCards.map(card => ({
    ...card,
    user_id: userId,
    extra_data: card.extra_data || null,
  }));

  const { error } = await supabase
    .from('user_review_cards')
    .insert(rows);

  if (error) {
    console.error('Error generating review cards:', error);
  }
}
