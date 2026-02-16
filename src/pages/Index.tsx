import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowRight } from 'lucide-react';
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


const Index = () => {
  const [heroComplete, setHeroComplete] = useState(hasSeenHero());
  const navigate = useNavigate();
  const { showPaywall, isPremium } = useSubscription();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { showPrompt: showReminder, setShowPrompt: setShowReminder } = useReminderPrompt();
  const { dueCards, totalCards, recordReview } = useSpacedRepetition();
  
  const allGeniusesPreview = geniuses.slice(0, 6);

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

        {/* Activity row: Continue Learning + Review Due + IQ in one dark strip */}
        <div className="px-4 space-y-2">
          <ContinueLearningCard />
          <ReviewDueCard 
            dueCards={dueCards} 
            totalCards={totalCards} 
            onReview={recordReview} 
          />
          <IQProgressCard variant="compact" />
        </div>

        {/* Premium Upsell Banner - only show for non-premium users */}
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

      {/* Genius Mentor floating companion */}
      <GeniusMentor />
    </AppLayout>
  );
};

export default Index;
