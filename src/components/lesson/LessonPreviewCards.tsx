import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PathLesson } from '@/data/pathCurriculum';

const LANGUAGE_MODULES = ['ancient-greek', 'latin', 'languages'];

interface PreviewCard {
  front: string;
  back: string;
  label: string; // e.g. "Vocabulary", "Did you know?"
}

function getPreviewCards(lesson: PathLesson): PreviewCard[] {
  const isLanguage = LANGUAGE_MODULES.includes(lesson.moduleId);

  if (isLanguage && lesson.vocabularyTable && lesson.vocabularyTable.length > 0) {
    // Filter out single-letter / pronunciation-only entries
    const meaningful = lesson.vocabularyTable.filter(
      v => v.term.length > 3 && v.meaning.length > 2
    );
    const selected = meaningful.slice(0, 4);
    return selected.map(v => ({
      front: v.greekRoot || v.latinRoot || v.term,
      back: `${v.pronunciation ? v.pronunciation + ' · ' : ''}${v.meaning}${v.derivatives ? '\n→ ' + v.derivatives : ''}`,
      label: 'Vocabulary',
    }));
  }

  // For non-language lessons: use key points as facts
  const cards: PreviewCard[] = [];

  // Classical connections make great cards
  if (lesson.classicalConnections && lesson.classicalConnections.length > 0) {
    lesson.classicalConnections.slice(0, 2).forEach(cc => {
      cards.push({
        front: `"${cc.original}"`,
        back: `${cc.language}: ${cc.meaning}\n${cc.usage}`,
        label: 'Etymology',
      });
    });
  }

  // Fill remaining slots with key points
  const remaining = 4 - cards.length;
  lesson.keyPoints.slice(0, remaining).forEach(point => {
    cards.push({
      front: '💡',
      back: point,
      label: 'Did you know?',
    });
  });

  return cards.slice(0, 4);
}

interface LessonPreviewCardsProps {
  lesson: PathLesson;
}

export const LessonPreviewCards = ({ lesson }: LessonPreviewCardsProps) => {
  const cards = getPreviewCards(lesson);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  if (cards.length === 0) return null;

  const toggleFlip = (i: number) => {
    const next = new Set(flipped);
    if (next.has(i)) next.delete(i); else next.add(i);
    setFlipped(next);
  };

  const isLanguage = LANGUAGE_MODULES.includes(lesson.moduleId);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-secondary">
          {isLanguage ? 'Quick Preview' : 'Before you start'}
        </p>
        <p className="text-[10px] text-muted-foreground">
          Tap to flip · {activeIndex + 1}/{cards.length}
        </p>
      </div>

      <div className="relative">
        {/* Navigation arrows */}
        {cards.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i => Math.max(0, i - 1)); }}
              disabled={activeIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i => Math.min(cards.length - 1, i + 1)); }}
              disabled={activeIndex === cards.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.button
            key={`${activeIndex}-${flipped.has(activeIndex) ? 'back' : 'front'}`}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.2 }}
            onClick={() => toggleFlip(activeIndex)}
            className="w-full min-h-[90px] rounded-xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 text-center cursor-pointer hover:border-secondary/50 transition-colors"
          >
            {!flipped.has(activeIndex) ? (
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[9px] uppercase tracking-wider text-secondary/60">
                  {cards[activeIndex].label}
                </span>
                <span className={`font-heading font-bold text-foreground ${isLanguage ? 'text-2xl' : 'text-base'}`}>
                  {cards[activeIndex].front}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">tap to reveal</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[9px] uppercase tracking-wider text-secondary/60">
                  {cards[activeIndex].label}
                </span>
                <span className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {cards[activeIndex].back}
                </span>
                <RotateCcw className="w-3 h-3 text-muted-foreground mt-1" />
              </div>
            )}
          </motion.button>
        </AnimatePresence>

        {/* Dots */}
        {cards.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-4 bg-secondary' : 'w-1.5 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
