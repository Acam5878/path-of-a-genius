import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Shown when an anonymous user has accumulated XP/streak and is about to lose it.
 * Appears after they've been browsing for a while as a pulsing warning.
 */
interface Props {
  xp: number;
  streak: number;
}

const ANON_XP_KEY = 'genius-academy-anon-xp';
const ANON_STREAK_KEY = 'genius-academy-anon-streak';

/** Persist anonymous XP/streak so it survives page navigation */
export const saveAnonProgress = (xp: number, streak: number) => {
  sessionStorage.setItem(ANON_XP_KEY, String(xp));
  sessionStorage.setItem(ANON_STREAK_KEY, String(streak));
};

export const getAnonProgress = () => ({
  xp: parseInt(sessionStorage.getItem(ANON_XP_KEY) || '0', 10),
  streak: parseInt(sessionStorage.getItem(ANON_STREAK_KEY) || '0', 10),
});

export const clearAnonProgress = () => {
  sessionStorage.removeItem(ANON_XP_KEY);
  sessionStorage.removeItem(ANON_STREAK_KEY);
};

export const AnonymousProgressWarning = ({ xp, streak }: Props) => {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Show warning after user has 30+ XP or 2+ streak
    if (!user && (xp >= 30 || streak >= 2)) {
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }
  }, [user, xp, streak]);

  if (!show || user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute bottom-24 left-4 right-4 z-30"
      >
        <button
          onClick={() => navigate('/auth')}
          className="w-full flex items-center gap-3 bg-orange-500/15 border border-orange-500/30 backdrop-blur-sm rounded-xl px-4 py-3 text-left hover:bg-orange-500/20 transition-colors"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-5 h-5 text-orange-400" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Your {xp} XP will be lost
            </p>
            <p className="text-[10px] text-muted-foreground">
              Sign up free to keep your progress forever
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
