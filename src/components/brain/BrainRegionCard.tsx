import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { createBrainRenderer, REGIONS, COURSE_REGION_MAP } from '@/components/home/brain/brainRenderer';

// IQ category → brain region mapping
const IQ_CATEGORY_REGIONS: Record<string, string[]> = {
  verbal: ['wernicke', 'broca'],
  numerical: ['leftParietal'],
  pattern: ['occipital'],
  logical: ['prefrontal'],
  spatial: ['rightParietal'],
  memory: ['leftTemporal'],
  comprehensive: ['prefrontal', 'leftParietal', 'occipital', 'wernicke'],
};

interface BrainRegionCardProps {
  /** Brain region keys to highlight */
  regions?: string[];
  /** Module ID — auto-resolves regions via COURSE_REGION_MAP */
  moduleId?: string;
  /** IQ category — auto-resolves regions via IQ_CATEGORY_REGIONS */
  iqCategory?: string;
  /** Contextual title, e.g. "This lesson trains" */
  title?: string;
  /** Compact variant for modals */
  compact?: boolean;
}

function resolveRegions(props: BrainRegionCardProps): string[] {
  if (props.regions?.length) return props.regions;
  if (props.iqCategory) return IQ_CATEGORY_REGIONS[props.iqCategory] || ['prefrontal'];
  if (props.moduleId) {
    // Try direct match first, then prefix match
    const direct = COURSE_REGION_MAP[props.moduleId];
    if (direct) return [direct];
    const prefix = Object.keys(COURSE_REGION_MAP).find(k => props.moduleId!.toLowerCase().startsWith(k));
    if (prefix) return [COURSE_REGION_MAP[prefix]];
  }
  return ['prefrontal'];
}

export const BrainRegionCard = (props: BrainRegionCardProps) => {
  const { title = 'This activates your', compact = false } = props;
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const activeRegions = resolveRegions(props);

  useEffect(() => {
    if (!mountRef.current) return;
    const renderer = createBrainRenderer(mountRef.current);
    rendererRef.current = renderer;
    renderer.updateOptions({ activeRegions: new Set(activeRegions), isLocked: false });

    // Fire active regions on mount for visual pop
    setTimeout(() => {
      activeRegions.forEach(r => renderer.triggerRegionFire(r, 0.9));
    }, 300);

    return () => renderer.dispose();
  }, [activeRegions.join(',')]);

  const regionData = activeRegions.map(r => REGIONS[r]).filter(Boolean);
  const brainHeight = compact ? 'h-32' : 'h-40';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-secondary/20 bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] overflow-hidden"
    >
      <div className={compact ? 'p-3' : 'p-4'}>
        <div className="flex items-start gap-3">
          {/* Mini 3D brain */}
          <div
            ref={mountRef}
            className={`${brainHeight} aspect-square rounded-lg overflow-hidden shrink-0 cursor-grab active:cursor-grabbing`}
          />

          {/* Region info */}
          <div className="flex-1 min-w-0 py-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1.5">
              {title}
            </p>
            <div className="space-y-1.5">
              {regionData.map(region => (
                <div key={region.label} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: region.glowColor, boxShadow: `0 0 6px ${region.glowColor}` }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white leading-tight truncate">
                      {region.label}
                    </p>
                    <p className="text-[10px] text-white/50 leading-tight truncate">
                      {region.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
