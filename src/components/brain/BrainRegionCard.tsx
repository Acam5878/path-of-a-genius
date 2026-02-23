import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

// Fun facts about each brain region
const REGION_FUN_FACTS: Record<string, { funFact: string; famousUser: string; scienceNote: string }> = {
  prefrontal: {
    funFact: 'The prefrontal cortex doesn\'t fully mature until age 25 — which is why teenagers take more risks.',
    famousUser: 'Einstein\'s prefrontal cortex had an unusually high density of neurons, contributing to his legendary abstract reasoning.',
    scienceNote: 'This region uses 20% of your brain\'s total energy despite being only ~10% of its volume.',
  },
  broca: {
    funFact: 'Broca\'s Area was discovered in 1861 when Paul Broca studied a patient who could only say one word: "Tan".',
    famousUser: 'Winston Churchill\'s mastery of rhetoric — his speeches that rallied a nation — depended heavily on this region.',
    scienceNote: 'Damage here causes "expressive aphasia": you understand language perfectly but can\'t produce it.',
  },
  wernicke: {
    funFact: 'Wernicke\'s Area lets you understand speech in real-time, processing ~150 words per minute effortlessly.',
    famousUser: 'Polyglots like Cleopatra (who spoke 9 languages) had extraordinarily developed Wernicke\'s Areas.',
    scienceNote: 'Damage here causes "fluent aphasia": you speak smoothly but your words make no sense.',
  },
  leftParietal: {
    funFact: 'Einstein\'s left parietal lobe was 15% wider than average — a region critical for mathematical visualization.',
    famousUser: 'Ramanujan, the self-taught mathematical genius, likely had exceptional left parietal connectivity.',
    scienceNote: 'This region integrates sensory information to form number sense and spatial reasoning about quantities.',
  },
  rightParietal: {
    funFact: 'Your right parietal lobe creates your mental "map" of space — it\'s why you can catch a ball without calculating trajectories.',
    famousUser: 'Da Vinci\'s spatial genius — his ability to draw machines from multiple angles — stemmed from this region.',
    scienceNote: 'Neglect of this area can cause "hemispatial neglect" — patients literally can\'t perceive the left side of space.',
  },
  leftTemporal: {
    funFact: 'Your left temporal lobe stores your "mental dictionary" — the average adult knows ~60,000 words stored here.',
    famousUser: 'Shakespeare\'s verbal memory was legendary — he coined 1,700 new words, all processed through this region.',
    scienceNote: 'This region is critical for "verbal declarative memory" — facts, dates, and sequences you can articulate.',
  },
  rightTemporal: {
    funFact: 'The right temporal lobe processes music, melody, and emotional tone — it\'s why a song can make you cry.',
    famousUser: 'Homer\'s ability to compose and recite the Iliad from memory relied on this region\'s narrative processing.',
    scienceNote: 'This region detects sarcasm and emotional subtext — damage here makes you take everything literally.',
  },
  occipital: {
    funFact: 'Your occipital lobe processes 80% of all sensory information — you\'re primarily a visual creature.',
    famousUser: 'Nikola Tesla could visualize entire machines in his mind before building them — pure occipital power.',
    scienceNote: 'Even when your eyes are closed, this region activates during vivid imagination and dreaming.',
  },
  anteriorCing: {
    funFact: 'The anterior cingulate is your "error detector" — it fires when something doesn\'t match your expectations.',
    famousUser: 'Socrates\' relentless moral questioning activated this region\'s conflict-monitoring circuits.',
    scienceNote: 'Buddhist monks show dramatically increased activity here during compassion meditation.',
  },
  rightFrontal: {
    funFact: 'The right frontal lobe enables "aha moments" — sudden insights that feel like they come from nowhere.',
    famousUser: 'Newton\'s apple moment and Archimedes\' "Eureka!" were right frontal lobe breakthroughs.',
    scienceNote: 'This region is most active during creative problem-solving and philosophical contemplation.',
  },
  somatosensory: {
    funFact: 'Your somatosensory cortex contains a distorted "body map" — lips and hands take up more space than your entire torso.',
    famousUser: 'Da Vinci\'s anatomical drawings required exquisite somatosensory awareness to map the human body.',
    scienceNote: 'Surgeons and musicians develop measurably thicker somatosensory cortices through practice.',
  },
  cerebellum: {
    funFact: 'The cerebellum contains more neurons than the rest of the brain combined — about 69 billion.',
    famousUser: 'Tesla\'s precision engineering and Bach\'s complex musical compositions both demanded cerebellar mastery.',
    scienceNote: 'Beyond coordination, the cerebellum helps with cognitive "sequencing" — planning steps in order.',
  },
};

interface BrainRegionCardProps {
  regions?: string[];
  moduleId?: string;
  iqCategory?: string;
  title?: string;
  compact?: boolean;
  wide?: boolean;
}

