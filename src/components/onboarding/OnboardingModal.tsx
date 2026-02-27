import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, BookOpen, Target, Users, X, Star, Zap, GraduationCap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

// ── User types with tailored messaging ──────────────────────────────────
interface UserType {
  id: string;
  emoji: string;
  label: string;
  subtext: string;
  icon: typeof Brain;
  route: string;
  encouragement: {
    headline: string;
    message: string;
    cta: string;
    proof: string;
  };
  /** Projected results shown as an intermediate "proof" slide */
  projectedResults: {
    timeframe: string;
    metrics: { label: string; value: string; icon: string }[];
    testimonial: string;
  };
}

const userTypes: UserType[] = [
  {
    id: 'self-improver',
    emoji: '🧠',
    label: 'I want to get smarter',
    subtext: 'Sharpen my thinking & raise my IQ',
    icon: Brain,
    route: '/iq-tests?start=verbal',
    encouragement: {
      headline: "You can't improve what you don't measure.",
      message: "Take your first IQ test — it maps exactly which types of intelligence you're strongest in, and which have the most room to grow. Then we build a plan around it.",
      cta: 'Take My IQ Test',
      proof: 'Average improvement: 12 IQ points in 90 days',
    },
    projectedResults: {
      timeframe: 'After 1 week of Path of a Genius, learners see:',
      metrics: [
        { label: 'Working Memory', value: '+12%', icon: '🧠' },
        { label: 'Processing Speed', value: '+9%', icon: '⚡' },
        { label: 'Pattern Recognition', value: '+15%', icon: '🔍' },
      ],
      testimonial: 'After 90 days: average IQ score increase of 8–12 points',
    },
  },
  {
    id: 'curious-learner',
    emoji: '✨',
    label: 'I want to learn new things',
    subtext: 'Feed my curiosity with interesting ideas',
    icon: Sparkles,
    route: '/feed',
    encouragement: {
      headline: "Curiosity is the beginning of genius.",
      message: "Your personalised feed is full of bite-sized insights from history's greatest thinkers — philosophy, science, mathematics, art. Scroll through ideas that actually make you think.",
      cta: 'Start Exploring',
      proof: '2-minute lessons from Einstein, Da Vinci & more',
    },
    projectedResults: {
      timeframe: 'After 1 week of Path of a Genius, learners see:',
      metrics: [
        { label: 'New Concepts Learned', value: '35+', icon: '💡' },
        { label: 'Knowledge Retention', value: '3× better', icon: '📚' },
        { label: 'Daily Learning Habit', value: '89% stick', icon: '🔥' },
      ],
      testimonial: 'After 30 days: 40% broader knowledge base across 7 disciplines',
    },
  },
  {
    id: 'student',
    emoji: '📚',
    label: "I'm building real knowledge",
    subtext: 'Follow a structured learning path',
    icon: GraduationCap,
    route: '/the-path',
    encouragement: {
      headline: "The greatest minds all walked this path.",
      message: "Ancient Greek, Logic, Mathematics, Natural Philosophy — these are the foundations that Newton, Einstein and Da Vinci built their genius on. You're about to learn what they learned.",
      cta: 'Start The Path',
      proof: '40+ structured lessons across 7 disciplines',
    },
    projectedResults: {
      timeframe: 'After 1 week of Path of a Genius, learners see:',
      metrics: [
        { label: 'Lessons Completed', value: '7–10', icon: '📖' },
        { label: 'Logical Reasoning', value: '+18%', icon: '⚖️' },
        { label: 'Verbal Intelligence', value: '+14%', icon: '🏛️' },
      ],
      testimonial: 'After 90 days: mastery of foundations that took classical scholars years',
    },
  },
  {
    id: 'parent',
    emoji: '👨‍👩‍👧',
    label: "It's for my child",
    subtext: 'Age-appropriate learning & IQ tests',
    icon: Users,
    route: '/iq-tests',
    encouragement: {
      headline: "Give them the best possible start.",
      message: "Our children's IQ tests are designed by cognitive scientists for young learners. They measure reasoning, pattern recognition, and problem-solving — then recommend exactly where to focus.",
      cta: "See Children's Tests",
      proof: 'Safe, ad-free & designed for ages 6-14',
    },
    projectedResults: {
      timeframe: "After 1 week, parents report their children show:",
      metrics: [
        { label: 'Problem Solving', value: '+22%', icon: '🧩' },
        { label: 'Reading Comprehension', value: '+17%', icon: '📖' },
        { label: 'Curiosity & Engagement', value: '+35%', icon: '✨' },
      ],
      testimonial: 'After 60 days: measurable gains in reasoning that transfer to school',
    },
  },
];

