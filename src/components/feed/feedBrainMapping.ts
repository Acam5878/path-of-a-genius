// Lightweight brain region mapping utilities — no Three.js dependency

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
  return 'prefrontal';
}

/** Get brain region from a flashcard module ID */
export function getRegionFromModuleId(moduleId: string): string | null {
  const prefix = moduleId.split('-')[0].toLowerCase();
  return MODULE_BRAIN_MAP[prefix] || null;
}
