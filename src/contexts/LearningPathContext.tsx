import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subject, getSubjectsByGeniusId } from '@/data/geniuses';
import { getLessonsBySubjectId } from '@/data/lessons';
import { toast } from '@/hooks/use-toast';

export interface UserSubject {
  subjectId: string;
  geniusId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  addedDate: string;
  startedDate?: string;
  completedDate?: string;
  totalTimeSpent: number; // in minutes
  notes: string;
  completedLessons: string[]; // lesson IDs
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

const STORAGE_KEY = 'genius-academy-learning-path';
const STREAK_KEY = 'genius-academy-streak';

export const LearningPathProvider = ({ children }: { children: ReactNode }) => {
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem(STREAK_KEY);
    return stored ? JSON.parse(stored) : 7; // Default streak for demo
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userSubjects));
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
    setUserSubjects(prev => prev.map(s => {
      if (s.subjectId !== subjectId) return s;
      
      const lessons = getLessonsBySubjectId(subjectId);
      const totalLessons = lessons.length;
      
      const isCompleted = s.completedLessons.includes(lessonId);
      const newCompletedLessons = isCompleted 
        ? s.completedLessons.filter(id => id !== lessonId)
        : [...s.completedLessons, lessonId];
      
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
    return subject?.completedLessons.includes(lessonId) ?? false;
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
