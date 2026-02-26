import { motion } from 'framer-motion';
import { Flame, Clock, BookOpen, Trophy, Lock, Crown, Target, TrendingUp, Brain, Share2, Download, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/cards/StatCard';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useIQPersistence } from '@/hooks/useIQPersistence';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PageExplainer } from '@/components/onboarding/PageExplainer';
import { categoryDisplayNames, IQCategory } from '@/data/iqTypes';
import { IQBellCurve } from '@/components/iq-test/IQBellCurve';
import { getSubjectById } from '@/data/geniuses';
import { format, subDays, isAfter } from 'date-fns';



interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  key: string;
  max?: number;
}

interface AchievementState extends AchievementDef {
  earned: boolean;
  date?: string;
  progress?: number;
}

const achievements: AchievementDef[] = [
  { id: '1', name: 'First Steps', description: 'Add your first subject', icon: '🎯', key: 'first_subject' },
  { id: '2', name: 'Polyglot Path', description: 'Study 2+ languages', icon: '🗣️', key: 'polyglot' },
  { id: '3', name: 'Renaissance Mind', description: 'Study 3+ disciplines', icon: '🎨', key: 'renaissance', max: 3 },
  { id: '4', name: 'Century Scholar', description: '100 hours total', icon: '📚', key: 'century', max: 100 },
  { id: '5', name: 'Path Pioneer', description: 'Complete 10 Path lessons', icon: '🧒', key: 'path_pioneer', max: 10 },
  { id: '6', name: 'Consistency King', description: '30 day streak', icon: '👑', key: 'consistency', max: 30 },
];

