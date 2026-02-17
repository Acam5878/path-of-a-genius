import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Users, Rocket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const benefitSteps = [
  {
    emoji: '🧠',
    title: "Think sharper, every day",
    description: "People who train with structured curricula show measurable gains in reasoning, memory, and problem-solving within weeks.",
  },
  {
    emoji: '📈',
    title: "Watch yourself grow",
    description: "Track your cognitive development with IQ benchmarks, streaks, and spaced-repetition review — all backed by learning science.",
  },
  {
    emoji: '💡',
    title: "Learn what schools don't teach",
    description: "Philosophy, rhetoric, classical languages, advanced mathematics — the subjects that shaped the greatest minds in history.",
  },
  {
    emoji: '🏛️',
    title: "The Genius Stack",
    description: "Every great mind started with the same foundation: Latin & Greek → Logic & Rhetoric → Mathematics → Natural Philosophy → History & Literature. Each layer builds on the last — just like it did for da Vinci, Newton, and Einstein.",
  },
];

const nextActions = [
  {
    icon: Brain,
    label: "Take an IQ Test",
    description: "See where you stand right now",
    route: '/iq-tests',
    color: 'text-accent',
  },
  {
    icon: Rocket,
    label: "Start Learning",
    description: "Jump straight into the curriculum",
    route: '/the-path',
    color: 'text-secondary',
  },
  {
    icon: Users,
    label: "Meet the Geniuses",
    description: "Explore the minds behind the lessons",
    route: '/geniuses',
    color: 'text-primary',
  },
];

export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const totalSteps = benefitSteps.length + 1; // benefits + chooser
  const isChooserStep = currentStep === benefitSteps.length;

  const handleNext = () => {
    if (!isChooserStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleChoose = (route: string) => {
    onClose();
    navigate(route);
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-border">
        <button
          onClick={handleSkip}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-6 pt-10">
          <AnimatePresence mode="wait">
            {!isChooserStep ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-5xl block mb-6"
                >
                  {benefitSteps[currentStep].emoji}
                </motion.span>

                <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  {benefitSteps[currentStep].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {benefitSteps[currentStep].description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="chooser"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4"
                >
                  <Sparkles className="w-8 h-8 text-secondary" />
                </motion.div>

                <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  What would you like to do first?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  You can always explore everything later
                </p>

                <div className="flex flex-col gap-3">
                  {nextActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.route}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        onClick={() => handleChoose(action.route)}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-secondary/30 transition-all text-left group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-foreground text-sm block">{action.label}</span>
                          <span className="text-muted-foreground text-xs">{action.description}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-6 bg-secondary' 
                    : index < currentStep 
                      ? 'w-2 bg-secondary/50' 
                      : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Actions - only show Next/Skip for benefit steps */}
          {!isChooserStep && (
            <div className="flex gap-3 mt-8">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1 text-muted-foreground"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
