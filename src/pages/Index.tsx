import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Quote } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { FirstVisitHero, hasSeenHero } from '@/components/home/FirstVisitHero';
import { GeniusCard } from '@/components/cards/GeniusCard';
import { IQEstimateCard } from '@/components/cards/IQEstimateCard';
import { IQProgressCard } from '@/components/iq-test/IQProgressCard';
import { PathHeroCard } from '@/components/home/PathHeroCard';
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
import { useLearningPath } from '@/contexts/LearningPathContext';

const dailyQuote = {
  text: "Learning never exhausts the mind.",
  author: "Leonardo da Vinci"
};

const Index = () => {
  const [heroComplete, setHeroComplete] = useState(hasSeenHero());
  const navigate = useNavigate();
  const { showPaywall, isPremium } = useSubscription();
  const { isLessonCompleted } = useLearningPath();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { showPrompt: showReminder, setShowPrompt: setShowReminder } = useReminderPrompt();
  const { dueCards, totalCards, recordReview } = useSpacedRepetition();
  
  // Lazy-load lesson count for IQ estimate (avoid importing 4700-line lessons.ts at page load)
  const [lessonStats, setLessonStats] = useState({ completed: 0, total: 0 });
  useEffect(() => {
    import('@/data/lessons').then(({ getAllLessons }) => {
      const allLessons = getAllLessons();
      const completed = allLessons.filter(lesson => 
        isLessonCompleted(lesson.subjectId, lesson.id)
      ).length;
      setLessonStats({ completed, total: allLessons.length });
    });
  }, [isLessonCompleted]);

  const allGeniusesPreview = geniuses.slice(0, 8);

  // Show hero for first-time visitors, then send them to the Feed
  if (!heroComplete) {
    return <FirstVisitHero onComplete={() => {
      setHeroComplete(true);
      navigate('/feed');
    }} />;
  }

  return (
    <AppLayout>
      <Header showLogo />
      
      {/* Onboarding Modal for new users */}
      <OnboardingModal open={showOnboarding} onClose={completeOnboarding} />
      
      {/* Daily reminder prompt */}
      <ReminderPrompt open={showReminder} onClose={() => setShowReminder(false)} />
      
      <div className="flex justify-center">
        <DesktopSidePanels.Left />
        <div className="flex-1 min-w-0 py-4 space-y-6">

        {/* ── Discover Hero Panel — action cards with previews ── */}
        <DiscoverHeroPanel />

        {/* Why This Works - Knowledge Web */}
        <KnowledgeWebCard />

        {/* THE PATH - Hero Feature Card */}
        <PathHeroCard />

        {/* Continue Learning - The Path shortcut */}
        <div className="px-4">
          <ContinueLearningCard />
        </div>

        {/* Spaced Repetition Review */}
        <ReviewDueCard 
          dueCards={dueCards} 
          totalCards={totalCards} 
          onReview={recordReview} 
        />

        {/* IQ Progress Card - shows actual IQ if tests taken */}
        <div className="px-4">
          <IQProgressCard variant="compact" />
        </div>

        {/* IQ Estimate Card - based on curriculum */}
        <div className="px-4">
          <IQEstimateCard 
            completedLessons={lessonStats.completed}
            totalLessons={lessonStats.total}
          />
        </div>

        {/* Featured Genius */}
        <Section title="Featured Genius">
          <div className="px-4">
            <GeniusCard genius={geniuses[0]} variant="featured" />
          </div>
        </Section>

        {/* Daily Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-border"
        >
          <Quote className="w-6 h-6 text-secondary mb-3" />
          <p className="font-heading text-lg text-foreground italic leading-relaxed">
            "{dailyQuote.text}"
          </p>
          <p className="text-sm text-muted-foreground mt-3">— {dailyQuote.author}</p>
        </motion.div>

        {/* Premium Upsell Banner - only show for non-premium users */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-4 gradient-premium rounded-2xl p-5 text-primary-foreground"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              <span className="font-mono text-xs">PREMIUM</span>
            </div>
            <h3 className="font-heading text-xl font-semibold">Unlock 7 More Geniuses</h3>
            <p className="text-sm text-cream/80 mt-1">Access Einstein, Tesla, Curie and more with Premium</p>
            <Button 
              onClick={showPaywall}
              className="mt-4 bg-secondary text-secondary-foreground hover:bg-gold-light w-full"
            >
              Upgrade Now
            </Button>
          </motion.div>
        )}

        {/* All Geniuses Preview */}
        <Section title="All Geniuses" action={{ label: 'View All', href: '/geniuses' }}>
          <div className="px-4 grid grid-cols-2 gap-3">
            {allGeniusesPreview.map((genius, i) => (
              <motion.div
                key={genius.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <GeniusCard genius={genius} />
              </motion.div>
            ))}
          </div>
        </Section>
        </div>
        <DesktopSidePanels.Right />
      </div>

      {/* Genius Mentor floating companion */}
      <GeniusMentor />
    </AppLayout>
  );
};

export default Index;
