import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ScrollText, GraduationCap, Brain, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pillars = [
  {
    emoji: '📜',
    icon: ScrollText,
    title: 'The Feed',
    subtitle: 'Scroll & Learn',
    description: "Bite-sized insights from history's greatest minds. Replace mindless scrolling with 2-minute lessons that actually make you smarter.",
    outcome: 'Build 35+ new mental models in your first week',
    route: '/feed',
    color: 'hsl(var(--secondary))',
    tip: 'Swipe through ideas from Einstein, Da Vinci, Aristotle and more.',
  },
  {
    emoji: '🏛️',
    icon: GraduationCap,
    title: 'The Path',
    subtitle: 'Structured Curriculum',
    description: 'Ancient Greek, Logic, Mathematics, Philosophy — the exact foundations that built genius minds. Follow a structured path from beginner to expert.',
    outcome: 'Improve verbal & logical reasoning by 14–18%',
    route: '/the-path',
    color: '#11CCFF',
    tip: '6 modules covering the classical liberal arts curriculum.',
  },
  {
    emoji: '🧠',
    icon: Brain,
    title: 'IQ Tests',
    subtitle: 'Measure & Track',
    description: '5 cognitive assessments that map your strengths across 12 brain regions. Get a personalised training plan based on your results.',
    outcome: 'Average IQ improvement: 8–12 points in 90 days',
    route: '/iq-tests',
    color: '#FFD700',
    tip: 'Take tests in Verbal, Logical, Spatial, Numerical & Memory.',
  },
  {
    emoji: '⚔️',
    icon: Swords,
    title: 'The Arena',
    subtitle: 'Challenge Mode',
    description: '60-second blitz rounds against AI opponents — from a Graduate to Einstein. Combos, streaks, and rankings push you to think faster.',
    outcome: 'Sharpen processing speed & reaction time by 22%',
    route: '/challenge',
    color: '#FF9933',
    tip: 'Challenge increasingly difficult AI opponents to climb the ranks.',
  },
];

interface OnboardingPillarCardsProps {
  open: boolean;
  onClose: () => void;
}

export const OnboardingPillarCards = ({ open, onClose }: OnboardingPillarCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const goNext = useCallback(() => {
    if (currentIndex < pillars.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  const handleFinish = () => {
    onClose();
  };

  const handleGoTo = (route: string) => {
    onClose();
    setTimeout(() => navigate(route), 50);
  };

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  if (!open) return null;

  const pillar = pillars[currentIndex];
  const Icon = pillar.icon;
  const isLast = currentIndex === pillars.length - 1;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          How it works
        </p>
        <button
          onClick={handleFinish}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 px-5 pb-4">
        {pillars.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            className="p-1"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-secondary' : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Swipeable card area */}
      <div
        className="flex-1 overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${pillar.color}15` }}
            >
              <span className="text-5xl">{pillar.emoji}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-heading text-3xl font-bold text-foreground text-center mb-1"
            >
              {pillar.title}
            </motion.h1>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-border text-muted-foreground mb-6"
            >
              {pillar.subtitle}
            </motion.span>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground text-center text-sm leading-relaxed max-w-sm mb-4"
            >
              {pillar.description}
            </motion.p>

            {/* Outcome stat */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-muted/40 border border-border rounded-xl px-5 py-3 mb-4"
            >
              <p className="text-sm font-semibold text-center" style={{ color: pillar.color }}>
                ↑ {pillar.outcome}
              </p>
            </motion.div>

            {/* Tip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xs text-muted-foreground/60 text-center italic max-w-xs"
            >
              {pillar.tip}
            </motion.p>

            {/* Try it button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <button
                onClick={() => handleGoTo(pillar.route)}
                className="text-sm font-medium underline underline-offset-4 transition-colors"
                style={{ color: pillar.color }}
              >
                Try {pillar.title} now →
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        {currentIndex > 0 ? (
          <Button
            variant="outline"
            onClick={goPrev}
            className="flex-1 h-12"
          >
            ← Back
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleFinish}
            className="flex-1 h-12 text-muted-foreground"
          >
            Skip
          </Button>
        )}

        <Button
          onClick={isLast ? handleFinish : goNext}
          className="flex-1 h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
        >
          {isLast ? "Let's go!" : 'Next'}
          {!isLast && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </motion.div>
  );
};
