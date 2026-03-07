import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackBrainSlideViewed, trackBrainSlideCTATapped } from '@/lib/posthog';

/* ── 3D-style brain with particle regions ──────────────── */
const BrainSVG = ({ lit = false }: { lit?: boolean }) => {
  const regions = [
    { cx: 100, cy: 55, rx: 22, ry: 16, color: '#11CCFF', label: 'Prefrontal' },
    { cx: 65, cy: 72, rx: 18, ry: 14, color: '#FFD700', label: 'Broca' },
    { cx: 135, cy: 72, rx: 18, ry: 14, color: '#AA44FF', label: 'Motor' },
    { cx: 55, cy: 98, rx: 20, ry: 16, color: '#7733EE', label: 'Temporal L' },
    { cx: 145, cy: 98, rx: 20, ry: 16, color: '#FF9933', label: 'Temporal R' },
    { cx: 75, cy: 120, rx: 16, ry: 14, color: '#00F0AA', label: 'Parietal L' },
    { cx: 125, cy: 120, rx: 16, ry: 14, color: '#FF55AA', label: 'Parietal R' },
    { cx: 100, cy: 105, rx: 14, ry: 12, color: '#22DDDD', label: 'Cingulate' },
    { cx: 100, cy: 138, rx: 22, ry: 14, color: '#44FF66', label: 'Occipital' },
    { cx: 85, cy: 85, rx: 12, ry: 10, color: '#FFAA00', label: 'Wernicke' },
    { cx: 115, cy: 85, rx: 12, ry: 10, color: '#FF4444', label: 'Sensory' },
    { cx: 100, cy: 152, rx: 18, ry: 10, color: '#AAFF33', label: 'Cerebellum' },
  ];

  return (
    <svg viewBox="0 0 200 190" className="w-full h-full" fill="none">
      <defs>
        {/* Organic brain shape clip */}
        <clipPath id={lit ? 'brainClipLit' : 'brainClipDim'}>
          <path d="M100 25 C55 25 30 55 30 95 C30 135 55 162 82 170 C90 173 95 175 100 175 C105 175 110 173 118 170 C145 162 170 135 170 95 C170 55 145 25 100 25Z" />
        </clipPath>
        {regions.map((r, i) => (
          <radialGradient key={`rg${i}${lit}`} id={`rg${lit ? 'L' : 'D'}${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lit ? r.color : 'hsl(215, 15%, 22%)'} stopOpacity={lit ? 0.85 : 0.15} />
            <stop offset="50%" stopColor={lit ? r.color : 'hsl(215, 15%, 18%)'} stopOpacity={lit ? 0.35 : 0.06} />
            <stop offset="100%" stopColor={lit ? r.color : 'hsl(215, 15%, 14%)'} stopOpacity="0" />
          </radialGradient>
        ))}
        {lit && (
          <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43, 62%, 52%)" stopOpacity="0.12" />
            <stop offset="70%" stopColor="hsl(200, 80%, 50%)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {/* Outer atmospheric glow for lit brain */}
      {lit && (
        <motion.ellipse
          cx="100" cy="100" rx="90" ry="85"
          fill="url(#outerGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Brain base shape */}
      <motion.path
        d="M100 25 C55 25 30 55 30 95 C30 135 55 162 82 170 C90 173 95 175 100 175 C105 175 110 173 118 170 C145 162 170 135 170 95 C170 55 145 25 100 25Z"
        fill={lit ? 'hsl(217, 30%, 13%)' : 'hsl(217, 30%, 11%)'}
        stroke={lit ? 'hsl(43, 62%, 52%)' : 'hsl(215, 15%, 22%)'}
        strokeWidth={lit ? 0.8 : 0.5}
        strokeOpacity={lit ? 0.4 : 0.3}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Region blobs clipped to brain shape */}
      <g clipPath={`url(#${lit ? 'brainClipLit' : 'brainClipDim'})`}>
        {regions.map((r, i) => (
          <motion.g key={i}>
            {/* Large soft region blob */}
            <motion.ellipse
              cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry}
              fill={`url(#rg${lit ? 'L' : 'D'}${i})`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: lit ? [0.6, 1, 0.6] : 0.4,
                scale: 1 
              }}
              transition={lit 
                ? { opacity: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }, scale: { duration: 0.5, delay: 0.3 + i * 0.05 } }
                : { duration: 0.5, delay: 0.3 + i * 0.05 }
              }
            />
            {/* Bright core for lit brain */}
            {lit && (
              <motion.ellipse
                cx={r.cx} cy={r.cy} rx={r.rx * 0.35} ry={r.ry * 0.35}
                fill={r.color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.5, 0.9, 0.5], scale: 1 }}
                transition={{ 
                  opacity: { duration: 2, delay: 0.5 + i * 0.12, repeat: Infinity, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 200, delay: 0.5 + i * 0.1 }
                }}
              />
            )}
          </motion.g>
        ))}

        {/* Sulci / fold lines */}
        {[
          'M100 30 L100 170',
          'M55 65 Q80 80 100 75 Q120 80 145 65',
          'M45 110 Q75 95 100 100 Q125 95 155 110',
          'M65 145 Q85 135 100 138 Q115 135 135 145',
        ].map((d, i) => (
          <motion.path
            key={`s${i}`} d={d}
            stroke={lit ? 'hsl(43, 62%, 52%)' : 'hsl(215, 15%, 22%)'}
            strokeWidth="0.6"
            strokeOpacity={lit ? 0.2 : 0.15}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
          />
        ))}
      </g>
    </svg>
  );
};

