import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackBrainSlideViewed, trackBrainSlideCTATapped } from '@/lib/posthog';

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
  const { formatted: learnerCount } = useLearnerCount();

  useEffect(() => {
    trackBrainSlideViewed();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between h-full px-6 py-8 overflow-hidden">
      {/* Dramatic ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      {/* Top section */}
      <div className="flex flex-col items-center flex-1 justify-center w-full">
        {/* Micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-5"
        >
          <Sparkles className="w-3 h-3 text-secondary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">60-Second Brain Scan</span>
        </motion.div>

        {/* THE HOOK — big, bold, question-driven */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-2"
        >
          <h2 className="font-heading text-[28px] md:text-4xl font-bold text-foreground leading-[1.15] tracking-tight">
            What If You Could<br />
            <motion.span
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-secondary"
            >
              Unlock 100% of<br />Your Brain?
            </motion.span>
          </h2>
        </motion.div>

        {/* Subtext — the provocative stat */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-sm text-center max-w-[260px] leading-relaxed mb-5"
        >
          Most people use <span className="text-foreground font-semibold">less than 8%</span> of their cognitive potential. Where do you rank?
        </motion.p>

        {/* Brain visual — single, dramatic, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
          className="w-44 h-44 mb-5 relative"
        >
          <BrainSVG lit={true} />
          {/* Percentage overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-secondary/30"
          >
            <span className="text-xs font-bold font-mono">?%</span>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 25 }}
          className="w-full max-w-sm"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              trackBrainSlideCTATapped();
              onNext?.();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base transition-all shadow-xl shadow-secondary/25 active:shadow-md"
          >
            Scan My Brain
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-1.5 mt-2.5"
          >
            <Timer className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">60 seconds · 9 questions · Completely free</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex flex-col items-center gap-2.5 pt-4 w-full"
      >
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-secondary fill-secondary" />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">4.8 on the App Store</span>
        </div>
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
