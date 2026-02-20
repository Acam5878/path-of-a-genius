import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HERO_SEEN_KEY = 'genius-academy-hero-seen';

export const hasSeenHero = () => {
  return localStorage.getItem(HERO_SEEN_KEY) === 'true';
};

// A single, powerful insight demo — no quiz, no categorisation
const demo = {
  question: 'Einstein failed his university entrance exam. So how did he develop the theory that changed physics forever?',
  options: [
    'He memorised every physics textbook available',
    'He used thought experiments — imagining impossible scenarios with rigorous logic',
    'He had a mentor who guided him step by step',
    'He focused only on mathematics and ignored physics entirely',
  ],
  correctIndex: 1,
  insight:
    "At 16, Einstein imagined chasing a beam of light. That single thought experiment — held in his mind for 10 years — became Special Relativity. This is exactly the kind of thinking you'll build here.",
};

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [phase, setPhase] = useState<'demo' | 'cta'>('demo');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    // Auto-advance to CTA after a brief pause to let them read the insight
    setTimeout(() => setPhase('cta'), 2800);
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    onComplete();
  };

  const handleSignUp = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    navigate('/auth');
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

          {/* ── PHASE 1: Instant demo question — no hook screen ── */}
          {phase === 'demo' && (
            <motion.div
              key="demo"
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
                  <span className="text-[10px] text-secondary font-medium">1,247 learners active this week</span>
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
          )}

          {/* ── PHASE 2: Save Progress CTA ── */}
          {phase === 'cta' && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
                className="text-5xl mb-4"
              >
                🎯
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-2xl font-bold text-foreground mb-2"
              >
                You just thought like Einstein.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs"
              >
                That instinct for reasoning? It's trainable. This app is how you develop it — 10 minutes a day.
              </motion.p>

              {/* Stacked face avatars + live count */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="flex items-center gap-2.5 mb-5"
              >
                <div className="flex -space-x-2">
                  {['🧑‍💻','👩‍🎓','👨‍🔬','👩‍💼','🧑‍🏫'].map((emoji, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">1,247 people this week</p>
                  <p className="text-[10px] text-muted-foreground">joined the path</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="w-full space-y-2 mb-5"
              >
                {[
                  { icon: '📈', text: 'IQ score tracked across 6 cognitive domains' },
                  { icon: '🔥', text: 'Daily streak — builds your learning habit' },
                  { icon: '📚', text: '200+ lessons · The exact path Einstein walked' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3 text-left">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="w-full space-y-3"
              >
                <Button
                  onClick={handleSignUp}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-6 rounded-2xl font-bold shadow-lg shadow-secondary/20"
                >
                  Save My Progress — Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs">
                  <Shield className="w-3 h-3" />
                  <span>No credit card. No obligation. Cancel anytime.</span>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2"
                >
                  Explore first, save later →
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
