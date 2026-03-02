import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Lightweight SVG brain — no Three.js, instant render, zero glitch.
 */
const BrainSVG = ({ lit = false }: { lit?: boolean }) => {
  const baseColor = lit ? 'hsl(43, 62%, 52%)' : 'white';
  const baseOpacity = lit ? 1 : 0.15;

  // Region dots positioned around the brain outline
  const regions = [
    { cx: 75, cy: 65, label: 'Prefrontal', color: '#FFD700' },
    { cx: 55, cy: 80, label: 'Broca', color: '#AA44FF' },
    { cx: 130, cy: 80, label: 'Wernicke', color: '#7733EE' },
    { cx: 60, cy: 105, label: 'L-Parietal', color: '#11CCFF' },
    { cx: 140, cy: 105, label: 'R-Parietal', color: '#00F0AA' },
    { cx: 55, cy: 125, label: 'L-Temporal', color: '#FF55AA' },
    { cx: 145, cy: 125, label: 'R-Temporal', color: '#FF9933' },
    { cx: 100, cy: 145, label: 'Occipital', color: '#44FF66' },
    { cx: 85, cy: 90, label: 'Ant-Cing', color: '#FFAA00' },
    { cx: 125, cy: 70, label: 'R-Frontal', color: '#22DDDD' },
    { cx: 100, cy: 80, label: 'Somatosens', color: '#FF4444' },
    { cx: 100, cy: 155, label: 'Cerebellum', color: '#AAFF33' },
  ];

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {/* Ambient glow for lit state */}
      {lit && (
        <motion.circle
          cx="100" cy="105" r="70"
          fill="hsl(43, 62%, 52%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0.04, 0.08] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Brain outline */}
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
      {/* Centre fold */}
      <motion.path
        d="M100 35 L100 165"
        stroke={baseColor}
        strokeWidth="0.8"
        strokeOpacity={baseOpacity * 0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      {/* Sulci */}
      {['M55 75 Q75 65 95 80', 'M105 80 Q125 65 145 75', 'M50 110 Q75 100 95 115', 'M105 115 Q125 100 150 110'].map((d, i) => (
        <motion.path
          key={i} d={d}
          stroke={baseColor} strokeWidth="0.8" strokeOpacity={baseOpacity * 0.5} fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
        />
      ))}

      {/* Region dots — only shown when lit */}
      {lit && regions.map((r, i) => (
        <motion.g key={i}>
          {/* Glow */}
          <motion.circle
            cx={r.cx} cy={r.cy} r="10"
            fill={r.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0.12, 0.25] }}
            transition={{ duration: 2, delay: 1.5 + i * 0.12, repeat: Infinity }}
          />
          {/* Core dot */}
          <motion.circle
            cx={r.cx} cy={r.cy} r="3.5"
            fill={r.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ type: 'spring', delay: 1.5 + i * 0.12 }}
          />
        </motion.g>
      ))}

      {/* Percentage label */}
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

  // Transition to reveal after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6">
      {/* Headline — instant */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-5"
      >
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Unlock <span className="text-secondary">100%</span> of Your Brain
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

      {/* Side-by-side brains — pure SVG, instant */}
      <div className="flex w-full max-w-xs gap-3 items-center mb-2">
        {/* Left: dim brain */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-square flex items-center justify-center"
            style={{ maxHeight: 130 }}
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

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="flex-shrink-0"
        >
          <ArrowRight className="w-5 h-5 text-secondary/60" />
        </motion.div>

        {/* Right: lit brain */}
        <div className="flex-1 relative">
          <div className="w-full aspect-square flex items-center justify-center" style={{ maxHeight: 130 }}>
            <BrainSVG lit={phase === 'reveal'} />
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
            className="text-sm text-muted-foreground text-center mt-3 max-w-xs"
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
            <p className="text-sm text-foreground/70 max-w-xs leading-relaxed mb-4">
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
              className="text-[10px] text-muted-foreground mt-2"
            >
              9 questions · See your brain light up
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
