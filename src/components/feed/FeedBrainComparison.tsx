import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackBrainSlideViewed, trackBrainSlideCTATapped } from '@/lib/posthog';

/* ── Lightweight SVG brain ─────────────────────────────── */
const BrainSVG = ({ lit = false, size = 'w-full h-full' }: { lit?: boolean; size?: string }) => {
  const baseColor = lit ? 'hsl(43, 62%, 52%)' : 'hsl(215, 15%, 35%)';
  const baseOpacity = lit ? 1 : 0.4;

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
    <svg viewBox="0 0 200 200" className={size} fill="none">
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
    </svg>
  );
};

/* ── Pain / Benefit items ──────────────────────────────── */
const PAIN_POINTS = [
  'Forget names instantly',
  'Can\'t focus for 10 minutes',
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
    initial={{ opacity: 0, x: variant === 'pain' ? -8 : 8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center gap-2"
  >
    <div className={`w-1 h-1 rounded-full shrink-0 ${variant === 'pain' ? 'bg-muted-foreground/40' : 'bg-secondary'}`} />
    <span className={`text-xs leading-tight ${variant === 'pain' ? 'text-muted-foreground/60' : 'text-foreground/90'}`}>
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
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none" />

      {/* ── Top: Headline ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-2 mb-6"
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

      {/* ── Middle: Before / After comparison ─────── */}
      <div className="flex-1 flex items-center w-full max-w-sm">
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* LEFT — You Now */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-3 opacity-40">
              <BrainSVG lit={false} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              You now
            </span>
            <div className="flex flex-col gap-2">
              {PAIN_POINTS.map((p, i) => (
                <ListItem key={p} text={p} variant="pain" delay={0.8 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — You in 30 Days */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-3">
              <BrainSVG lit={true} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-3">
              You in 30 days
            </span>
            <div className="flex flex-col gap-2">
              {BENEFITS.map((b, i) => (
                <ListItem key={b} text={b} variant="benefit" delay={1.0 + i * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: CTA + Trust ──────────────────── */}
      <div className="w-full max-w-sm flex flex-col items-center gap-4 pt-4">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 25 }}
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
          transition={{ delay: 1.4 }}
          className="text-[11px] text-muted-foreground"
        >
          60 seconds · 9 questions · Completely free
        </motion.p>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center gap-4 text-muted-foreground pt-2"
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
