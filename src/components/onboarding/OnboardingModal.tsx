import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Users, Rocket, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const encouragementCards: Record<string, { emoji: string; headline: string; message: string }> = {
  '/iq-tests': {
    emoji: '🧠',
    headline: "This is day one of something real.",
    message: "Most people never stop to measure their thinking. You just did. The IQ test takes 10 minutes — and it will give you a baseline you can actually build on.",
  },
  '/the-path': {
    emoji: '🏛️',
    headline: "The greatest minds all started here.",
    message: "Da Vinci, Newton, Einstein — they all built on the same foundations. You're about to walk the same path. One lesson. Ten minutes. That's all it takes to begin.",
  },
  '/geniuses': {
    emoji: '✨',
    headline: "You're about to meet people who changed everything.",
    message: "These weren't just smart people — they were committed ones. Each one started with curiosity, just like you. Your path starts with knowing who went before you.",
  },
};

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const nextActions = [
  {
    icon: Rocket,
    label: 'Start Learning',
    description: 'Jump straight into the curriculum',
    route: '/the-path',
    color: 'text-secondary',
    primary: true,
  },
  {
    icon: Brain,
    label: 'Take an IQ Test',
    description: 'See where you stand right now',
    route: '/iq-tests',
    color: 'text-accent',
    primary: false,
  },
  {
    icon: Users,
    label: 'Meet the Geniuses',
    description: 'Explore the minds behind the lessons',
    route: '/geniuses',
    color: 'text-primary',
    primary: false,
  },
];

// Single-step action chooser — no pace picker, no social proof slides
export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChoose = (route: string) => {
    setPendingRoute(route);
  };

  const handleEncouragementContinue = () => {
    if (pendingRoute) {
      onClose();
      navigate(pendingRoute);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const encouragement = pendingRoute ? encouragementCards[pendingRoute] : null;

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

        {/* ── Encouragement card (after action selected) ── */}
        <AnimatePresence>
          {pendingRoute && encouragement && (
            <motion.div
              key="encouragement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 pt-10"
            >
              <div className="text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  className="text-5xl block mb-5"
                >
                  {encouragement.emoji}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-heading text-xl font-bold text-foreground mb-3"
                >
                  {encouragement.headline}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-sm leading-relaxed mb-8"
                >
                  {encouragement.message}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-center gap-1.5 text-secondary text-xs font-medium mb-4">
                    <Star className="w-3.5 h-3.5 fill-secondary" />
                    <span>Just 10 minutes. That's all it takes to start.</span>
                    <Star className="w-3.5 h-3.5 fill-secondary" />
                  </div>
                  <Button
                    onClick={handleEncouragementContinue}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold"
                  >
                    Let's go <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <button
                    onClick={handleSkip}
                    className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-2 transition-colors"
                  >
                    Maybe later
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Direct action chooser — no multi-step onboarding ── */}
        {!pendingRoute && (
          <div className="p-6 pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4"
            >
              <Sparkles className="w-7 h-7 text-secondary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-xl font-semibold text-foreground mb-1"
            >
              Where do you want to start?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-sm mb-6"
            >
              Pick your first step — everything else is waiting for you.
            </motion.p>

            <div className="flex flex-col gap-3">
              {nextActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.route}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    onClick={() => handleChoose(action.route)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${
                      action.primary
                        ? 'border-secondary/40 bg-secondary/8 hover:bg-secondary/15'
                        : 'border-border bg-muted/30 hover:bg-muted/60 hover:border-secondary/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      action.primary ? 'bg-secondary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleSkip}
              className="w-full text-xs text-muted-foreground hover:text-foreground/60 py-3 mt-2 transition-colors"
            >
              I'll explore on my own
            </motion.button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
