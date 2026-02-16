import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { PathLesson } from '@/data/pathCurriculum';

export interface ReviewCard {
  id: string;
  lesson_id: string;
  module_id: string;
  card_type: 'flashcard' | 'matching' | 'fill_blank';
  front: string;
  back: string;
  extra_data: any;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
}

// SM-2 algorithm for spaced repetition scheduling
function calculateNextReview(card: ReviewCard, quality: number) {
  // quality: 0-5 (0=complete fail, 3=correct with difficulty, 5=perfect)
  let { ease_factor, interval_days, repetitions } = card;

  if (quality < 3) {
    // Failed: reset
    repetitions = 0;
    interval_days = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval_days = 1;
    } else if (repetitions === 2) {
      interval_days = 3;
    } else {
      interval_days = Math.round(interval_days * ease_factor);
    }
  }

  // Update ease factor (minimum 1.3)
  ease_factor = Math.max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const next_review_at = new Date();
  next_review_at.setDate(next_review_at.getDate() + interval_days);

  return {
    ease_factor,
    interval_days,
    repetitions,
    next_review_at: next_review_at.toISOString(),
    last_reviewed_at: new Date().toISOString(),
  };
}

// Generate review cards from a lesson's vocabulary and key points
function generateCardsFromLesson(lesson: PathLesson): Omit<ReviewCard, 'id' | 'ease_factor' | 'interval_days' | 'repetitions' | 'next_review_at' | 'last_reviewed_at'>[] {
  const cards: Omit<ReviewCard, 'id' | 'ease_factor' | 'interval_days' | 'repetitions' | 'next_review_at' | 'last_reviewed_at'>[] = [];

  // Flashcards from vocabulary
  if (lesson.vocabularyTable) {
    for (const entry of lesson.vocabularyTable) {
      cards.push({
        lesson_id: lesson.id,
        module_id: lesson.moduleId,
        card_type: 'flashcard',
        front: entry.term,
        back: entry.meaning,
        extra_data: { pronunciation: entry.pronunciation, derivatives: entry.derivatives },
      });
    }
  }

  // Fill-in-the-blank from key points
  if (lesson.keyPoints && lesson.keyPoints.length >= 2) {
    for (const point of lesson.keyPoints) {
      // Find a key word to blank out (usually after a colon or the subject)
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

  // Matching cards from classical connections
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

export function useSpacedRepetition() {
  const { user } = useAuth();
  const [dueCards, setDueCards] = useState<ReviewCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCards, setTotalCards] = useState(0);

  // Fetch due review cards
  const fetchDueCards = useCallback(async () => {
    if (!user) {
      setDueCards([]);
      setIsLoading(false);
      return;
    }

    try {
      const now = new Date().toISOString();
      // Parallelize both queries
      const [dueResult, countResult] = await Promise.all([
        supabase
          .from('user_review_cards')
          .select('*')
          .eq('user_id', user.id)
          .lte('next_review_at', now)
          .order('next_review_at', { ascending: true })
          .limit(20),
        supabase
          .from('user_review_cards')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ]);

      if (dueResult.error) throw dueResult.error;
      setDueCards((dueResult.data || []) as unknown as ReviewCard[]);
      setTotalCards(countResult.count || 0);
    } catch (err) {
      console.error('Error fetching review cards:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDueCards();
  }, [fetchDueCards]);

  // Generate cards when a lesson is completed
  const generateCardsForLesson = useCallback(async (lessonId: string) => {
    if (!user) return;

    // Lazy-load the 6K-line curriculum only when actually generating cards
    const { pathLessons } = await import('@/data/pathCurriculum');
    const lesson = pathLessons.find(l => l.id === lessonId);
    if (!lesson) return;

    // Check if cards already exist for this lesson
    const { data: existing } = await supabase
      .from('user_review_cards')
      .select('id')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .limit(1);

    if (existing && existing.length > 0) return; // Already generated

    const newCards = generateCardsFromLesson(lesson);
    if (newCards.length === 0) return;

    const rows = newCards.map(card => ({
      ...card,
      user_id: user.id,
      extra_data: card.extra_data || null,
    }));

    const { error } = await supabase
      .from('user_review_cards')
      .insert(rows);

    if (error) {
      console.error('Error generating review cards:', error);
    } else {
      fetchDueCards();
    }
  }, [user, fetchDueCards]);

  // Record a review result
  const recordReview = useCallback(async (cardId: string, quality: number) => {
    if (!user) return;

    const card = dueCards.find(c => c.id === cardId);
    if (!card) return;

    const updates = calculateNextReview(card, quality);

    const { error } = await supabase
      .from('user_review_cards')
      .update(updates)
      .eq('id', cardId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating review card:', error);
    } else {
      setDueCards(prev => prev.filter(c => c.id !== cardId));
    }
  }, [user, dueCards]);

  return {
    dueCards,
    totalCards,
    isLoading,
    dueCount: dueCards.length,
    generateCardsForLesson,
    recordReview,
    refreshCards: fetchDueCards,
  };
}
