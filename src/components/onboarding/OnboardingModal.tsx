import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy, Sparkles, X, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Sparkles,
    title: "Welcome to Genius Academy",
    description: "Train your mind with curricula from history's greatest thinkers. Let's get you started on your journey to genius.",
    color: "text-secondary",
  },
  {
    icon: BookOpen,
    title: "Learn From The Greats",
    description: "Explore curated lessons on philosophy, mathematics, science, and languages—each designed by studying how geniuses actually learned.",
    color: "text-accent",
  },
  {
    icon: Brain,
    title: "Track Your Intelligence",
    description: "Take daily IQ tests to measure your cognitive growth across verbal, numerical, spatial, and logical reasoning.",
    color: "text-primary",
  },
  {
    icon: Newspaper,
    title: "Your Daily Discovery Feed",
    description: "Swipe through fascinating quotes, insights, stories, and quizzes from history's greatest minds. It's like social media — but for your brain.",
    color: "text-accent",
  },
  {
    icon: Trophy,
    title: "Build Your Legacy",
    description: "Complete lessons, maintain streaks, and unlock achievements as you progress toward mastery.",
    color: "text-secondary",
  },
];

export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      navigate('/the-path');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const CurrentIcon = steps[currentStep].icon;

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
            <motion.div
              key={currentStep}
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
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-6`}
              >
                <CurrentIcon className={`w-8 h-8 ${steps[currentStep].color}`} />
              </motion.div>

              <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {steps.map((_, index) => (
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

          {/* Actions */}
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
              {isLastStep ? "Start Learning" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
