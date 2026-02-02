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

// Verbal Reasoning Test
export const verbalReasoningTest: IQTest = {
  id: 'verbal-reasoning-1',
  name: 'Verbal Reasoning',
  description: 'Test your vocabulary, analogies, and verbal logic',
  category: 'verbal',
  difficulty: 'intermediate',
  timeLimit: 60,
  estimatedMinutes: 15,
  questions: [
    {
      id: 'vr-1',
      type: 'analogy',
      question: 'Book is to Reading as Fork is to ?',
      options: ['Eating', 'Cooking', 'Metal', 'Kitchen'],
      correctAnswer: 'Eating',
      explanation: 'A book is used for reading, just as a fork is used for eating.',
      points: 10,
      difficulty: 3
    },
    {
      id: 'vr-2',
      type: 'analogy',
      question: 'Sculptor is to Statue as Poet is to ?',
      options: ['Poem', 'Pen', 'Literature', 'Words'],
      correctAnswer: 'Poem',
      explanation: 'A sculptor creates a statue, just as a poet creates a poem.',
      points: 10,
      difficulty: 4
    },
    {
      id: 'vr-3',
      type: 'multiple-choice',
      question: 'Which word does NOT belong? Mendacious, Veracious, Duplicitous, Deceitful',
      options: ['Mendacious', 'Veracious', 'Duplicitous', 'Deceitful'],
      correctAnswer: 'Veracious',
      explanation: 'Veracious means truthful, while the others mean dishonest.',
      points: 15,
      difficulty: 7
    },
    {
      id: 'vr-4',
      type: 'analogy',
      question: 'Cat is to Kitten as Dog is to ?',
      options: ['Canine', 'Puppy', 'Pet', 'Bark'],
      correctAnswer: 'Puppy',
      explanation: 'A kitten is a young cat, just as a puppy is a young dog.',
      points: 10,
      difficulty: 2
    },
    {
      id: 'vr-5',
      type: 'multiple-choice',
      question: 'What is the meaning of "ephemeral"?',
      options: ['Lasting forever', 'Very short-lived', 'Extremely beautiful', 'Highly valuable'],
      correctAnswer: 'Very short-lived',
      explanation: 'Ephemeral means lasting for a very short time.',
      points: 10,
      difficulty: 5
    }
  ]
};

// Numerical Reasoning Test
export const numericalReasoningTest: IQTest = {
  id: 'numerical-reasoning-1',
  name: 'Numerical Reasoning',
  description: 'Test your mathematical logic and number patterns',
  category: 'numerical',
  difficulty: 'intermediate',
  timeLimit: 90,
  estimatedMinutes: 20,
  questions: [
    {
      id: 'nr-1',
      type: 'sequence',
      question: 'What comes next in the sequence? 2, 4, 8, 16, ?',
      options: ['24', '32', '28', '20'],
      correctAnswer: '32',
      explanation: 'Each number is multiplied by 2. 16 × 2 = 32',
      points: 10,
      difficulty: 3
    },
    {
      id: 'nr-2',
      type: 'sequence',
      question: 'What comes next? 1, 1, 2, 3, 5, 8, ?',
      options: ['11', '12', '13', '14'],
      correctAnswer: '13',
      explanation: 'Fibonacci sequence: each number is the sum of the previous two. 5 + 8 = 13',
      points: 15,
      difficulty: 5
    },
    {
      id: 'nr-3',
      type: 'numeric-input',
      question: 'If 5 workers can build a wall in 20 days, how many days would it take 10 workers?',
      correctAnswer: 10,
      explanation: 'More workers = less time. 5 workers × 20 days = 100 worker-days. 100 ÷ 10 workers = 10 days',
      points: 15,
      difficulty: 6
    },
    {
      id: 'nr-4',
      type: 'sequence',
      question: 'What comes next? 100, 50, 25, 12.5, ?',
      options: ['6.25', '6', '7.5', '5'],
      correctAnswer: '6.25',
      explanation: 'Each number is divided by 2. 12.5 ÷ 2 = 6.25',
      points: 10,
      difficulty: 4
    },
    {
      id: 'nr-5',
      type: 'numeric-input',
      question: 'A number is multiplied by 3, then 12 is added. The result is 42. What is the original number?',
      correctAnswer: 10,
      explanation: '(x × 3) + 12 = 42. Therefore x × 3 = 30, so x = 10',
      points: 15,
      difficulty: 6
    }
  ]
};

