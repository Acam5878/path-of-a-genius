import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COGNITIVE_STRUGGLES, CognitiveStruggle } from '@/data/cognitiveStruggles';
import { REGIONS } from '@/components/home/brain/brainRenderer';

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
  const [selectedStruggle, setSelectedStruggle] = useState<CognitiveStruggle | null>(null);

  return (
    <div className="px-4 space-y-3">
      {/* Cognitive Struggle Picker */}
      <div className="rounded-2xl bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] p-3 border border-white/10">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-2.5 px-1">
          What do you want to improve?
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {COGNITIVE_STRUGGLES.map((struggle, i) => {
            const isSelected = selectedStruggle?.id === struggle.id;
            return (
              <motion.button
                key={struggle.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedStruggle(isSelected ? null : struggle)}
                className={cn(
                  'flex flex-col items-center text-center py-2.5 px-1.5 rounded-xl transition-all',
                  isSelected
                    ? 'bg-secondary/15 ring-1 ring-secondary/30'
                    : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
                )}
              >
                <span className="text-lg mb-0.5">{struggle.icon}</span>
                <span className={cn('text-[10px] font-semibold leading-tight', isSelected ? 'text-secondary' : 'text-white/70')}>
                  {struggle.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Result panel — shows brain regions & recommended module */}
        <AnimatePresence>
          {selectedStruggle && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  {selectedStruggle.brainRegions.map(regionId => {
                    const region = REGIONS[regionId];
                    if (!region) return null;
                    return (
                      <div key={regionId} className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: region.glowColor, boxShadow: `0 0 6px ${region.glowColor}` }}
                        />
                        <span className="text-[10px] font-mono text-white/60">{region.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-secondary/80 leading-relaxed mb-2">
                  {selectedStruggle.benefit}
                </p>
                <button
                  onClick={() => navigate(`/the-path?module=${selectedStruggle.modules[0]}`)}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-secondary hover:text-secondary/80 transition-colors"
                >
                  Start training <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick navigation */}
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
