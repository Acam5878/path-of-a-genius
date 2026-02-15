import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Subject, getSubjectsByGeniusId } from '@/data/geniuses';
import { getLessonsBySubjectId } from '@/data/lessons';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { showMilestoneToast } from '@/components/milestones/MilestoneToast';

export interface UserSubject {
  subjectId: string;
  geniusId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  addedDate: string;
  startedDate?: string;
  completedDate?: string;
  totalTimeSpent: number;
  notes: string;
  completedLessons: string[];
}

interface LearningPathContextType {
  userSubjects: UserSubject[];
  addSubject: (subject: Subject) => void;
  removeSubject: (subjectId: string) => void;
  startSubject: (subjectId: string) => void;
  updateProgress: (subjectId: string, progress: number) => void;
  completeSubject: (subjectId: string) => void;
  addAllSubjectsFromGenius: (geniusId: string) => void;
  isSubjectAdded: (subjectId: string) => boolean;
  getSubjectProgress: (subjectId: string) => UserSubject | undefined;
  toggleLessonComplete: (subjectId: string, lessonId: string) => void;
  isLessonCompleted: (subjectId: string, lessonId: string) => boolean;
  streak: number;
  totalHours: number;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const LearningPathProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const previousLessonCount = useRef(0);
  const previousSubjectCount = useRef(0);
  
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);
  const [streak, setStreak] = useState(0);

  // Load from DB on login
  useEffect(() => {
    const loadFromDb = async () => {
      if (!user) {
        setUserSubjects([]);
        setStreak(0);
        return;
      }

      // Fetch streak
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('current_streak')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setStreak(streakData?.current_streak ?? 0);

      // Fetch completed lessons from DB (non-path entries)
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('genius_id, subject_id, lesson_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .neq('genius_id', 'path');

      if (progressData && progressData.length > 0) {
        // Build userSubjects from DB data
        setUserSubjects(prev => {
          const updated = [...prev];
          for (const row of progressData) {
            const subjectIdx = updated.findIndex(s => s.subjectId === row.subject_id);
            if (subjectIdx >= 0) {
              const subject = updated[subjectIdx];
              if (!subject.completedLessons.includes(row.lesson_id)) {
                subject.completedLessons = [...subject.completedLessons, row.lesson_id];
                const lessons = getLessonsBySubjectId(row.subject_id);
                const totalLessons = lessons.length;
                subject.progress = totalLessons > 0 
                  ? Math.round((subject.completedLessons.length / totalLessons) * 100)
                  : 0;
                subject.status = subject.progress >= 100 ? 'completed' : subject.progress > 0 ? 'in_progress' : 'not_started';
              }
            }
          }
          return updated;
        });
      }
    };

    loadFromDb();
  }, [user]);

  // Check for milestones
  useEffect(() => {
    const totalCompletedLessons = userSubjects.reduce(
      (acc, s) => acc + (s.completedLessons?.length || 0), 0
    );
    const completedSubjects = userSubjects.filter(s => s.status === 'completed').length;
    
    if (totalCompletedLessons > previousLessonCount.current) {
      if (totalCompletedLessons === 1) {
        showMilestoneToast('first_lesson');
      } else if (totalCompletedLessons === 5 && previousLessonCount.current < 5) {
        showMilestoneToast('five_lessons');
      } else if (totalCompletedLessons === 10 && previousLessonCount.current < 10) {
        showMilestoneToast('ten_lessons');
      }
    }
    
    if (completedSubjects > previousSubjectCount.current && previousSubjectCount.current === 0) {
      showMilestoneToast('first_subject_complete');
    }
    
    previousLessonCount.current = totalCompletedLessons;
    previousSubjectCount.current = completedSubjects;
  }, [userSubjects]);

  const totalHours = userSubjects.reduce((acc, s) => acc + s.totalTimeSpent, 0) / 60;

  const addSubject = (subject: Subject) => {
    if (isSubjectAdded(subject.id)) {
      toast({
        title: "Already Added",
        description: `${subject.subjectName} is already in your learning path.`,
      });
      return;
    }

    const newUserSubject: UserSubject = {
      subjectId: subject.id,
      geniusId: subject.geniusId,
      status: 'not_started',
      progress: 0,
      addedDate: new Date().toISOString(),
      totalTimeSpent: 0,
      notes: '',
      completedLessons: [],
    };

    setUserSubjects(prev => [...prev, newUserSubject]);
    toast({
      title: "Subject Added!",
      description: `${subject.subjectName} has been added to your learning path.`,
    });
  };

  const removeSubject = (subjectId: string) => {
    setUserSubjects(prev => prev.filter(s => s.subjectId !== subjectId));
    toast({
      title: "Subject Removed",
      description: "The subject has been removed from your learning path.",
    });
  };

  const startSubject = (subjectId: string) => {
    setUserSubjects(prev => prev.map(s => 
      s.subjectId === subjectId 
        ? { ...s, status: 'in_progress' as const, startedDate: new Date().toISOString(), progress: Math.max(s.progress, 5) }
        : s
    ));
  };

  const updateProgress = (subjectId: string, progress: number) => {
    setUserSubjects(prev => prev.map(s => 
      s.subjectId === subjectId 
        ? { 
            ...s, 
            progress: Math.min(100, Math.max(0, progress)),
            status: progress >= 100 ? 'completed' as const : 'in_progress' as const,
            completedDate: progress >= 100 ? new Date().toISOString() : s.completedDate
          }
        : s
    ));
  };

  const completeSubject = (subjectId: string) => {
    setUserSubjects(prev => prev.map(s => 
      s.subjectId === subjectId 
        ? { ...s, status: 'completed' as const, progress: 100, completedDate: new Date().toISOString() }
        : s
    ));
    toast({
      title: "Subject Completed! 🎉",
      description: "Congratulations on completing this subject!",
    });
  };

  const addAllSubjectsFromGenius = (geniusId: string) => {
    const geniusSubjects = getSubjectsByGeniusId(geniusId);
    const newSubjects: UserSubject[] = [];

    geniusSubjects.forEach(subject => {
      if (!isSubjectAdded(subject.id)) {
        newSubjects.push({
          subjectId: subject.id,
          geniusId: subject.geniusId,
          status: 'not_started',
          progress: 0,
          addedDate: new Date().toISOString(),
          totalTimeSpent: 0,
          notes: '',
          completedLessons: [],
        });
      }
    });

    if (newSubjects.length === 0) {
      toast({
        title: "Already Added",
        description: "All subjects from this curriculum are already in your path.",
      });
      return;
    }

    setUserSubjects(prev => [...prev, ...newSubjects]);
    toast({
      title: "Curriculum Started! 🚀",
      description: `${newSubjects.length} subjects have been added to your learning path.`,
    });
  };

  const isSubjectAdded = (subjectId: string) => {
    return userSubjects.some(s => s.subjectId === subjectId);
  };

  const getSubjectProgress = (subjectId: string) => {
    return userSubjects.find(s => s.subjectId === subjectId);
  };

  const toggleLessonComplete = (subjectId: string, lessonId: string) => {
    if (!user) return;

    setUserSubjects(prev => prev.map(s => {
      if (s.subjectId !== subjectId) return s;
      
      const lessons = getLessonsBySubjectId(subjectId);
      const totalLessons = lessons.length;
      const currentCompletedLessons = s.completedLessons || [];
      
      const isCompleted = currentCompletedLessons.includes(lessonId);
      const newCompletedLessons = isCompleted 
        ? currentCompletedLessons.filter(id => id !== lessonId)
        : [...currentCompletedLessons, lessonId];
      
      const newProgress = totalLessons > 0 
        ? Math.round((newCompletedLessons.length / totalLessons) * 100)
        : 0;
      
      const newStatus = newProgress >= 100 
        ? 'completed' as const 
        : newProgress > 0 
          ? 'in_progress' as const 
          : 'not_started' as const;

      if (!isCompleted) {
        toast({
          title: "Lesson Complete! ✓",
          description: `Progress: ${newCompletedLessons.length}/${totalLessons} lessons`,
        });
      }

      // Sync to database
      if (!isCompleted) {
        supabase.from('user_progress').upsert({
          user_id: user.id,
          genius_id: s.geniusId,
          subject_id: subjectId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,genius_id,subject_id,lesson_id',
        }).then(({ error }) => {
          if (error) console.error('Failed to save lesson progress:', error);
        });
      } else {
        supabase.from('user_progress').update({
          completed: false,
          completed_at: null,
        }).eq('user_id', user.id)
          .eq('genius_id', s.geniusId)
          .eq('subject_id', subjectId)
          .eq('lesson_id', lessonId)
          .then(({ error }) => {
            if (error) console.error('Failed to update lesson progress:', error);
          });
      }

      return {
        ...s,
        completedLessons: newCompletedLessons,
        progress: newProgress,
        status: newStatus,
        startedDate: s.startedDate || new Date().toISOString(),
        completedDate: newProgress >= 100 ? new Date().toISOString() : s.completedDate,
      };
    }));
  };

  const isLessonCompleted = (subjectId: string, lessonId: string) => {
    const subject = userSubjects.find(s => s.subjectId === subjectId);
    return subject?.completedLessons?.includes(lessonId) ?? false;
  };

  return (
    <LearningPathContext.Provider value={{
      userSubjects,
      addSubject,
      removeSubject,
      startSubject,
      updateProgress,
      completeSubject,
      addAllSubjectsFromGenius,
      isSubjectAdded,
      getSubjectProgress,
      toggleLessonComplete,
      isLessonCompleted,
      streak,
      totalHours,
    }}>
      {children}
    </LearningPathContext.Provider>
  );
};

export const useLearningPath = () => {
  const context = useContext(LearningPathContext);
  if (context === undefined) {
    throw new Error('useLearningPath must be used within a LearningPathProvider');
  }
  return context;
};
