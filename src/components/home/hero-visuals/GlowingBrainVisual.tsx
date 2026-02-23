import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

interface GlowingBrainVisualProps {
  correctQuestions: boolean[];
  title?: string;
}

// Map hero quiz answers to brain regions:
// Q0 (Einstein - Abstract Thinking) → prefrontal + rightFrontal
// Q1 (Da Vinci - Visual-Spatial) → occipital + rightParietal + somatosensory
// Q2 (Newton - Pattern Recognition) → leftParietal + prefrontal
const QUIZ_REGION_MAP: Record<number, string[]> = {
  0: ['prefrontal', 'rightFrontal'],
  1: ['occipital', 'rightParietal', 'somatosensory'],
  2: ['leftParietal', 'prefrontal'],
};

export const GlowingBrainVisual = ({ correctQuestions, title = 'Your Brain' }: GlowingBrainVisualProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const activeRegions = useMemo(() => {
    const regions = new Set<string>();
    correctQuestions.forEach((correct, i) => {
      if (correct && QUIZ_REGION_MAP[i]) {
        QUIZ_REGION_MAP[i].forEach(r => regions.add(r));
      }
    });
    return regions;
  }, [correctQuestions]);

  const litLabels = useMemo(() => {
    return Array.from(activeRegions).slice(0, 4).map(r => REGIONS[r]);
  }, [activeRegions]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      const renderer = createBrainRenderer(mount);
      rendererRef.current = renderer;
      renderer.updateOptions({ activeRegions, isLocked: false });

      // Fire all active regions dramatically on mount
      activeRegions.forEach(r => {
        renderer.triggerRegionFire(r, 1.0);
        setTimeout(() => renderer.triggerRegionFire(r, 0.8), 400);
        setTimeout(() => renderer.triggerRegionFire(r, 0.6), 800);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [activeRegions]);

  const totalRegions = Object.keys(REGIONS).length;

  return (
    <div className="flex flex-col items-center mb-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-1"
      >
        {title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[9px] text-muted-foreground font-mono mb-2"
      >
        {activeRegions.size}/{totalRegions} regions illuminated
      </motion.p>

      <div className="relative w-full flex justify-center">
        <div
          ref={mountRef}
          className="w-full cursor-grab active:cursor-grabbing"
          style={{ maxWidth: 340, height: 200 }}
        />
      </div>

      {litLabels.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-1.5 flex-wrap justify-center mt-1"
        >
          {litLabels.map(r => (
            <span
              key={r.label}
              className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border"
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

      {activeRegions.size < totalRegions && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-[10px] text-secondary mt-2"
        >
          Complete more quizzes to illuminate all {totalRegions} regions
        </motion.p>
      )}
    </div>
  );
};
