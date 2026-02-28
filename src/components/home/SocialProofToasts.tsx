import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const cities = ['London', 'New York', 'Sydney', 'Berlin', 'Tokyo', 'Toronto', 'Paris', 'Melbourne', 'Amsterdam', 'Singapore', 'Dublin', 'Los Angeles', 'Chicago', 'São Paulo'];
const actions = [
  'just started The Path',
  'completed their first lesson',
  'scored 135 on an IQ test',
  'built a 5-day streak',
  'started Ancient Greek',
  'completed Logic · Intro',
  'improved their IQ by 8 points',
  'unlocked Pattern Recognition',
  'started Mathematics · Foundations',
];
const names = ['Alex', 'Sarah', 'James', 'Priya', 'Marco', 'Elena', 'Liam', 'Sofia', 'Noah', 'Mia', 'Aria', 'Ethan', 'Zara', 'Oliver'];

export const SocialProofToasts = () => {
  const [toast, setToast] = useState<{ name: string; city: string; action: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Only show for unauthenticated users
    if (user) return;

    const show = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      setToast({ name, city, action });
      setTimeout(() => setToast(null), 4000);
    };

    const firstTimeout = setTimeout(show, 8000);
    const interval = setInterval(show, 18000);
    return () => { clearTimeout(firstTimeout); clearInterval(interval); };
  }, [user]);

  if (user) return null;

  return (
    <div className="fixed left-4 right-4 z-50 pointer-events-none flex justify-center" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 56px)' }}>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-card/95 backdrop-blur-md border border-border/60 rounded-xl px-4 py-2.5 shadow-lg max-w-xs"
          >
            <p className="text-xs text-foreground">
              <span className="font-semibold">{toast.name}</span>
              <span className="text-muted-foreground"> in {toast.city}</span>
              {' '}{toast.action}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">just now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
