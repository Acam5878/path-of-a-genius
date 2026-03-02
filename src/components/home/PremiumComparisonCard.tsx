import { motion } from 'framer-motion';
import { Lock, Check, Crown, ArrowRight, Brain, Zap, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';

const freeFeatures = [
  { icon: Brain, label: 'Basic brain diagnostic', included: true },
  { icon: BookOpen, label: '1 genius curriculum (J.S. Mill)', included: true },
  { icon: BarChart3, label: 'IQ test (verbal only)', included: true },
];

const premiumFeatures = [
  { icon: Sparkles, label: 'All 10 genius curricula', included: true },
  { icon: Zap, label: 'Full IQ assessment (6 types)', included: true },
  { icon: Brain, label: 'Complete brain illumination', included: true },
  { icon: Crown, label: 'AI Tutor + Spaced Repetition', included: true },
];

export const PremiumComparisonCard = () => {
  const { isPremium, showPaywall, prices } = useSubscription();

  // Don't show to premium users
  if (isPremium) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <div className="relative rounded-2xl overflow-hidden border border-secondary/20 bg-gradient-to-br from-[hsl(217,30%,10%)] to-[hsl(240,30%,14%)]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-secondary" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">Unlock Everything</p>
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-4">
            You're using 10% of this app
          </h3>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Free column */}
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Free</p>
              <div className="space-y-2">
                {freeFeatures.map((f) => (
                  <div key={f.label} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-white/40 mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-white/60 leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium column */}
            <div className="bg-secondary/10 rounded-xl p-3 border border-secondary/30">
              <p className="text-[10px] font-mono uppercase tracking-wider text-secondary mb-2">Premium</p>
              <div className="space-y-2">
                {premiumFeatures.map((f) => (
                  <div key={f.label} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-white/90 leading-tight font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={showPaywall}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock 100% — 7 days free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <p className="text-[10px] text-white/30 text-center mt-2">
            Then {prices.monthlyPrice}/mo · Cancel anytime
          </p>
        </div>
      </div>
    </motion.div>
  );
};
