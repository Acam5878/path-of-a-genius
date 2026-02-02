import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TestResult, IQCategory } from '@/data/iqTests';
import { useToast } from '@/hooks/use-toast';

interface IQProfile {
  overallIQ: number;
  verbalIQ: number | null;
  numericalIQ: number | null;
  spatialIQ: number | null;
  logicalIQ: number | null;
  memoryIQ: number | null;
  patternRecognitionIQ: number | null;
  totalTestsTaken: number;
  averageScore: number;
  lastTestDate: string | null;
}

interface IQTestRecord {
  id: string;
  testId: string;
  category: string;
  score: number;
  maxScore: number;
  percentageScore: number;
  estimatedIQ: number;
  timeTaken: number;
  completedAt: string;
}

// Category weights for aggregated IQ calculation
const CATEGORY_WEIGHTS: Record<string, number> = {
  verbal: 0.18,
  numerical: 0.18,
  logical: 0.18,
  spatial: 0.15,
  'pattern-recognition': 0.16,
  memory: 0.15
};

/**
 * Calculate weighted overall IQ from category scores
 */
function calculateAggregatedIQ(categoryScores: Record<string, number | null>): number {
  let totalWeight = 0;
  let weightedSum = 0;
  
  for (const [category, score] of Object.entries(categoryScores)) {
    if (score !== null && CATEGORY_WEIGHTS[category]) {
      const weight = CATEGORY_WEIGHTS[category];
      weightedSum += score * weight;
      totalWeight += weight;
    }
  }
  
  if (totalWeight === 0) return 100; // Default IQ
  
  // Normalize if not all categories are present
  return Math.round(weightedSum / totalWeight);
}

export function useIQPersistence() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<IQProfile | null>(null);
  const [testHistory, setTestHistory] = useState<IQTestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's IQ profile and history
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setTestHistory([]);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_iq_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profileData) {
        setProfile({
          overallIQ: profileData.overall_iq,
          verbalIQ: profileData.verbal_iq,
          numericalIQ: profileData.numerical_iq,
          spatialIQ: profileData.spatial_iq,
          logicalIQ: profileData.logical_iq,
          memoryIQ: profileData.memory_iq,
          patternRecognitionIQ: profileData.pattern_recognition_iq,
          totalTestsTaken: profileData.total_tests_taken,
          averageScore: Number(profileData.average_score),
          lastTestDate: profileData.last_test_date
        });
      }

      // Fetch test history (last 30 tests)
      const { data: historyData, error: historyError } = await supabase
        .from('iq_test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(30);

      if (historyError) throw historyError;

      if (historyData) {
        setTestHistory(historyData.map(r => ({
          id: r.id,
          testId: r.test_id,
          category: r.category,
          score: r.score,
          maxScore: r.max_score,
          percentageScore: Number(r.percentage_score),
          estimatedIQ: r.estimated_iq,
          timeTaken: r.time_taken,
          completedAt: r.completed_at
        })));
      }
    } catch (error) {
      console.error('Error fetching IQ profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Save a test result and update profile
  const saveTestResult = useCallback(async (result: TestResult) => {
    if (!user) {
      console.log('No user logged in, skipping IQ result save');
      return;
    }

    try {
      // Insert test result
      const { error: insertError } = await supabase
        .from('iq_test_results')
        .insert({
          user_id: user.id,
          test_id: result.testId,
          category: result.category,
          score: result.score,
          max_score: result.maxScore,
          percentage_score: result.percentageScore,
          estimated_iq: result.estimatedIQ,
          time_taken: result.timeTaken,
          question_count: result.questionResults.length,
          strength_areas: result.strengthAreas,
          improvement_areas: result.improvementAreas
        });

      if (insertError) throw insertError;

      // Get all user's test results to recalculate aggregate IQ
      const { data: allResults, error: fetchError } = await supabase
        .from('iq_test_results')
        .select('category, estimated_iq, percentage_score')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      // Calculate category averages (best score per category for aggregate)
      const categoryScores: Record<string, number[]> = {};
      let totalPercentage = 0;
      
      allResults?.forEach(r => {
        const cat = r.category as string;
        if (!categoryScores[cat]) categoryScores[cat] = [];
        categoryScores[cat].push(r.estimated_iq);
        totalPercentage += Number(r.percentage_score);
      });

      // Use the average of best 3 scores per category (or all if less than 3)
      const categoryAverages: Record<string, number | null> = {
        verbal: null,
        numerical: null,
        spatial: null,
        logical: null,
        memory: null,
        'pattern-recognition': null
      };

      for (const [cat, scores] of Object.entries(categoryScores)) {
        if (cat === 'comprehensive') continue; // Skip comprehensive, use individual categories
        const sortedScores = scores.sort((a, b) => b - a);
        const topScores = sortedScores.slice(0, 3);
        categoryAverages[cat] = Math.round(topScores.reduce((a, b) => a + b, 0) / topScores.length);
      }

      // Calculate overall IQ
      const overallIQ = calculateAggregatedIQ(categoryAverages);
      const averageScore = allResults ? totalPercentage / allResults.length : 0;

      // Upsert profile
      const { error: upsertError } = await supabase
        .from('user_iq_profiles')
        .upsert({
          user_id: user.id,
          overall_iq: overallIQ,
          verbal_iq: categoryAverages.verbal,
          numerical_iq: categoryAverages.numerical,
          spatial_iq: categoryAverages.spatial,
          logical_iq: categoryAverages.logical,
          memory_iq: categoryAverages.memory,
          pattern_recognition_iq: categoryAverages['pattern-recognition'],
          total_tests_taken: allResults?.length || 1,
          average_score: averageScore,
          last_test_date: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;

      // Refresh profile data
      await fetchProfile();

      toast({
        title: "Results Saved",
        description: `Your IQ score has been recorded. Overall IQ: ${overallIQ}`
      });

    } catch (error) {
      console.error('Error saving IQ result:', error);
      toast({
        title: "Save Failed",
        description: "Could not save your test results. Please try again.",
        variant: "destructive"
      });
    }
  }, [user, fetchProfile, toast]);

  // Get best score for a specific category
  const getBestCategoryScore = useCallback((category: IQCategory): number | null => {
    const categoryResults = testHistory.filter(r => r.category === category);
    if (categoryResults.length === 0) return null;
    return Math.max(...categoryResults.map(r => r.estimatedIQ));
  }, [testHistory]);

  // Check if user can take a new test today (rate limiting)
  const canTakeTestToday = useCallback((category: IQCategory): boolean => {
    const today = new Date().toDateString();
    const todayTests = testHistory.filter(r => 
      r.category === category && 
      new Date(r.completedAt).toDateString() === today
    );
    return todayTests.length < 3; // Max 3 tests per category per day
  }, [testHistory]);

  return {
    profile,
    testHistory,
    isLoading,
    saveTestResult,
    getBestCategoryScore,
    canTakeTestToday,
    refreshProfile: fetchProfile
  };
}
