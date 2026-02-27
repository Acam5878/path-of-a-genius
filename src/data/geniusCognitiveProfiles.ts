// Cognitive profiles for challenge opponents
// Bot tiers (free) + Genius opponents (premium)

import type { IQCategory } from './iqTypes';

export type OpponentDifficulty = 'bot' | 'genius';

export interface GeniusCognitiveProfile {
  geniusId: string;
  name: string;
  title: string;
  subtitle?: string; // chess.com style rating label
  difficulty: OpponentDifficulty;
  rating: number; // chess.com style ELO-like rating for display
  accuracy: Record<Exclude<IQCategory, 'comprehensive'>, number>;
  responseSpeed: number; // avg seconds per question
  taunt: string;
  defeatQuote: string;
  victoryQuote: string;
  icon?: string; // emoji for bot opponents
}

// ---- Free Bot Opponents (chess.com style tiers) ----
export const botOpponents: GeniusCognitiveProfile[] = [
  {
    geniusId: 'bot-high-school',
    name: 'High School Graduate',
    title: 'The Freshman',
    subtitle: 'Beginner',
    difficulty: 'bot',
    rating: 800,
    icon: '🎓',
    accuracy: {
      verbal: 0.55,
      numerical: 0.50,
      spatial: 0.40,
      logical: 0.48,
      memory: 0.55,
      'pattern-recognition': 0.42,
    },
    responseSpeed: 14,
    taunt: "I just finished my exams… how hard can this be?",
    defeatQuote: "Okay, you're definitely smarter than my teacher said I'd be.",
    victoryQuote: "Ha! Guess those late-night study sessions paid off!",
  },
  {
    geniusId: 'bot-undergrad',
    name: 'University Student',
    title: 'The Scholar',
    subtitle: 'Intermediate',
    difficulty: 'bot',
    rating: 1200,
    icon: '📚',
    accuracy: {
      verbal: 0.65,
      numerical: 0.62,
      spatial: 0.55,
      logical: 0.60,
      memory: 0.65,
      'pattern-recognition': 0.58,
    },
    responseSpeed: 11,
    taunt: "I've been pulling all-nighters for this kind of thing.",
    defeatQuote: "Alright, I need to hit the library harder. Well played.",
    victoryQuote: "Three years of lectures finally paying off!",
  },
  {
    geniusId: 'bot-masters',
    name: 'Master\'s Student',
    title: 'The Researcher',
    subtitle: 'Advanced',
    difficulty: 'bot',
    rating: 1600,
    icon: '🔬',
    accuracy: {
      verbal: 0.75,
      numerical: 0.72,
      spatial: 0.65,
      logical: 0.74,
      memory: 0.72,
      'pattern-recognition': 0.70,
    },
    responseSpeed: 9,
    taunt: "My thesis advisor said I overthink everything. Let's see.",
    defeatQuote: "I should probably publish a paper on how you did that.",
    victoryQuote: "Hypothesis confirmed: more studying = better results.",
  },
  {
    geniusId: 'bot-ivy-league',
    name: 'Ivy League Professor',
    title: 'The Academic',
    subtitle: 'Expert',
    difficulty: 'bot',
    rating: 2000,
    icon: '🏛️',
    accuracy: {
      verbal: 0.85,
      numerical: 0.82,
      spatial: 0.75,
      logical: 0.84,
      memory: 0.80,
      'pattern-recognition': 0.80,
    },
    responseSpeed: 7,
    taunt: "I've graded thousands of exams. Don't disappoint me.",
    defeatQuote: "Remarkable. I'd offer you a faculty position.",
    victoryQuote: "As I tell my students — there's always room to grow.",
  },
];

// ---- Premium Genius Opponents ----
export const geniusOpponents: GeniusCognitiveProfile[] = [
  {
    geniusId: 'john-stuart-mill',
    name: 'John Stuart Mill',
    title: 'The Prodigy',
    difficulty: 'genius',
    rating: 2200,
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
    difficulty: 'genius',
    rating: 2300,
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
    difficulty: 'genius',
    rating: 2350,
    accuracy: {
      verbal: 0.60,
      numerical: 0.88,
      spatial: 0.95,
      logical: 0.85,
      memory: 0.92,
      'pattern-recognition': 0.90,
    },
    responseSpeed: 7,
    taunt: "I could visualise entire machines in my mind. 60 seconds? Easy.",
    defeatQuote: "Your mental electricity is impressive. Edison would be jealous.",
    victoryQuote: "The present is theirs, but the future is mine.",
  },
  {
    geniusId: 'aristotle',
    name: 'Aristotle',
    title: 'The Philosopher',
    difficulty: 'genius',
    rating: 2250,
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
    difficulty: 'genius',
    rating: 2400,
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
  {
    geniusId: 'albert-einstein',
    name: 'Albert Einstein',
    title: 'The Genius',
    difficulty: 'genius',
    rating: 2600,
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
    rating: 2650,
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
    rating: 2700,
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
    rating: 2750,
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
    rating: 2500,
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

// Combined for backward compat
export const geniusCognitiveProfiles: GeniusCognitiveProfile[] = [...botOpponents, ...geniusOpponents];

export const getGeniusProfile = (geniusId: string): GeniusCognitiveProfile | undefined => {
  return geniusCognitiveProfiles.find(p => p.geniusId === geniusId);
};

export const getBotOpponents = () => botOpponents;
export const getGeniusOpponents = () => geniusOpponents;

// Keep old exports for compat
export const getStandardGeniuses = () => botOpponents;
export const getPremiumGeniuses = () => geniusOpponents;