// Pattern Recognition Test
export const patternRecognitionTest: IQTest = {
  id: 'pattern-recognition-1',
  name: 'Pattern Recognition',
  description: 'Identify patterns and complete sequences',
  category: 'pattern-recognition',
  difficulty: 'intermediate',
  timeLimit: 60,
  estimatedMinutes: 18,
  questions: [
    {
      id: 'pr-1',
      type: 'pattern-completion',
      question: 'Complete the pattern: A, C, E, G, ?',
      options: ['H', 'I', 'J', 'K'],
      correctAnswer: 'I',
      explanation: 'Skip one letter each time. A(skip B)C(skip D)E(skip F)G(skip H)I',
      points: 10,
      difficulty: 3
    },
    {
      id: 'pr-2',
      type: 'pattern-completion',
      question: 'What comes next? ○ △ □ ○ △ □ ○ ?',
      options: ['○', '△', '□', '◇'],
      correctAnswer: '△',
      explanation: 'The pattern repeats: circle, triangle, square. Next is triangle.',
      points: 10,
      difficulty: 2
    },
    {
      id: 'pr-3',
      type: 'pattern-completion',
      question: 'Complete: 1A, 2B, 3C, 4D, ?',
      options: ['5E', 'E5', '4E', '5D'],
      correctAnswer: '5E',
      explanation: 'Number increases by 1, letter advances by 1. Next is 5E.',
      points: 15,
      difficulty: 4
    },
    {
      id: 'pr-4',
      type: 'pattern-completion',
      question: 'What is the odd one out? 2, 3, 5, 7, 9, 11',
      options: ['2', '3', '9', '11'],
      correctAnswer: '9',
      explanation: 'All are prime numbers except 9 (which is 3×3).',
      points: 15,
      difficulty: 6
    },
    {
      id: 'pr-5',
      type: 'pattern-completion',
      question: 'Complete the pattern: AZ, BY, CX, DW, ?',
      options: ['EV', 'EU', 'FV', 'EW'],
      correctAnswer: 'EV',
      explanation: 'First letter goes forward (A→B→C→D→E), second goes backward (Z→Y→X→W→V).',
      points: 15,
      difficulty: 7
    }
  ]
};

// Logical Reasoning Test
export const logicalReasoningTest: IQTest = {
  id: 'logical-reasoning-1',
  name: 'Logical Reasoning',
  description: 'Test your deductive and inductive reasoning',
  category: 'logical',
  difficulty: 'intermediate',
  timeLimit: 90,
  estimatedMinutes: 20,
  questions: [
    {
      id: 'lr-1',
      type: 'logical-deduction',
      question: 'All roses are flowers. Some flowers fade quickly. Therefore:',
      options: [
        'All roses fade quickly',
        'Some roses fade quickly',
        'No roses fade quickly',
        'Cannot be determined'
      ],
      correctAnswer: 'Cannot be determined',
      explanation: 'We only know some flowers fade quickly, but not which ones.',
      points: 15,
      difficulty: 6
    },
    {
      id: 'lr-2',
      type: 'logical-deduction',
      question: 'If all A are B, and all B are C, then:',
      options: ['All A are C', 'All C are A', 'Some A are C', 'No conclusion'],
      correctAnswer: 'All A are C',
      explanation: 'Transitive property: If A→B and B→C, then A→C',
      points: 15,
      difficulty: 5
    },
    {
      id: 'lr-3',
      type: 'logical-deduction',
      question: 'Alice is taller than Bob. Bob is taller than Charlie. Therefore:',
      options: [
        'Alice is taller than Charlie',
        'Charlie is taller than Alice',
        'Alice and Charlie are the same height',
        'Cannot determine'
      ],
      correctAnswer: 'Alice is taller than Charlie',
      explanation: 'Transitive property applies to height comparisons.',
      points: 10,
      difficulty: 4
    },
    {
      id: 'lr-4',
      type: 'logical-deduction',
      question: 'If it rains, the street is wet. The street is wet. Therefore:',
      options: ['It rained', 'It might have rained', 'It did not rain', 'It will rain'],
      correctAnswer: 'It might have rained',
      explanation: 'Wet streets could have other causes (sprinklers, cleaning). This is the fallacy of affirming the consequent.',
      points: 20,
      difficulty: 8
    },
    {
      id: 'lr-5',
      type: 'multiple-choice',
      question: 'A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much does the ball cost?',
      options: ['$0.10', '$0.05', '$0.15', '$0.20'],
      correctAnswer: '$0.05',
      explanation: 'If ball = $0.05, then bat = $1.05. Total = $1.10. (Common trap: $0.10 is wrong!)',
      points: 20,
      difficulty: 7
    }
  ]
};