/* ── Pain / Benefit items ──────────────────────────────── */
const PAIN_POINTS = [
  'Forget names instantly',
  "Can't focus for 10 minutes",
  'Lose every argument',
  'Read a page, remember nothing',
];

const BENEFITS = [
  'Recall anything effortlessly',
  'Deep focus on demand',
  'Win any debate with logic',
  'Retain everything you read',
];

const ListItem = ({ text, variant, delay }: { text: string; variant: 'pain' | 'benefit'; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: variant === 'pain' ? -6 : 6 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="flex items-center gap-2"
  >
    <div className={`w-1 h-1 rounded-full shrink-0 ${variant === 'pain' ? 'bg-muted-foreground/30' : 'bg-secondary'}`} />
    <span className={`text-[11px] leading-snug ${variant === 'pain' ? 'text-muted-foreground/50' : 'text-foreground/90'}`}>
      {text}
    </span>
  </motion.div>
);

/* ── Main component ────────────────────────────────────── */
export const FeedBrainComparison = ({ onNext }: { onNext?: () => void }) => {
  const { formatted: learnerCount } = useLearnerCount();

  useEffect(() => {
    trackBrainSlideViewed();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between h-full px-5 py-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      {/* ── Headline ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3"
      >
        <h2 className="font-heading text-[24px] md:text-4xl font-bold text-foreground leading-[1.15] tracking-tight">
          What If You Could
        </h2>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-[24px] md:text-4xl font-bold text-secondary leading-[1.15] tracking-tight"
        >
          Unlock 100% of Your Brain?
        </motion.h2>
      </motion.div>

      {/* ── Before / After ────────────────────────── */}
      <div className="flex items-start w-full max-w-md">
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* LEFT — You Now (dim) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-36 h-32 md:w-40 md:h-36 mb-1.5">
              <BrainSVG lit={false} />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
              You now
            </span>
            <div className="flex flex-col gap-1.5">
              {PAIN_POINTS.map((p, i) => (
                <ListItem key={p} text={p} variant="pain" delay={0.7 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — You in 30 Days (lit) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-36 h-32 md:w-40 md:h-36 mb-1.5">
              <BrainSVG lit={true} />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-secondary mb-2">
              You in 30 days
            </span>
            <div className="flex flex-col gap-1.5">
              {BENEFITS.map((b, i) => (
                <ListItem key={b} text={b} variant="benefit" delay={0.9 + i * 0.08} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Testimonial ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="w-full max-w-sm mt-3 mb-2"
      >
        <div className="relative px-5 py-3 rounded-xl bg-card/60 border border-border/40">
          <p className="text-[12px] text-foreground/80 italic leading-relaxed text-center">
            "I used to be the smart kid. Somewhere along the way I just… stopped learning. This brought that part of me back."
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5 font-mono">
            — James, 34
          </p>
        </div>
      </motion.div>

      {/* ── CTA + Trust ───────────────────────────── */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2.5">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 25 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            trackBrainSlideCTATapped();
            onNext?.();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-xl shadow-secondary/20 active:shadow-md transition-shadow"
        >
          Unlock Your Brain
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-[10px] text-muted-foreground"
        >
          60 seconds · 9 questions · Completely free
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-3.5 text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="text-[9px]">4.8</span>
          </div>
          <div className="w-px h-2.5 bg-border" />
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span className="text-[9px]">100% free</span>
          </div>
          <div className="w-px h-2.5 bg-border" />
          <div className="flex items-center gap-1">
            <Users className="w-2.5 h-2.5" />
            <span className="text-[9px]">{learnerCount}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
