import { motion } from 'framer-motion';
import { Crown, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Genius } from '@/data/geniuses';

interface PremiumGateProps {
  genius: Genius;
}

export const PremiumGate = ({ genius }: PremiumGateProps) => {
  const { showPaywall } = useSubscription();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="w-20 h-20 rounded-full gradient-premium flex items-center justify-center mb-6"
      >
        <Lock className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
        {genius.name}'s Curriculum
      </h2>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        Unlock {genius.name}'s complete learning path, including all subjects, lessons, and curated resources.
      </p>

      <div className="bg-muted/50 rounded-xl p-4 mb-6 w-full max-w-sm">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-heading font-semibold text-foreground text-sm">Premium Content</p>
            <p className="text-xs text-muted-foreground">
              Access all 10 genius curricula for $19.99/mo or $89.99 lifetime
            </p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="bg-secondary text-secondary-foreground hover:bg-gold-light font-semibold px-8"
        onClick={showPaywall}
      >
        Unlock Now <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        7-day free trial included with monthly plan
      </p>
    </motion.div>
  );
};
