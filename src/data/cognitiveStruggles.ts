// Shared cognitive struggle → brain region → module mapping
// Used across: Feed diagnosis slide, Home Discover panel, Path module headers

export interface CognitiveStruggle {
  id: string;
  label: string;
  icon: string;
  description: string;
  brainRegions: string[];
  modules: string[];
  benefit: string;
}

export const COGNITIVE_STRUGGLES: CognitiveStruggle[] = [
  {
    id: 'memory',
    label: 'Memory',
    icon: '🧠',
    description: 'Trouble retaining information',
    brainRegions: ['leftTemporal', 'wernicke'],
    modules: ['ancient-greek', 'latin', 'history'],
    benefit: 'Greek & Latin vocabulary drills build memory pathways',
  },
  {
    id: 'words',
    label: 'Words & Language',
    icon: '📖',
    description: 'Struggle with expression or comprehension',
    brainRegions: ['broca', 'wernicke'],
    modules: ['ancient-greek', 'latin', 'rhetoric', 'languages'],
    benefit: 'Classical languages strengthen verbal processing',
  },
  {
    id: 'numbers',
    label: 'Numbers & Math',
    icon: '🔢',
    description: 'Difficulty with numerical reasoning',
    brainRegions: ['leftParietal'],
    modules: ['mathematics', 'physics'],
    benefit: "Euclid's geometry rewires numerical intuition",
  },
  {
    id: 'focus',
    label: 'Focus',
    icon: '🎯',
    description: "Can't concentrate or think deeply",
    brainRegions: ['prefrontal'],
    modules: ['logic', 'thought-experiments'],
    benefit: 'Logic training strengthens executive function',
  },
  {
    id: 'critical-thinking',
    label: 'Critical Thinking',
    icon: '⚖️',
    description: 'Hard to evaluate arguments or decisions',
    brainRegions: ['prefrontal', 'anteriorCing'],
    modules: ['logic', 'ethics', 'thought-experiments'],
    benefit: 'Formal reasoning builds analytical judgment',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: '✨',
    description: 'Feel stuck or uncreative',
    brainRegions: ['rightTemporal', 'rightFrontal'],
    modules: ['literature', 'natural-history', 'engineering'],
    benefit: 'Literature & design thinking unlock creative pathways',
  },
];

// Maps module IDs to their cognitive benefits (brain region badge + benefit sentence)
export const MODULE_COGNITIVE_BENEFITS: Record<string, { brainRegion: string; brainLabel: string; glowColor: string; benefit: string }> = {
  'ancient-greek': { brainRegion: 'wernicke', brainLabel: "Wernicke's Area", glowColor: '#7733EE', benefit: 'Strengthens language comprehension & verbal memory' },
  'logic': { brainRegion: 'prefrontal', brainLabel: 'Prefrontal Cortex', glowColor: '#FFD700', benefit: 'Builds executive reasoning & analytical judgment' },
  'latin': { brainRegion: 'broca', brainLabel: "Broca's Area", glowColor: '#AA44FF', benefit: 'Enhances language production & grammatical precision' },
  'languages': { brainRegion: 'wernicke', brainLabel: "Wernicke's & Broca's", glowColor: '#7733EE', benefit: 'Strengthens multilingual processing & verbal fluency' },
  'mathematics': { brainRegion: 'leftParietal', brainLabel: 'Left Parietal Lobe', glowColor: '#11CCFF', benefit: 'Develops numerical reasoning & spatial logic' },
  'physics': { brainRegion: 'rightParietal', brainLabel: 'Right Parietal Lobe', glowColor: '#00F0AA', benefit: 'Trains spatial modelling & physics intuition' },
  'chemistry': { brainRegion: 'occipital', brainLabel: 'Occipital Lobe', glowColor: '#44FF66', benefit: 'Sharpens visual pattern recognition & structure analysis' },
  'natural-history': { brainRegion: 'rightParietal', brainLabel: 'Right Parietal Lobe', glowColor: '#00F0AA', benefit: 'Develops observation skills & spatial reasoning' },
  'literature': { brainRegion: 'rightTemporal', brainLabel: 'Right Temporal Lobe', glowColor: '#FF9933', benefit: 'Expands narrative comprehension & emotional depth' },
  'history': { brainRegion: 'leftTemporal', brainLabel: 'Left Temporal Lobe', glowColor: '#FF55AA', benefit: 'Strengthens verbal memory & causal reasoning' },
  'ethics': { brainRegion: 'anteriorCing', brainLabel: 'Anterior Cingulate', glowColor: '#FFAA00', benefit: 'Develops moral reasoning & empathetic judgment' },
  'rhetoric': { brainRegion: 'broca', brainLabel: "Broca's Area", glowColor: '#AA44FF', benefit: 'Enhances persuasive speech & clear expression' },
  'thought-experiments': { brainRegion: 'prefrontal', brainLabel: 'Prefrontal Cortex', glowColor: '#FFD700', benefit: 'Trains abstract reasoning & creative problem-solving' },
  'engineering': { brainRegion: 'cerebellum', brainLabel: 'Cerebellum', glowColor: '#AAFF33', benefit: 'Builds procedural precision & design thinking' },
  'anatomy': { brainRegion: 'somatosensory', brainLabel: 'Somatosensory Cortex', glowColor: '#FF4444', benefit: 'Develops bodily schema & structural understanding' },
  'natural-philosophy': { brainRegion: 'rightFrontal', brainLabel: 'Right Frontal Lobe', glowColor: '#22DDDD', benefit: 'Expands philosophical abstraction & wonder' },
};
