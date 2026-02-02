// IQ Testing Framework
// Integrated cognitive assessment system

export interface IQTest {
  id: string;
  name: string;
  description: string;
  category: IQCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'genius';
  timeLimit: number; // seconds per question
  questions: IQQuestion[];
  estimatedMinutes: number;
}

export type IQCategory = 
  | 'verbal' 
  | 'numerical' 
  | 'spatial' 
  | 'logical' 
  | 'memory' 
  | 'pattern-recognition'
  | 'comprehensive';

export interface IQQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  imageUrl?: string;
  difficulty: number; // 1-10 scale
}

export type QuestionType = 
  | 'multiple-choice'
  | 'numeric-input'
  | 'pattern-completion'
  | 'analogy'
  | 'sequence'
  | 'spatial-rotation'
  | 'memory-recall'
  | 'logical-deduction';

export interface TestResult {
  testId: string;
  userId?: string;
  score: number;
  maxScore: number;
  percentageScore: number;
  estimatedIQ: number;
  category: IQCategory;
  timeTaken: number;
  completedDate: string;
  questionResults: QuestionResult[];
  strengthAreas: string[];
  improvementAreas: string[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number;
  correctAnswer: string | number;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export interface UserIQProfile {
  userId: string;
  overallIQ: number;
  testHistory: TestResult[];
  categoryScores: {
    verbal: number;
    numerical: number;
    spatial: number;
    logical: number;
    memory: number;
    patternRecognition: number;
  };
  lastUpdated: string;
  totalTestsTaken: number;
  averageScore: number;
}

// IQ Calculation System
export class IQCalculator {
  // Standard IQ scoring: Mean = 100, SD = 15
  static calculateIQ(rawScore: number, maxScore: number, difficulty: string): number {
    const percentage = (rawScore / maxScore) * 100;
    
    // Base IQ calculation
    let baseIQ = 70 + (percentage * 0.6);
    
    // Difficulty multiplier
    const difficultyBonus = {
      'beginner': 0,
      'intermediate': 5,
      'advanced': 10,
      'genius': 15
    }[difficulty] || 0;
    
    const adjustedIQ = baseIQ + difficultyBonus;
    
    return Math.min(Math.max(Math.round(adjustedIQ), 70), 160);
  }
  
  static getPercentile(iq: number): number {
    if (iq >= 145) return 99.9;
    if (iq >= 130) return 98;
    if (iq >= 115) return 84;
    if (iq >= 100) return 50;
    if (iq >= 85) return 16;
    if (iq >= 70) return 2;
    return 0.1;
  }
  
  static getClassification(iq: number): string {
    if (iq >= 145) return 'Genius (Very Superior)';
    if (iq >= 130) return 'Very Superior';
    if (iq >= 120) return 'Superior';
    if (iq >= 110) return 'High Average';
    if (iq >= 90) return 'Average';
    if (iq >= 80) return 'Low Average';
    if (iq >= 70) return 'Borderline';
    return 'Below Average';
  }
}

import { 
  verbalQuestionBank, 
  numericalQuestionBank, 
  patternQuestionBank, 
  logicalQuestionBank, 
  spatialQuestionBank, 
  memoryQuestionBank,
  selectDailyQuestions,
  getDailySeed
} from './iqQuestionBank';

import { youngChildrenTest, olderChildrenTest } from './iqQuestionsChildren';
import { additionalVerbalQuestions, additionalNumericalQuestions, additionalLogicalQuestions, additionalPatternQuestions } from './iqQuestionsAdditional';

// Combine base banks with additional questions
const expandedVerbalBank = [...verbalQuestionBank, ...additionalVerbalQuestions];
const expandedNumericalBank = [...numericalQuestionBank, ...additionalNumericalQuestions];
const expandedLogicalBank = [...logicalQuestionBank, ...additionalLogicalQuestions];
const expandedPatternBank = [...patternQuestionBank, ...additionalPatternQuestions];

// Number of questions per test (increased for accuracy)
const QUESTIONS_PER_TEST = 15;
const COMPREHENSIVE_QUESTIONS_PER_CATEGORY = 5;

// Generate daily tests from question bank
function createDailyTest(
  id: string,
  name: string,
  description: string,
  category: IQCategory,
  bank: IQQuestion[],
  count: number = QUESTIONS_PER_TEST
): IQTest {
  const seed = getDailySeed();
  const questions = selectDailyQuestions(bank, count, seed + id.charCodeAt(0));
  
  return {
    id,
    name,
    description,
    category,
    difficulty: 'intermediate',
    timeLimit: 60,
    estimatedMinutes: Math.ceil(count * 1.2),
    questions
  };
}

// Verbal Reasoning Test (dynamic daily selection from expanded bank)
export const verbalReasoningTest: IQTest = createDailyTest(
  'verbal-reasoning-1',
  'Verbal Reasoning',
  'Test your vocabulary, analogies, and verbal logic',
  'verbal',
  expandedVerbalBank
);

// Numerical Reasoning Test (dynamic daily selection from expanded bank)
export const numericalReasoningTest: IQTest = createDailyTest(
  'numerical-reasoning-1',
  'Numerical Reasoning',
  'Test your mathematical logic and number patterns',
  'numerical',
  expandedNumericalBank
);

// Pattern Recognition Test (dynamic daily selection from expanded bank)
export const patternRecognitionTest: IQTest = createDailyTest(
  'pattern-recognition-1',
  'Pattern Recognition',
  'Identify patterns and complete sequences',
  'pattern-recognition',
  expandedPatternBank
);

// Logical Reasoning Test (dynamic daily selection from expanded bank)
export const logicalReasoningTest: IQTest = createDailyTest(
  'logical-reasoning-1',
  'Logical Reasoning',
  'Test your deductive and inductive reasoning',
  'logical',
  expandedLogicalBank
);

// Spatial Reasoning Test (dynamic daily selection)
export const spatialReasoningTest: IQTest = createDailyTest(
  'spatial-reasoning-1',
  'Spatial Reasoning',
  'Test your ability to visualize and manipulate objects in space',
  'spatial',
  spatialQuestionBank
);

// Memory Test (dynamic daily selection)
export const memoryTest: IQTest = createDailyTest(
  'memory-test-1',
  'Working Memory',
  'Test your short-term memory and recall ability',
  'memory',
  memoryQuestionBank
);

// Comprehensive IQ Test (All Categories - draws from all banks)
export const comprehensiveIQTest: IQTest = {
  id: 'comprehensive-iq-1',
  name: 'Comprehensive IQ Test',
  description: 'Full IQ test covering all cognitive domains (30 questions)',
  category: 'comprehensive',
  difficulty: 'intermediate',
  timeLimit: 90,
  estimatedMinutes: 45,
  questions: [
    ...selectDailyQuestions(verbalQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 100),
    ...selectDailyQuestions(numericalQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 200),
    ...selectDailyQuestions(patternQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 300),
    ...selectDailyQuestions(logicalQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 400),
    ...selectDailyQuestions(spatialQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 500),
    ...selectDailyQuestions(memoryQuestionBank, COMPREHENSIVE_QUESTIONS_PER_CATEGORY, getDailySeed() + 600)
  ]
};

// All available tests (adults + children)
export const allIQTests: IQTest[] = [
  verbalReasoningTest,
  numericalReasoningTest,
  patternRecognitionTest,
  logicalReasoningTest,
  spatialReasoningTest,
  memoryTest,
  comprehensiveIQTest
];

// Children's tests (separate category)
export const childrenIQTests: IQTest[] = [
  youngChildrenTest,
  olderChildrenTest
];

// All tests combined (for admin/full access)
export const allTestsIncludingChildren: IQTest[] = [
  ...allIQTests,
  ...childrenIQTests
];

// Helper Functions
export function getTestById(testId: string): IQTest | undefined {
  return allIQTests.find(test => test.id === testId);
}

export function getTestsByCategory(category: IQCategory): IQTest[] {
  return allIQTests.filter(test => test.category === category);
}

export function calculateTestScore(
  test: IQTest,
  answers: Map<string, string | number>,
  timeTaken: number
): TestResult {
  const questionResults: QuestionResult[] = [];
  let totalScore = 0;
  let maxScore = 0;

  test.questions.forEach((question) => {
    const userAnswer = answers.get(question.id);
    const isCorrect = String(userAnswer) === String(question.correctAnswer);
    const points = isCorrect ? question.points : 0;

    questionResults.push({
      questionId: question.id,
      userAnswer: userAnswer || '',
      correctAnswer: question.correctAnswer,
      isCorrect,
      timeSpent: 0,
      points
    });

    totalScore += points;
    maxScore += question.points;
  });

  const percentageScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const estimatedIQ = IQCalculator.calculateIQ(totalScore, maxScore, test.difficulty);

  const correctByType: { [key: string]: number } = {};
  const totalByType: { [key: string]: number } = {};

  questionResults.forEach((result) => {
    const question = test.questions.find(q => q.id === result.questionId);
    if (question) {
      const type = question.type;
      correctByType[type] = (correctByType[type] || 0) + (result.isCorrect ? 1 : 0);
      totalByType[type] = (totalByType[type] || 0) + 1;
    }
  });

  const strengthAreas: string[] = [];
  const improvementAreas: string[] = [];

  Object.keys(correctByType).forEach((type) => {
    const accuracy = correctByType[type] / totalByType[type];
    if (accuracy >= 0.8) {
      strengthAreas.push(type.replace(/-/g, ' '));
    } else if (accuracy < 0.5) {
      improvementAreas.push(type.replace(/-/g, ' '));
    }
  });

  return {
    testId: test.id,
    score: totalScore,
    maxScore,
    percentageScore,
    estimatedIQ,
    category: test.category,
    timeTaken,
    completedDate: new Date().toISOString(),
    questionResults,
    strengthAreas,
    improvementAreas
  };
}

// Category display names
export const categoryDisplayNames: Record<IQCategory, string> = {
  'verbal': 'Verbal',
  'numerical': 'Numerical',
  'spatial': 'Spatial',
  'logical': 'Logical',
  'memory': 'Memory',
  'pattern-recognition': 'Pattern Recognition',
  'comprehensive': 'Comprehensive'
};

// Category icons (for use in UI)
export const categoryIcons: Record<IQCategory, string> = {
  'verbal': '📚',
  'numerical': '🔢',
  'spatial': '🧊',
  'logical': '🧠',
  'memory': '💭',
  'pattern-recognition': '🔍',
  'comprehensive': '🎯'
};
