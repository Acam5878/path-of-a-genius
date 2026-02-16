// Compatibility shim — redirects to the consolidated LearningPathContext
// All path progress is now tracked in LearningPathContext

import { useLearningPath } from '@/contexts/LearningPathContext';

export const usePathProgress = () => {
  const ctx = useLearningPath();
  return {
    completedLessons: ctx.pathCompletedLessons,
    toggleLessonComplete: ctx.togglePathLessonComplete,
    isLessonCompleted: ctx.isPathLessonCompleted,
    getCompletedCount: ctx.getPathCompletedCount,
  };
};
