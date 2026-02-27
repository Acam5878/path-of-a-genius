// Cognitive profiles for genius bot challengers
// Each genius has accuracy rates per IQ category (0-1) reflecting their real strengths

import type { IQCategory } from './iqTypes';

export interface GeniusCognitiveProfile {
  geniusId: string;
  name: string;
  title: string; // e.g. "The Polymath"
  difficulty: 'standard' | 'genius'; // genius = premium only
  accuracy: Record<Exclude<IQCategory, 'comprehensive'>, number>; // 0-1 per category
  responseSpeed: number; // avg seconds per question (lower = faster)
  taunt: string; // shown during challenge
  defeatQuote: string;
  victoryQuote: string;
}

export const geniusCognitiveProfiles: GeniusCognitiveProfile[] = [
  {
    geniusId: 'john-stuart-mill',
    name: 'John Stuart Mill',
    title: 'The Prodigy',
    difficulty: 'standard',
    accuracy: {
      verbal: 0.95,
      numerical: 0.70,
      spatial: 0.50,
      logical: 0.92,
      memory: 0.88,
      'pattern-recognition': 0.65,
    },
    responseSpeed: 8,
    taunt: "I was reading Greek at 3. Let's see what you've got.",
    defeatQuote: "A worthy opponent — perhaps education has progressed after all.",
    victoryQuote: "The mental faculties require exercise, not just talent.",
  },
  {
    geniusId: 'marie-curie',
    name: 'Marie Curie',
    title: 'The Pioneer',
    difficulty: 'standard',
    accuracy: {
      verbal: 0.72,
      numerical: 0.90,
      spatial: 0.75,
      logical: 0.88,
      memory: 0.82,
      'pattern-recognition': 0.85,
    },
    responseSpeed: 10,
    taunt: "Nothing in life is to be feared. Especially not a quiz.",
    defeatQuote: "You have the mind of a scientist. Keep questioning.",
    victoryQuote: "Persistence beats talent. I should know.",
  },
  {
    geniusId: 'nikola-tesla',
    name: 'Nikola Tesla',
    title: 'The Visionary',
    difficulty: 'standard',
    accuracy: {
      verbal: 0.60,
      numerical: 0.88,
      spatial: 0.95,
      logical: 0.85,
      memory: 0.92,
      'pattern-recognition': 0.90,
    },
    responseSpeed: 7,
    taunt: "I could visualise entire machines in my mind. 15 questions? Easy.",
    defeatQuote: "Your mental electricity is impressive. Edison would be jealous.",
    victoryQuote: "The present is theirs, but the future is mine.",
  },
  {
    geniusId: 'aristotle',
    name: 'Aristotle',
    title: 'The Philosopher',
    difficulty: 'standard',
    accuracy: {
      verbal: 0.93,
      numerical: 0.65,
      spatial: 0.55,
      logical: 0.95,
      memory: 0.80,
      'pattern-recognition': 0.70,
    },
    responseSpeed: 12,
    taunt: "I catalogued all human knowledge. This shall be… instructive.",
    defeatQuote: "The mark of an educated mind. Well played.",
    victoryQuote: "We are what we repeatedly do. Excellence is a habit.",
  },
  {
    geniusId: 'blaise-pascal',
    name: 'Blaise Pascal',
    title: 'The Calculator',
    difficulty: 'standard',
    accuracy: {
      verbal: 0.75,
      numerical: 0.95,
      spatial: 0.68,
      logical: 0.90,
      memory: 0.72,
      'pattern-recognition': 0.82,
    },
    responseSpeed: 6,
    taunt: "I invented probability theory. The odds are not in your favour.",
    defeatQuote: "You've beaten the odds. Remarkable.",
    victoryQuote: "The heart has its reasons, but mathematics has mine.",
  },
  // ---- Premium / Genius-tier opponents ----
  {
    geniusId: 'albert-einstein',
    name: 'Albert Einstein',
    title: 'The Genius',
    difficulty: 'genius',
    accuracy: {
      verbal: 0.70,
      numerical: 0.92,
      spatial: 0.97,
      logical: 0.95,
      memory: 0.78,
      'pattern-recognition': 0.93,
    },
    responseSpeed: 9,
    taunt: "Imagination is more important than knowledge. But let's test both.",
    defeatQuote: "You think like a physicist. That's the highest compliment I give.",
    victoryQuote: "I have no special talents. I am only passionately curious.",
  },
  {
    geniusId: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    title: 'The Polymath',
    difficulty: 'genius',
    accuracy: {
      verbal: 0.80,
      numerical: 0.78,
      spatial: 0.98,
      logical: 0.85,
      memory: 0.88,
      'pattern-recognition': 0.95,
    },
    responseSpeed: 8,
    taunt: "I painted the Mona Lisa AND designed flying machines. What can you do?",
    defeatQuote: "Learning never exhausts the mind — yours is proof.",
    victoryQuote: "Simplicity is the ultimate sophistication.",
  },
  {
    geniusId: 'isaac-newton',
    name: 'Isaac Newton',
    title: 'The Titan',
    difficulty: 'genius',
    accuracy: {
      verbal: 0.65,
      numerical: 0.97,
      spatial: 0.88,
      logical: 0.96,
      memory: 0.80,
      'pattern-recognition': 0.90,
    },
    responseSpeed: 11,
    taunt: "I invented calculus out of boredom. This should be trivial.",
    defeatQuote: "If I have seen further, perhaps you stand on MY shoulders now.",
    victoryQuote: "What we know is a drop. What we don't know is an ocean.",
  },
  {
    geniusId: 'gottfried-leibniz',
    name: 'Gottfried Leibniz',
    title: 'The Universal Genius',
    difficulty: 'genius',
    accuracy: {
      verbal: 0.88,
      numerical: 0.95,
      spatial: 0.72,
      logical: 0.97,
      memory: 0.90,
      'pattern-recognition': 0.88,
    },
    responseSpeed: 7,
    taunt: "I also invented calculus. Newton and I can debate later — you first.",
    defeatQuote: "This is the best of all possible outcomes. For you.",
    victoryQuote: "Music is the pleasure the human mind experiences from counting without being aware.",
  },
  {
    geniusId: 'goethe',
    name: 'Johann Wolfgang von Goethe',
    title: 'The Sage',
    difficulty: 'genius',
    accuracy: {
      verbal: 0.97,
      numerical: 0.62,
      spatial: 0.70,
      logical: 0.80,
      memory: 0.92,
      'pattern-recognition': 0.75,
    },
    responseSpeed: 10,
    taunt: "I wrote Faust. A mere quiz holds no terror for me.",
    defeatQuote: "Whatever you can do or dream, you have done it. Well played.",
    victoryQuote: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
  },
];

export const getGeniusProfile = (geniusId: string): GeniusCognitiveProfile | undefined => {
  return geniusCognitiveProfiles.find(p => p.geniusId === geniusId);
};

export const getStandardGeniuses = () => geniusCognitiveProfiles.filter(p => p.difficulty === 'standard');
export const getPremiumGeniuses = () => geniusCognitiveProfiles.filter(p => p.difficulty === 'genius');
