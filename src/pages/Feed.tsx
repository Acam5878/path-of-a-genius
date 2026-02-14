import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { lessonQuizzes, QuizQuestion } from '@/data/quizzes';
import { lessonExercises, Exercise } from '@/data/exercises';
import { Brain, Lightbulb, CheckCircle, XCircle, ArrowRight, RotateCcw, Zap, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';

// Union type for feed items
type FeedItem = 
  | { type: 'quiz'; data: QuizQuestion; lessonId: string }
  | { type: 'fill_blank'; data: Exercise; lessonId: string }
  | { type: 'flashcard'; data: { front: string; back: string; id: string } }
  | { type: 'fact'; data: { text: string; category: string } };

// Quick facts to sprinkle in
const quickFacts: { text: string; category: string }[] = [
  { text: "J.S. Mill could read Greek at age 3 — he began with Aesop's Fables.", category: 'History' },
  { text: "Einstein's E=mc² means 1 kg of matter holds the energy of 21 megatons of TNT.", category: 'Physics' },
  { text: "Pascal invented the first mechanical calculator at age 19.", category: 'Mathematics' },
  { text: "Da Vinci wrote over 7,000 pages of notes — all in mirror script.", category: 'Art' },
  { text: "Tesla could visualize entire machines in his mind before building them.", category: 'Engineering' },
  { text: "Newton invented calculus during a plague lockdown in 1665.", category: 'Mathematics' },
  { text: "Marie Curie is the only person to win Nobel Prizes in two different sciences.", category: 'Science' },
  { text: "Aristotle tutored Alexander the Great when Alexander was just 13.", category: 'Philosophy' },
  { text: "Leibniz independently invented calculus around the same time as Newton.", category: 'Mathematics' },
  { text: "Goethe's Faust took him over 60 years to complete.", category: 'Literature' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Individual card components
const QuizCard = ({ item, onNext }: { item: FeedItem & { type: 'quiz' }; onNext: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const q = item.data;
  const isCorrect = selected === q.correctAnswer;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Quick Quiz</span>
      </div>
      <h2 className="text-xl font-bold text-foreground text-center mb-8 leading-relaxed max-w-md">{q.question}</h2>
      <div className="w-full max-w-sm space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selected === null && setSelected(i)}
            disabled={selected !== null}
            className={cn(
              "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium",
              selected === null && "border-border bg-card hover:border-secondary hover:bg-secondary/5",
              selected !== null && i === q.correctAnswer && "border-green-500 bg-green-500/10 text-green-700",
              selected !== null && i === selected && i !== q.correctAnswer && "border-red-400 bg-red-400/10 text-red-600",
              selected !== null && i !== q.correctAnswer && i !== selected && "border-border/50 opacity-50",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full max-w-sm"
        >
          <div className={cn(
            "flex items-start gap-2 px-4 py-3 rounded-xl text-sm",
            isCorrect ? "bg-green-500/10 text-green-700" : "bg-red-400/10 text-red-600"
          )}>
            {isCorrect ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            <span>{q.explanation}</span>
          </div>
          <Button onClick={onNext} className="w-full mt-4" variant="secondary">
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const FillBlankCard = ({ item, onNext }: { item: FeedItem & { type: 'fill_blank' }; onNext: () => void }) => {
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = item.data;
  const isCorrect = answer.trim().toLowerCase() === ex.answer.toLowerCase();

  const handleSubmit = () => {
    setRevealed(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Fill in the Blank</span>
      </div>
      <p className="text-sm text-muted-foreground text-center mb-3">{ex.instruction}</p>
      <h2 className="text-lg font-bold text-foreground text-center mb-8 leading-relaxed max-w-md">{ex.content}</h2>
      {!revealed ? (
        <div className="w-full max-w-sm space-y-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && answer.trim() && handleSubmit()}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
          />
          {ex.hint && (
            <p className="text-xs text-muted-foreground text-center italic">Hint: {ex.hint}</p>
          )}
          <Button onClick={handleSubmit} disabled={!answer.trim()} className="w-full" variant="secondary">
            Check Answer
          </Button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-3">
          <div className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium",
            isCorrect ? "bg-green-500/10 text-green-700" : "bg-red-400/10 text-red-600"
          )}>
            {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{isCorrect ? 'Correct!' : `Answer: ${ex.answer}`}</span>
          </div>
          <Button onClick={onNext} className="w-full" variant="secondary">
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const FlashcardCard = ({ item, onNext }: { item: FeedItem & { type: 'flashcard' }; onNext: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  const { recordReview } = useSpacedRepetition();

  const handleRate = (quality: number) => {
    recordReview(item.data.id, quality);
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      <div className="flex items-center gap-2 mb-6">
        <RotateCcw className="w-5 h-5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Flashcard Review</span>
      </div>
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full max-w-sm aspect-[3/2] rounded-2xl border-2 border-border bg-card shadow-lg flex items-center justify-center p-6 transition-all hover:shadow-xl active:scale-[0.98]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={flipped ? 'back' : 'front'}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            {!flipped ? (
              <>
                <p className="text-xl font-bold text-foreground">{item.data.front}</p>
                <p className="text-xs text-muted-foreground mt-3">Tap to reveal</p>
              </>
            ) : (
              <p className="text-lg font-medium text-secondary">{item.data.back}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </button>
      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mt-6"
        >
          <Button size="sm" variant="outline" onClick={() => handleRate(1)} className="text-red-500 border-red-200">
            Hard
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleRate(3)}>
            Good
          </Button>
          <Button size="sm" variant="secondary" onClick={() => handleRate(5)}>
            Easy
          </Button>
        </motion.div>
      )}
      {!flipped && (
        <Button onClick={onNext} variant="ghost" className="mt-6 text-muted-foreground">
          Skip <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

const FactCard = ({ item, onNext }: { item: FeedItem & { type: 'fact' }; onNext: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <div className="flex items-center gap-2 mb-6">
      <Zap className="w-5 h-5 text-amber-500" />
      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">{item.data.category}</span>
    </div>
    <div className="w-full max-w-sm bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 rounded-2xl p-8">
      <p className="text-lg font-semibold text-foreground text-center leading-relaxed">
        {item.data.text}
      </p>
    </div>
    <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
      <ChevronUp className="w-3 h-3" /> Swipe up for next
    </p>
  </div>
);

const Feed = () => {
  const { dueCards } = useSpacedRepetition();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build the feed items from all sources
  const feedItems: FeedItem[] = useMemo(() => {
    const items: FeedItem[] = [];

    // Add quiz questions (random sample)
    const allQuizzes = lessonQuizzes.flatMap(lq =>
      lq.questions.map(q => ({ type: 'quiz' as const, data: q, lessonId: lq.lessonId }))
    );
    items.push(...shuffleArray(allQuizzes).slice(0, 15));

    // Add fill-blank exercises
    const allExercises = lessonExercises.flatMap(le =>
      le.exercises
        .filter(e => e.type === 'fill-blank' || e.type === 'short-answer')
        .map(e => ({ type: 'fill_blank' as const, data: e, lessonId: le.lessonId }))
    );
    items.push(...shuffleArray(allExercises).slice(0, 10));

    // Add SRS flashcards
    for (const card of dueCards.slice(0, 5)) {
      items.push({ type: 'flashcard', data: { front: card.front, back: card.back, id: card.id } });
    }

    // Add facts
    for (const fact of quickFacts) {
      items.push({ type: 'fact', data: fact });
    }

    return shuffleArray(items);
  }, [dueCards]);

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
  }, [feedItems.length]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -50) {
      goNext();
    } else if (info.offset.y > 50 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentItem = feedItems[currentIndex];
  if (!currentItem) return null;

  return (
    <AppLayout>
      <div className="relative h-[calc(100vh-8rem)] overflow-hidden" ref={containerRef}>
        {/* Progress indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
            {currentIndex + 1} / {feedItems.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            className="h-full cursor-grab active:cursor-grabbing"
          >
            {currentItem.type === 'quiz' && <QuizCard item={currentItem as any} onNext={goNext} />}
            {currentItem.type === 'fill_blank' && <FillBlankCard item={currentItem as any} onNext={goNext} />}
            {currentItem.type === 'flashcard' && <FlashcardCard item={currentItem as any} onNext={goNext} />}
            {currentItem.type === 'fact' && <FactCard item={currentItem as any} onNext={goNext} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default Feed;
