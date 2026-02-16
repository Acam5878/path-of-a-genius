// IQ Types & Constants — lightweight, no question bank imports
// Split from iqTests.ts so home page components don't pull in 5K+ lines of questions

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
  difficulty: number;
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

export interface IQTest {
  id: string;
  name: string;
  description: string;
  category: IQCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'genius';
  timeLimit: number;
  questions: IQQuestion[];
  estimatedMinutes: number;
}

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
  static calculateIQ(rawScore: number, maxScore: number, difficulty: string): number {
    const percentage = (rawScore / maxScore) * 100;
    let baseIQ = 70 + (percentage * 0.6);
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

// Category icons
export const categoryIcons: Record<IQCategory, string> = {
  'verbal': '📚',
  'numerical': '🔢',
  'spatial': '🧊',
  'logical': '🧠',
  'memory': '💭',
  'pattern-recognition': '🔍',
  'comprehensive': '🎯'
};
