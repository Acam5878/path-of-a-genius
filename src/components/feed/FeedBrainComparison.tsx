import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

export const FeedBrainComparison = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [phase, setPhase] = useState<'scrolling' | 'genius'>('scrolling');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount);
      rendererRef.current.updateOptions({ activeRegions: new Set(), isLocked: false });
    }, 150);
    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  // After 2.5s, light up all regions dramatically
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('genius');
      const allRegions = new Set(Object.keys(REGIONS));
      rendererRef.current?.updateOptions({ activeRegions: allRegions, isLocked: false });
      Object.keys(REGIONS).forEach((r, i) => {
        setTimeout(() => rendererRef.current?.triggerRegionFire(r, 1.0), i * 80);
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          {phase === 'scrolling' ? (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">This is you</p>
              <h2 className="font-heading text-2xl font-bold text-white/50">Your brain while scrolling</h2>
            </>
          ) : (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">This is you</p>
              <h2 className="font-heading text-2xl font-bold text-white">Your brain on Path of a Genius</h2>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        ref={mountRef}
        className="w-full flex-shrink-0"
        style={{ maxWidth: 360, height: 240 }}
      />

      <AnimatePresence>
        {phase === 'scrolling' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-white/30 max-w-xs leading-relaxed">
              Almost nothing happens.
            </p>
          </motion.div>
        )}
        {phase === 'genius' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-4"
          >
            <motion.p className="text-sm text-white/70 max-w-xs leading-relaxed mb-3">
              Same time. Same habit. Completely different outcome.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[10px] text-white/30 font-mono uppercase tracking-wider"
            >
              Tap to continue →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
