import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackBrainSlideViewed, trackBrainSlideCTATapped } from '@/lib/posthog';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

/* ── 3D Brain mount ────────────────────────────────────── */
const Brain3D = ({ lit = false }: { lit?: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const activeRegions = useMemo(() => {
    if (!lit) return new Set<string>();
    return new Set(Object.keys(REGIONS));
  }, [lit]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;

      if (!rendererRef.current) {
        rendererRef.current = createBrainRenderer(mount);
      }

      rendererRef.current.updateOptions({ activeRegions, isLocked: false });

      // Fire all regions for the lit brain
      if (lit) {
        activeRegions.forEach(r => {
          setTimeout(() => rendererRef.current?.triggerRegionFire(r, 1.0), 300);
          setTimeout(() => rendererRef.current?.triggerRegionFire(r, 0.6), 700);
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [activeRegions, lit]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    />
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
            <div className="w-36 h-32 md:w-44 md:h-40 mb-1.5">
              <Brain3D lit={false} />
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
            <div className="w-36 h-32 md:w-44 md:h-40 mb-1.5">
              <Brain3D lit={true} />
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
            "Everyone always said I was the gifted one. Then life happened — work, bills, screens. I couldn't even finish a book anymore. This made me feel like me again."
          </p>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5 font-mono">
            — Sarah, 29
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
