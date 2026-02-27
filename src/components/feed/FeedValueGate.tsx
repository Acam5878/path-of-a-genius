import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface FeedValueGateProps {
  /** Seconds of browsing before showing */
  delaySeconds?: number;
  /** Number of slides the user has seen */
  slidesSeen: number;
  /** Current XP */
  xp: number;
  /** Current streak */
  streak: number;
}

export const FeedValueGate = ({ delaySeconds = 60, slidesSeen, xp, streak }: FeedValueGateProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || dismissed) return;
    const timer = setTimeout(() => setVisible(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [user, dismissed, delaySeconds]);

  if (!visible || dismissed || user) return null;

  const conceptsLearned = Math.max(slidesSeen, 3);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-20 left-3 right-3 z-40"
      >
        <div className="relative bg-card/95 backdrop-blur-xl border border-secondary/30 rounded-2xl p-4 shadow-2xl shadow-secondary/10">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
              <Brain className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">
                You've learned {conceptsLearned} new concepts
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sign up free to track your growth & keep your {xp} XP
              </p>

              {/* Mini stats */}
              <div className="flex items-center gap-3 mt-2">
                {streak > 0 && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-orange-400">
                    🔥 {streak} streak
                  </span>
                )}
                {xp > 0 && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-secondary">
                    <Zap className="w-3 h-3" /> {xp} XP
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/auth')}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground rounded-xl py-2.5 text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Save my progress
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
