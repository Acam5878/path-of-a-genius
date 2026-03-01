import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLearnerCount } from '@/hooks/useLearnerCount';

/**
 * Landing-page overlay elements shown on top of the feed for unauthenticated users.
 * Applies key landing page principles:
 * - Benefit-driven welcome headline (fades after first tap)
 * - Social proof bar (learner count + rating + trust)
 * - Sticky bottom CTA with specific, outcome-focused copy
 */

// ── Welcome headline (disappears after first interaction) ──────────────
const WelcomeHeadline = ({ onDismiss }: { onDismiss: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-[55] pointer-events-none"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 48px)' }}
        >
          <div className="mx-4 bg-gradient-to-r from-secondary/20 to-secondary/10 backdrop-blur-xl border border-secondary/20 rounded-2xl px-5 py-4 shadow-lg">
            <p className="text-center text-sm font-semibold text-foreground leading-snug">
              Learn what history's greatest minds knew —
              <span className="text-secondary"> in 2 minutes a day</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Social proof micro-bar ─────────────────────────────────────────────
const SocialProofBar = () => {
  const { formatted: learnerCount } = useLearnerCount();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed z-[55] pointer-events-none flex justify-center"
      style={{ 
        bottom: 'calc(env(safe-area-inset-bottom, 16px) + 170px)',
        left: 0,
        right: 0,
      }}
    >
      <div className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/40 rounded-full px-4 py-1.5 shadow-md">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-3 h-3" />
          <span className="text-[10px] font-medium">{learnerCount} learners</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star className="w-3 h-3 text-secondary fill-secondary" />
          <span className="text-[10px] font-medium">4.8★</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1 text-muted-foreground">
          <ShieldCheck className="w-3 h-3" />
          <span className="text-[10px] font-medium">Free</span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Sticky bottom CTA ──────────────────────────────────────────────────
const StickyCTA = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Show after a short delay so it doesn't compete with first card
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed left-0 right-0 z-[55]"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 16px) + 120px)' }}
        >
          <div className="mx-4">
            <button
              onClick={() => navigate('/auth')}
              className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground rounded-2xl py-3 text-sm font-bold shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-colors"
            >
              Find out how smart you are
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Combined overlay ───────────────────────────────────────────────────
export const FeedLandingOverlay = () => {
  const { user } = useAuth();
  const [headlineDismissed, setHeadlineDismissed] = useState(false);

  // Only show for unauthenticated users
  if (user) return null;

  // Don't show if user has already converted or dismissed before
  const alreadyConverted = localStorage.getItem('genius-academy-feed-converted');
  if (alreadyConverted) return null;

  return (
    <>
      {!headlineDismissed && <WelcomeHeadline onDismiss={() => setHeadlineDismissed(true)} />}
      <SocialProofBar />
      <StickyCTA />
    </>
  );
};
