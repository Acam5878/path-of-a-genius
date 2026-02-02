import { useState, useEffect, useRef } from 'react';
import { checkMilestones, MilestoneType } from '@/components/milestones/MilestoneToast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const EARNED_MILESTONES_KEY = 'genius-academy-earned-milestones';

interface MilestoneState {
  lessons: number;
  tests: number;
  streak: number;
  subjects: number;
}

export const useMilestones = () => {
  const { user } = useAuth();
  const previousState = useRef<MilestoneState>({ lessons: 0, tests: 0, streak: 0, subjects: 0 });
  const [earnedMilestones, setEarnedMilestones] = useState<MilestoneType[]>(() => {
    const stored = localStorage.getItem(EARNED_MILESTONES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Save earned milestones to localStorage
  useEffect(() => {
    localStorage.setItem(EARNED_MILESTONES_KEY, JSON.stringify(earnedMilestones));
  }, [earnedMilestones]);

  // Sync milestones to database if user is logged in
  useEffect(() => {
    const syncMilestones = async () => {
      if (!user) return;
      
      for (const milestone of earnedMilestones) {
        // Check if already saved
        const { data: existing } = await supabase
          .from('user_achievements')
          .select('id')
          .eq('user_id', user.id)
          .eq('achievement_id', milestone)
          .maybeSingle();
        
        if (!existing) {
          await supabase.from('user_achievements').insert({
            user_id: user.id,
            achievement_id: milestone,
          });
        }
      }
    };

    syncMilestones();
  }, [user, earnedMilestones]);

  const checkAndTriggerMilestones = (
    completedLessonsCount: number,
    completedTestsCount: number,
    currentStreak: number,
    completedSubjectsCount: number
  ) => {
    const milestone = checkMilestones(
      completedLessonsCount,
      completedTestsCount,
      currentStreak,
      completedSubjectsCount,
      previousState.current
    );

    // Update previous state for next comparison
    previousState.current = {
      lessons: completedLessonsCount,
      tests: completedTestsCount,
      streak: currentStreak,
      subjects: completedSubjectsCount,
    };

    // Record earned milestone if new
    if (milestone && !earnedMilestones.includes(milestone)) {
      setEarnedMilestones(prev => [...prev, milestone]);
    }

    return milestone;
  };

  const initializePreviousState = (state: MilestoneState) => {
    previousState.current = state;
  };

  return {
    earnedMilestones,
    checkAndTriggerMilestones,
    initializePreviousState,
  };
};
