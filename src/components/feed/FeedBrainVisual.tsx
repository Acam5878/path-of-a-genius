import { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface FeedBrainVisualProps {
  activeRegions: Set<string>;
  /** Show the CTA to get full analysis */
  showCta?: boolean;
}

// Map quiz ID prefixes to brain regions
export const QUIZ_BRAIN_MAP: Record<string, string> = {
  'curated': 'rightParietal',
  'fq-lat': 'broca',
  'fq-chem': 'occipital',
  'fq-phys': 'rightParietal',
  'fq-logic': 'prefrontal',
  'fq-grk': 'wernicke',
  'fq-math': 'leftParietal',
  'iq': 'prefrontal',
  'diag-phys': 'rightParietal',
  'diag-phil': 'wernicke',
  'diag-logic': 'prefrontal',
  'diag-math': 'leftParietal',
  'diag-lat': 'broca',
  'diag-mem': 'leftTemporal',
  'diag-lit': 'rightTemporal',
  'diag-ethics': 'anteriorCing',
  'diag-eng': 'cerebellum',
};

// Map flashcard module prefixes to brain regions
export const MODULE_BRAIN_MAP: Record<string, string> = {
  greek: 'wernicke',
  latin: 'broca',
  math: 'leftParietal',
  physics: 'rightParietal',
  chemistry: 'occipital',
  logic: 'prefrontal',
  ethics: 'anteriorCing',
  literature: 'rightTemporal',
  engineering: 'cerebellum',
  anatomy: 'somatosensory',
  rhetoric: 'broca',
  philosophy: 'rightFrontal',
};

/** Get brain region from a quiz ID */
export function getRegionFromQuizId(quizId: string): string | null {
  for (const [prefix, region] of Object.entries(QUIZ_BRAIN_MAP)) {
    if (quizId.startsWith(prefix)) return region;
  }
  return 'prefrontal'; // default fallback
}

/** Get brain region from a flashcard module ID */
export function getRegionFromModuleId(moduleId: string): string | null {
  const prefix = moduleId.split('-')[0].toLowerCase();
  return MODULE_BRAIN_MAP[prefix] || null;
}

export const FeedBrainVisual = ({ activeRegions, showCta = false }: FeedBrainVisualProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const prevRegionCountRef = useRef(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalRegions = Object.keys(REGIONS).length;
  const litCount = activeRegions.size;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      
      if (!rendererRef.current) {
        rendererRef.current = createBrainRenderer(mount);
      }
      
      rendererRef.current.updateOptions({ activeRegions, isLocked: false });

      // Fire newly added regions dramatically
      if (activeRegions.size > prevRegionCountRef.current) {
        activeRegions.forEach(r => {
          rendererRef.current?.triggerRegionFire(r, 1.0);
          setTimeout(() => rendererRef.current?.triggerRegionFire(r, 0.6), 400);
        });
      }
      prevRegionCountRef.current = activeRegions.size;
    }, 100);

    return () => clearTimeout(timer);
  }, [activeRegions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Brain visualization */}
      <div className="relative w-full flex justify-center">
        <div
          ref={mountRef}
          className="w-full pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ maxWidth: 280, height: 140 }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
        />
      </div>

      {/* Region counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1.5 mb-1"
      >
        <span className="text-[10px] font-mono text-secondary font-bold">{litCount}</span>
        <span className="text-[10px] text-white/40">/ {totalRegions} regions active</span>
      </motion.div>

      {/* CTA for full brain analysis */}
      <AnimatePresence>
        {showCta && litCount >= 2 && (
          <motion.button
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => {
              e.stopPropagation();
              if (user) {
                navigate('/iq-tests');
              } else {
                navigate('/auth');
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-[10px] font-semibold mb-2 hover:bg-secondary/30 transition-colors"
          >
            {user ? 'Get Full Brain Analysis' : 'Sign Up for Full Brain Analysis'}
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
