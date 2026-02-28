import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, BookOpen, Target, Users, X, Star, Zap, GraduationCap, TrendingUp, Swords, Flame, Clock, ScrollText, BarChart3 } from 'lucide-react';
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
}

const userTypes: UserType[] = [
  {
    id: 'self-improver',
    emoji: '🧠',
    label: 'I want to get smarter',
    subtext: 'Sharpen my thinking & raise my IQ',
    icon: Brain,
    route: '/iq-tests?start=verbal',
  },
  {
    id: 'curious-learner',
    emoji: '✨',
    label: 'I want to learn new things',
    subtext: 'Feed my curiosity with interesting ideas',
    icon: Sparkles,
    route: '/feed',
  },
  {
    id: 'student',
    emoji: '📚',
    label: "I'm building real knowledge",
    subtext: 'Follow a structured learning path',
    icon: GraduationCap,
    route: '/the-path',
  },
  {
    id: 'parent',
    emoji: '👨‍👩‍👧',
    label: "It's for my child",
    subtext: 'Age-appropriate learning & IQ tests',
    icon: Users,
    route: '/iq-tests',
  },
];

// ── Platform features for the overview ──────────────────────────────────
const platformFeatures = [
  {
    emoji: '📜',
    title: 'The Feed',
    subtitle: 'Scroll & Learn',
    description: 'Bite-sized insights from history\'s greatest minds. Replace mindless scrolling with 2-minute lessons.',
    outcome: 'Build 35+ new mental models in your first week',
    color: 'hsl(var(--secondary))',
  },
  {
    emoji: '🏛️',
    title: 'The Path',
    subtitle: 'Structured Curriculum',
    description: 'Ancient Greek, Logic, Mathematics, Philosophy — the exact foundations that built genius minds.',
    outcome: 'Improve verbal & logical reasoning by 14–18%',
    color: '#11CCFF',
  },
  {
    emoji: '🧠',
    title: 'IQ Tests',
    subtitle: 'Measure & Track',
    description: '5 cognitive assessments that map your strengths across 12 brain regions with a personalised training plan.',
    outcome: 'Average IQ improvement: 8–12 points in 90 days',
    color: '#FFD700',
  },
  {
    emoji: '⚔️',
    title: 'The Arena',
    subtitle: 'Challenge Mode',
    description: '60-second blitz rounds against AI opponents — from a Graduate to Einstein. Combos, streaks, and rankings.',
    outcome: 'Sharpen processing speed & reaction time by 22%',
    color: '#FF9933',
  },
];

// ── Storage key for user type (used by other components) ────────────────
const USER_TYPE_KEY = 'genius-academy-user-type';

export const getUserType = (): string | null => {
  return localStorage.getItem(USER_TYPE_KEY);
};

type Step = 'picker' | 'features';

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
    setStep('features');
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
    if (step === 'features') { setStep('picker'); setSelectedType(null); }
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

          {/* ── Step 2: Feature Overview — "Here's what's inside" ── */}
          {step === 'features' && selectedType && (
            <motion.div
              key="features"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="p-6 pt-10"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-heading text-xl font-bold text-foreground mb-1 text-center"
              >
                Here's what's inside
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-xs mb-5 text-center"
              >
                Four ways to train your brain. 10 minutes a day.
              </motion.p>

              <div className="space-y-3 mb-5">
                {platformFeatures.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="bg-muted/30 border border-border rounded-xl p-3.5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl leading-none mt-0.5">{feature.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">
                            {feature.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{feature.description}</p>
                        <p className="text-[11px] font-medium" style={{ color: feature.color }}>
                          ↑ {feature.outcome}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="space-y-3"
              >
                <Button
                  onClick={handleGo}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold"
                >
                  Let's go
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <button
                  onClick={handleBack}
                  className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-2 transition-colors"
                >
                  ← Go back
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
