import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RotateCcw, Check, X, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewCard, useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { cn } from '@/lib/utils';

interface ReviewDueCardProps {
  dueCards: ReviewCard[];
  totalCards: number;
  onReview: (cardId: string, quality: number) => void;
}

// Flashcard review component
const FlashcardReview = ({ card, onResult }: { card: ReviewCard; onResult: (quality: number) => void }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[120px] bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 rounded-xl p-4 text-left transition-all hover:border-secondary/40 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-muted-foreground mb-2">What does this mean?</p>
              <p className="font-heading text-lg font-semibold text-foreground break-words">{card.front}</p>
              {card.extra_data?.pronunciation && (
                <p className="text-sm text-muted-foreground mt-1 italic">{card.extra_data.pronunciation}</p>
              )}
              <p className="text-xs text-secondary mt-3">Tap to reveal →</p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-muted-foreground mb-2">Answer:</p>
              <p className="font-heading text-lg font-semibold text-foreground break-words">{card.back}</p>
              {card.extra_data?.derivatives && (
                <p className="text-xs text-muted-foreground mt-2">
                  Derivatives: <span className="text-foreground">{card.extra_data.derivatives}</span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => onResult(1)}
          >
            <X className="w-3 h-3 mr-1" />
            Again
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
            onClick={() => onResult(3)}
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Hard
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-success/30 text-success hover:bg-success/10"
            onClick={() => onResult(5)}
          >
            <Check className="w-3 h-3 mr-1" />
            Easy
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// Fill in the blank review
const FillBlankReview = ({ card, onResult }: { card: ReviewCard; onResult: (quality: number) => void }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  const checkAnswer = () => {
    setRevealed(true);
  };

  const isCorrect = revealed && userAnswer.toLowerCase().trim().includes(card.back.toLowerCase().trim().split(' ')[0]);

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl p-4 overflow-hidden">
        <p className="text-xs text-muted-foreground mb-2">Complete the sentence:</p>
        <p className="font-heading text-sm font-medium text-foreground break-words">{card.front}</p>
        
        {!revealed ? (
          <div className="mt-3 flex gap-2 min-w-0">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              onFocus={(e) => {
                // Scroll the input into view after iOS keyboard opens
                setTimeout(() => {
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
              }}
              placeholder="Type your answer..."
              className="flex-1 min-w-0 text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
            <Button size="sm" onClick={checkAnswer} className="bg-secondary text-secondary-foreground shrink-0">
              Check
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-2">
            <div className={cn(
              "text-sm p-2 rounded-lg break-words",
              isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {isCorrect ? '✓ Correct!' : `✗ The answer was: ${card.back}`}
            </div>
            {card.extra_data?.fullText && (
              <p className="text-xs text-muted-foreground italic break-words">{card.extra_data.fullText}</p>
            )}
            <Button
              size="sm"
              className="w-full bg-secondary text-secondary-foreground"
              onClick={() => onResult(isCorrect ? 4 : 1)}
            >
              Continue <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Matching review
const MatchingReview = ({ card, onResult }: { card: ReviewCard; onResult: (quality: number) => void }) => {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);

  let pairs: { term: string; match: string }[] = [];
  try {
    pairs = JSON.parse(card.back);
  } catch { return null; }

  const shuffledMatches = [...pairs].sort(() => Math.random() - 0.5);
  const allMatched = Object.keys(matches).length === pairs.length;

  if (allMatched && !revealed) {
    setRevealed(true);
  }

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200/50 dark:border-violet-800/30 rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-3">Match the terms to their origins:</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            {pairs.map((p, i) => (
              <button
                key={`t-${i}`}
                onClick={() => setSelectedTerm(i)}
                disabled={matches[i] !== undefined}
                className={cn(
                  "w-full text-left text-xs p-2 rounded-lg border transition-colors",
                  matches[i] !== undefined
                    ? "bg-success/10 border-success/30 text-success"
                    : selectedTerm === i
                    ? "bg-secondary/20 border-secondary"
                    : "bg-card border-border hover:border-secondary/50"
                )}
              >
                {p.term}
              </button>
            ))}
          </div>
          <div className="space-y-1.5">
            {shuffledMatches.map((p, i) => (
              <button
                key={`m-${i}`}
                onClick={() => {
                  if (selectedTerm === null) return;
                  const correctIdx = pairs.findIndex(pp => pp.match === p.match);
                  if (correctIdx === selectedTerm) {
                    setMatches(prev => ({ ...prev, [selectedTerm]: i }));
                  }
                  setSelectedTerm(null);
                }}
                disabled={Object.values(matches).includes(i)}
                className={cn(
                  "w-full text-left text-xs p-2 rounded-lg border transition-colors",
                  Object.values(matches).includes(i)
                    ? "bg-success/10 border-success/30 text-success"
                    : "bg-card border-border hover:border-secondary/50"
                )}
              >
                {p.match}
              </button>
            ))}
          </div>
        </div>
        
        {revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
            <Button
              size="sm"
              className="w-full bg-secondary text-secondary-foreground"
              onClick={() => onResult(4)}
            >
              Well done! Continue <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const ReviewDueCard = ({ dueCards, totalCards, onReview }: ReviewDueCardProps) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = dueCards[currentIndex];

  const handleResult = (quality: number) => {
    onReview(currentCard.id, quality);
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsReviewing(false);
      setCurrentIndex(0);
    }
  };

  if (!isReviewing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => dueCards.length > 0 ? setIsReviewing(true) : undefined}
          className="w-full bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)] border border-white/10 rounded-xl p-3 text-center hover:border-secondary/30 transition-colors flex flex-col items-center justify-center min-h-[120px]"
        >
          <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
            <Brain className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Review Due</p>
          <span className="font-heading text-2xl font-bold text-white">
            {dueCards.length}
          </span>
          <p className="text-[10px] text-white/40 mt-0.5">
            {totalCards} total cards
          </p>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 bg-card border border-border rounded-2xl p-4 space-y-3 overflow-hidden min-w-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="font-heading text-sm font-semibold text-foreground">
            Review ({currentIndex + 1}/{dueCards.length})
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => { setIsReviewing(false); setCurrentIndex(0); }}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-1.5">
        <motion.div
          className="h-full bg-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / dueCards.length) * 100}%` }}
        />
      </div>

      {currentCard?.card_type === 'flashcard' && (
        <FlashcardReview key={currentCard.id} card={currentCard} onResult={handleResult} />
      )}
      {currentCard?.card_type === 'fill_blank' && (
        <FillBlankReview key={currentCard.id} card={currentCard} onResult={handleResult} />
      )}
      {currentCard?.card_type === 'matching' && (
        <MatchingReview key={currentCard.id} card={currentCard} onResult={handleResult} />
      )}
    </motion.div>
  );
};
