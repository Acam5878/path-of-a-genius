import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Brain, BookOpen, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FeedItem, fetchFeedContent, cardGradients, darkTypes } from '@/data/feedContent';
import { getGeniusPortrait } from '@/data/portraits';
import { geniuses } from '@/data/geniuses';
import { cn } from '@/lib/utils';

const findPortraitByName = (name: string): string | undefined => {
  const genius = geniuses.find(g =>
    g.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(g.name.split(' ').pop()?.toLowerCase() || '')
  );
  return genius ? getGeniusPortrait(genius.id) : undefined;
};

// ── Card renderers for the mini window ──────────────────────────────────

const MiniQuoteCard = ({ item }: { item: FeedItem & { type: 'quote' } }) => {
  const portrait = findPortraitByName(item.data.author);
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <Quote className="w-8 h-8 text-secondary opacity-40 mb-3" />
      <p className="text-base font-serif italic text-white/90 leading-relaxed line-clamp-4 mb-4">
        &ldquo;{item.data.text}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        {portrait && (
          <img src={portrait} alt="" className="w-7 h-7 rounded-full object-cover border border-secondary/30" />
        )}
        <span className="text-xs text-white/60">{item.data.author}</span>
      </div>
    </div>
  );
};

const MiniInsightCard = ({ item }: { item: FeedItem & { type: 'insight' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <span className="text-3xl mb-2">{item.data.icon}</span>
    <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary mb-2">{item.data.category}</span>
    <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 mb-2">{item.data.title}</h3>
    <p className="text-sm text-muted-foreground line-clamp-3">{item.data.body}</p>
  </div>
);

const MiniStoryCard = ({ item }: { item: FeedItem & { type: 'story' } }) => {
  const genius = geniuses.find(g => g.name === item.data.genius || item.data.genius.includes(g.name.split(' ').pop() || ''));
  const portrait = genius ? getGeniusPortrait(genius.id) : undefined;
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="flex items-center gap-2 mb-3">
        {portrait ? (
          <img src={portrait} alt="" className="w-7 h-7 rounded-full object-cover border border-secondary/30" />
        ) : (
          <BookOpen className="w-4 h-4 text-secondary" />
        )}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">{item.data.genius}</span>
      </div>
      <h3 className="text-base font-bold text-white leading-snug line-clamp-2 mb-2">{item.data.headline}</h3>
      <p className="text-sm text-white/60 line-clamp-3">{item.data.body}</p>
    </div>
  );
};

const MiniConnectionCard = ({ item }: { item: FeedItem & { type: 'connection' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <div className="flex items-center gap-1.5 mb-3">
      <Globe className="w-3.5 h-3.5 text-secondary" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Word Origin</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{item.data.term}</h3>
    <p className="text-xs text-secondary mb-2">{item.data.origin}</p>
    <p className="text-sm text-white/50 italic line-clamp-3">&ldquo;{item.data.meaning}&rdquo;</p>
  </div>
);

const renderCard = (item: FeedItem) => {
  switch (item.type) {
    case 'quote': return <MiniQuoteCard item={item as FeedItem & { type: 'quote' }} />;
    case 'insight': return <MiniInsightCard item={item as FeedItem & { type: 'insight' }} />;
    case 'story': return <MiniStoryCard item={item as FeedItem & { type: 'story' }} />;
    case 'connection': return <MiniConnectionCard item={item as FeedItem & { type: 'connection' }} />;
    default: return null;
  }
};

// ── Main component ──────────────────────────────────────────────────────

export const MiniFeedWindow = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedContent().then(({ allQuotes, insights, stories, connections }) => {
      const picks: FeedItem[] = [];
      if (allQuotes.length > 0) picks.push(allQuotes[Math.floor(Math.random() * allQuotes.length)]);
      if (insights.length > 0) picks.push(insights[Math.floor(Math.random() * insights.length)]);
      if (stories.length > 0) picks.push(stories[Math.floor(Math.random() * stories.length)]);
      if (connections.length > 0) picks.push(connections[Math.floor(Math.random() * connections.length)]);
      const extras = [...allQuotes, ...insights].filter(i => !picks.includes(i));
      while (picks.length < 6 && extras.length > 0) {
        const idx = Math.floor(Math.random() * extras.length);
        picks.push(extras.splice(idx, 1)[0]);
      }
      setItems(picks);
    });
  }, []);

  const goNext = useCallback(() => {
    if (items.length === 0) return;
    setDirection(1);
    setCurrent(prev => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (items.length === 0) return;
    setDirection(-1);
    setCurrent(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) {
      goPrev();
    } else {
      goNext();
    }
  }, [goNext, goPrev]);

  if (items.length === 0) return null;

  const item = items[current];
  const isDark = darkTypes.has(item.type);
  const gradient = cardGradients[item.type] || cardGradients.quote;

  return (
    <section className="px-4 py-1">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading text-lg font-semibold text-foreground">Discover</h2>
        <button
          onClick={() => navigate('/feed')}
          className="text-sm text-secondary flex items-center gap-0.5 hover:underline"
        >
          Open Feed <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feed window */}
      <div
        onClick={handleTap}
        className={cn(
          'relative w-full h-56 rounded-2xl bg-gradient-to-br overflow-hidden cursor-pointer border select-none',
          gradient,
          isDark ? 'border-white/10' : 'border-border'
        )}
      >
        {/* Progress dots */}
        <div className="absolute top-3 left-0 right-0 z-20 flex justify-center gap-1.5 px-4">
          {items.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-0.5 rounded-full flex-1 max-w-8 transition-all duration-300',
                i === current
                  ? isDark ? 'bg-secondary' : 'bg-secondary'
                  : isDark ? 'bg-white/20' : 'bg-foreground/15'
              )}
            />
          ))}
        </div>

        {/* Card content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 pt-6"
          >
            {renderCard(item)}
          </motion.div>
        </AnimatePresence>

        {/* Tap hint on edges */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 hover:opacity-40 transition-opacity">
          <ChevronLeft className={cn('w-5 h-5', isDark ? 'text-white' : 'text-foreground')} />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 hover:opacity-40 transition-opacity">
          <ChevronRight className={cn('w-5 h-5', isDark ? 'text-white' : 'text-foreground')} />
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-60">Tap to browse · Open for full experience</p>
    </section>
  );
};
