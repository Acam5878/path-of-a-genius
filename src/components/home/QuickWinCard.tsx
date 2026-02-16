import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, X } from 'lucide-react';

const QUICK_WIN_DISMISSED_KEY = 'genius-academy-quick-win-dismissed';

const geniusFacts = [
  {
    emoji: '🧒',
    genius: 'John Stuart Mill',
    fact: 'Could read Ancient Greek at age 3 — before most children start school.',
    takeaway: 'Early exposure to complex ideas builds extraordinary minds.',
  },
  {
    emoji: '🎨',
    genius: 'Leonardo da Vinci',
    fact: 'Filled over 13,000 pages of notebooks with ideas, inventions, and observations.',
    takeaway: 'Writing your ideas down is the habit of genius.',
  },
  {
    emoji: '🧮',
    genius: 'Blaise Pascal',
    fact: 'Built a working mechanical calculator at age 19 — 300 years before computers.',
    takeaway: 'Young minds can solve problems that stump adults.',
  },
  {
    emoji: '⚡',
    genius: 'Nikola Tesla',
    fact: 'Could perform integral calculus in his head, visualizing complete machines before building them.',
    takeaway: 'Mental practice is as powerful as physical practice.',
  },
  {
    emoji: '📐',
    genius: 'Isaac Newton',
    fact: 'Invented calculus in just two years during quarantine from the plague.',
    takeaway: 'Focused isolation can unlock your greatest breakthroughs.',
  },
];

export const QuickWinCard = () => {
  const [dismissed, setDismissed] = useState(true);
  const [fact] = useState(() => geniusFacts[Math.floor(Math.random() * geniusFacts.length)]);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(QUICK_WIN_DISMISSED_KEY);
    if (!wasDismissed) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(QUICK_WIN_DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="mx-4 relative overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-card to-accent/5 p-5"
      >
        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">60-second genius fact</span>
        </div>

        {/* Fact */}
        <div className="flex gap-3">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-3xl flex-shrink-0"
          >
            {fact.emoji}
          </motion.span>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">{fact.genius}</p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">{fact.fact}</p>
            <div className="flex items-center gap-1 text-secondary">
              <ChevronRight className="w-3 h-3" />
              <p className="text-xs font-medium italic">{fact.takeaway}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
