import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_SEEN_KEY = 'genius-academy-hero-seen';

export const hasSeenHero = () => {
  return localStorage.getItem(HERO_SEEN_KEY) === 'true';
};

// A single, powerful insight demo — no quiz, no categorisation
const demo = {
  hook: '⚡ 60 seconds to your first real insight',
  question: 'Einstein failed his university entrance exam. So how did he develop the theory that changed physics forever?',
  options: [
    'He memorised every physics textbook available',
    'He used thought experiments — imagining impossible scenarios with rigorous logic',
    'He had a mentor who guided him step by step',
    'He focused only on mathematics and ignored physics entirely',
  ],
  correctIndex: 1,
  insight:
    "At 16, Einstein imagined chasing a beam of light. That single thought experiment — held in his mind for 10 years — became Special Relativity. He called it 'Gedankenexperiment': disciplined imagination. This is exactly the kind of thinking you'll build here.",
};

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [phase, setPhase] = useState<'hook' | 'demo'>('hook');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
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
        <AnimatePresence mode="wait">

          {/* ── PHASE 1: Bold Hook ── */}
          {phase === 'hook' && (
            <motion.div
              key="hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              {/* App icon */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.05, stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-secondary/15 border border-secondary/25 flex items-center justify-center mb-6"
              >
                <span className="text-3xl">🧠</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5 text-secondary text-xs font-mono uppercase tracking-widest mb-3"
              >
                <Star className="w-3 h-3 fill-secondary" />
                <span>Path of a Genius</span>
                <Star className="w-3 h-3 fill-secondary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-4"
              >
                Think sharper.<br />
                <span className="text-secondary">Starting now.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="text-muted-foreground text-base leading-relaxed mb-2 max-w-sm"
              >
                The curriculum behind Einstein, Da Vinci, and Newton — rebuilt for 10 minutes a day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-1.5 text-xs text-secondary/80 font-medium mb-8"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>No long sessions. No overwhelm. Just one insight at a time.</span>
              </motion.div>

              {/* Single bold CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full space-y-3"
              >
                <Button
                  onClick={() => setPhase('demo')}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg py-7 rounded-2xl font-bold shadow-lg shadow-secondary/20"
                >
                  See how it works
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <button
                  onClick={handleStart}
                  className="w-full text-muted-foreground text-sm hover:text-foreground/60 transition-colors py-2"
                >
                  Skip — take me straight in
                </button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 mt-8 text-muted-foreground"
              >
                <Users className="w-4 h-4" />
                <span className="text-xs">1,000+ learners already on the path</span>
              </motion.div>
            </motion.div>
          )}

          {/* ── PHASE 2: Instant value demo ── */}
          {phase === 'demo' && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center w-full"
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-secondary font-mono text-xs uppercase tracking-widest mb-5"
              >
                {demo.hook}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
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
                    <div className="bg-secondary/8 border border-secondary/25 rounded-xl p-4 mb-5 text-left">
                      <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">
                        {selectedAnswer === demo.correctIndex ? '✓ Exactly right —' : 'The insight —'}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed">{demo.insight}</p>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mb-4">
                      This is lesson one. There are hundreds more.
                    </p>

                    <Button
                      onClick={handleStart}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-6 rounded-2xl font-bold shadow-lg shadow-secondary/20"
                    >
                      Start My Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
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
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
