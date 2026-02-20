import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MENTOR_DISMISSED_KEY = 'genius-academy-mentor-dismissed';
const HERO_SEEN_KEY = 'genius-academy-hero-seen';

const nudges = [
  {
    emoji: '🏛️',
    headline: 'Your streak starts today.',
    body: 'Einstein studied every day. Not for hours — just deliberately. Start The Path and build the habit.',
    cta: 'Begin The Path',
    route: '/the-path',
  },
  {
    emoji: '🧠',
    headline: 'Know where you stand.',
    body: 'Before you build, measure. Take a 10-minute IQ test and get your cognitive baseline.',
    cta: 'Take the IQ Test',
    route: '/iq-tests',
  },
  {
    emoji: '✨',
    headline: 'Meet the minds behind it all.',
    body: 'Da Vinci, Newton, Aristotle — each one left a roadmap. Start by following one.',
    cta: 'Explore the Geniuses',
    route: '/geniuses',
  },
];

export const GeniusMentor = () => {
  const [visible, setVisible] = useState(false);
  const [nudge, setNudge] = useState<typeof nudges[number] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = localStorage.getItem(MENTOR_DISMISSED_KEY);
    if (dismissed) return;

    // Only show for users who've seen the hero (i.e., have been through first visit)
    const heroSeen = localStorage.getItem(HERO_SEEN_KEY);
    if (!heroSeen) return;

    // Pick a random nudge
    const pick = nudges[Math.floor(Math.random() * nudges.length)];
    setNudge(pick);

    // Appear after the page settles
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(MENTOR_DISMISSED_KEY, 'true');
  };

  const handleCta = () => {
    handleDismiss();
    if (nudge) navigate(nudge.route);
  };

  if (!nudge) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-40 right-4 z-40 max-w-[280px] sm:bottom-36"
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-xl p-4">
            {/* Close */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex gap-3 mb-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="text-2xl flex-shrink-0"
              >
                {nudge.emoji}
              </motion.span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1">{nudge.headline}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{nudge.body}</p>
              </div>
            </div>

            <button
              onClick={handleCta}
              className="w-full flex items-center justify-center gap-1.5 bg-secondary/15 border border-secondary/30 text-secondary text-xs font-semibold rounded-xl py-2.5 hover:bg-secondary/25 transition-colors"
            >
              {nudge.cta}
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
