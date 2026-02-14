import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';

interface PathProgressContextType {
  completedLessons: string[];
  toggleLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCompletedCount: () => number;
}

const PathProgressContext = createContext<PathProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'genius-academy-path-progress';

export const PathProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const { generateCardsForLesson } = useSpacedRepetition();

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  }, [completedLessons]);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const isCompleted = prev.includes(lessonId);
      const newCompleted = isCompleted 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      
      if (!isCompleted) {
        // Generate spaced repetition cards for the completed lesson
        generateCardsForLesson(lessonId);
        
        toast({
          title: "Lesson Complete! ✓",
          description: `You've completed ${newCompleted.length} lessons. Review cards generated!`,
        });
      }
      
      return newCompleted;
    });
  }, [generateCardsForLesson]);

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const getCompletedCount = () => {
    return completedLessons.length;
  };

  return (
    <PathProgressContext.Provider value={{
      completedLessons,
      toggleLessonComplete,
      isLessonCompleted,
      getCompletedCount,
    }}>
      {children}
    </PathProgressContext.Provider>
  );
};

export const usePathProgress = () => {
  const context = useContext(PathProgressContext);
  if (context === undefined) {
    throw new Error('usePathProgress must be used within a PathProgressProvider');
  }
  return context;
};
