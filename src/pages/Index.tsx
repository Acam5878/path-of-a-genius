import { motion } from 'framer-motion';
import { Flame, Crown, Quote } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { GeniusCard } from '@/components/cards/GeniusCard';
import { SubjectCard } from '@/components/cards/SubjectCard';
import { IQEstimateCard } from '@/components/cards/IQEstimateCard';
import { IQProgressCard } from '@/components/iq-test/IQProgressCard';
import { PathHeroCard } from '@/components/home/PathHeroCard';
import { ContinueLearningCard } from '@/components/home/ContinueLearningCard';
import { ReviewDueCard } from '@/components/home/ReviewDueCard';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { ReminderPrompt, useReminderPrompt } from '@/components/reminders/ReminderPrompt';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { geniuses, subjects } from '@/data/geniuses';
import { getAllLessons } from '@/data/lessons';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLearningPath } from '@/contexts/LearningPathContext';

const featuredGenius = geniuses[0]; // John Stuart Mill
const dailyQuote = {
  text: "Learning never exhausts the mind.",
  author: "Leonardo da Vinci"
};

const Index = () => {
  const { showPaywall, isPremium } = useSubscription();
  const { isLessonCompleted, streak, userSubjects } = useLearningPath();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const { showPrompt: showReminder, setShowPrompt: setShowReminder } = useReminderPrompt();
  const { dueCards, totalCards, recordReview } = useSpacedRepetition();
  
  const allGeniusesPreview = geniuses.slice(0, 8); // Show first 8 geniuses including premium
  const inProgressSubjects = subjects.slice(0, 3);
  const recommendedSubjects = subjects.slice(3, 6);
  
  // Calculate real stats
  const subjectCount = userSubjects.length;
  const inProgressCount = userSubjects.filter(s => s.status === 'in_progress').length;
  
  // Calculate IQ progress
  const allLessons = getAllLessons();
  const completedLessons = allLessons.filter(lesson => 
    isLessonCompleted(lesson.subjectId, lesson.id)
  ).length;

  return (
    <AppLayout>
      <Header showLogo />
      
      {/* Onboarding Modal for new users */}
      <OnboardingModal open={showOnboarding} onClose={completeOnboarding} />
      
      {/* Daily reminder prompt */}
      <ReminderPrompt open={showReminder} onClose={() => setShowReminder(false)} />
      
      <div className="py-4 space-y-6">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 bg-card rounded-2xl border border-border p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">Welcome back!</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Your learning journey awaits</p>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="font-mono text-sm font-bold">{streak}</span>
                <span className="text-xs">day streak</span>
              </div>
            )}
          </div>
          {subjectCount > 0 && (
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((inProgressCount / Math.max(subjectCount, 1)) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-secondary rounded-full"
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono">{subjectCount} subject{subjectCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </motion.div>

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
            completedLessons={completedLessons}
            totalLessons={allLessons.length}
          />
        </div>

        {/* Featured Genius */}
        <Section title="Featured Genius">
          <div className="px-4">
            <GeniusCard genius={featuredGenius} variant="featured" />
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

        {/* Continue Learning */}
        <Section title="Continue Learning">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 px-4 pb-1">
              {inProgressSubjects.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-shrink-0 w-64"
                >
                  <SubjectCard subject={subject} variant="progress" showGenius />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Recommended For You */}
        <Section title="Recommended For You">
          <div className="px-4 space-y-3">
            {recommendedSubjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <SubjectCard subject={subject} showGenius variant="compact" />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Popular This Week */}
        <Section title="Popular This Week">
          <div className="px-4 space-y-3">
            {subjects.slice(0, 3).map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-mono text-secondary font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{subject.subjectName}</h4>
                  <p className="text-xs text-muted-foreground">{subject.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

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
    </AppLayout>
  );
};

export default Index;