const Progress = () => {
  const { user } = useAuth();
  const { showPaywall, isPremium } = useSubscription();
  const { profile, testHistory, isLoading: iqLoading } = useIQPersistence();
  const { userSubjects, streak } = useLearningPath();
  const { completedLessons: pathCompleted } = usePathProgress();
  const { totalCards, dueCards } = useSpacedRepetition();
  const navigate = useNavigate();
  const [showParentSummary, setShowParentSummary] = useState(false);
  const [realTotalHours, setRealTotalHours] = useState(0);

  // Load total study hours from DB (study_sessions table)
  useEffect(() => {
    const loadHours = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('study_sessions')
        .select('duration_minutes')
        .eq('user_id', user.id);
      if (data) {
        const mins = data.reduce((sum, r) => sum + (r.duration_minutes || 0), 0);
        setRealTotalHours(mins / 60);
      }
    };
    loadHours();
  }, [user]);

  // Derive path module IDs from completed path lessons
  const pathModuleIds = useMemo(() => {
    const ids = new Set<string>();
    // module_id stored in user_review_cards, but for progress counting
    // we track via the lesson's moduleId prefix stored in pathCompleted
    // Path lesson IDs follow: "<moduleId>-<lessonSlug>" pattern
    pathCompleted.forEach(lessonId => {
      // Known multi-word module IDs (e.g., "ancient-greek", "art-literature")
      const knownModules = ['ancient-greek', 'art-literature', 'modern-science'];
      const matched = knownModules.find(m => lessonId.startsWith(m + '-'));
      if (matched) {
        ids.add(matched);
      } else {
        const firstPart = lessonId.split('-')[0];
        if (firstPart) ids.add(firstPart);
      }
    });
    return ids;
  }, [pathCompleted]);

  // Compute real stats
  const completedSubjects = userSubjects.filter(s => s.status === 'completed').length;
  const totalLessonsCompleted = userSubjects.reduce((acc, s) => acc + (s.completedLessons?.length || 0), 0) + pathCompleted.length;
  // Subjects engaged: path modules with completions + traditional subjects with completions
  const totalSubjectsEngaged = pathModuleIds.size + userSubjects.filter(s => s.completedLessons?.length > 0).length;
  const totalSubjects = Math.max(totalSubjectsEngaged, userSubjects.length);
  const totalHours = realTotalHours;

  // Build real heatmap from DB completion dates (last 90 days)
  const [heatmapData, setHeatmapData] = useState<{ date: Date; intensity: number }[]>(
    Array.from({ length: 90 }, (_, i) => ({ date: subDays(new Date(), 89 - i), intensity: 0 }))
  );

  useEffect(() => {
    const loadHeatmap = async () => {
      if (!user) return;
      const ninetyDaysAgo = subDays(new Date(), 90).toISOString();
      const { data } = await supabase
        .from('user_progress')
        .select('completed_at')
        .eq('user_id', user.id)
        .eq('completed', true)
        .gte('completed_at', ninetyDaysAgo);

      const dayCounts: Record<string, number> = {};
      data?.forEach(row => {
        if (row.completed_at) {
          const day = row.completed_at.split('T')[0];
          dayCounts[day] = (dayCounts[day] || 0) + 1;
        }
      });

      setHeatmapData(
        Array.from({ length: 90 }, (_, i) => {
          const date = subDays(new Date(), 89 - i);
          const dateStr = format(date, 'yyyy-MM-dd');
          return { date, intensity: Math.min(dayCounts[dateStr] || 0, 3) };
        })
      );
    };
    loadHeatmap();
  }, [user]);

  // Real time by subject
  const timeBySubject = useMemo(() => {
    const subjectTimes = userSubjects
      .filter(s => s.completedLessons?.length > 0)
      .map(s => {
        const subject = getSubjectById(s.subjectId);
        return {
          name: subject?.subjectName || s.subjectId,
          lessons: s.completedLessons?.length || 0,
          progress: s.progress,
          geniusId: s.geniusId,
        };
      })
      .sort((a, b) => b.lessons - a.lessons)
      .slice(0, 5);
    return subjectTimes;
  }, [userSubjects]);

  // Compute achievements progress
  const achievementState: AchievementState[] = useMemo(() => {
    return achievements.map((a): AchievementState => {
      switch (a.key) {
        case 'first_subject':
          return { ...a, earned: totalSubjects > 0, date: userSubjects[0]?.addedDate ? format(new Date(userSubjects[0].addedDate), 'MMM d') : '' };
        case 'polyglot': {
          const categories = new Set(userSubjects.map(s => getSubjectById(s.subjectId)?.category).filter(Boolean));
          const langCount = ['Ancient Greek', 'Latin', 'Languages'].filter(c => categories.has(c as any)).length;
          return { ...a, earned: langCount >= 2, progress: langCount, max: 2 };
        }
        case 'renaissance': {
          const cats = new Set(userSubjects.map(s => getSubjectById(s.subjectId)?.category).filter(Boolean));
          return { ...a, earned: cats.size >= 3, progress: cats.size };
        }
        case 'century':
          return { ...a, earned: totalHours >= 100, progress: Math.round(totalHours) };
        case 'path_pioneer':
          return { ...a, earned: pathCompleted.length >= 10, progress: pathCompleted.length };
        case 'consistency':
          return { ...a, earned: streak >= 30, progress: streak };
        default:
          return { ...a, earned: false };
      }
    });
  }, [totalSubjects, userSubjects, totalHours, pathCompleted, streak]);

  // Generate shareable text summary
  const generateReport = () => {
    const lines = [
      `📊 Learning Dashboard Report — ${format(new Date(), 'MMMM d, yyyy')}`,
      ``,
      `🔥 Streak: ${streak} days`,
      `⏱ Total Study Time: ${totalHours < 1 ? `${Math.round(totalHours * 60)} mins` : `${totalHours.toFixed(1)} hours`}`,
      `📚 Subjects engaged: ${totalSubjectsEngaged}`,
      `✅ Lessons Completed: ${totalLessonsCompleted}`,
      `🃏 Review Cards: ${totalCards} (${dueCards.length} due)`,
    ];
    if (profile) {
      lines.push(``, `🧠 IQ Profile: ${profile.overallIQ} (${profile.totalTestsTaken} tests)`);
    }
    const earned = achievementState.filter(a => a.earned);
    if (earned.length > 0) {
      lines.push(``, `🏆 Achievements: ${earned.map(a => a.name).join(', ')}`);
    }
    lines.push(``, `— Path of a Genius`);
    return lines.join('\n');
  };

  const handleShare = async () => {
    const text = generateReport();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Learning Progress Report', text });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      // Could show a toast here
    }
  };

  return (
    <AppLayout>
      <Header 
        title="Dashboard"
        showBackButton
        rightActions={
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleShare} className="text-muted-foreground hover:text-foreground">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        }
      />

      <div className="py-4 space-y-6">
        {/* Page Explainer */}
        <PageExplainer
          pageKey="dashboard"
          icon="📊"
          title="Your Dashboard"
          description="Track every aspect of your learning journey in one place."
          tips={[
            "The heatmap shows your daily activity over 90 days",
            "Share your progress report with parents or teachers",
            "Achievements unlock as you reach milestones",
          ]}
        />
        {/* Parent-Friendly Summary Toggle */}
        <div className="px-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowParentSummary(!showParentSummary)}
            className="w-full bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl border border-secondary/20 p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-secondary font-mono font-semibold uppercase tracking-wider">Weekly Summary</p>
                <p className="text-sm text-muted-foreground mt-0.5">Tap to see a parent-friendly overview</p>
              </div>
              {showParentSummary ? (
                <ChevronUp className="w-5 h-5 text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-secondary" />
              )}
            </div>
            {showParentSummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-border/50 space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-background/60 rounded-lg p-3 text-center">
                    <div className="text-2xl font-mono font-bold text-foreground">{Math.max(streak, user ? 1 : 0)}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="bg-background/60 rounded-lg p-3 text-center">
                    <div className="text-2xl font-mono font-bold text-foreground">{totalLessonsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Lessons Done</div>
                  </div>
                  <div className="bg-background/60 rounded-lg p-3 text-center">
                   <div className="text-2xl font-mono font-bold text-foreground">{totalHours < 1 ? `${Math.round(totalHours * 60)}m` : `${totalHours.toFixed(1)}h`}</div>
                    <div className="text-xs text-muted-foreground">Study Time</div>
                  </div>
                  <div className="bg-background/60 rounded-lg p-3 text-center">
                    <div className="text-2xl font-mono font-bold text-foreground">{profile?.overallIQ || '—'}</div>
                    <div className="text-xs text-muted-foreground">IQ Estimate</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {totalLessonsCompleted > 0 
                    ? `Great progress! ${totalLessonsCompleted} lessons completed across ${totalSubjectsEngaged} subject${totalSubjectsEngaged !== 1 ? 's' : ''}. ${streak > 0 ? `Currently on a ${streak}-day learning streak!` : 'Encourage daily practice to build a streak.'}`
                    : 'No lessons completed yet. Explore The Path or add subjects from a genius to get started!'}
                </p>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleShare(); }} className="w-full text-xs">
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  Share Progress Report
                </Button>
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Things You've Learned Counter */}
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-secondary/10 via-card to-accent/10 rounded-2xl border border-secondary/20 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-3">Things you've learned</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="text-2xl font-mono font-bold text-foreground"
                  >
                    {totalLessonsCompleted}
                  </motion.div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Lessons Mastered</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="text-2xl font-mono font-bold text-foreground"
                  >
                    {totalCards}
                  </motion.div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Concepts Retained</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="text-2xl font-mono font-bold text-foreground"
                  >
                    {completedSubjects}
                  </motion.div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Subjects Complete</p>
                </div>
              </div>
              {totalLessonsCompleted > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-3 italic">
                  Every lesson builds your understanding. Keep going!
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Hero Stats - Real Data */}
        <div className="px-4 grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <StatCard icon={Flame} value={String(Math.max(streak, user ? 1 : 0))} label="Day Streak" sublabel={streak > 1 ? 'Keep going!' : 'Welcome!'} variant="accent" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard icon={Clock} value={totalHours < 1 ? `${Math.round(totalHours * 60)}m` : totalHours.toFixed(1) + 'h'} label="Study Time" sublabel="All time" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <StatCard icon={BookOpen} value={String(totalSubjectsEngaged)} label="Subjects" sublabel="Engaged" />
          </motion.div>
        </div>

        {/* SRS Stats */}
        {totalCards > 0 && (
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">Spaced Repetition</p>
                <p className="text-xs text-muted-foreground">{totalCards} cards · {dueCards.length} due for review</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-secondary">{dueCards.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Activity Heatmap */}
        <Section title="Study Activity">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <p className="text-xs text-muted-foreground mb-3">Last 90 days</p>
              <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
                {heatmapData.map((day, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-full aspect-square rounded-sm",
                      day.intensity === 0 && "bg-muted",
                      day.intensity === 1 && "bg-secondary/30",
                      day.intensity === 2 && "bg-secondary/60",
                      day.intensity >= 3 && "bg-secondary"
                    )}
                    title={`${day.date.toLocaleDateString()}: ${day.intensity} activities`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted" />
                  <div className="w-3 h-3 rounded-sm bg-secondary/30" />
                  <div className="w-3 h-3 rounded-sm bg-secondary/60" />
                  <div className="w-3 h-3 rounded-sm bg-secondary" />
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Lesson Progress by Subject */}
        {timeBySubject.length > 0 && (
          <Section title="Progress by Subject">
            <div className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-4 space-y-3"
              >
                {timeBySubject.map((subject, i) => (
                  <button
                    key={subject.name}
                    onClick={() => navigate(`/genius/${subject.geniusId}`)}
                    className="w-full space-y-1 text-left hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground group-hover:text-secondary transition-colors">{subject.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-muted-foreground">{subject.lessons} lessons · {subject.progress}%</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        className="h-full rounded-full bg-secondary"
                      />
                    </div>
                  </button>
                ))}
              </motion.div>
            </div>
          </Section>
        )}

        {/* Path Progress */}
        {pathCompleted.length > 0 && (
          <div className="px-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate('/the-path')}
              className="w-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-4 text-left hover:border-secondary/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="font-heading font-semibold text-foreground">The Path Progress</h3>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                {pathCompleted.length} lessons completed in the classical curriculum
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((pathCompleted.length / 50) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
                <span className="font-mono text-sm text-secondary font-bold">{pathCompleted.length}/50</span>
              </div>
            </motion.button>
          </div>
        )}

        {/* IQ Test History */}
        <Section title="IQ Test History">
          <div className="px-4">
            {iqLoading ? (
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <p className="text-muted-foreground">Loading IQ data...</p>
              </div>
            ) : profile ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl border border-secondary/20 p-4">
                <button onClick={() => navigate('/iq-tests')} className="flex items-center justify-between mb-3 w-full group">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-secondary" />
                      <h3 className="font-heading font-semibold text-foreground group-hover:text-secondary transition-colors">Your IQ Profile</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-3xl font-mono font-bold text-secondary">{profile.overallIQ}</div>
                  </button>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-mono font-bold text-foreground">{profile.totalTestsTaken}</div>
                      <div className="text-xs text-muted-foreground">Tests Taken</div>
                    </div>
                    <div>
                      <div className="text-lg font-mono font-bold text-foreground">{profile.averageScore.toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                    <div>
                      <div className="text-lg font-mono font-bold text-foreground">
                        {profile.lastTestDate ? format(new Date(profile.lastTestDate), 'MMM d') : '-'}
                      </div>
                      <div className="text-xs text-muted-foreground">Last Test</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Category Scores</p>
                    <div className="grid grid-cols-2 gap-2">
                      {profile.verbalIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verbal</span>
                          <span className="font-mono font-semibold text-foreground">{profile.verbalIQ}</span>
                        </div>
                      )}
                      {profile.numericalIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Numerical</span>
                          <span className="font-mono font-semibold text-foreground">{profile.numericalIQ}</span>
                        </div>
                      )}
                      {profile.logicalIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Logical</span>
                          <span className="font-mono font-semibold text-foreground">{profile.logicalIQ}</span>
                        </div>
                      )}
                      {profile.spatialIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Spatial</span>
                          <span className="font-mono font-semibold text-foreground">{profile.spatialIQ}</span>
                        </div>
                      )}
                      {profile.memoryIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Memory</span>
                          <span className="font-mono font-semibold text-foreground">{profile.memoryIQ}</span>
                        </div>
                      )}
                      {profile.patternRecognitionIQ && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Pattern</span>
                          <span className="font-mono font-semibold text-foreground">{profile.patternRecognitionIQ}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bell Curve */}
                <IQBellCurve userIQ={profile.overallIQ} />

                {testHistory.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h4 className="font-semibold text-foreground mb-3">Recent Tests</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {testHistory.slice(0, 10).map((test, i) => (
                        <motion.div
                          key={test.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                              <span className="text-sm">🧠</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {categoryDisplayNames[test.category as IQCategory] || test.category}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(test.completedAt), 'MMM d, yyyy • h:mm a')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-secondary">{test.estimatedIQ}</div>
                            <div className="text-xs text-muted-foreground">{test.percentageScore.toFixed(0)}%</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6 text-center"
              >
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-2">No IQ Tests Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take your first IQ test to see your cognitive profile and track improvement over time.
                </p>
                <Button 
                  onClick={() => navigate('/iq-tests')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Take IQ Test
                </Button>
              </motion.div>
            )}
          </div>
        </Section>

        {/* Achievements */}
        <Section title="Achievements">
          <div className="px-4 grid grid-cols-2 gap-3">
            {achievementState.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "rounded-xl p-4 text-center relative overflow-hidden",
                  achievement.earned
                    ? "bg-secondary/10 border border-secondary/20"
                    : "bg-card border border-border"
                )}
              >
                {!achievement.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
                <span className="text-3xl">{achievement.icon}</span>
                <h4 className={cn(
                  "font-semibold text-sm mt-2",
                  achievement.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.name}
                </h4>
                <p className="text-[10px] text-muted-foreground mt-1">{achievement.description}</p>
                {achievement.earned ? (
                  <p className="text-[10px] text-secondary mt-2">Earned{achievement.date ? ` ${achievement.date}` : ''}</p>
                ) : achievement.progress !== undefined && achievement.max !== undefined ? (
                  <div className="mt-2">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${Math.min((achievement.progress / achievement.max) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {achievement.progress}/{achievement.max}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground mt-2">Locked</p>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Premium Upsell */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 gradient-premium rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-cream" />
              <span className="font-mono text-xs text-cream">PREMIUM</span>
            </div>
            <h3 className="font-heading font-semibold text-cream">Unlock Advanced Analytics</h3>
            <div className="mt-3 space-y-2 opacity-50">
              <div className="h-8 bg-cream/20 rounded" />
              <div className="h-8 bg-cream/20 rounded" />
            </div>
            <Button 
              onClick={showPaywall}
              className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-gold-light"
            >
              Upgrade to Premium
            </Button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Progress;
