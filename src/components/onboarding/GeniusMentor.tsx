import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getGeniusPortrait } from '@/data/portraits';

const MENTOR_DISMISSED_KEY = 'genius-academy-mentor-dismissed';
const ARCHETYPE_KEY = 'genius-academy-archetype';

const archetypeToGenius: Record<string, { geniusId: string; name: string; quotes: string[] }> = {
  '0': {
    geniusId: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    quotes: [
      'Curiosity is the compass of genius. Keep exploring!',
      'Every expert was once a beginner. You\'re on the right path.',
      'The noblest pleasure is the joy of understanding.',
    ],
  },
  '1': {
    geniusId: 'albert-einstein',
    name: 'Albert Einstein',
    quotes: [
      'The important thing is not to stop questioning.',
      'A person who never made a mistake never tried anything new.',
      'Logic will get you from A to B. Imagination will take you everywhere.',
    ],
  },
  '2': {
    geniusId: 'nikola-tesla',
    name: 'Nikola Tesla',
    quotes: [
      'The present is theirs; the future is mine — and yours.',
      'Our virtues and our failings are inseparable, like force and matter.',
      'Be alone — that is the secret of invention.',
    ],
  },
  '3': {
    geniusId: 'john-stuart-mill',
    name: 'John Stuart Mill',
    quotes: [
      'A person who reads everything is wiser than one who reads nothing.',
      'The worth of the state is the worth of the individuals composing it.',
      'One person with a belief is a social power equal to ninety-nine who only have interests.',
    ],
  },
};

export const GeniusMentor = () => {
  const [visible, setVisible] = useState(false);
  const [mentor, setMentor] = useState<typeof archetypeToGenius[string] | null>(null);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem(MENTOR_DISMISSED_KEY);
    if (dismissed) return;

    const archetype = localStorage.getItem(ARCHETYPE_KEY);
    const mentorData = archetype ? archetypeToGenius[archetype] : null;
    if (!mentorData) return;

    setMentor(mentorData);
    setQuote(mentorData.quotes[Math.floor(Math.random() * mentorData.quotes.length)]);

    // Appear after a short delay so the page settles first
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(MENTOR_DISMISSED_KEY, 'true');
  };

  if (!mentor) return null;

  const portrait = getGeniusPortrait(mentor.geniusId);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-24 right-4 z-40 max-w-[280px]"
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-xl p-4">
            {/* Close */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex gap-3">
              {/* Portrait */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="flex-shrink-0"
              >
                {portrait ? (
                  <img
                    src={portrait}
                    alt={mentor.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-secondary/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg">
                    🧠
                  </div>
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1">
                  Your Guide
                </p>
                <p className="text-sm text-foreground italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">— {mentor.name}</p>
              </div>
            </div>

            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
