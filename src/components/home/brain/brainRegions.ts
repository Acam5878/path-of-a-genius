// ─────────────────────────────────────────────────────────────────────────────
// BRAIN REGIONS — neuroscience-based mapping
// Extracted from brainRenderer.ts so consumers can import region data
// without pulling in three.js (219KB).
// ─────────────────────────────────────────────────────────────────────────────

export const REGIONS: Record<string, { label: string; color: [number, number, number]; glowColor: string; desc: string }> = {
  prefrontal:    { label: "Prefrontal Cortex",      color: [1.0, 0.85, 0.1],  glowColor: "#FFD700", desc: "Executive reasoning & judgment" },
  broca:         { label: "Broca's Area",            color: [0.8, 0.3, 1.0],   glowColor: "#AA44FF", desc: "Language production & grammar" },
  wernicke:      { label: "Wernicke's Area",         color: [0.5, 0.2, 0.95],  glowColor: "#7733EE", desc: "Language comprehension" },
  leftParietal:  { label: "Left Parietal Lobe",      color: [0.1, 0.8, 1.0],   glowColor: "#11CCFF", desc: "Numerical & spatial reasoning" },
  rightParietal: { label: "Right Parietal Lobe",     color: [0.1, 0.95, 0.7],  glowColor: "#00F0AA", desc: "Physics intuition & spatial modelling" },
  leftTemporal:  { label: "Left Temporal Lobe",      color: [1.0, 0.4, 0.7],   glowColor: "#FF55AA", desc: "Verbal memory & linguistic detail" },
  rightTemporal: { label: "Right Temporal Lobe",     color: [1.0, 0.6, 0.2],   glowColor: "#FF9933", desc: "Narrative, metaphor & poetry" },
  occipital:     { label: "Occipital Lobe",          color: [0.3, 1.0, 0.4],   glowColor: "#44FF66", desc: "Visual pattern recognition" },
  anteriorCing:  { label: "Anterior Cingulate",      color: [1.0, 0.7, 0.0],   glowColor: "#FFAA00", desc: "Moral reasoning & empathy" },
  rightFrontal:  { label: "Right Frontal Lobe",      color: [0.2, 0.9, 0.9],   glowColor: "#22DDDD", desc: "Philosophical abstraction & wonder" },
  somatosensory: { label: "Somatosensory Cortex",    color: [1.0, 0.3, 0.3],   glowColor: "#FF4444", desc: "Bodily schema & physical intuition" },
  cerebellum:    { label: "Cerebellum",              color: [0.7, 1.0, 0.2],   glowColor: "#AAFF33", desc: "Procedural skill & design precision" },
};

// Course → region mapping (maps subject prefixes to brain regions)
export const COURSE_REGION_MAP: Record<string, string> = {
  greek: 'wernicke',
  latin: 'broca',
  mathematics: 'leftParietal',
  math: 'leftParietal',
  calculus: 'leftParietal',
  arithmetic: 'leftParietal',
  physics: 'rightParietal',
  chemistry: 'occipital',
  engineering: 'cerebellum',
  ethics: 'anteriorCing',
  logic: 'prefrontal',
  rhetoric: 'broca',
  literature: 'rightTemporal',
  reading: 'leftTemporal',
  history: 'rightTemporal',
  anatomy: 'somatosensory',
  'natural-history': 'occipital',
  'thought-experiments': 'rightFrontal',
  'ancient-greek': 'wernicke',
  languages: 'wernicke',
};
