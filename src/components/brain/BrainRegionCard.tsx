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

// Module-specific explanations of WHY it lights up each region
const MODULE_BRAIN_REASONS: Record<string, string> = {
  'latin': 'Parsing Latin grammar activates Broca\'s Area — the same region used by Cicero and the Founding Fathers to construct precise arguments.',
  'ancient-greek': 'Decoding Greek syntax engages Wernicke\'s Area for deep comprehension — the neural pathway that powered Aristotle\'s logical thinking.',
  'logic': 'Formal reasoning directly exercises your Prefrontal Cortex — the seat of executive function that separates deliberate thought from impulse.',
  'mathematics': 'Number theory and proof-writing fire your Left Parietal Lobe — the region Einstein\'s brain was physically larger in.',
  'languages': 'Multilingual processing strengthens both Wernicke\'s and Broca\'s areas, building denser neural connections between comprehension and production.',
  'natural-philosophy': 'Philosophical abstraction activates the Right Frontal Lobe — the region responsible for wonder, big-picture thinking, and conceptual leaps.',
  'chemistry': 'Pattern recognition in molecular structures lights up the Occipital Lobe — training your brain to see invisible structures.',
  'natural-history': 'Spatial reasoning about natural systems engages the Right Parietal Lobe — da Vinci\'s key strength for mapping anatomy and nature.',
  'literature': 'Processing narrative and metaphor activates the Right Temporal Lobe — the region that gives language its emotional and poetic depth.',
  'history': 'Memorising timelines and causal chains strengthens the Left Temporal Lobe — your brain\'s verbal memory and pattern archive.',
  'ethics': 'Moral reasoning uniquely engages the Anterior Cingulate Cortex — the region that weighs competing values and resolves ethical dilemmas.',
  'rhetoric': 'Crafting persuasive speech activates Broca\'s Area — training the same neural circuits that powered Churchill\'s and Lincoln\'s oratory.',
  'engineering': 'Procedural design thinking fires the Cerebellum — building the precision and sequential mastery that powered Tesla\'s inventions.',
  'anatomy': 'Mapping the body engages the Somatosensory Cortex — the region da Vinci activated during his legendary anatomical dissections.',
  'thought-experiments': 'Abstract visualisation engages the Occipital and Prefrontal regions — the neural combination Einstein used for his gedankenexperiments.',
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
  const reason = props.moduleId ? MODULE_BRAIN_REASONS[props.moduleId] : undefined;

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
            {reason && (
              <p className="text-[11px] text-white/60 leading-relaxed mt-2">
                {reason}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
