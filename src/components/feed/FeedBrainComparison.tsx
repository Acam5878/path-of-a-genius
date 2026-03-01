import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

export const FeedBrainComparison = () => {
  const leftMountRef = useRef<HTMLDivElement>(null);
  const rightMountRef = useRef<HTMLDivElement>(null);
  const leftRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const rightRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [phase, setPhase] = useState<'scrolling' | 'genius'>('scrolling');

  // Left brain: "scrolling" brain — dim, no regions
  useEffect(() => {
    const mount = leftMountRef.current;
    if (!mount) return;
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      leftRendererRef.current = createBrainRenderer(mount);
      leftRendererRef.current.updateOptions({ activeRegions: new Set(), isLocked: false });
    }, 150);
    return () => {
      clearTimeout(timer);
      leftRendererRef.current?.dispose();
      leftRendererRef.current = null;
    };
  }, []);

  // Right brain: "genius" brain — lights up after 2.5s
  useEffect(() => {
    const mount = rightMountRef.current;
    if (!mount) return;
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rightRendererRef.current = createBrainRenderer(mount);
      rightRendererRef.current.updateOptions({ activeRegions: new Set(), isLocked: false });
    }, 150);
    return () => {
      clearTimeout(timer);
      rightRendererRef.current?.dispose();
      rightRendererRef.current = null;
    };
  }, []);

  // After 2.5s, light up the right brain
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('genius');
      const allRegions = new Set(Object.keys(REGIONS));
      rightRendererRef.current?.updateOptions({ activeRegions: allRegions, isLocked: false });
      Object.keys(REGIONS).forEach((r, i) => {
        setTimeout(() => rightRendererRef.current?.triggerRegionFire(r, 1.0), i * 80);
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6">
      {/* Labels */}
      <div className="flex w-full max-w-sm justify-between mb-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center flex-1"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-0.5">While scrolling</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center flex-1"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-0.5">On Path of a Genius</p>
        </motion.div>
      </div>

      {/* Side-by-side brains */}
      <div className="flex w-full max-w-sm gap-2 items-center">
        {/* Left: dim brain */}
        <div className="flex-1 relative">
          <div
            ref={leftMountRef}
            className="w-full aspect-square"
            style={{ maxHeight: 180, opacity: 0.4 }}
          />
        </div>

        {/* VS divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-white/50">VS</span>
        </motion.div>

        {/* Right: lit brain */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: phase === 'genius' ? 1 : 0.4 }}
            transition={{ duration: 1 }}
          >
            <div
              ref={rightMountRef}
              className="w-full aspect-square"
              style={{ maxHeight: 180 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom text */}
      <AnimatePresence>
        {phase === 'scrolling' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/30 text-center mt-4 max-w-xs"
          >
            Almost nothing happens.
          </motion.p>
        )}
        {phase === 'genius' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-white/70 max-w-xs leading-relaxed mb-2">
              Same time. Same habit. Completely different outcome.
            </p>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
              Tap to continue →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