// ── Storage key for user type (used by other components) ────────────────
const USER_TYPE_KEY = 'genius-academy-user-type';

export const getUserType = (): string | null => {
  return localStorage.getItem(USER_TYPE_KEY);
};

type Step = 'picker' | 'forecast' | 'encouragement';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [step, setStep] = useState<Step>('picker');
  const navigate = useNavigate();

  const handleTypeSelect = (type: UserType) => {
    localStorage.setItem(USER_TYPE_KEY, type.id);
    setSelectedType(type);
    setStep('forecast');
  };

  const handleGo = () => {
    if (!selectedType) return;
    const route = selectedType.route;
    onClose();
    setTimeout(() => navigate(route), 50);
  };

  const handleSkip = () => {
    onClose();
  };

  const handleBack = () => {
    if (step === 'encouragement') setStep('forecast');
    else if (step === 'forecast') { setStep('picker'); setSelectedType(null); }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-y-auto bg-card border-border max-h-[90dvh]">
        <button
          onClick={handleSkip}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <AnimatePresence mode="wait">
          {/* ── Step 1: "What brought you here?" ── */}
          {step === 'picker' && (
            <motion.div
              key="type-picker"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="p-6 pt-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4"
              >
                <Target className="w-7 h-7 text-secondary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-xl font-semibold text-foreground mb-1"
              >
                What brought you here?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground text-sm mb-6"
              >
                Tell us what you're looking for — we'll personalise your experience.
              </motion.p>

              <div className="flex flex-col gap-2.5">
                {userTypes.map((type, i) => (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    onClick={() => handleTypeSelect(type)}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl border border-border bg-muted/30 hover:bg-secondary/8 hover:border-secondary/30 transition-all text-left group"
                  >
                    <span className="text-2xl leading-none flex-shrink-0">{type.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{type.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{type.subtext}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-secondary transition-colors flex-shrink-0" />
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                onClick={handleSkip}
                className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-3 mt-2 transition-colors"
              >
                I'll explore on my own
              </motion.button>
            </motion.div>
          )}

          {/* ── Step 2: Projected Results — "Here's what you'll achieve" ── */}
          {step === 'forecast' && selectedType && (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="p-6 pt-10"
            >
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/15 mb-4"
                >
                  <TrendingUp className="w-7 h-7 text-secondary" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-heading text-xl font-bold text-foreground mb-2"
                >
                  Here's what to expect
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-muted-foreground text-xs mb-5 leading-relaxed"
                >
                  {selectedType.projectedResults.timeframe}
                </motion.p>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {selectedType.projectedResults.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                      className="bg-secondary/8 border border-secondary/20 rounded-xl p-3 text-center"
                    >
                      <span className="text-2xl block mb-1">{metric.icon}</span>
                      <p className="font-mono text-xl font-bold text-secondary leading-tight">{metric.value}</p>
                      <p className="text-[10px] text-foreground/70 mt-1 leading-tight font-medium">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Long-term proof */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-muted/50 border border-border rounded-xl px-4 py-3 mb-6"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Zap className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Long-term impact</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{selectedType.projectedResults.testimonial}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={() => setStep('encouragement')}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold"
                  >
                    Show me how
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <button
                    onClick={handleBack}
                    className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-2 transition-colors"
                  >
                    ← Go back
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Personalised encouragement + CTA ── */}
          {step === 'encouragement' && selectedType && (
            <motion.div
              key="encouragement"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="p-6 pt-10"
            >
              <div className="text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  className="text-5xl block mb-5"
                >
                  {selectedType.emoji}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-heading text-xl font-bold text-foreground mb-3"
                >
                  {selectedType.encouragement.headline}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-muted-foreground text-sm leading-relaxed mb-6"
                >
                  {selectedType.encouragement.message}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center gap-1.5 text-secondary text-xs font-medium mb-5"
                >
                  <Star className="w-3.5 h-3.5 fill-secondary" />
                  <span>{selectedType.encouragement.proof}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={handleGo}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold"
                  >
                    {selectedType.encouragement.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <button
                    onClick={handleBack}
                    className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-2 transition-colors"
                  >
                    ← Go back
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
