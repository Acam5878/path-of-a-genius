// Challenge Engine — simulates a genius bot answering IQ questions
import type { IQQuestion, IQCategory } from './iqTypes';
import type { GeniusCognitiveProfile } from './geniusCognitiveProfiles';
import { selectDailyQuestions, getDailySeed } from './iqQuestionBank';
import { verbalQuestionBank, numericalQuestionBank, patternQuestionBank, logicalQuestionBank, spatialQuestionBank, memoryQuestionBank } from './iqQuestionBank';
import { additionalVerbalQuestions, additionalNumericalQuestions, additionalLogicalQuestions, additionalPatternQuestions } from './iqQuestionsAdditional';

const CHALLENGE_QUESTIONS = 15;

// Map IQ category to question banks
const categoryBanks: Record<Exclude<IQCategory, 'comprehensive'>, IQQuestion[]> = {
  verbal: [...verbalQuestionBank, ...additionalVerbalQuestions],
  numerical: [...numericalQuestionBank, ...additionalNumericalQuestions],
  spatial: spatialQuestionBank,
  logical: [...logicalQuestionBank, ...additionalLogicalQuestions],
  memory: memoryQuestionBank,
  'pattern-recognition': [...patternQuestionBank, ...additionalPatternQuestions],
};

// Generate a mixed set of challenge questions
export function generateChallengeQuestions(seed?: number): IQQuestion[] {
  const s = seed ?? getDailySeed() + Math.floor(Math.random() * 10000);
  const categories: Exclude<IQCategory, 'comprehensive'>[] = [
    'verbal', 'numerical', 'logical', 'spatial', 'pattern-recognition', 'memory'
  ];
  
  // 3 questions from 5 random categories = 15 total (with some balancing)
  const questions: IQQuestion[] = [];
  const perCategory = Math.ceil(CHALLENGE_QUESTIONS / categories.length); // ~3 each
  
  categories.forEach((cat, i) => {
    const bank = categoryBanks[cat];
    const selected = selectDailyQuestions(bank, perCategory, s + i * 100);
    questions.push(...selected);
  });
  
  // Trim to exactly 15 and shuffle
  return shuffleWithSeed(questions.slice(0, CHALLENGE_QUESTIONS), s);
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Determine which category a question belongs to based on its type
function getQuestionCategory(q: IQQuestion): Exclude<IQCategory, 'comprehensive'> {
  switch (q.type) {
    case 'analogy': case 'multiple-choice': return 'verbal';
    case 'numeric-input': case 'sequence': return 'numerical';
    case 'spatial-rotation': return 'spatial';
    case 'logical-deduction': return 'logical';
    case 'memory-recall': return 'memory';
    case 'pattern-completion': return 'pattern-recognition';
    default: return 'logical';
  }
}

export interface BotAnswer {
  questionId: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
}

// Simulate bot answering all questions
export function simulateBotAnswers(
  questions: IQQuestion[],
  profile: GeniusCognitiveProfile
): BotAnswer[] {
  return questions.map((q, idx) => {
    const category = getQuestionCategory(q);
    const baseAccuracy = profile.accuracy[category] ?? 0.7;
    
    // Adjust accuracy by question difficulty (1-5 scale)
    const difficultyPenalty = (q.difficulty - 3) * 0.06; // harder = lower accuracy
    const adjustedAccuracy = Math.max(0.15, Math.min(0.98, baseAccuracy - difficultyPenalty));
    
    // Add randomness — seeded by question index for consistency
    const rand = pseudoRandom(idx * 31 + profile.geniusId.charCodeAt(0));
    const isCorrect = rand < adjustedAccuracy;
    
    // Time: base speed ± some variance
    const baseTime = profile.responseSpeed;
    const timeVariance = (pseudoRandom(idx * 17 + 42) - 0.5) * 6;
    const timeSpent = Math.max(3, Math.round(baseTime + timeVariance + q.difficulty * 1.5));
    
    return { questionId: q.id, isCorrect, timeSpent };
  });
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49397;
  return x - Math.floor(x);
}

// Calculate score from answers
export function calculateChallengeScore(answers: BotAnswer[], questions: IQQuestion[]): number {
  return answers.reduce((total, a) => {
    const q = questions.find(q => q.id === a.questionId);
    return total + (a.isCorrect && q ? q.points : 0);
  }, 0);
}