// Spatial Reasoning Test
export const spatialReasoningTest: IQTest = {
  id: 'spatial-reasoning-1',
  name: 'Spatial Reasoning',
  description: 'Test your ability to visualize and manipulate objects in space',
  category: 'spatial',
  difficulty: 'intermediate',
  timeLimit: 60,
  estimatedMinutes: 15,
  questions: [
    {
      id: 'sr-1',
      type: 'spatial-rotation',
      question: 'If you rotate a square 90° clockwise, what shape do you get?',
      options: ['Square', 'Diamond', 'Rectangle', 'Triangle'],
      correctAnswer: 'Square',
      explanation: 'A square rotated 90° is still a square (rotational symmetry).',
      points: 10,
      difficulty: 2
    },
    {
      id: 'sr-2',
      type: 'spatial-rotation',
      question: 'How many faces does a cube have?',
      options: ['4', '6', '8', '12'],
      correctAnswer: '6',
      explanation: 'A cube has 6 square faces: top, bottom, and 4 sides.',
      points: 10,
      difficulty: 3
    },
    {
      id: 'sr-3',
      type: 'spatial-rotation',
      question: 'If you fold a flat cross shape (+), what 3D shape can you make?',
      options: ['Cube', 'Pyramid', 'Cylinder', 'Sphere'],
      correctAnswer: 'Cube',
      explanation: 'A cross-shaped net folds into a cube (classic net).',
      points: 15,
      difficulty: 5
    },
    {
      id: 'sr-4',
      type: 'spatial-rotation',
      question: 'How many edges does a triangular pyramid (tetrahedron) have?',
      options: ['3', '4', '6', '12'],
      correctAnswer: '6',
      explanation: 'A tetrahedron has 4 vertices and 6 edges connecting them.',
      points: 15,
      difficulty: 6
    },
    {
      id: 'sr-5',
      type: 'multiple-choice',
      question: 'Which shape has the most lines of symmetry? Square, Rectangle, or Equilateral Triangle?',
      options: ['Square', 'Rectangle', 'Equilateral Triangle', 'All equal'],
      correctAnswer: 'Square',
      explanation: 'Square has 4 lines of symmetry (2 diagonals + 2 midlines). Rectangle has 2. Equilateral triangle has 3.',
      points: 15,
      difficulty: 5
    }
  ]
};

// Memory Test
export const memoryTest: IQTest = {
  id: 'memory-test-1',
  name: 'Working Memory',
  description: 'Test your short-term memory and recall ability',
  category: 'memory',
  difficulty: 'intermediate',
  timeLimit: 30,
  estimatedMinutes: 10,
  questions: [
    {
      id: 'mem-1',
      type: 'memory-recall',
      question: 'Study this sequence for 10 seconds: 7, 3, 9, 2, 5, 8. Now recall the 4th number.',
      options: ['3', '2', '9', '5'],
      correctAnswer: '2',
      explanation: 'The sequence was 7, 3, 9, 2, 5, 8. The 4th number is 2.',
      points: 10,
      difficulty: 4
    },
    {
      id: 'mem-2',
      type: 'memory-recall',
      question: 'Memorize: Apple, Chair, Cloud, Dog, Elephant. Which word came third?',
      options: ['Apple', 'Chair', 'Cloud', 'Dog'],
      correctAnswer: 'Cloud',
      explanation: 'The third word in the sequence was Cloud.',
      points: 10,
      difficulty: 3
    },
    {
      id: 'mem-3',
      type: 'memory-recall',
      question: 'Remember: Blue Square, Red Circle, Green Triangle. What color was the circle?',
      options: ['Blue', 'Red', 'Green', 'Yellow'],
      correctAnswer: 'Red',
      explanation: 'The circle was red.',
      points: 10,
      difficulty: 3
    },
    {
      id: 'mem-4',
      type: 'memory-recall',
      question: 'Study: 2468, 1357, 9753. Which sequence had all even numbers?',
      options: ['2468', '1357', '9753', 'None'],
      correctAnswer: '2468',
      explanation: '2468 contains all even numbers.',
      points: 15,
      difficulty: 5
    },
    {
      id: 'mem-5',
      type: 'numeric-input',
      question: 'Memorize: 15, 23, 31. What is the sum of these three numbers?',
      correctAnswer: 69,
      explanation: '15 + 23 + 31 = 69',
      points: 15,
      difficulty: 6
    }
  ]
};

// Comprehensive IQ Test (All Categories)
export const comprehensiveIQTest: IQTest = {
  id: 'comprehensive-iq-1',
  name: 'Comprehensive IQ Test',
  description: 'Full IQ test covering all cognitive domains',
  category: 'comprehensive',
  difficulty: 'intermediate',
  timeLimit: 90,
  estimatedMinutes: 45,
  questions: [
    ...verbalReasoningTest.questions.slice(0, 3),
    ...numericalReasoningTest.questions.slice(0, 3),
    ...patternRecognitionTest.questions.slice(0, 3),
    ...logicalReasoningTest.questions.slice(0, 3),
    ...spatialReasoningTest.questions.slice(0, 3),
    ...memoryTest.questions.slice(0, 3)
  ]
};

// All available tests
export const allIQTests: IQTest[] = [
  verbalReasoningTest,
  numericalReasoningTest,
  patternRecognitionTest,
  logicalReasoningTest,
  spatialReasoningTest,
  memoryTest,
  comprehensiveIQTest
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
