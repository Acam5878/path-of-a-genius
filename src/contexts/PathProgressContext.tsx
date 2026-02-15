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

const STORAGE_KEY = 'genius-academy-path-progress';

export const PathProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { generateCardsForLesson } = useSpacedRepetition();
  const hasLoadedFromDb = useRef(false);

  // Load from database on login, fall back to localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('completed', true)
          .eq('genius_id', 'path'); // "path" marks Path curriculum progress

        if (!error && data && data.length > 0) {
          const dbLessons = data.map(d => d.lesson_id);
          setCompletedLessons(dbLessons);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbLessons));
        } else {
          // Migrate localStorage data to DB if exists
          const stored = localStorage.getItem(STORAGE_KEY);
          const localLessons: string[] = stored ? JSON.parse(stored) : [];
          setCompletedLessons(localLessons);

          if (localLessons.length > 0) {
            // Bulk insert localStorage data into DB
            const rows = localLessons.map(lessonId => ({
              user_id: user.id,
              genius_id: 'path',
              subject_id: 'path',
              lesson_id: lessonId,
              completed: true,
              completed_at: new Date().toISOString(),
            }));
            await supabase.from('user_progress').upsert(rows, {
              onConflict: 'user_id,genius_id,subject_id,lesson_id',
            });
          }
        }
        hasLoadedFromDb.current = true;
      } else {
        // Not logged in — use localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        setCompletedLessons(stored ? JSON.parse(stored) : []);
        hasLoadedFromDb.current = false;
      }
    };
    loadProgress();
  }, [user]);

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
        generateCardsForLesson(lessonId);
        toast({
          title: "Lesson Complete! ✓",
          description: `You've completed ${newCompleted.length} lessons. Review cards generated!`,
        });
      }

      // Sync to database
      if (user) {
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
