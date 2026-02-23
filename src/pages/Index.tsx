import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Star, Users, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

import { Header } from '@/components/layout/Header';
import { FirstVisitHero, hasSeenHero } from '@/components/home/FirstVisitHero';
import { UnauthenticatedHome } from '@/components/home/UnauthenticatedHome';
import { GeniusCard } from '@/components/cards/GeniusCard';
import { IQProgressCard } from '@/components/iq-test/IQProgressCard';
import { ContinueLearningCard } from '@/components/home/ContinueLearningCard';
import { ReviewDueCard } from '@/components/home/ReviewDueCard';
import { KnowledgeWebCard } from '@/components/home/KnowledgeWebCard';
import { DesktopSidePanels } from '@/components/home/DesktopSidePanels';
import { WelcomeProfileCard } from '@/components/home/WelcomeProfileCard';

import { DiscoverHeroPanel } from '@/components/home/DiscoverHeroPanel';

import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { GeniusMentor } from '@/components/onboarding/GeniusMentor';
import { ReminderPrompt, useReminderPrompt } from '@/components/reminders/ReminderPrompt';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { geniuses } from '@/data/geniuses';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLearnerCount } from '@/hooks/useLearnerCount';

// Time-aware greeting
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

// Streak welcome card for returning users — pulls from DB
const StreakWelcomeCard = () => {
  const [dismissed, setDismissed] = useState(false);
  const { user } = useAuth();
  const [streakData, setStreakData] = useState<{ current: number; longest: number; studiedToday: boolean } | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (!user) return;

    // Fetch display name from profile
    supabase.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name.split(' ')[0]);
      });

    const updateLoginStreak = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data: existing } = await supabase
        .from('user_streaks').select('*').eq('user_id', user.id).maybeSingle();

      if (!existing) { setStreakData({ current: 1, longest: 1, studiedToday: false }); return; }

      const lastActivity = existing.last_activity_date;
      if (lastActivity === today) {
        setStreakData({ current: existing.current_streak, longest: existing.longest_streak, studiedToday: true });
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const newStreak = lastActivity === yesterdayStr ? existing.current_streak + 1 : 1;
      const longestStreak = Math.max(newStreak, existing.longest_streak);

      await supabase.from('user_streaks').update({
        current_streak: newStreak, longest_streak: longestStreak, last_activity_date: today,
      }).eq('user_id', user.id);

      setStreakData({ current: newStreak, longest: longestStreak, studiedToday: false });
    };
    updateLoginStreak();
  }, [user]);

  if (dismissed || !user || !streakData) return null;

  const needsStudyToday = !streakData.studiedToday && streakData.current > 0;

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
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${needsStudyToday ? 'bg-orange-500/20' : 'bg-secondary/20'}`}>
            <Flame className={`w-7 h-7 ${needsStudyToday ? 'text-orange-400' : 'text-secondary'}`} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
              {displayName ? `${getGreeting()}, ${displayName}` : getGreeting()}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl font-bold text-white">{streakData.current}</span>
              <span className="text-sm text-white/60">day streak</span>
            </div>
            {needsStudyToday ? (
              <p className="text-[10px] text-orange-400 flex items-center gap-1 mt-0.5">
                <AlertTriangle className="w-3 h-3" /> Study today to keep your streak alive!
              </p>
            ) : streakData.current >= 3 ? (
              <p className="text-[10px] text-secondary flex items-center gap-1 mt-0.5">
                🔥 You studied today — keep it up!
              </p>
            ) : null}
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-white/30 hover:text-white/60 text-xs px-2 py-1">✕</button>
      </div>
    </motion.div>
  );
};



const Index = () => {
  const [heroComplete, setHeroComplete] = useState(hasSeenHero());
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { showPrompt: showReminder, setShowPrompt: setShowReminder } = useReminderPrompt();
  const { dueCards, totalCards } = useSpacedRepetition();
  const { formatted: learnerCount } = useLearnerCount();
  
  const allGeniusesPreview = geniuses.slice(0, 6);

  // First visit: show interactive hero flow
  if (!heroComplete) {
    return <FirstVisitHero onComplete={() => {
      setHeroComplete(true);
      // Go straight to feed — skip marketing page, keep product momentum
      navigate('/feed');
    }} />;
  }

  // Returning visitor but not logged in: show marketing landing page
  if (!user) {
    return <UnauthenticatedHome />;
  }

  return (
    <AppLayout>
      <Header showLogo />
      
      <OnboardingModal open={showOnboarding} onClose={completeOnboarding} />
      <ReminderPrompt open={showReminder} onClose={() => setShowReminder(false)} />
      
      <div className="flex justify-center">
        <DesktopSidePanels.Left />
        <div className="flex-1 min-w-0 py-4 space-y-6">

        {/* Welcome Profile Card for new signups */}
        <WelcomeProfileCard />

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

        {/* Path Hero CTA — primary conversion surface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4"
        >
          <button
            onClick={() => navigate('/the-path')}
            className="w-full text-left gradient-premium rounded-2xl p-5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative">
              <p className="text-primary-foreground/70 font-mono text-[10px] uppercase tracking-widest mb-1">Where geniuses begin</p>
              <h3 className="font-heading text-xl font-bold text-primary-foreground leading-snug mb-2">
                Start The Path →
              </h3>
              <p className="text-primary-foreground/70 text-xs leading-relaxed mb-4">
                6 modules. Latin → Logic → Mathematics → Sciences → Humanities → Great Books. The same foundations that built Einstein, Newton, and Da Vinci.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {['🏛️','⚖️','📐','🔭','📜','📚'].map((e, i) => (
                    <span key={i} className="w-7 h-7 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center text-xs">{e}</span>
                  ))}
                </div>
                <span className="text-primary-foreground/60 text-xs">10 min/day</span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Premium upsell only shown deep in the app, not on home page */}

        {/* Trust Signals */}
        <div className="mx-4 flex items-center justify-center gap-4 py-3 border-y border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[11px]">{learnerCount} learners</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
            <span className="text-[11px]">4.8 rating</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Primary sources</span>
          </div>
        </div>

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

        {/* App Store Download Button */}
        <div className="mx-4 mb-6 flex flex-col items-center gap-3 py-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Available on</p>
          <a
            href="https://apps.apple.com/au/app/path-of-a-genius/id6758322387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground text-background rounded-xl px-5 py-3 hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] leading-tight opacity-70">Download on the</p>
              <p className="text-base font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>

        <GeniusMentor />
    </AppLayout>
  );
};

export default Index;
