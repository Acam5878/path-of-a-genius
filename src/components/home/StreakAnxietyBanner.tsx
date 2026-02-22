import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';

const HERO_SEEN_KEY = 'genius-academy-hero-seen';

export const StreakAnxietyBanner = () => {
  const navigate = useNavigate();

  // Only show if user has completed the Einstein demo but hasn't signed up
  const hasSeenHero = localStorage.getItem(HERO_SEEN_KEY) === 'true';
  if (!hasSeenHero) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="mx-5 mb-4"
    >
      <button
        onClick={() => navigate('/auth')}
        className="w-full flex items-center gap-3 bg-gradient-to-r from-orange-500/15 to-red-500/10 border border-orange-500/25 rounded-xl px-4 py-3 text-left hover:from-orange-500/20 hover:to-red-500/15 transition-colors"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame className="w-5 h-5 text-orange-500" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Your streak: 1 🔥</p>
          <p className="text-[10px] text-muted-foreground">Sign up to keep it — it resets tomorrow</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </button>
    </motion.div>
  );
};
