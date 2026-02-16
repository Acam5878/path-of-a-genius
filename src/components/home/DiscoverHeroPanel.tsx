import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Flame as Fire, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const destinations = [
  {
    id: 'iq',
    label: 'IQ Test',
    icon: Brain,
    path: '/iq-tests',
    accent: false,
  },
  {
    id: 'path',
    label: 'Your Journey',
    icon: Sparkles,
    path: '/the-path',
    accent: true,
  },
  {
    id: 'feed',
    label: 'Scroll & Learn',
    icon: Fire,
    path: '/feed',
    accent: false,
  },
];

export const DiscoverHeroPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] p-3 border border-white/10">
        {destinations.map(dest => {
          const Icon = dest.icon;
          return (
            <button
              key={dest.id}
              onClick={() => navigate(dest.path)}
              className={cn(
                'flex flex-col items-center justify-center py-4 px-2 rounded-xl transition-all text-center gap-1.5',
                dest.accent
                  ? 'bg-secondary/15 ring-1 ring-secondary/30'
                  : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
              )}
            >
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center',
                dest.accent ? 'bg-secondary/20' : 'bg-white/10'
              )}>
                <Icon className={cn('w-4.5 h-4.5', dest.accent ? 'text-secondary' : 'text-white/70')} />
              </div>
              <span className={cn('text-xs font-semibold', dest.accent ? 'text-secondary' : 'text-white/80')}>
                {dest.label}
              </span>
              <div className={cn('flex items-center gap-0.5 text-[9px]', dest.accent ? 'text-secondary/70' : 'text-white/40')}>
                <span>Open</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
