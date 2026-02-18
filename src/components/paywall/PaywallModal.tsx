import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles, BookOpen, Brain, Trophy, Loader2, Coffee, Tv, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { SubscriptionContext } from '@/contexts/SubscriptionContext';

const features = [
  { icon: BookOpen, text: 'Full classical curriculum — all 10 genius paths' },
  { icon: Brain, text: 'Measurable IQ growth tracked over time' },
  { icon: Trophy, text: 'All lessons, exercises, quizzes & flashcards' },
  { icon: Sparkles, text: 'New content added every week' },
];

const wasteComparisons = [
  { icon: Coffee, label: 'Coffee habit', amount: '$60', period: '/month' },
  { icon: Tv, label: 'Streaming apps', amount: '$45', period: '/month' },
  { icon: ShoppingBag, label: 'Impulse buys', amount: '$80+', period: '/month' },
];

interface PricingTier {
  id: 'monthly' | 'lifetime';
  name: string;
  price: string;
  period?: string;
  badge?: string;
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 'US$19.95',
    period: '/month',
    badge: 'Includes 7-Day Free Trial',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 'US$89.95',
    period: 'one-time',
    popular: true,
    badge: 'Best Value',
  },
];

export const PaywallModal = () => {
  // Use context directly with safety check to handle HMR edge cases
  const context = useContext(SubscriptionContext);
  
  // Return null if context not ready (handles HMR/initialization edge cases)
  if (!context) {
    return null;
  }

  const { isPaywallVisible, hidePaywall, restorePurchases, purchaseSubscription, isLoading, prices } = context;

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
            {/* Header */}
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
                Unlock Your Full Potential
              </h2>
              <p className="text-white/80 text-sm">
                The smartest investment you'll make this year
              </p>
            </div>

            {/* Value Comparison */}
            <div className="px-6 pt-4 pb-2">
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
                <p className="text-[10px] text-muted-foreground mt-0.5">The only investment that compounds forever</p>
              </div>
            </div>

            {/* Features */}
            <div className="px-6 pt-2 pb-4 space-y-3">
              {features.map((feature, i) => (
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
