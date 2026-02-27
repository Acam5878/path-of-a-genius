import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, BookOpen, Target, Users, X, Star, Zap, GraduationCap } from 'lucide-react';
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
  /** Route to send them to */
  route: string;
  /** Personalised encouragement after selection */
  encouragement: {
    headline: string;
    message: string;
    cta: string;
    proof: string;
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
  },
];

// ── Storage key for user type (used by other components) ────────────────
const USER_TYPE_KEY = 'genius-academy-user-type';

export const getUserType = (): string | null => {
  return localStorage.getItem(USER_TYPE_KEY);
};

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const handleTypeSelect = (type: UserType) => {
    localStorage.setItem(USER_TYPE_KEY, type.id);
    setSelectedType(type);
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
          {/* ── Step 2: Personalised encouragement ── */}
          {selectedType && (
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

                {/* Social proof nugget */}
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
                    onClick={() => setSelectedType(null)}
                    className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-2 transition-colors"
                  >
                    ← Go back
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── Step 1: "What brought you here?" ── */}
          {!selectedType && (
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
                {userTypes.map((type, i) => {
                  const Icon = type.icon;
                  return (
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
                  );
                })}
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
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
