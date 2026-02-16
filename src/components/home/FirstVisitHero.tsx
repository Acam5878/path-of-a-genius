import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingProgressBar } from '@/components/onboarding/OnboardingProgressBar';
import knowledgeWebVideo from '@/assets/knowledge-web-reel.mp4';

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

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [selectedArchetype, setSelectedArchetype] = useState<number | null>(null);
  const [phase, setPhase] = useState<'hero' | 'result'>('hero');

  const handleSelect = (index: number) => {
    setSelectedArchetype(index);
    localStorage.setItem(ARCHETYPE_KEY, String(index));
    setPhase('result');
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-primary">
      <OnboardingProgressBar currentStep={0} />
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src={knowledgeWebVideo} type="video/mp4" />
      </video>

      {/* Gradient overlay - stronger to prevent video text bleed */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === 'hero' ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              {/* Sparkle icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Sparkles className="w-10 h-10 text-secondary mb-4" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground leading-tight mb-3"
              >
                Learn like history's greatest geniuses
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary-foreground/70 text-base mb-8"
              >
                Train your mind with the curriculum that shaped the world's most brilliant thinkers.
              </motion.p>

              {/* Personality quiz hook */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full"
              >
                <p className="text-secondary font-mono text-xs uppercase tracking-widest mb-4">
                  Which genius thinks like you?
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {archetypes.map((arch, i) => (
                    <motion.button
                      key={arch.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      onClick={() => handleSelect(i)}
                      className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 hover:border-secondary/40 transition-all text-center"
                    >
                      <span className="text-2xl">{arch.emoji}</span>
                      <span className="text-sm font-semibold text-primary-foreground">{arch.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-2 mt-8 text-primary-foreground/50"
              >
                <Users className="w-4 h-4" />
                <span className="text-xs">Join thousands training their minds</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              {selectedArchetype !== null && (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="text-5xl mb-4"
                  >
                    {archetypes[selectedArchetype].emoji}
                  </motion.span>

                  <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-2">
                    You're {archetypes[selectedArchetype].label}
                  </h2>

                  <p className="text-primary-foreground/70 text-sm mb-2">
                    {archetypes[selectedArchetype].description}
                  </p>

                  <p className="text-secondary text-sm font-medium mb-8">
                    You think like <span className="font-bold">{archetypes[selectedArchetype].genius}</span>
                  </p>

                  <Button
                    onClick={handleStart}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-6 rounded-xl font-semibold"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <button
                    onClick={handleStart}
                    className="mt-4 text-primary-foreground/40 text-xs hover:text-primary-foreground/60 transition-colors"
                  >
                    Skip for now
                  </button>
                </>
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
