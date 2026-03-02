import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';
import { ArrowRight } from 'lucide-react';

/**
 * Lightweight SVG brain silhouette shown instantly while WebGL loads.
 * Fades out once the 3D renderer is ready.
 */
const BrainSilhouette = ({ glow = false }: { glow?: boolean }) => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
    {/* Ambient glow */}
    {glow && (
      <motion.circle
        cx="100" cy="95" r="60"
        fill="hsl(43, 62%, 52%)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0.06, 0.12] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    )}
    {/* Brain outline — simple, recognisable */}
    <motion.path
      d="M100 30 C60 30 35 60 35 95 C35 130 55 155 80 165 C85 167 90 170 95 170 L105 170 C110 170 115 167 120 165 C145 155 165 130 165 95 C165 60 140 30 100 30Z"
      stroke={glow ? 'hsl(43, 62%, 52%)' : 'white'}
      strokeWidth="1.5"
      strokeOpacity={glow ? 0.5 : 0.15}
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    {/* Centre fold */}
    <motion.path
      d="M100 35 L100 165"
      stroke={glow ? 'hsl(43, 62%, 52%)' : 'white'}
      strokeWidth="0.8"
      strokeOpacity={glow ? 0.3 : 0.08}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    {/* Sulci lines */}
    {[
      'M55 75 Q75 65 95 80',
      'M105 80 Q125 65 145 75',
      'M50 110 Q75 100 95 115',
      'M105 115 Q125 100 150 110',
    ].map((d, i) => (
      <motion.path
        key={i}
        d={d}
        stroke={glow ? 'hsl(43, 62%, 52%)' : 'white'}
        strokeWidth="0.8"
        strokeOpacity={glow ? 0.25 : 0.06}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
      />
    ))}
    {/* Percentage label */}
    <text
      x="100" y="100"
      textAnchor="middle"
      dominantBaseline="central"
      fill={glow ? 'hsl(43, 62%, 52%)' : 'white'}
      fillOpacity={glow ? 0.7 : 0.2}
      fontSize="28"
      fontWeight="bold"
      fontFamily="monospace"
    >
      {glow ? '100%' : '~8%'}
    </text>
  </svg>
);

export const FeedBrainComparison = ({ onNext }: { onNext?: () => void }) => {
  const rightMountRef = useRef<HTMLDivElement>(null);
  const rightRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [phase, setPhase] = useState<'intro' | 'reveal'>('intro');
  const [webglReady, setWebglReady] = useState(false);

  // Only render ONE brain (the "after" brain) — and defer it
  useEffect(() => {
    const mount = rightMountRef.current;
    if (!mount) return;

    // Delay WebGL init to let the page paint first
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rightRendererRef.current = createBrainRenderer(mount);
      rightRendererRef.current.updateOptions({ activeRegions: new Set(), isLocked: false });
      setWebglReady(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      rightRendererRef.current?.dispose();
      rightRendererRef.current = null;
    };
  }, []);

  // After 2.5s, transition to the "reveal" phase and light up
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('reveal');
      if (rightRendererRef.current) {
        const allRegions = new Set(Object.keys(REGIONS));
        rightRendererRef.current.updateOptions({ activeRegions: allRegions, isLocked: false });
        Object.keys(REGIONS).forEach((r, i) => {
          setTimeout(() => rightRendererRef.current?.triggerRegionFire(r, 1.0), i * 80);
        });
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6">
      {/* Hook headline — instant, no delay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-5"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
          Unlock <span className="text-secondary">100%</span> of Your Brain
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/40 text-sm mt-2"
        >
          Most people only use a fraction.
        </motion.p>
      </motion.div>

      {/* Side-by-side: SVG left (instant) + WebGL right (deferred) */}
      <div className="flex w-full max-w-xs gap-3 items-center mb-2">
        {/* Left: dim SVG brain — instant render */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-square flex items-center justify-center"
            style={{ maxHeight: 130 }}
          >
            <BrainSilhouette glow={false} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[9px] font-mono uppercase tracking-widest text-white/30 text-center mt-1"
          >
            You now
          </motion.p>
        </div>

        {/* Arrow divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="flex-shrink-0"
        >
          <ArrowRight className="w-5 h-5 text-secondary/60" />
        </motion.div>

        {/* Right: WebGL brain (deferred) with SVG fallback */}
        <div className="flex-1 relative">
          <div className="w-full aspect-square relative" style={{ maxHeight: 130 }}>
            {/* SVG fallback shown until WebGL ready + reveal phase */}
            {(!webglReady || phase === 'intro') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainSilhouette glow={phase === 'reveal'} />
              </div>
            )}
            {/* WebGL canvas — hidden until reveal */}
            <motion.div
              ref={rightMountRef}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'reveal' && webglReady ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-[9px] font-mono uppercase tracking-widest text-secondary text-center mt-1"
          >
            You in 2 weeks
          </motion.p>
        </div>
      </div>

      {/* Bottom text + CTA */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/30 text-center mt-3 max-w-xs"
          >
            Your brain while scrolling social media.
          </motion.p>
        )}
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-3"
          >
            <p className="text-sm text-white/70 max-w-xs leading-relaxed mb-4">
              Same time. Same habit. Completely different outcome.
            </p>
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold text-sm hover:bg-secondary/90 transition-colors active:scale-95 mx-auto shadow-lg shadow-secondary/25"
            >
              Take the 60s Quiz
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[10px] text-white/30 mt-2"
            >
              9 questions · See your brain light up
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
