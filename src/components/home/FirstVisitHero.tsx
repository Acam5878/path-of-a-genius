import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingProgressBar } from '@/components/onboarding/OnboardingProgressBar';

const ARCHETYPE_KEY = 'genius-academy-archetype';
const HERO_SEEN_KEY = 'genius-academy-hero-seen';

const archetypes = [
  {
    emoji: '🔭',
    label: 'The Curious Explorer',
    description: 'You question everything and love discovering how the world works.',
    genius: 'Leonardo da Vinci',
  },
  {
    emoji: '🧠',
    label: 'The Deep Thinker',
    description: 'You see patterns others miss and love solving complex puzzles.',
    genius: 'Albert Einstein',
  },
  {
    emoji: '⚡',
    label: 'The Bold Creator',
    description: 'You imagine the future and build what others say is impossible.',
    genius: 'Nikola Tesla',
  },
  {
    emoji: '📚',
    label: 'The Knowledge Seeker',
    description: 'You devour books and believe learning is the greatest adventure.',
    genius: 'John Stuart Mill',
  },
];

const archetypeTestimonials = [
  {
    quote: "I went from casually curious to genuinely understanding how the world works. The education I never got in school.",
    name: 'Marcus T.',
    detail: 'Finished the Logic module in 3 weeks',
  },
  {
    quote: "My reasoning got sharper within days. I started catching logical fallacies in conversations I had never noticed before.",
    name: 'Priya K.',
    detail: 'Scored in 87th percentile on first IQ test',
  },
  {
    quote: "The spatial reasoning exercises in the Math module are unlike anything I have done. I can visualise problems I could not before.",
    name: 'James R.',
    detail: '3-week streak, working through Mathematics',
  },
  {
    quote: "I have read hundreds of books but never learned HOW to think. This gave me the foundation I was missing.",
    name: 'Sophie L.',
    detail: 'Read 8 primary source excerpts in her first month',
  },
];

const archetypeDemos = [
  {
    hook: 'Your first Da Vinci insight',
    question: 'Da Vinci filled 13,000 pages of notes — but never published a single book. Why?',
    options: [
      'He was secretive and feared plagiarism',
      'He believed observation never ends — there was always more to discover',
      'He was too busy with painting commissions',
      'He distrusted the printing press',
    ],
    correctIndex: 1,
    insight:
      'Da Vinci called it "saper vedere" — knowing how to see. He believed the world was infinitely detailed, and stopping to write a book meant stopping to look. This relentless curiosity is exactly what you\'ll train here.',
  },
  {
    hook: 'Your first Einstein insight',
    question: 'At 16, Einstein imagined riding alongside a beam of light. What did this reveal?',
    options: [
      'That light travels in waves',
      'That time slows down near the speed of light',
      'That the universe is expanding',
      'That mass and energy are unrelated',
    ],
    correctIndex: 1,
    insight:
      "Einstein's Gedankenexperiment — thought experiment — led directly to Special Relativity. By imagining impossible scenarios with rigorous logic, he rewrote physics. You'll train this same imaginative-yet-precise thinking in our Logic module.",
  },
  {
    hook: 'Your first Tesla insight',
    question: 'Tesla claimed he could visualise, test, and improve inventions entirely in his mind. What is this capacity?',
    options: [
      'Photographic memory',
      'Intuitive engineering',
      'Spatial reasoning and mental simulation',
      'Synesthetic thinking',
    ],
    correctIndex: 2,
    insight:
      'Spatial reasoning — the ability to mentally construct and manipulate complex systems — is trainable. Tesla practised it deliberately every day. Our Mathematics and Physics modules are built to develop exactly this.',
  },
  {
    hook: 'Your first J.S. Mill insight',
    question: "Mill's father taught him Ancient Greek at age 3 — not for the language, but for what reason?",
    options: [
      'To read Aristotle in the original',
      'To develop logical reasoning before bad habits could form',
      'To prepare him for Oxford',
      'To impress other intellectuals',
    ],
    correctIndex: 1,
    insight:
      "James Mill believed Greek's complex grammar would force John to think logically before he absorbed sloppy ideas. Mill became one of history's most precise thinkers. Your path starts the same way — structure that builds the mind from the ground up.",
  },
];

