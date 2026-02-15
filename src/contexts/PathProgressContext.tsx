import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PathProgressContextType {
  completedLessons: string[];
  toggleLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCompletedCount: () => number;
}

const PathProgressContext = createContext<PathProgressContextType | undefined>(undefined);

export const PathProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { generateCardsForLesson } = useSpacedRepetition();

  // Load from database on login
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setCompletedLessons([]);
        return;
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .eq('genius_id', 'path');

      if (!error && data) {
        setCompletedLessons(data.map(d => d.lesson_id));
      }
    };
    loadProgress();
  }, [user]);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    if (!user) return;

    setCompletedLessons(prev => {
      const isCompleted = prev.includes(lessonId);
      const newCompleted = isCompleted 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      
      if (!isCompleted) {
        generateCardsForLesson(lessonId);
        toast({
          title: "Lesson Complete! ✓",
          description: `You've completed ${newCompleted.length} lessons. Review cards generated!`,
        });
      }

      // Sync to database
      if (!isCompleted) {
        supabase.from('user_progress').upsert({
          user_id: user.id,
          genius_id: 'path',
          subject_id: 'path',
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,genius_id,subject_id,lesson_id',
        }).then(({ error }) => {
          if (error) console.error('Failed to save path progress:', error);
        });
      } else {
        supabase.from('user_progress').update({
          completed: false,
          completed_at: null,
        }).eq('user_id', user.id)
          .eq('genius_id', 'path')
          .eq('lesson_id', lessonId)
          .then(({ error }) => {
            if (error) console.error('Failed to update path progress:', error);
          });
      }
      
      return newCompleted;
    });
  }, [generateCardsForLesson, user]);

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
