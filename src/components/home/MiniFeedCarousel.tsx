import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Brain, BookOpen, Globe, ArrowRight } from 'lucide-react';
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

// Compact card renderers
const MiniQuoteCard = ({ item }: { item: FeedItem & { type: 'quote' } }) => {
  const portrait = findPortraitByName(item.data.author);
  return (
    <div className="flex flex-col justify-between h-full p-4">
      <Quote className="w-5 h-5 text-secondary opacity-60" />
      <p className="text-sm font-serif italic text-white/90 leading-snug line-clamp-3 my-2">
        &ldquo;{item.data.text}&rdquo;
      </p>
      <div className="flex items-center gap-2 mt-auto">
        {portrait && (
          <img src={portrait} alt="" className="w-6 h-6 rounded-full object-cover border border-secondary/30" />
        )}
        <span className="text-xs text-white/60 truncate">{item.data.author}</span>
      </div>
    </div>
  );
};

const MiniInsightCard = ({ item }: { item: FeedItem & { type: 'insight' } }) => (
  <div className="flex flex-col justify-between h-full p-4">
    <span className="text-2xl mb-1">{item.data.icon}</span>
    <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary mb-1">{item.data.category}</span>
    <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-1">{item.data.title}</h3>
    <p className="text-xs text-muted-foreground line-clamp-2">{item.data.body}</p>
  </div>
);

const MiniStoryCard = ({ item }: { item: FeedItem & { type: 'story' } }) => {
  const genius = geniuses.find(g => g.name === item.data.genius || item.data.genius.includes(g.name.split(' ').pop() || ''));
  const portrait = genius ? getGeniusPortrait(genius.id) : undefined;
  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="flex items-center gap-2 mb-2">
        {portrait ? (
          <img src={portrait} alt="" className="w-6 h-6 rounded-full object-cover border border-secondary/30" />
        ) : (
          <BookOpen className="w-4 h-4 text-secondary" />
        )}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">{item.data.genius}</span>
      </div>
      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-1">{item.data.headline}</h3>
      <p className="text-xs text-white/60 line-clamp-2">{item.data.body}</p>
    </div>
  );
};

const MiniConnectionCard = ({ item }: { item: FeedItem & { type: 'connection' } }) => (
  <div className="flex flex-col justify-between h-full p-4">
    <div className="flex items-center gap-1.5 mb-2">
      <Globe className="w-3.5 h-3.5 text-secondary" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Word Origin</span>
    </div>
    <h3 className="text-lg font-bold text-white mb-0.5">{item.data.term}</h3>
    <p className="text-xs text-secondary mb-1">{item.data.origin}</p>
    <p className="text-xs text-white/50 italic line-clamp-2">&ldquo;{item.data.meaning}&rdquo;</p>
  </div>
);

const renderMiniCard = (item: FeedItem) => {
  switch (item.type) {
    case 'quote': return <MiniQuoteCard item={item as FeedItem & { type: 'quote' }} />;
    case 'insight': return <MiniInsightCard item={item as FeedItem & { type: 'insight' }} />;
    case 'story': return <MiniStoryCard item={item as FeedItem & { type: 'story' }} />;
    case 'connection': return <MiniConnectionCard item={item as FeedItem & { type: 'connection' }} />;
    default: return null;
  }
};

export const MiniFeedCarousel = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedContent().then(({ allQuotes, insights, stories, connections }) => {
      // Pick a variety: 1 quote, 1 insight, 1 story, 1 connection (if available)
      const picks: FeedItem[] = [];
      if (allQuotes.length > 0) picks.push(allQuotes[Math.floor(Math.random() * allQuotes.length)]);
      if (insights.length > 0) picks.push(insights[Math.floor(Math.random() * insights.length)]);
      if (stories.length > 0) picks.push(stories[Math.floor(Math.random() * stories.length)]);
      if (connections.length > 0) picks.push(connections[Math.floor(Math.random() * connections.length)]);
      // Fill to 5 with more quotes/insights
      const extras = [...allQuotes, ...insights].filter(i => !picks.includes(i));
      while (picks.length < 5 && extras.length > 0) {
        const idx = Math.floor(Math.random() * extras.length);
        picks.push(extras.splice(idx, 1)[0]);
      }
      setItems(picks);
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-1">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">Discover</h2>
        <button
          onClick={() => navigate('/feed')}
          className="text-sm text-secondary flex items-center gap-0.5 hover:underline"
        >
          Open Feed <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((item, i) => {
          const isDark = darkTypes.has(item.type);
          const gradient = cardGradients[item.type] || cardGradients.quote;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('/feed')}
              className={cn(
                'flex-shrink-0 w-44 h-48 rounded-2xl bg-gradient-to-br cursor-pointer snap-start overflow-hidden border',
                gradient,
                isDark ? 'border-white/10' : 'border-border'
              )}
            >
              {renderMiniCard(item)}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