function resolveRegions(props: BrainRegionCardProps): string[] {
  if (props.regions?.length) return props.regions;
  if (props.iqCategory) return IQ_CATEGORY_REGIONS[props.iqCategory] || ['prefrontal'];
  if (props.moduleId) {
    const direct = COURSE_REGION_MAP[props.moduleId];
    if (direct) return [direct];
    const prefix = Object.keys(COURSE_REGION_MAP).find(k => props.moduleId!.toLowerCase().startsWith(k));
    if (prefix) return [COURSE_REGION_MAP[prefix]];
  }
  return ['prefrontal'];
}

export const BrainRegionCard = (props: BrainRegionCardProps) => {
  const { title = 'This activates your', compact = false, wide = false } = props;
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const activeRegions = resolveRegions(props);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const renderer = createBrainRenderer(mountRef.current);
    rendererRef.current = renderer;
    renderer.updateOptions({ activeRegions: new Set(activeRegions), isLocked: false });

    setTimeout(() => {
      activeRegions.forEach(r => renderer.triggerRegionFire(r, 0.9));
    }, 300);

    return () => renderer.dispose();
  }, [activeRegions.join(',')]);

  const regionData = activeRegions.map(r => ({ key: r, ...REGIONS[r] })).filter(r => r.label);
  const brainHeight = wide ? 'h-48' : compact ? 'h-32' : 'h-40';
  const reason = props.moduleId ? MODULE_BRAIN_REASONS[props.moduleId] : undefined;
  const selectedFact = selectedRegion ? REGION_FUN_FACTS[selectedRegion] : null;
  const selectedRegionData = selectedRegion ? REGIONS[selectedRegion] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-secondary/20 bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] overflow-hidden"
    >
      <div className={compact ? 'p-3' : 'p-4'}>
        {wide ? (
          /* ── Wide layout: full-width brain on top, region chips below (like HomeBrainCard) ── */
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary">
                {title}
              </p>
              <p className="text-xs text-muted-foreground">
                {regionData.length} regions
              </p>
            </div>
            <div
              ref={mountRef}
              className="w-full h-64 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            />
            {/* Region chips row like the home page */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {regionData.map(region => (
                <button
                  key={region.key}
                  onClick={() => setSelectedRegion(selectedRegion === region.key ? null : region.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedRegion === region.key
                      ? 'border-secondary/50 bg-secondary/15 text-secondary'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-secondary/30 hover:text-secondary'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: region.glowColor, boxShadow: `0 0 6px ${region.glowColor}` }}
                  />
                  {region.label}
                </button>
              ))}
            </div>
            {reason && (
              <p className="text-[11px] text-white/60 leading-relaxed mt-3 text-center">
                {reason}
              </p>
            )}
          </>
        ) : (
          /* ── Compact/default: side-by-side layout ── */
          <div className="flex items-start gap-3">
            <div
              ref={mountRef}
              className={`${brainHeight} aspect-square rounded-lg overflow-hidden shrink-0 cursor-grab active:cursor-grabbing`}
            />
            <div className="flex-1 min-w-0 py-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1.5">
                {title}
              </p>
              <div className="space-y-1.5">
                {regionData.map(region => (
                  <button
                    key={region.key}
                    onClick={() => setSelectedRegion(selectedRegion === region.key ? null : region.key)}
                    className="flex items-center gap-2 w-full text-left group hover:bg-white/5 rounded-md px-1 py-0.5 -mx-1 transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: region.glowColor, boxShadow: `0 0 6px ${region.glowColor}` }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white leading-tight truncate group-hover:text-secondary transition-colors">
                        {region.label}
                      </p>
                      <p className="text-[10px] text-white/50 leading-tight truncate">
                        {region.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {reason && (
                <p className="text-[11px] text-white/60 leading-relaxed mt-2">
                  {reason}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Expandable region info panel */}
        <AnimatePresence>
          {selectedRegion && selectedFact && selectedRegionData && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedRegionData.glowColor, boxShadow: `0 0 8px ${selectedRegionData.glowColor}` }}
                    />
                    <span className="text-xs font-bold text-white">{selectedRegionData.label}</span>
                  </div>
                  <button onClick={() => setSelectedRegion(null)} className="p-0.5 text-white/40 hover:text-white/70 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-[10px] font-mono text-secondary uppercase tracking-wider mb-1">💡 Fun Fact</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{selectedFact.funFact}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-[10px] font-mono text-secondary uppercase tracking-wider mb-1">🏛️ Famous Example</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{selectedFact.famousUser}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-[10px] font-mono text-secondary uppercase tracking-wider mb-1">🔬 Neuroscience</p>
                    <p className="text-[11px] text-white/70 leading-relaxed">{selectedFact.scienceNote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
