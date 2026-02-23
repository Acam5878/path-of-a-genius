import { useEffect, useRef } from 'react';
import { createBrainRenderer, REGIONS } from './brainRenderer';

// Genius → brain regions they excelled in
const GENIUS_REGIONS: Record<string, string[]> = {
  'john-stuart-mill': ['wernicke', 'broca', 'prefrontal', 'leftTemporal', 'anteriorCing'],
  'leonardo-da-vinci': ['occipital', 'rightParietal', 'cerebellum', 'somatosensory', 'rightFrontal'],
  'isaac-newton': ['leftParietal', 'rightParietal', 'prefrontal', 'occipital'],
  'marie-curie': ['occipital', 'leftParietal', 'prefrontal', 'rightParietal'],
  'nikola-tesla': ['cerebellum', 'rightParietal', 'prefrontal', 'occipital'],
  'albert-einstein': ['leftParietal', 'rightParietal', 'prefrontal', 'rightFrontal'],
  'aristotle': ['prefrontal', 'broca', 'anteriorCing', 'rightFrontal', 'leftTemporal'],
  'blaise-pascal': ['leftParietal', 'prefrontal', 'rightFrontal', 'broca'],
  'gottfried-leibniz': ['leftParietal', 'prefrontal', 'broca', 'rightFrontal'],
  'goethe': ['rightTemporal', 'broca', 'wernicke', 'anteriorCing', 'leftTemporal', 'rightFrontal'],
};

interface GeniusBrainVisualProps {
  geniusId: string;
  className?: string;
  height?: number;
}

export const GeniusBrainVisual = ({ geniusId, className = '', height = 220 }: GeniusBrainVisualProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      const renderer = createBrainRenderer(mount);
      rendererRef.current = renderer;

      const regions = new Set(GENIUS_REGIONS[geniusId] || ['prefrontal']);
      renderer.updateOptions({ activeRegions: regions, isLocked: false });
    }, 100);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [geniusId]);

  // Get lit region labels
  const regions = GENIUS_REGIONS[geniusId] || ['prefrontal'];
  const litLabels = regions.slice(0, 4).map(r => REGIONS[r]);

  return (
    <div className={className}>
      <div
        ref={mountRef}
        className="w-full cursor-grab active:cursor-grabbing"
        style={{ height }}
      />
      <div className="flex gap-1.5 flex-wrap justify-center mt-2">
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
      </div>
    </div>
  );
};
