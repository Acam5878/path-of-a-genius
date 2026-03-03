import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';

/**
 * Lightweight SVG brain — no Three.js, instant render, zero glitch.
 */
const BrainSVG = ({ lit = false }: { lit?: boolean }) => {
  const baseColor = lit ? 'hsl(43, 62%, 52%)' : 'white';
  const baseOpacity = lit ? 1 : 0.15;

  const regions = [
    { cx: 75, cy: 65, color: '#FFD700' },
    { cx: 55, cy: 80, color: '#AA44FF' },
    { cx: 130, cy: 80, color: '#7733EE' },
    { cx: 60, cy: 105, color: '#11CCFF' },
    { cx: 140, cy: 105, color: '#00F0AA' },
    { cx: 55, cy: 125, color: '#FF55AA' },
    { cx: 145, cy: 125, color: '#FF9933' },
    { cx: 100, cy: 145, color: '#44FF66' },
    { cx: 85, cy: 90, color: '#FFAA00' },
    { cx: 125, cy: 70, color: '#22DDDD' },
    { cx: 100, cy: 80, color: '#FF4444' },
    { cx: 100, cy: 155, color: '#AAFF33' },
  ];

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {lit && (
        <motion.circle
          cx="100" cy="105" r="70"
          fill="hsl(43, 62%, 52%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0.04, 0.08] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <motion.path
        d="M100 30 C60 30 35 60 35 95 C35 130 55 155 80 165 C85 167 90 170 95 170 L105 170 C110 170 115 167 120 165 C145 155 165 130 165 95 C165 60 140 30 100 30Z"
        stroke={baseColor}
        strokeWidth="1.5"
        strokeOpacity={baseOpacity}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M100 35 L100 165"
        stroke={baseColor}
        strokeWidth="0.8"
        strokeOpacity={baseOpacity * 0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      {['M55 75 Q75 65 95 80', 'M105 80 Q125 65 145 75', 'M50 110 Q75 100 95 115', 'M105 115 Q125 100 150 110'].map((d, i) => (
        <motion.path
          key={i} d={d}
          stroke={baseColor} strokeWidth="0.8" strokeOpacity={baseOpacity * 0.5} fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
        />
      ))}
      {lit && regions.map((r, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={r.cx} cy={r.cy} r="10"
            fill={r.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0.12, 0.25] }}
            transition={{ duration: 2, delay: 1.5 + i * 0.12, repeat: Infinity }}
          />
          <motion.circle
            cx={r.cx} cy={r.cy} r="3.5"
            fill={r.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ type: 'spring', delay: 1.5 + i * 0.12 }}
          />
        </motion.g>
      ))}
      <text
        x="100" y="100"
        textAnchor="middle" dominantBaseline="central"
        fill={baseColor}
        fillOpacity={lit ? 0 : 0.2}
        fontSize="28" fontWeight="bold" fontFamily="monospace"
      >
        ~8%
      </text>
    </svg>
  );
};

export const FeedBrainComparison = ({ onNext }: { onNext?: () => void }) => {
  const [phase, setPhase] = useState<'intro' | 'reveal'>('intro');
  const { formatted: learnerCount } = useLearnerCount();

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between h-full px-6 py-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      {/* Top section: headline + brains */}
      <div className="flex flex-col items-center flex-1 justify-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4"
        >
          <Sparkles className="w-3 h-3 text-secondary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">Free Brain Analysis</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Unlock <span className="text-secondary">100%</span> of<br />Your Brain
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm mt-2"
          >
            Most people only use a fraction.
          </motion.p>
        </motion.div>

        {/* Side-by-side brains */}
        <div className="flex w-full max-w-xs gap-3 items-center mb-4">
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-square flex items-center justify-center"
              style={{ maxHeight: 140 }}
            >
              <BrainSVG lit={false} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground text-center mt-1"
            >
              You now
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-5 h-5 text-secondary/60" />
          </motion.div>

          <div className="flex-1 relative">
            <div className="w-full aspect-square flex items-center justify-center" style={{ maxHeight: 140 }}>
              <BrainSVG lit={phase === 'reveal'} />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-[9px] font-mono uppercase tracking-widest text-secondary text-center mt-1"
            >
              You in 2 weeks
            </motion.p>
          </div>
        </div>

        {/* Context text + CTA */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground text-center mt-2 max-w-xs"
            >
              Your brain while scrolling social media.
            </motion.p>
          )}
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-2 w-full max-w-sm"
            >
              <p className="text-sm text-foreground/70 max-w-xs mx-auto leading-relaxed mb-5">
                Same time. Same habit. <span className="text-foreground font-medium">Completely different outcome.</span>
              </p>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-all active:scale-[0.97] mx-auto shadow-lg shadow-secondary/25"
              >
                Find Out How Smart You Are
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-1.5 mt-2.5"
              >
                <Timer className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">60 seconds · 9 questions · See your brain light up</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-2.5 pt-4 w-full"
      >
        {/* Star rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-secondary fill-secondary" />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">4.8 on the App Store</span>
        </div>
        {/* Trust badges */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[10px]">100% free</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            <span className="text-[10px]">{learnerCount} learners</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
