import { motion } from 'framer-motion';

const steps = [
  { label: 'Discover', emoji: '✨' },
  { label: 'Explore', emoji: '🔭' },
  { label: 'Choose', emoji: '🚀' },
];

interface OnboardingProgressBarProps {
  /** 0 = hero/quiz, 1 = feed, 2 = onboarding chooser */
  currentStep: number;
}

export const OnboardingProgressBar = ({ currentStep }: OnboardingProgressBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-0 left-0 right-0 z-[60] px-4 bg-primary/90 backdrop-blur-md border-b border-primary-foreground/10"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)', paddingBottom: '8px' }}
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex items-center gap-1.5 flex-1">
              <motion.div
                animate={{
                  scale: i === currentStep ? 1.1 : 1,
                  opacity: i <= currentStep ? 1 : 0.4,
                }}
                className="flex items-center gap-1"
              >
                <span className="text-xs">{step.emoji}</span>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                  i === currentStep ? 'text-secondary' : i < currentStep ? 'text-primary-foreground/70' : 'text-primary-foreground/30'
                }`}>
                  {step.label}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px mx-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: i < currentStep ? 1 : 0,
                      backgroundColor: i < currentStep ? 'hsl(var(--secondary))' : 'hsl(var(--primary-foreground) / 0.15)',
                    }}
                    style={{ originX: 0, backgroundColor: 'hsl(var(--primary-foreground) / 0.15)' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
