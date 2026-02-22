import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, Sparkles } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackHeroCompleted } from '@/lib/posthog';

// ── Mini confetti burst ─────────────────────────────────────────────────
const CelebrationConfetti = () => {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 280,
      y: -(Math.random() * 200 + 60),
      rotate: Math.random() * 720 - 360,
      scale: Math.random() * 0.6 + 0.4,
      color: ['hsl(43,62%,52%)', 'hsl(142,71%,45%)', 'hsl(217,91%,60%)', 'hsl(0,84%,60%)', 'hsl(280,65%,60%)'][i % 5],
      delay: Math.random() * 0.3,
      size: Math.random() * 6 + 4,
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: '50%',
            top: '45%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            scale: [0, p.scale, p.scale * 0.5],
            rotate: p.rotate,
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};


const HERO_SEEN_KEY = 'genius-academy-hero-seen';

export const hasSeenHero = () => {
  return localStorage.getItem(HERO_SEEN_KEY) === 'true';
};

// A single, powerful insight demo — no quiz, no categorisation
const demo = {
  question: 'What did Einstein say was more important than knowledge?',
  options: [
    'Hard work',
    'Imagination',
    'Mathematics',
    'Experience',
  ],
  correctIndex: 1,
  insight:
    "Einstein said: \"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.\" This app trains both — starting with the classical foundations every genius mastered.",
};

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const { formatted: learnerCount } = useLearnerCount(1200);


  const [showCelebration, setShowCelebration] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    
    // Show celebration if correct
    if (index === demo.correctIndex) {
      setShowCelebration(true);
    }
    
    // Auto-advance into the app after a brief pause to read the insight
    setTimeout(() => handleStart(), 3200);
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    trackHeroCompleted();
    onComplete();
  };


  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Subtle ambient gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center flex-1 justify-center py-10 min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center w-full"
          >
              {/* App badge + live learner count */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex flex-col items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-1.5 text-secondary text-[10px] font-mono uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-secondary" />
                  <span>Path of a Genius · 60-second lesson</span>
                  <Star className="w-3 h-3 fill-secondary" />
                </div>
                <div className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] text-secondary font-medium">{learnerCount} learners active this week</span>

                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="font-heading text-xl font-bold text-foreground mb-6 text-left w-full leading-snug"
              >
                {demo.question}
              </motion.h2>

              <div className="w-full space-y-3 mb-6">
                {demo.options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === demo.correctIndex;
                  const showResult = answered;

                  let stateClass = 'border-border bg-card/50 hover:bg-card hover:border-secondary/30 active:scale-[0.98]';
                  if (showResult) {
                    if (isCorrect) stateClass = 'border-emerald-600/50 bg-emerald-500/10';
                    else if (isSelected && !isCorrect) stateClass = 'border-destructive/50 bg-destructive/10 opacity-60';
                    else stateClass = 'border-border/40 opacity-40';
                  }

                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + i * 0.07 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${stateClass}`}
                    >
                      {showResult && isCorrect
                        ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        : (
                          <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground flex-shrink-0 font-mono">
                            {String.fromCharCode(65 + i)}
                          </span>
                        )
                      }
                      <span className="text-sm text-foreground">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                  >
                    {/* Celebration burst for correct answer */}
                    {showCelebration && (
                      <>
                        <CelebrationConfetti />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                          className="flex items-center justify-center gap-2 mb-4"
                        >
                          <Sparkles className="w-5 h-5 text-secondary" />
                          <span className="font-heading text-lg font-bold text-secondary">Brilliant!</span>
                          <Sparkles className="w-5 h-5 text-secondary" />
                        </motion.div>
                      </>
                    )}
                    
                    <div className="bg-secondary/8 border border-secondary/25 rounded-xl p-4 mb-5 text-left">
                      <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">
                        {selectedAnswer === demo.correctIndex ? '✓ Exactly right —' : 'The insight —'}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed">{demo.insight}</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Taking you to the full curriculum…</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!answered && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleStart}
                  className="mt-4 text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2"
                >
                  Skip — take me straight in
                </motion.button>
              )}
          </motion.div>
      </div>
    </div>
  );
};
