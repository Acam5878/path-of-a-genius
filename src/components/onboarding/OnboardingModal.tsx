import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Users, Rocket, X, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const PACE_KEY = 'genius-academy-pace';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const paceOptions = [
  {
    id: 'light',
    label: 'Light',
    detail: '3 sessions/week',
    description: 'Fits around a busy schedule',
    emoji: '🌱',
  },
  {
    id: 'regular',
    label: 'Regular',
    detail: 'Once daily',
    description: 'The sweet spot for progress',
    emoji: '⚡',
    recommended: true,
  },
  {
    id: 'intensive',
    label: 'Intensive',
    detail: '2+ sessions daily',
    description: 'For serious learners',
    emoji: '🔥',
  },
];

const curriculumPath = [
  { emoji: '🏛️', title: 'Languages', subtitle: 'Latin & Greek foundations', module: 1 },
  { emoji: '⚖️', title: 'Logic', subtitle: 'Aristotelian reasoning', module: 2 },
  { emoji: '📐', title: 'Mathematics', subtitle: 'Euclid through calculus', module: 3 },
  { emoji: '🔭', title: 'Sciences', subtitle: 'Newton to Einstein', module: 4 },
  { emoji: '📜', title: 'Humanities', subtitle: 'History, philosophy, literature', module: 5 },
  { emoji: '📚', title: 'Reading', subtitle: 'Primary source masterworks', module: 6 },
];

const testimonials = [
  {
    quote: "I've taken Coursera, MasterClass, everything. Nothing changed how I actually think. This did — in the first week.",
    name: 'Daniel M.',
    role: 'Software Engineer',
    improvement: 'IQ score +14 points in 8 weeks',
  },
  {
    quote: "The Logic module alone was worth it. I now see structure in arguments, conversations, and my own thinking that I was completely blind to before.",
    name: 'Aisha K.',
    role: 'Lawyer',
    improvement: 'Completed Logic module in 3 weeks',
  },
];

const nextActions = [
  {
    icon: Brain,
    label: 'Take an IQ Test',
    description: 'See where you stand right now',
    route: '/iq-tests',
    color: 'text-accent',
  },
  {
    icon: Rocket,
    label: 'Start Learning',
    description: 'Jump straight into the curriculum',
    route: '/the-path',
    color: 'text-secondary',
  },
  {
    icon: Users,
    label: 'Meet the Geniuses',
    description: 'Explore the minds behind the lessons',
    route: '/geniuses',
    color: 'text-primary',
  },
];

// Slides: path overview → commitment/pace → social proof → action chooser
const TOTAL_STEPS = 4;

export const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPace, setSelectedPace] = useState<string>('regular');
  const navigate = useNavigate();

  const isChooserStep = currentStep === TOTAL_STEPS - 1;

  const handleNext = () => {
    if (currentStep === 1) {
      localStorage.setItem(PACE_KEY, selectedPace);
    }
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

            {/* ── SLIDE 0: Curriculum Roadmap ── */}
            {currentStep === 0 && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="text-4xl block mb-4 text-center"
                >
                  🗺️
                </motion.span>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-1 text-center">
                  Your Genius Path
                </h2>
                <p className="text-muted-foreground text-sm mb-5 text-center">
                  6 modules. Each one builds on the last — exactly as it did for Da Vinci, Newton, and Einstein.
                </p>

                <div className="space-y-2">
                  {curriculumPath.map((item, i) => (
                    <motion.div
                      key={item.module}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-base">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.subtitle}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 1: Time commitment + pace picker ── */}
            {currentStep === 1 && (
              <motion.div
                key="pace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="text-4xl block mb-4 text-center"
                >
                  ⏱️
                </motion.div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-1 text-center">
                  Built for real life
                </h2>
                <p className="text-muted-foreground text-sm mb-2 text-center">
                  Just 10 minutes a day is enough to build genuine cognitive depth over time.
                </p>
                <div className="flex items-center justify-center gap-1.5 text-secondary text-xs font-medium mb-6">
                  <Clock className="w-3.5 h-3.5" />
                  <span>No long sessions. No guilt if you miss a day.</span>
                </div>

                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 text-center">
                  Choose your learning pace
                </p>

                <div className="space-y-3">
                  {paceOptions.map((pace, i) => (
                    <motion.button
                      key={pace.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      onClick={() => setSelectedPace(pace.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        selectedPace === pace.id
                          ? 'border-secondary bg-secondary/8'
                          : 'border-border bg-muted/20 hover:bg-muted/40'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{pace.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{pace.label}</span>
                          <span className="text-xs text-muted-foreground">{pace.detail}</span>
                          {pace.recommended && (
                            <span className="text-[10px] font-mono bg-secondary/20 text-secondary px-1.5 py-0.5 rounded-full">
                              recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{pace.description}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                          selectedPace === pace.id ? 'border-secondary bg-secondary' : 'border-muted-foreground/30'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 2: Social proof with specific outcomes ── */}
            {currentStep === 2 && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="text-4xl block mb-4"
                >
                  🏅
                </motion.span>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-1">
                  People like you are already thriving
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Real results from learners who committed to the path
                </p>

                <div className="space-y-4 text-left">
                  {testimonials.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.12 }}
                      className="bg-muted/40 border border-border/60 rounded-xl p-4"
                    >
                      <p className="text-foreground text-sm italic mb-3">"{t.quote}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                            {t.name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                          {t.improvement}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 3: Action chooser ── */}
            {currentStep === 3 && (
              <motion.div
                key="chooser"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4"
                >
                  <Sparkles className="w-8 h-8 text-secondary" />
                </motion.div>

                <h2 className="font-heading text-xl font-semibold text-foreground mb-1">
                  Where do you want to start?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  You can explore everything — pick your first step
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
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
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
          {!isChooserStep && (
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={handleSkip} className="flex-1 text-muted-foreground">
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
