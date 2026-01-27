import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface StudySession {
  geniusId: string;
  subjectId: string;
  lessonId?: string;
  durationMinutes: number;
}

export interface LessonProgress {
  geniusId: string;
  subjectId: string;
  lessonId: string;
  completed: boolean;
  quizScore?: number;
}

export const useProgressSync = () => {
  const { user } = useAuth();

  const recordStudySession = useCallback(async (session: StudySession) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase.from('study_sessions').insert({
      user_id: user.id,
      genius_id: session.geniusId,
      subject_id: session.subjectId,
      lesson_id: session.lessonId,
      duration_minutes: session.durationMinutes,
    });

    if (error) {
      console.error('Failed to record study session:', error);
      return { error: error.message };
    }

    // Update streak
    await updateStreak();

    return { error: null };
  }, [user]);

  const updateLessonProgress = useCallback(async (progress: LessonProgress) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase.from('user_progress').upsert({
      user_id: user.id,
      genius_id: progress.geniusId,
      subject_id: progress.subjectId,
      lesson_id: progress.lessonId,
      completed: progress.completed,
      quiz_score: progress.quizScore,
      completed_at: progress.completed ? new Date().toISOString() : null,
    }, {
      onConflict: 'user_id,genius_id,subject_id,lesson_id',
    });

    if (error) {
      console.error('Failed to update lesson progress:', error);
      return { error: error.message };
    }

    return { error: null };
  }, [user]);

  const updateStreak = useCallback(async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    // Get current streak data
    const { data: streakData } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!streakData) return;

    const lastActivity = streakData.last_activity_date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = streakData.current_streak;

    if (lastActivity === today) {
      // Already logged today, no change
      return;
    } else if (lastActivity === yesterdayStr) {
      // Consecutive day, increment streak
      newStreak = streakData.current_streak + 1;
    } else {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, streakData.longest_streak);

    await supabase.from('user_streaks').update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
    }).eq('user_id', user.id);
  }, [user]);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase.from('user_achievements').upsert({
      user_id: user.id,
      achievement_id: achievementId,
    }, {
      onConflict: 'user_id,achievement_id',
      ignoreDuplicates: true,
    });

    if (error) {
      console.error('Failed to unlock achievement:', error);
      return { error: error.message };
    }

    return { error: null };
  }, [user]);

  const fetchUserProgress = useCallback(async () => {
    if (!user) return { data: null, error: 'Not authenticated' };

    const [progressResult, streakResult, achievementsResult, sessionsResult] = await Promise.all([
      supabase.from('user_progress').select('*').eq('user_id', user.id),
      supabase.from('user_streaks').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('user_achievements').select('*').eq('user_id', user.id),
      supabase.from('study_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
    ]);

    return {
      data: {
        progress: progressResult.data || [],
        streak: streakResult.data,
        achievements: achievementsResult.data || [],
        recentSessions: sessionsResult.data || [],
      },
      error: null,
    };
  }, [user]);

  const getTotalStudyTime = useCallback(async () => {
    if (!user) return 0;

    const { data } = await supabase
      .from('study_sessions')
      .select('duration_minutes')
      .eq('user_id', user.id);

    if (!data) return 0;

    return data.reduce((total, session) => total + (session.duration_minutes || 0), 0);
  }, [user]);

  return {
    recordStudySession,
    updateLessonProgress,
    unlockAchievement,
    fetchUserProgress,
    getTotalStudyTime,
    updateStreak,
  };
};