type Phase = 'hero' | 'result' | 'demo';

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [selectedArchetype, setSelectedArchetype] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('hero');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedArchetype(index);
    localStorage.setItem(ARCHETYPE_KEY, String(index));
    setPhase('result');
  };

  const handleGoToDemo = () => {
    setPhase('demo');
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    onComplete();
  };

  const demo = selectedArchetype !== null ? archetypeDemos[selectedArchetype] : null;
  const archetype = selectedArchetype !== null ? archetypes[selectedArchetype] : null;
  const testimonial = selectedArchetype !== null ? archetypeTestimonials[selectedArchetype] : null;

  // Map phases to progress bar steps: hero=0, result=0, demo=1 → complete fires on home
  const progressStep = phase === 'hero' ? 0 : phase === 'result' ? 0 : 1;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center overflow-y-auto bg-background"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
    >
      <div className="flex-shrink-0 w-full pt-11 sm:pt-12" />
      <OnboardingProgressBar currentStep={progressStep} />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center flex-1 justify-center py-8">
        <AnimatePresence mode="wait">

          {/* ── PHASE 1: Outcome headline + archetype quiz ── */}
          {phase === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/25 flex items-center justify-center mb-5"
              >
                <span className="text-2xl">🧬</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3"
              >
                Build a sharper mind in 10 minutes a day
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-muted-foreground text-sm mb-2"
              >
                The same curriculum that shaped Einstein, Da Vinci, and Newton — structured for modern life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-1.5 text-xs text-secondary font-medium mb-7"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>No long sessions. No overwhelm. Just 10 min/day.</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="w-full"
              >
                <p className="text-secondary font-mono text-xs uppercase tracking-widest mb-4">
                  First — which genius thinks like you?
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {archetypes.map((arch, i) => (
                    <motion.button
                      key={arch.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      onClick={() => handleSelect(i)}
                      className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-secondary/40 active:scale-95 transition-all text-center"
                    >
                      <span className="text-2xl">{arch.emoji}</span>
                      <span className="text-sm font-semibold text-foreground">{arch.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex items-center gap-2 mt-6 text-muted-foreground"
              >
                <Users className="w-4 h-4" />
                <span className="text-xs">1,000+ learners are already on the path</span>
              </motion.div>
            </motion.div>
          )}

          {/* ── PHASE 2: Archetype result + testimonial + commitment hook ── */}
          {phase === 'result' && archetype && testimonial && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="text-5xl mb-4"
              >
                {archetype.emoji}
              </motion.span>

              <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
                You're {archetype.label}
              </h2>
              <p className="text-muted-foreground text-sm mb-1">{archetype.description}</p>
              <p className="text-secondary text-sm font-medium mb-6">
                You think like <span className="font-bold">{archetype.genius}</span>
              </p>

              {/* Commitment framing */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-secondary/8 border border-secondary/20 rounded-xl p-4 mb-5 text-left"
              >
                <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">Your commitment</p>
                <p className="text-foreground font-semibold text-sm mb-1">Just 10 minutes a day.</p>
                <p className="text-muted-foreground text-xs">
                  No marathon sessions. No guilt if you miss a day. One lesson at a time — structured to build
                  on itself, just like the geniuses who came before you.
                </p>
              </motion.div>

              {/* Archetype-specific testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full bg-muted/40 rounded-xl p-4 mb-6 text-left"
              >
                <p className="text-foreground text-sm italic mb-2">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-[10px] text-muted-foreground">{testimonial.detail}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full space-y-3"
              >
                <Button
                  onClick={handleGoToDemo}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-6 rounded-xl font-semibold"
                >
                  Show me what I'll learn
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <button
                  onClick={handleStart}
                  className="w-full text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2"
                >
                  Skip — take me straight in
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── PHASE 3: 60-second value demo ── */}
          {phase === 'demo' && demo && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5 text-secondary font-mono text-xs uppercase tracking-widest mb-5"
              >
                <span>⚡</span>
                <span>{demo.hook}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-xl font-bold text-foreground mb-6 text-left w-full"
              >
                {demo.question}
              </motion.h2>

              <div className="w-full space-y-3 mb-6">
                {demo.options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === demo.correctIndex;
                  const showResult = answered;

                  let stateClass = 'border-border bg-card/50 hover:bg-card hover:border-secondary/30';
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
                      transition={{ delay: 0.3 + i * 0.07 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${stateClass}`}
                    >
                      {showResult && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                      {!showResult && (
                        <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                      )}
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
                        {selectedAnswer === demo.correctIndex ? '✓ That\'s right —' : 'The insight —'}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed">{demo.insight}</p>
                    </div>

                    <Button
                      onClick={handleStart}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-6 rounded-xl font-semibold"
                    >
                      Start My Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!answered && (
                <button
                  onClick={handleStart}
                  className="text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2"
                >
                  Skip — take me in
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const hasSeenHero = (): boolean => {
  return localStorage.getItem(HERO_SEEN_KEY) === 'true';
};

export const resetHeroState = () => {
  localStorage.removeItem(HERO_SEEN_KEY);
};
