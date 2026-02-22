import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Brain } from 'lucide-react';
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
                <Brain className="w-7 h-7 text-cream" />
              </motion.div>
              <h2 className="font-heading text-xl font-bold text-cream mb-1">Wait — don't leave yet</h2>
              <p className="text-cream/70 text-sm">Join 1,200+ learners building real intelligence</p>
            </div>

            <div className="p-5 space-y-3">
              <div className="bg-muted/40 border border-border/50 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">Your IQ test results expire in</p>
                <p className="font-heading text-2xl font-bold text-foreground">24 hours</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Sign up free to save them forever</p>
              </div>

              <Button
                onClick={() => { dismiss(); navigate('/auth'); }}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold"
              >
                Save My Progress — Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button
                onClick={dismiss}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-1"
              >
                No thanks, I'll risk it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
