import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackBrainSlideViewed, trackBrainSlideCTATapped } from '@/lib/posthog';

/* ── Region data shared by both brain states ───────────── */
const REGIONS = [
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

const NEURAL_PATHS = [
  'M55 75 Q75 65 95 80',
  'M105 80 Q125 65 145 75',
  'M50 110 Q75 100 95 115',
  'M105 115 Q125 100 150 110',
  'M70 70 Q85 90 75 120',
  'M130 70 Q115 90 125 120',
  'M80 145 Q100 130 120 145',
];

/* ── SVG Brain — dim or lit ────────────────────────────── */
const BrainSVG = ({ lit = false }: { lit?: boolean }) => {
  const stroke = lit ? 'hsl(43, 62%, 52%)' : 'hsl(215, 15%, 28%)';
  const strokeOp = lit ? 0.7 : 0.3;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <defs>
        {lit && (
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43, 62%, 52%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(43, 62%, 52%)" stopOpacity="0" />
          </radialGradient>
        )}
        {REGIONS.map((r, i) => lit && (
          <radialGradient key={`g${i}`} id={`rg${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={r.color} stopOpacity="0.9" />
            <stop offset="60%" stopColor={r.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={r.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* Ambient glow behind lit brain */}
      {lit && (
        <motion.circle
          cx="100" cy="105" r="75"
          fill="url(#brainGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Brain outline */}
      <motion.path
        d="M100 30 C60 30 35 60 35 95 C35 130 55 155 80 165 C85 167 90 170 95 170 L105 170 C110 170 115 167 120 165 C145 155 165 130 165 95 C165 60 140 30 100 30Z"
        stroke={stroke}
        strokeWidth={lit ? 1.5 : 1}
        strokeOpacity={strokeOp}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Central fissure */}
      <motion.path
        d="M100 35 L100 165"
        stroke={stroke} strokeWidth="0.8" strokeOpacity={strokeOp * 0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* Neural pathways */}
      {NEURAL_PATHS.map((d, i) => (
        <motion.path
          key={i} d={d}
          stroke={lit ? REGIONS[i % REGIONS.length].color : stroke}
          strokeWidth="0.7"
          strokeOpacity={lit ? 0.25 : strokeOp * 0.35}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
        />
      ))}

      {/* Region nodes — dim version: faint grey dots */}
      {!lit && REGIONS.map((r, i) => (
        <motion.circle
          key={i}
          cx={r.cx} cy={r.cy} r="3"
          fill="hsl(215, 15%, 28%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.8 + i * 0.05 }}
        />
      ))}

      {/* Region nodes — lit version: glowing coloured nodes */}
      {lit && REGIONS.map((r, i) => (
        <motion.g key={i}>
          {/* Outer glow */}
          <motion.circle
            cx={r.cx} cy={r.cy} r="14"
            fill={`url(#rg${i})`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: 1 }}
            transition={{ duration: 2.5, delay: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Core dot */}
          <motion.circle
            cx={r.cx} cy={r.cy} r="4"
            fill={r.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.8 + i * 0.1 }}
          />
          {/* Bright center */}
          <motion.circle
            cx={r.cx} cy={r.cy} r="1.5"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, delay: 1 + i * 0.1, repeat: Infinity }}
          />
        </motion.g>
      ))}

      {/* Dim brain: "~8%" text */}
      {!lit && (
        <text
          x="100" y="105"
          textAnchor="middle" dominantBaseline="central"
          fill="hsl(215, 15%, 28%)" fontSize="22" fontWeight="bold" fontFamily="monospace"
          opacity="0.25"
        >
          ~8%
        </text>
      )}
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
    <div className="relative flex flex-col items-center justify-between h-full px-6 py-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      {/* ── Headline ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-2 mb-4"
      >
        <h2 className="font-heading text-[26px] md:text-4xl font-bold text-foreground leading-[1.15] tracking-tight">
          What If You Could
        </h2>
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-[26px] md:text-4xl font-bold text-secondary leading-[1.15] tracking-tight"
        >
          Unlock 100% of Your Brain?
        </motion.h2>
      </motion.div>

      {/* ── Before / After ────────────────────────── */}
      <div className="flex-1 flex items-center w-full max-w-md">
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* LEFT — You Now (dim) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 mb-2">
              <BrainSVG lit={false} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2.5">
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
            <div className="w-32 h-32 md:w-36 md:h-36 mb-2">
              <BrainSVG lit={true} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-2.5">
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

      {/* ── CTA + Trust ───────────────────────────── */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3 pt-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 25 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            trackBrainSlideCTATapped();
            onNext?.();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-xl shadow-secondary/20 active:shadow-md transition-shadow"
        >
          Unlock Your Brain
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-[11px] text-muted-foreground"
        >
          60 seconds · 9 questions · Completely free
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-4 text-muted-foreground pt-1"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="text-[10px]">4.8</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[10px]">100% free</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span className="text-[10px]">{learnerCount}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
