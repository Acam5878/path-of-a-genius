import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles, BookOpen, Brain, Trophy, Loader2, Coffee, Tv, ShoppingBag, TrendingUp, Users, Zap, Target, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useRef, useMemo } from 'react';
import { SubscriptionContext } from '@/contexts/SubscriptionContext';
import { trackPaywallViewed } from '@/lib/posthog';
import { getUserType } from '@/components/onboarding/OnboardingModal';

// ── User-type personalised content ──────────────────────────────────────
interface PaywallPersonalisation {
  headline: string;
  subtext: string;
  features: { icon: typeof Brain; text: string }[];
  wasteComparisonNote: string;
  projectedResults: { metric: string; value: string; timeframe: string }[];
}

const personalisations: Record<string, PaywallPersonalisation> = {
  'self-improver': {
    headline: 'Your Brain Deserves Better',
    subtext: 'Track your cognitive growth with precision',
    features: [
      { icon: Brain, text: 'All 6 IQ test categories — track every dimension' },
      { icon: TrendingUp, text: 'Measurable IQ growth tracked over time' },
      { icon: Target, text: 'Personalised weakness-targeting exercises' },
      { icon: Sparkles, text: 'AI tutor that adapts to your level' },
    ],
    wasteComparisonNote: 'The only investment that makes you measurably smarter',
    projectedResults: [
      { metric: 'IQ Score', value: '+8–12 pts', timeframe: '90 days' },
      { metric: 'Working Memory', value: '+23%', timeframe: '30 days' },
      { metric: 'Processing Speed', value: '+18%', timeframe: '60 days' },
    ],
  },
  'curious-learner': {
    headline: 'Never Stop Discovering',
    subtext: 'Unlimited access to ideas that actually matter',
    features: [
      { icon: BookOpen, text: '200+ lessons from the greatest minds in history' },
      { icon: Sparkles, text: 'Unlimited Scroll & Learn — your daily feed of insights' },
      { icon: Brain, text: 'Full IQ assessments to map your strengths' },
      { icon: Trophy, text: 'New content added every week' },
    ],
    wasteComparisonNote: 'Replace doom-scrolling with ideas that compound',
    projectedResults: [
      { metric: 'Knowledge Breadth', value: '+40%', timeframe: '30 days' },
      { metric: 'Retention Rate', value: '3× better', timeframe: 'with spaced repetition' },
      { metric: 'Daily Learning', value: '15 min', timeframe: 'avg. session' },
    ],
  },
  parent: {
    headline: "Unlock Your Child's Full Potential",
    subtext: 'The smartest gift you can give them',
    features: [
      { icon: Users, text: "Age-appropriate IQ tests designed for children" },
      { icon: GraduationCap, text: 'Structured curriculum — Ancient Greek to Science' },
      { icon: Brain, text: 'Cognitive growth tracking over time' },
      { icon: Sparkles, text: 'Safe, ad-free learning environment' },
    ],
    wasteComparisonNote: "Less than a single tutoring session — for unlimited access",
    projectedResults: [
      { metric: 'Reasoning Skills', value: '+27%', timeframe: '60 days' },
      { metric: 'Vocabulary Growth', value: '+35%', timeframe: '90 days' },
      { metric: 'Problem Solving', value: '+22%', timeframe: '30 days' },
    ],
  },
  student: {
    headline: 'Unlock Your Full Potential',
    subtext: "The smartest investment you'll make this year",
    features: [
      { icon: BookOpen, text: 'Full classical curriculum — all 10 genius paths' },
      { icon: Brain, text: 'Measurable IQ growth tracked over time' },
      { icon: Trophy, text: 'All lessons, exercises, quizzes & flashcards' },
      { icon: Sparkles, text: 'New content added every week' },
    ],
    wasteComparisonNote: 'The only investment that compounds forever',
    projectedResults: [
      { metric: 'Lessons Completed', value: '30+', timeframe: '30 days' },
      { metric: 'IQ Improvement', value: '+8–12 pts', timeframe: '90 days' },
      { metric: 'Knowledge Retention', value: '85%', timeframe: 'with spaced repetition' },
    ],
  },
};

