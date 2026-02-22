import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap } from 'lucide-react';

interface FeedScoreOverlayProps {
  streak: number;
  xp: number;
  showXpPop: boolean;
  xpGain: number;
}

export const FeedScoreOverlay = ({ streak, xp, showXpPop, xpGain }: FeedScoreOverlayProps) => {
  if (streak === 0 && xp === 0) return null;

  return (
    <div className="absolute top-14 left-4 z-20 flex items-center gap-3 pointer-events-none">
      {/* Streak counter */}
      <AnimatePresence>
        {streak > 0 && (
          <motion.div
            key="streak"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-orange-500/30"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Flame className="w-4 h-4 text-orange-400" />
            </motion.div>
            <motion.span
              key={streak}
              initial={{ scale: 1.5, color: 'hsl(35, 100%, 60%)' }}
              animate={{ scale: 1, color: 'hsl(35, 90%, 55%)' }}
              className="text-sm font-bold tabular-nums"
            >
              {streak}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP counter */}
      <AnimatePresence>
        {xp > 0 && (
          <motion.div
            key="xp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-secondary/30"
          >
            <Zap className="w-3.5 h-3.5 text-secondary fill-secondary" />
            <motion.span
              key={xp}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-sm font-bold text-secondary tabular-nums"
            >
              {xp}
            </motion.span>
            <span className="text-[10px] text-secondary/60 font-medium">XP</span>

            {/* XP gain pop */}
            <AnimatePresence>
              {showXpPop && (
                <motion.span
                  key={`pop-${xp}`}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -30, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute -top-2 right-0 text-xs font-bold text-secondary"
                >
                  +{xpGain}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
