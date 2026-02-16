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
    label: 'Begin Journey',
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
      <div className="grid grid-cols-3 gap-2">
        {destinations.map(dest => {
          const Icon = dest.icon;
          return (
            <button
              key={dest.id}
              onClick={() => navigate(dest.path)}
              className={cn(
                'flex flex-col items-center justify-center p-4 rounded-xl border transition-colors text-center gap-2',
                dest.accent
                  ? 'border-secondary/30 bg-secondary/10 hover:bg-secondary/20'
                  : 'border-border bg-card hover:bg-muted'
              )}
            >
              <Icon className="w-5 h-5 text-secondary" />
              <span className={cn('text-xs font-semibold', dest.accent ? 'text-secondary' : 'text-foreground')}>
                {dest.label}
              </span>
              <div className="flex items-center gap-0.5 text-[8px] text-secondary">
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
