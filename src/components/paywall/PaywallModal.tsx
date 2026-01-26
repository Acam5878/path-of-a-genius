import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles, BookOpen, Users, Trophy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';

const features = [
  { icon: BookOpen, text: 'Full access to all 10 genius curricula' },
  { icon: Users, text: 'Learn from Da Vinci, Newton, Einstein & more' },
  { icon: Trophy, text: 'Unlock all lessons, quizzes & exercises' },
  { icon: Sparkles, text: 'New content added regularly' },
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
    price: '$19.99',
    period: '/month',
    badge: '7-day free trial',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$99.99',
    period: 'one-time',
    popular: true,
    badge: 'Best Value',
  },
];

export const PaywallModal = () => {
  const { isPaywallVisible, hidePaywall, restorePurchases, purchaseSubscription, isLoading } = useSubscription();

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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
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
                Unlock Full Access
              </h2>
              <p className="text-white/80 text-sm">
                Learn from history's greatest minds
              </p>
            </div>

            {/* Features */}
            <div className="p-6 space-y-3">
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
              {tiers.map((tier) => (
                <motion.button
                  key={tier.id}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  onClick={() => handlePurchase(tier.id)}
                  disabled={isLoading}
                  className={`w-full relative p-4 rounded-xl border-2 transition-colors text-left ${
                    tier.popular
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border bg-background hover:border-secondary/50'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {tier.badge && (
                    <span className={`absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      tier.popular
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {tier.badge}
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{tier.name}</p>
                      <p className="text-xs text-muted-foreground">{tier.period}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      {isLoading && (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                      <p className="font-mono text-xl font-bold text-foreground">{tier.price}</p>
                    </div>
                  </div>
                  
                  {tier.popular && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-secondary">
                      <Check className="w-3 h-3" />
                      <span>Save 58% vs monthly</span>
                    </div>
                  )}
                </motion.button>
              ))}
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
              <p className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
                Cancel anytime. Subscription auto-renews unless cancelled at least 24 hours before the end of the current period.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
