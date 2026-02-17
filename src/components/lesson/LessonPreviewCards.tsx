import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { PathLesson } from '@/data/pathCurriculum';

const LANGUAGE_MODULES = ['ancient-greek', 'latin', 'languages'];

interface PreviewCard {
  front: string;
  subtitle?: string;
  back: string;
  label: string;
}

function getPreviewCards(lesson: PathLesson): PreviewCard[] {
  const isLanguage = LANGUAGE_MODULES.includes(lesson.moduleId);

  if (isLanguage && lesson.vocabularyTable && lesson.vocabularyTable.length > 0) {
    // Filter out single-letter entries, keep meaningful vocab
    const meaningful = lesson.vocabularyTable.filter(
      v => v.term.length > 3 && v.meaning.length > 2
    );
    const selected = meaningful.slice(0, 3);
    return selected.map(v => {
      // Build pronunciation line
      const pron = v.pronunciation || '';
      // Show etymology breakdown if derivatives exist
      const etym = v.derivatives ? `→ ${v.derivatives}` : '';
      
      return {
        front: v.greekRoot || v.latinRoot || v.term,
        subtitle: pron,
        back: `${v.meaning}${etym ? '\n' + etym : ''}`,
        label: 'Vocabulary',
      };
    });
  }

  // Non-language: etymology cards + key point facts
  const cards: PreviewCard[] = [];

  if (lesson.classicalConnections && lesson.classicalConnections.length > 0) {
    lesson.classicalConnections.slice(0, 2).forEach(cc => {
      cards.push({
        front: `"${cc.original}"`,
        subtitle: cc.language,
        back: `${cc.meaning}\n${cc.usage}`,
        label: 'Etymology',
      });
    });
  }

  const remaining = 3 - cards.length;
  lesson.keyPoints.slice(0, remaining).forEach(point => {
    cards.push({
      front: '💡',
      back: point,
      label: 'Did you know?',
    });
  });

  return cards.slice(0, 3);
}

interface LessonPreviewCardsProps {
  lesson: PathLesson;
}

export const LessonPreviewCards = ({ lesson }: LessonPreviewCardsProps) => {
  const cards = getPreviewCards(lesson);
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
        <p className="text-[10px] text-muted-foreground">Tap to flip</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleFlip(i)}
            className="relative min-h-[110px] rounded-xl border border-secondary/20 bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)] p-3 text-center cursor-pointer hover:border-secondary/40 transition-colors flex flex-col items-center justify-center"
          >
            {!flipped.has(i) ? (
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-1"
              >
                <span className="text-[8px] uppercase tracking-wider text-secondary/50">
                  {card.label}
                </span>
                <span className={`font-heading font-bold text-foreground ${isLanguage ? 'text-lg' : 'text-2xl'}`}>
                  {card.front}
                </span>
                {card.subtitle && (
                  <span className="text-[10px] text-muted-foreground italic">
                    {card.subtitle}
                  </span>
                )}
                <span className="text-[9px] text-muted-foreground/50 mt-1">tap</span>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-1"
              >
                <span className="text-[8px] uppercase tracking-wider text-secondary/50">
                  {card.label}
                </span>
                <span className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                  {card.back}
                </span>
                <RotateCcw className="w-3 h-3 text-muted-foreground/40 mt-1" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
