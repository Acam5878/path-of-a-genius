import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const destinations = [
  {
    id: 'path',
    label: 'The Path',
    description: 'Start the curriculum',
    icon: Sparkles,
    path: '/the-path',
    accent: true,
    badge: '10 min/day',
  },
  {
    id: 'feed',
    label: 'Daily Insights',
    description: 'Ideas & quotes',
    icon: Zap,
    path: '/feed',
    accent: false,
    badge: null,
  },
  {
    id: 'iq',
    label: 'IQ Test',
    description: 'Measure your mind',
    icon: Brain,
    path: '/iq-tests',
    accent: false,
    badge: 'Free',
  },
];

export const DiscoverHeroPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="rounded-2xl bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] p-3 border border-white/10">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-3 px-1">Where do you want to go?</p>
        <div className="grid grid-cols-3 gap-2">
          {destinations.map((dest, i) => {
            const Icon = dest.icon;
            return (
              <motion.button
                key={dest.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => navigate(dest.path)}
                className={cn(
                  'flex flex-col items-center justify-center py-4 px-2 rounded-xl transition-all text-center gap-1 relative',
                  dest.accent
                    ? 'bg-secondary/15 ring-1 ring-secondary/30 hover:bg-secondary/20'
                    : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
                )}
              >
                {dest.badge && (
                  <span className={cn(
                    'absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full',
                    dest.accent ? 'bg-secondary/30 text-secondary' : 'bg-white/15 text-white/60'
                  )}>
                    {dest.badge}
                  </span>
                )}
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center mb-0.5',
                  dest.accent ? 'bg-secondary/20' : 'bg-white/10'
                )}>
                  <Icon className={cn('w-4 h-4', dest.accent ? 'text-secondary' : 'text-white/70')} />
                </div>
                <span className={cn('text-xs font-semibold leading-tight', dest.accent ? 'text-secondary' : 'text-white/80')}>
                  {dest.label}
                </span>
                <span className={cn('text-[9px] leading-tight', dest.accent ? 'text-secondary/60' : 'text-white/35')}>
                  {dest.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
