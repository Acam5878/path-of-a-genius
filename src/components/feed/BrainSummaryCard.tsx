import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

interface BrainSummaryCardProps {
  activeRegions: Set<string>;
}

export const BrainSummaryCard = ({ activeRegions }: BrainSummaryCardProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const navigate = useNavigate();

  const totalRegions = Object.keys(REGIONS).length;
  const litCount = activeRegions.size;
  const activationPct = Math.round((litCount / totalRegions) * 100);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount);
      rendererRef.current.updateOptions({ activeRegions, isLocked: false });

      // Fire all active regions with staggered pulses
      const regionArray = Array.from(activeRegions);
      regionArray.forEach((r, i) => {
        setTimeout(() => {
          rendererRef.current?.triggerRegionFire(r, 1.0);
          setTimeout(() => rendererRef.current?.triggerRegionFire(r, 0.7), 300);
        }, i * 150);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [activeRegions]);

  // Get labels for lit regions
  const litLabels = Array.from(activeRegions)
    .slice(0, 6)
    .map(r => REGIONS[r])
    .filter(Boolean);

  const handleCta = () => {
    // Mark diagnostic as complete
    localStorage.setItem('genius-academy-diagnostic-complete', 'true');
    navigate('/');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/60 mb-1">Analysis Complete</p>
        <h2 className="font-heading text-xl font-bold text-white">Your Brain Map</h2>
      </motion.div>

      {/* Brain visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full flex justify-center"
      >
        <div
          ref={mountRef}
          className="w-full cursor-grab active:cursor-grabbing"
          style={{ maxWidth: 300, height: 180 }}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mb-3"
      >
        <div className="text-center">
          <span className="text-2xl font-bold text-secondary font-mono">{litCount}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-wider block">active</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <span className="text-2xl font-bold text-white/40 font-mono">{totalRegions - litCount}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-wider block">inactive</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <span className="text-2xl font-bold text-white/80 font-mono">{activationPct}%</span>
          <span className="text-[10px] text-white/40 uppercase tracking-wider block">total</span>
        </div>
      </motion.div>

      {/* Region chips */}
      {litLabels.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-1.5 flex-wrap justify-center mb-4"
        >
          {litLabels.map(r => (
            <span
              key={r.label}
              className="text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
              style={{
                color: r.glowColor,
                borderColor: `${r.glowColor}44`,
                textShadow: `0 0 6px ${r.glowColor}55`,
              }}
            >
              {r.label}
            </span>
          ))}
        </motion.div>
      )}

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-sm text-white/60 leading-relaxed mb-5 max-w-xs"
      >
        {litCount >= 5
          ? "Your brain is lighting up. Take the full assessment to see how you compare."
          : "You've started activating key regions. Take the full assessment to unlock your potential."}
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 300, damping: 25 }}
        onClick={handleCta}
        className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-colors active:scale-95"
      >
        Find out how smart you are
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-[10px] text-white/30 mt-2"
      >
        Free · No account required to start
      </motion.p>
    </div>
  );
};
