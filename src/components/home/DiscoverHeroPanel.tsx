import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Flame as Fire, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { getGeniusPortrait } from '@/data/portraits';

const destinations = [
  {
    id: 'iq',
    label: 'IQ Test',
    subtitle: 'Measure your mind',
    icon: Brain,
    path: '/iq-tests',
    accent: false,
    preview: {
      type: 'iq' as const,
    },
  },
  {
    id: 'path',
    label: 'Begin Journey',
    subtitle: 'The genius curriculum',
    icon: Sparkles,
    path: '/the-path',
    accent: true,
    preview: {
      type: 'path' as const,
    },
  },
  {
    id: 'feed',
    label: 'Scroll & Learn',
    subtitle: 'Quotes, stories & insights',
    icon: Fire,
    path: '/feed',
    accent: false,
    preview: {
      type: 'feed' as const,
    },
  },
];

const subjects = ['Logic', 'Philosophy', 'Mathematics', 'Latin', 'Physics'];
const categories = ['Pattern', 'Verbal', 'Spatial', 'Numerical', 'Memory'];

const MiniIQPreview = () => (
  <div className="flex flex-col gap-1.5 mt-2">
    {categories.slice(0, 3).map((cat, i) => (
      <div key={cat} className="flex items-center gap-1.5">
        <span className="text-[8px] text-muted-foreground w-12 truncate">{cat}</span>
        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-secondary/60"
            style={{ width: `${50 + i * 15}%` }}
          />
        </div>
      </div>
    ))}
    <span className="text-[8px] text-muted-foreground mt-0.5">5 test categories</span>
  </div>
);

const MiniPathPreview = () => {
  const portraits = geniuses.slice(0, 4).map(g => getGeniusPortrait(g.id));
  return (
    <div className="mt-2">
      <div className="flex -space-x-2 mb-1.5">
        {portraits.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-5 h-5 rounded-full object-cover border border-background"
          />
        ))}
        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[7px] text-muted-foreground border border-background">
          +6
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {subjects.slice(0, 3).map(s => (
          <span key={s} className="text-[7px] px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

const MiniFeedPreview = () => (
  <div className="mt-2 space-y-1">
    <div className="bg-muted/50 rounded-md p-1.5">
      <p className="text-[8px] text-muted-foreground italic line-clamp-2">
        "The only true wisdom is knowing you know nothing." — Socrates
      </p>
    </div>
    <div className="flex gap-1">
      <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">Quotes</span>
      <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">Stories</span>
      <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">Insights</span>
    </div>
  </div>
);

const previewRenderers = {
  iq: MiniIQPreview,
  path: MiniPathPreview,
  feed: MiniFeedPreview,
};

export const DiscoverHeroPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="grid grid-cols-3 gap-2">
        {destinations.map(dest => {
          const Icon = dest.icon;
          const Preview = previewRenderers[dest.preview.type];
          return (
            <button
              key={dest.id}
              onClick={() => navigate(dest.path)}
              className={cn(
                'flex flex-col items-start p-3 rounded-xl border transition-colors text-left overflow-hidden min-w-0',
                dest.accent
                  ? 'border-secondary/30 bg-secondary/10 hover:bg-secondary/20'
                  : 'border-border bg-card hover:bg-muted'
              )}
            >
              <div className="flex items-center gap-1.5 w-full min-w-0">
                <Icon className={cn('w-4 h-4 flex-shrink-0', dest.accent ? 'text-secondary' : 'text-secondary')} />
                <span className={cn('text-[11px] font-semibold truncate', dest.accent ? 'text-secondary' : 'text-foreground')}>
                  {dest.label}
                </span>
              </div>
              <span className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2">{dest.subtitle}</span>
              <Preview />
              <div className="flex items-center gap-0.5 mt-2 text-[8px] text-secondary">
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
