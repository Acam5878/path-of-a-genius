// Maps IQ test categories and improvement areas to relevant Path of a Genius lessons

import { IQCategory } from './iqTests';

export interface LessonRecommendation {
  moduleId: string;
  moduleName: string;
  moduleIcon: string;
  lessonId: string;
  lessonTitle: string;
  reason: string;
}

// Maps IQ categories to relevant module recommendations
export const categoryToModuleRecommendations: Record<IQCategory, LessonRecommendation[]> = {
  'verbal': [
    {
      moduleId: 'ancient-greek',
      moduleName: 'Ancient Greek',
      moduleIcon: '🏛️',
      lessonId: 'greek-nouns',
      lessonTitle: 'Essential Greek Nouns',
      reason: 'Build vocabulary foundations through classical Greek word roots'
    },
    {
      moduleId: 'latin',
      moduleName: 'Latin',
      moduleIcon: '📜',
      lessonId: 'latin-vocab',
      lessonTitle: 'Core Latin Vocabulary',
      reason: 'Latin roots underpin 60% of English vocabulary'
    },
    {
      moduleId: 'ancient-greek',
      moduleName: 'Ancient Greek',
      moduleIcon: '🏛️',
      lessonId: 'greek-grammar',
      lessonTitle: 'Grammar: Articles and Cases',
      reason: 'Understanding grammar improves verbal reasoning'
    }
  ],
  'numerical': [
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-euclid-1',
      lessonTitle: 'Euclidean Geometry: First Principles',
      reason: 'Strengthen logical number relationships through geometry'
    },
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-algebra',
      lessonTitle: 'Algebraic Thinking',
      reason: 'Master pattern recognition in numerical sequences'
    },
    {
      moduleId: 'physics',
      moduleName: 'Physics',
      moduleIcon: '🔬',
      lessonId: 'physics-newton',
      lessonTitle: "Newton's Laws of Motion",
      reason: 'Apply numerical reasoning to real-world problems'
    }
  ],
  'spatial': [
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-euclid-1',
      lessonTitle: 'Euclidean Geometry: First Principles',
      reason: 'Develop spatial visualization through geometric proofs'
    },
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-euclid-2',
      lessonTitle: 'Euclidean Geometry: Triangles & Circles',
      reason: 'Master spatial relationships and transformations'
    },
    {
      moduleId: 'thought-experiments',
      moduleName: 'Thought Experiments',
      moduleIcon: '💭',
      lessonId: 'thought-light-beam',
      lessonTitle: "Einstein's Light Beam",
      reason: 'Practice mental visualization of abstract concepts'
    }
  ],
  'logical': [
    {
      moduleId: 'logic',
      moduleName: 'Logic & Critical Thinking',
      moduleIcon: '🧠',
      lessonId: 'logic-syllogisms',
      lessonTitle: 'Classical Syllogisms',
      reason: 'Master the foundations of deductive reasoning'
    },
    {
      moduleId: 'logic',
      moduleName: 'Logic & Critical Thinking',
      moduleIcon: '🧠',
      lessonId: 'logic-fallacies',
      lessonTitle: 'Logical Fallacies',
      reason: 'Learn to identify and avoid reasoning errors'
    },
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-proof',
      lessonTitle: 'Mathematical Proof Techniques',
      reason: 'Strengthen logical thinking through formal proofs'
    }
  ],
  'memory': [
    {
      moduleId: 'ancient-greek',
      moduleName: 'Ancient Greek',
      moduleIcon: '🏛️',
      lessonId: 'greek-alphabet',
      lessonTitle: 'The Greek Alphabet',
      reason: 'Exercise working memory through systematic memorization'
    },
    {
      moduleId: 'ancient-greek',
      moduleName: 'Ancient Greek',
      moduleIcon: '🏛️',
      lessonId: 'greek-nouns',
      lessonTitle: 'Essential Greek Nouns',
      reason: 'Build memory capacity with vocabulary drills'
    },
    {
      moduleId: 'latin',
      moduleName: 'Latin',
      moduleIcon: '📜',
      lessonId: 'latin-vocab',
      lessonTitle: 'Core Latin Vocabulary',
      reason: 'Strengthen recall through structured repetition'
    }
  ],
  'pattern-recognition': [
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-sequences',
      lessonTitle: 'Sequences & Series',
      reason: 'Train pattern recognition with mathematical sequences'
    },
    {
      moduleId: 'logic',
      moduleName: 'Logic & Critical Thinking',
      moduleIcon: '🧠',
      lessonId: 'logic-symbolic',
      lessonTitle: 'Symbolic Logic',
      reason: 'Recognize patterns in formal logical structures'
    },
    {
      moduleId: 'ancient-greek',
      moduleName: 'Ancient Greek',
      moduleIcon: '🏛️',
      lessonId: 'greek-verbs',
      lessonTitle: 'Greek Verbs',
      reason: 'Identify grammatical patterns across conjugations'
    }
  ],
  'comprehensive': [
    {
      moduleId: 'logic',
      moduleName: 'Logic & Critical Thinking',
      moduleIcon: '🧠',
      lessonId: 'logic-syllogisms',
      lessonTitle: 'Classical Syllogisms',
      reason: 'Master foundational reasoning skills'
    },
    {
      moduleId: 'mathematics',
      moduleName: 'Mathematics',
      moduleIcon: '📐',
      lessonId: 'math-euclid-1',
      lessonTitle: 'Euclidean Geometry: First Principles',
      reason: 'Develop spatial and logical thinking together'
    },
    {
      moduleId: 'thought-experiments',
      moduleName: 'Thought Experiments',
      moduleIcon: '💭',
      lessonId: 'thought-intro',
      lessonTitle: 'Introduction to Thought Experiments',
      reason: 'Train holistic cognitive skills through mental exercises'
    }
  ]
};

// Get recommendations based on improvement areas
export function getRecommendationsForImprovementAreas(
  category: IQCategory,
  improvementAreas: string[]
): LessonRecommendation[] {
  const categoryRecs = categoryToModuleRecommendations[category] || [];
  
  // If they have specific improvement areas, prioritize relevant lessons
  // Otherwise return the default category recommendations
  if (improvementAreas.length === 0) {
    return categoryRecs.slice(0, 2);
  }
  
  // Return top 2-3 most relevant recommendations
  return categoryRecs.slice(0, 3);
}

// Get a single top recommendation for quick display
export function getTopRecommendation(category: IQCategory): LessonRecommendation | null {
  const recs = categoryToModuleRecommendations[category];
  return recs && recs.length > 0 ? recs[0] : null;
}
