// IQ Testing Framework — Heavy module (includes question banks)
// Types and constants are in iqTypes.ts for lightweight imports

// Re-export types so existing imports from '@/data/iqTests' still work
export { 
  type IQCategory, type IQQuestion, type QuestionType, type IQTest, 
  type TestResult, type QuestionResult, type UserIQProfile,
  IQCalculator, categoryDisplayNames, categoryIcons 
} from './iqTypes';

import type { IQCategory, IQQuestion, IQTest, TestResult, QuestionResult } from './iqTypes';
import { IQCalculator } from './iqTypes';

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