const defaultPersonalisation = personalisations.student;

const wasteComparisons = [
  { icon: Coffee, label: 'Coffee habit', amount: '$60', period: '/month' },
  { icon: Tv, label: 'Streaming apps', amount: '$45', period: '/month' },
  { icon: ShoppingBag, label: 'Impulse buys', amount: '$80+', period: '/month' },
];

export const PaywallModal = () => {
  const context = useContext(SubscriptionContext);
  
  const isPaywallVisible = context?.isPaywallVisible ?? false;
  const paywallCtx = context?.paywallContext;

  // Get personalised content based on user type + IQ score
  const personalisation = useMemo(() => {
    const userType = getUserType();
    const base = personalisations[userType || ''] || defaultPersonalisation;
    
    // If we have IQ score context, personalize the headline
    if (paywallCtx?.iqScore) {
      const score = paywallCtx.iqScore;
      const classification = paywallCtx.iqClassification || '';
      const percentile = paywallCtx.iqPercentile || 0;
      
      let headline = `You scored ${score}`;
      let subtext = `Top ${Math.max(1, 100 - percentile)}% — "${classification}"`;
      
      if (score >= 130) {
        headline = `IQ ${score} — Exceptional`;
        subtext = 'Unlock your full cognitive profile to see how you compare to history\'s greatest minds';
      } else if (score >= 115) {
        headline = `IQ ${score} — Above Average`;
        subtext = `You're in the top ${Math.max(1, 100 - percentile)}%. See your detailed breakdown across all 6 categories`;
      } else if (score >= 100) {
        headline = `IQ ${score} — Your Potential is Untapped`;
        subtext = 'Your detailed profile reveals exactly where to improve — unlock it now';
      } else {
        headline = `IQ ${score} — Room to Grow`;
        subtext = 'See your personalised training plan to boost your score by 8–12 points';
      }
      
      // Add improvement-specific features
      const improvementFeatures = paywallCtx.improvementAreas?.slice(0, 2).map(area => ({
        icon: Target,
        text: `Targeted ${area} training to boost your weakest area`,
      })) || [];
      
      return {
        ...base,
        headline,
        subtext,
        features: [
          ...improvementFeatures,
          ...base.features.slice(0, 4 - improvementFeatures.length),
        ],
      };
    }
    
    return base;
  }, [isPaywallVisible, paywallCtx]);

  // Track paywall impressions
  const hasTracked = useRef(false);
  useEffect(() => {
    if (isPaywallVisible && !hasTracked.current) {
      trackPaywallViewed();
      hasTracked.current = true;
    }
    if (!isPaywallVisible) {
      hasTracked.current = false;
    }
  }, [isPaywallVisible]);

  if (!context) {
    return null;
  }

  const { hidePaywall, restorePurchases, purchaseSubscription, isLoading, prices } = context;

  const handlePurchase = async (tierId: 'monthly' | 'lifetime') => {
    await purchaseSubscription(tierId);
  };

  const handleRestore = async () => {
    await restorePurchases();
  };

  return (
    <AnimatePresence>
      {isPaywallVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={hidePaywall}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-card rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — personalised */}
            <div className="relative gradient-premium p-6 pb-8 text-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
                onClick={hidePaywall}
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </Button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center"
              >
                <Crown className="w-8 h-8 text-secondary-foreground" />
              </motion.div>
              
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                {personalisation.headline}
              </h2>
              <p className="text-white/80 text-sm">
                {personalisation.subtext}
              </p>
            </div>

            {/* Projected Results — the "what you'll get" proof */}
            <div className="px-6 pt-4 pb-2">
              <p className="text-[10px] text-muted-foreground text-center mb-2.5 font-mono uppercase tracking-widest">
                What our learners achieve
              </p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {personalisation.projectedResults.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="bg-secondary/8 border border-secondary/20 rounded-xl p-2.5 text-center"
                  >
                    <p className="font-mono text-lg font-bold text-secondary leading-tight">{result.value}</p>
                    <p className="text-[10px] text-foreground font-medium mt-0.5 leading-tight">{result.metric}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{result.timeframe}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Value Comparison */}
            <div className="px-6 pb-2">
              <p className="text-xs text-muted-foreground text-center mb-3 font-medium uppercase tracking-wide">The average person spends more on…</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {wasteComparisons.map(({ icon: Icon, label, amount, period }, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl p-2.5 text-center border border-border/50">
                    <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
                    <p className="font-mono text-sm font-bold text-foreground">{amount}</p>
                    <p className="text-[10px] text-muted-foreground">{period}</p>
                  </div>
                ))}
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl px-3 py-2 text-center">
                <p className="text-xs text-secondary font-semibold">Path of a Genius = less than your daily coffee ☕</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{personalisation.wasteComparisonNote}</p>
              </div>
            </div>

            {/* Features — personalised */}
            <div className="px-6 pt-2 pb-4 space-y-3">
              {personalisation.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-sm text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing Tiers */}
            <div className="px-6 pb-4 space-y-3">
              {/* Monthly Tier - Free Trial CTA */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                onClick={() => handlePurchase('monthly')}
                disabled={isLoading}
                className={`w-full relative p-4 rounded-xl border-2 transition-colors text-left border-border bg-background hover:border-secondary/50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent text-accent-foreground">
                  Includes 7-Day Free Trial
                </span>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-foreground">Monthly</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Free for 7 days, then auto-renews
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    {isLoading && (
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                    <div>
                    <p className="font-mono text-2xl font-bold text-foreground">{prices.monthlyPrice}</p>
                      <p className="text-[10px] text-muted-foreground text-right">/month</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 bg-accent/10 rounded-md px-3 py-1.5">
                  <p className="text-[11px] text-center text-foreground font-medium">
                    Try free for 7 days · Then {prices.monthlyPrice}/month · Cancel anytime
                  </p>
                </div>
              </motion.button>

              {/* Lifetime Tier */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                onClick={() => handlePurchase('lifetime')}
                disabled={isLoading}
                className={`w-full relative p-4 rounded-xl border-2 transition-colors text-left border-secondary bg-secondary/5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold rounded-full bg-secondary text-secondary-foreground">
                  Best Value
                </span>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-foreground">Lifetime Access</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      One-time purchase · No recurring charges
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    {isLoading && (
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                    <p className="font-mono text-2xl font-bold text-foreground">{prices.lifetimePrice}</p>
                    <p className="text-[10px] text-muted-foreground text-right">one-time</p>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-1 text-xs text-secondary">
                  <Check className="w-3 h-3" />
                  <span>Save 58% vs monthly · Pay once, learn forever</span>
                </div>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2">
              <button
                onClick={handleRestore}
                disabled={isLoading}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-2 disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : 'Restore Purchases'}
              </button>
              <div className="bg-muted/30 rounded-lg p-3 mt-2 border border-border/50">
                <p className="text-[11px] text-foreground font-semibold text-center mb-1">
                  Subscription Terms
                </p>
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  <strong>Monthly Plan:</strong> Start with a <strong>7-day FREE trial</strong>. 
                  After the trial ends, you will be <strong>automatically charged {prices.monthlyPrice}/month</strong>. 
                  Your subscription will <strong>auto-renew each month</strong> until you cancel. 
                  You can cancel anytime in your device's subscription settings at least 24 hours 
                  before the end of the current billing period to avoid being charged for the next period.
                </p>
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed mt-1.5">
                  <strong>Lifetime Plan:</strong> A single payment of <strong>{prices.lifetimePrice}</strong> with 
                  <strong> no recurring charges</strong> and no subscription to manage.
                </p>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <a 
                  href="/privacy" 
                  className="text-[10px] text-muted-foreground hover:text-foreground underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="text-[10px] text-muted-foreground hover:text-foreground underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Use
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
