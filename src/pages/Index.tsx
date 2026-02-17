import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowRight, Flame, Zap } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { FirstVisitHero, hasSeenHero } from '@/components/home/FirstVisitHero';
import { GeniusCard } from '@/components/cards/GeniusCard';
import { IQProgressCard } from '@/components/iq-test/IQProgressCard';
import { ContinueLearningCard } from '@/components/home/ContinueLearningCard';
import { ReviewDueCard } from '@/components/home/ReviewDueCard';
import { KnowledgeWebCard } from '@/components/home/KnowledgeWebCard';
import { DesktopSidePanels } from '@/components/home/DesktopSidePanels';

import { DiscoverHeroPanel } from '@/components/home/DiscoverHeroPanel';

import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { GeniusMentor } from '@/components/onboarding/GeniusMentor';
import { ReminderPrompt, useReminderPrompt } from '@/components/reminders/ReminderPrompt';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { geniuses } from '@/data/geniuses';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Streak welcome card for returning users — pulls from DB
const StreakWelcomeCard = () => {
  const [dismissed, setDismissed] = useState(false);
  const { user } = useAuth();
  const [streakData, setStreakData] = useState<{ current: number; longest: number } | null>(null);

  useEffect(() => {
    if (!user) return;

    // Update streak based on login (last_sign_in_at)
    const updateLoginStreak = async () => {
      const today = new Date().toISOString().split('T')[0];

      const { data: existing } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existing) {
        setStreakData({ current: 1, longest: 1 });
        return;
      }

      const lastActivity = existing.last_activity_date;

      if (lastActivity === today) {
        // Already counted today
        setStreakData({ current: existing.current_streak, longest: existing.longest_streak });
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak: number;
      if (lastActivity === yesterdayStr) {
        newStreak = existing.current_streak + 1;
      } else {
        newStreak = 1;
      }

      const longestStreak = Math.max(newStreak, existing.longest_streak);

      await supabase.from('user_streaks').update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_activity_date: today,
      }).eq('user_id', user.id);

      setStreakData({ current: newStreak, longest: longestStreak });
    };

    updateLoginStreak();
  }, [user]);

  if (dismissed || !user || !streakData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mx-4 bg-gradient-to-br from-[hsl(217,30%,13%)] to-[hsl(217,30%,18%)] border border-secondary/20 rounded-2xl p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <Flame className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Welcome back!</p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl font-bold text-white">
                {streakData.current}
              </span>
              <span className="text-sm text-white/60">day streak</span>
            </div>
            {streakData.current >= 3 && (
              <p className="text-[10px] text-secondary flex items-center gap-1 mt-0.5">
                🔥 Don't break your streak!
              </p>
            )}
            {streakData.current < 3 && streakData.longest > streakData.current && (
              <p className="text-[10px] text-white/30 flex items-center gap-1 mt-0.5">
                <Zap className="w-3 h-3" /> Best: {streakData.longest} days
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/30 hover:text-white/60 text-xs px-2 py-1"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};


const Index = () => {
  const [heroComplete, setHeroComplete] = useState(hasSeenHero());
  const navigate = useNavigate();
  const { showPaywall, isPremium } = useSubscription();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { showPrompt: showReminder, setShowPrompt: setShowReminder } = useReminderPrompt();
  const { dueCards, totalCards, recordReview } = useSpacedRepetition();
  
  const allGeniusesPreview = geniuses.slice(0, 6);

  if (!heroComplete) {
    return <FirstVisitHero onComplete={() => {
      setHeroComplete(true);
      navigate('/feed');
    }} />;
  }

  return (
    <AppLayout>
      <Header showLogo />
      
      <OnboardingModal open={showOnboarding} onClose={completeOnboarding} />
      <ReminderPrompt open={showReminder} onClose={() => setShowReminder(false)} />
      
      <div className="flex justify-center">
        <DesktopSidePanels.Left />
        <div className="flex-1 min-w-0 py-4 space-y-6">

        {/* Streak Welcome Card for returning users */}
        <StreakWelcomeCard />

        {/* ── Discover Hero Panel ── */}
        <DiscoverHeroPanel />

        {/* Why This Works - Knowledge Web */}
        <KnowledgeWebCard />

        {/* Activity row: 3 equal cards */}
        <div className="px-4 grid grid-cols-3 gap-2">
          <ContinueLearningCard />
          <ReviewDueCard 
            dueCards={dueCards} 
            totalCards={totalCards} 
          />
          <IQProgressCard variant="compact" />
        </div>

        {/* Premium Upsell Banner */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 gradient-premium rounded-2xl p-4 text-primary-foreground"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Crown className="w-4 h-4" />
                  <span className="font-mono text-[10px]">PREMIUM</span>
                </div>
                <h3 className="font-heading text-base font-semibold">Unlock All Geniuses</h3>
              </div>
              <Button 
                onClick={showPaywall}
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-gold-light"
              >
                Upgrade
              </Button>
            </div>
          </motion.div>
        )}

        {/* Pick A Genius to Follow */}
        <Section title="Pick A Genius to Follow" action={{ label: 'View All', href: '/geniuses' }}>
          <div className="px-4 grid grid-cols-3 gap-2">
            {allGeniusesPreview.map((genius, i) => (
              <motion.div
                key={genius.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <GeniusCard genius={genius} />
              </motion.div>
            ))}
          </div>
          <div className="px-4 mt-3">
            <Button
              onClick={() => navigate('/geniuses')}
              variant="outline"
              className="w-full border-secondary/30 text-secondary hover:bg-secondary/10"
            >
              Explore All Geniuses
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Section>
        </div>
        <DesktopSidePanels.Right />
      </div>

      <GeniusMentor />
    </AppLayout>
  );
};

export default Index;
