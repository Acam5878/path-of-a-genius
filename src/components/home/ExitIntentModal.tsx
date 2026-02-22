import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Brain, BookOpen, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DISMISSED_KEY = 'genius-exit-intent-dismissed';

export const ExitIntentModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    // Trigger on scroll to bottom (90% of page)
    const handleScroll = () => {
      const scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPct > 0.9 && !sessionStorage.getItem(DISMISSED_KEY)) {
        setShow(true);
      }
    };

    // Trigger on mouse leave (desktop exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem(DISMISSED_KEY)) {
        setShow(true);
      }
    };

    // Also trigger after 45 seconds of inactivity (mobile doesn't have mouse leave)
    const inactivityTimer = setTimeout(() => {
      if (!sessionStorage.getItem(DISMISSED_KEY)) {
        setShow(true);
      }
    }, 45000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-sm bg-card rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative gradient-premium p-6 text-center">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-white/50 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.15 }}
                className="w-14 h-14 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center"
              >
                <Gift className="w-7 h-7 text-cream" />
              </motion.div>
              <h2 className="font-heading text-xl font-bold text-cream mb-1">Before you go…</h2>
              <p className="text-cream/70 text-sm">We saved something for you</p>
            </div>

            <div className="p-5 space-y-3">
              {/* Offer: Free first premium lesson */}
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold text-secondary uppercase tracking-wide">Exclusive offer</span>
                </div>
                <p className="font-heading text-lg font-bold text-foreground mb-1">
                  Your first premium lesson — free
                </p>
                <p className="text-xs text-muted-foreground">
                  Sign up now and unlock one premium lesson of your choice. No credit card needed.
                </p>
              </div>

              {/* What you get */}
              <div className="space-y-2">
                {[
                  { icon: BookOpen, text: 'Access any genius\'s first lesson' },
                  { icon: Brain, text: 'Full IQ profile saved forever' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => { dismiss(); navigate('/auth'); }}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold"
              >
                Claim My Free Lesson
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button
                onClick={dismiss}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-1"
              >
                No thanks, maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
