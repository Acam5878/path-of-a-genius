// Challenge Engine — 60-second blitz mode
import type { IQQuestion, IQCategory } from './iqTypes';
import type { GeniusCognitiveProfile } from './geniusCognitiveProfiles';
import { selectDailyQuestions, getDailySeed } from './iqQuestionBank';
import { verbalQuestionBank, numericalQuestionBank, patternQuestionBank, logicalQuestionBank, spatialQuestionBank, memoryQuestionBank } from './iqQuestionBank';
import { additionalVerbalQuestions, additionalNumericalQuestions, additionalLogicalQuestions, additionalPatternQuestions } from './iqQuestionsAdditional';

const BLITZ_QUESTIONS = 60;
export const BLITZ_DURATION = 60; // seconds

const categoryBanks: Record<Exclude<IQCategory, 'comprehensive'>, IQQuestion[]> = {
  verbal: [...verbalQuestionBank, ...additionalVerbalQuestions],
  numerical: [...numericalQuestionBank, ...additionalNumericalQuestions],
  spatial: spatialQuestionBank,
  logical: [...logicalQuestionBank, ...additionalLogicalQuestions],
  memory: memoryQuestionBank,
  'pattern-recognition': [...patternQuestionBank, ...additionalPatternQuestions],
};

// Generate plausible wrong answers for numeric-input questions
function generateDistractors(correctAnswer: string | number): string[] {
  const num = Number(correctAnswer);
  if (isNaN(num)) return [String(correctAnswer)];
  
  const distractors = new Set<number>();
  // Close values
  distractors.add(num + 1);
  distractors.add(num - 1);
  distractors.add(num + 2);
  distractors.add(num - 2);
  distractors.add(Math.round(num * 1.5));
  distractors.add(Math.round(num * 0.5));
  
  // Remove the correct answer and negatives
  distractors.delete(num);
  
  const arr = Array.from(distractors).filter(d => d >= 0);
  // Pick 3 random distractors
  const shuffled = arr.sort(() => Math.random() - 0.5).slice(0, 3);
  return shuffled.map(String);
}

// Convert numeric-input questions to multiple-choice for blitz mode
function ensureMultipleChoice(q: IQQuestion): IQQuestion {
  if (q.options && q.options.length >= 2) return q;
  
  const distractors = generateDistractors(q.correctAnswer);
  const allOptions = [String(q.correctAnswer), ...distractors];
  // Shuffle options
  const options = allOptions.sort(() => Math.random() - 0.5);
  
  return {
    ...q,
    type: 'multiple-choice' as any,
    options,
  };
}

export function generateChallengeQuestions(seed?: number): IQQuestion[] {
  const s = seed ?? getDailySeed() + Math.floor(Math.random() * 10000);
  const categories: Exclude<IQCategory, 'comprehensive'>[] = [
    'verbal', 'numerical', 'logical', 'spatial', 'pattern-recognition', 'memory'
  ];
  
  const questions: IQQuestion[] = [];
  const perCategory = Math.ceil(BLITZ_QUESTIONS / categories.length);
  
  categories.forEach((cat, i) => {
    const bank = categoryBanks[cat];
    const selected = selectDailyQuestions(bank, perCategory, s + i * 100);
    questions.push(...selected);
  });
  
  // Ensure ALL questions have multiple-choice options for blitz mode
  return shuffleWithSeed(questions.slice(0, BLITZ_QUESTIONS).map(ensureMultipleChoice), s);
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

export function getQuestionCategory(q: IQQuestion): Exclude<IQCategory, 'comprehensive'> {
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
  timeSpent: number;
}

// Simulate bot answering a single question in real-time
export function simulateBotAnswer(
  question: IQQuestion,
  profile: GeniusCognitiveProfile,
  questionIndex: number
): BotAnswer {
  const category = getQuestionCategory(question);
  const baseAccuracy = profile.accuracy[category] ?? 0.7;
  const difficultyPenalty = (question.difficulty - 3) * 0.06;
  const adjustedAccuracy = Math.max(0.15, Math.min(0.98, baseAccuracy - difficultyPenalty));
  
  const rand = pseudoRandom(questionIndex * 31 + profile.geniusId.charCodeAt(0));
  const isCorrect = rand < adjustedAccuracy;
  
  const baseTime = Math.max(2, profile.responseSpeed * 0.4); // Faster for blitz
  const timeVariance = (pseudoRandom(questionIndex * 17 + 42) - 0.5) * 3;
  const timeSpent = Math.max(1.5, Math.round((baseTime + timeVariance) * 10) / 10);
  
  return { questionId: question.id, isCorrect, timeSpent };
}

// Simulate how many questions the bot answers in 60 seconds
export function simulateBotBlitz(
  questions: IQQuestion[],
  profile: GeniusCognitiveProfile
): { correctCount: number; totalAnswered: number; score: number } {
  let elapsed = 0;
  let correctCount = 0;
  let totalAnswered = 0;
  let score = 0;
  let combo = 0;

  for (let i = 0; i < questions.length && elapsed < BLITZ_DURATION; i++) {
    const answer = simulateBotAnswer(questions[i], profile, i);
    elapsed += answer.timeSpent;
    if (elapsed > BLITZ_DURATION) break;
    
    totalAnswered++;
    if (answer.isCorrect) {
      correctCount++;
      combo++;
      const multiplier = Math.min(combo, 5);
      score += questions[i].points * multiplier;
    } else {
      combo = 0;
    }
  }

  return { correctCount, totalAnswered, score };
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49397;
  return x - Math.floor(x);
}

export function calculateChallengeScore(answers: BotAnswer[], questions: IQQuestion[]): number {
  return answers.reduce((total, a) => {
    const q = questions.find(q => q.id === a.questionId);
    return total + (a.isCorrect && q ? q.points : 0);
  }, 0);
}
