import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Flame as Fire, Zap, ArrowRight, Quote, BookOpen, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { getGeniusPortrait } from '@/data/portraits';
import { FeedItem, fetchFeedContent, cardGradients, darkTypes } from '@/data/feedContent';

// ── Genius facts data ─────────────────────────────────────────────────
const geniusFacts = [
  { genius: 'John Stuart Mill', geniusId: 'john-stuart-mill', fact: 'Could read Ancient Greek at age 3 — before most children start school.', takeaway: 'Early exposure to complex ideas builds extraordinary minds.' },
  { genius: 'Leonardo da Vinci', geniusId: 'leonardo-da-vinci', fact: 'Filled over 13,000 pages of notebooks with ideas, inventions, and observations.', takeaway: 'Writing your ideas down is the habit of genius.' },
  { genius: 'Blaise Pascal', geniusId: 'blaise-pascal', fact: 'Built a working mechanical calculator at age 19 — 300 years before computers.', takeaway: 'Young minds can solve problems that stump adults.' },
  { genius: 'Nikola Tesla', geniusId: 'nikola-tesla', fact: 'Could perform integral calculus in his head, visualizing complete machines before building them.', takeaway: 'Mental practice is as powerful as physical practice.' },
  { genius: 'Isaac Newton', geniusId: 'isaac-newton', fact: 'Invented calculus in just two years during quarantine from the plague.', takeaway: 'Focused isolation can unlock your greatest breakthroughs.' },
];

// ── Mini feed card renderers ──────────────────────────────────────────

const findPortraitByName = (name: string): string | undefined => {
  const g = geniuses.find(g => g.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(g.name.split(' ').pop()?.toLowerCase() || ''));
  return g ? getGeniusPortrait(g.id) : undefined;
};

const MiniQuote = ({ item }: { item: FeedItem & { type: 'quote' } }) => {
  const portrait = findPortraitByName(item.data.author);
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <Quote className="w-7 h-7 text-secondary opacity-40 mb-2" />
      <p className="text-sm font-serif italic text-white/90 leading-relaxed line-clamp-3 mb-3">
        &ldquo;{item.data.text}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        {portrait && <img src={portrait} alt="" className="w-6 h-6 rounded-full object-cover border border-secondary/30" />}
        <span className="text-[11px] text-white/60">{item.data.author}</span>
      </div>
    </div>
  );
};

const MiniInsight = ({ item }: { item: FeedItem & { type: 'insight' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <span className="text-2xl mb-1">{item.data.icon}</span>
    <span className="text-[9px] font-semibold uppercase tracking-widest text-secondary mb-1">{item.data.category}</span>
    <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-1">{item.data.title}</h3>
    <p className="text-xs text-muted-foreground line-clamp-2">{item.data.body}</p>
  </div>
);

const MiniStory = ({ item }: { item: FeedItem & { type: 'story' } }) => {
  const g = geniuses.find(g => g.name === item.data.genius || item.data.genius.includes(g.name.split(' ').pop() || ''));
  const portrait = g ? getGeniusPortrait(g.id) : undefined;
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="flex items-center gap-2 mb-2">
        {portrait ? <img src={portrait} alt="" className="w-6 h-6 rounded-full object-cover border border-secondary/30" /> : <BookOpen className="w-3.5 h-3.5 text-secondary" />}
        <span className="text-[9px] font-semibold uppercase tracking-widest text-secondary">{item.data.genius}</span>
      </div>
      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-1">{item.data.headline}</h3>
      <p className="text-xs text-white/60 line-clamp-2">{item.data.body}</p>
    </div>
  );
};

const MiniConnection = ({ item }: { item: FeedItem & { type: 'connection' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <div className="flex items-center gap-1.5 mb-2">
      <Globe className="w-3 h-3 text-secondary" />
      <span className="text-[9px] font-semibold uppercase tracking-widest text-secondary">Word Origin</span>
    </div>
    <h3 className="text-lg font-bold text-white mb-1">{item.data.term}</h3>
    <p className="text-[10px] text-secondary mb-1">{item.data.origin}</p>
    <p className="text-xs text-white/50 italic line-clamp-2">&ldquo;{item.data.meaning}&rdquo;</p>
  </div>
);

const renderMiniCard = (item: FeedItem) => {
  switch (item.type) {
    case 'quote': return <MiniQuote item={item as any} />;
    case 'insight': return <MiniInsight item={item as any} />;
    case 'story': return <MiniStory item={item as any} />;
    case 'connection': return <MiniConnection item={item as any} />;
    default: return null;
  }
};

// ── Main Panel ────────────────────────────────────────────────────────

export const DiscoverHeroPanel = () => {
  const navigate = useNavigate();
  const [fact] = useState(() => geniusFacts[Math.floor(Math.random() * geniusFacts.length)]);

  // Mini feed state
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

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
      setFeedItems(picks);
    });
  }, []);

  const goNext = useCallback(() => {
    if (feedItems.length === 0) return;
    setDirection(1);
    setCurrent(prev => (prev + 1) % feedItems.length);
  }, [feedItems.length]);

  const goPrev = useCallback(() => {
    if (feedItems.length === 0) return;
    setDirection(-1);
    setCurrent(prev => (prev - 1 + feedItems.length) % feedItems.length);
  }, [feedItems.length]);

  const handleFeedTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) goPrev();
    else goNext();
  }, [goNext, goPrev]);

  const feedItem = feedItems[current];
  const isDark = feedItem ? darkTypes.has(feedItem.type) : true;
  const gradient = feedItem ? (cardGradients[feedItem.type] || cardGradients.quote) : cardGradients.quote;

  const geniusPortrait = useMemo(() => {
    const g = geniuses.find(g => g.id === fact.geniusId);
    return g ? getGeniusPortrait(g.id) : undefined;
  }, [fact.geniusId]);

  return (
    <div className="px-4 space-y-4">
      {/* ── Action Buttons Row ──────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => navigate('/iq-tests')}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
        >
          <Brain className="w-5 h-5 text-secondary" />
          <span className="text-[11px] font-semibold text-foreground">IQ Test</span>
        </button>
        <button
          onClick={() => navigate('/the-path')}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 transition-colors"
        >
          <Sparkles className="w-5 h-5 text-secondary" />
          <span className="text-[11px] font-semibold text-secondary">Begin Journey</span>
        </button>
        <button
          onClick={() => navigate('/feed')}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
        >
          <Fire className="w-5 h-5 text-secondary" />
          <span className="text-[11px] font-semibold text-foreground">Scroll & Learn</span>
        </button>
      </div>

      {/* ── Genius Fact ─────────────────────────────────── */}
      <Link
        to={`/genius/${fact.geniusId}`}
        className="block rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/5 via-card to-accent/5 p-4 hover:border-secondary/40 transition-colors"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3 h-3 text-secondary" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-secondary">Genius Fact</span>
        </div>
        <div className="flex gap-3 items-start">
          {geniusPortrait && (
            <img src={geniusPortrait} alt={fact.genius} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-secondary/20" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{fact.genius}</p>
            <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">{fact.fact}</p>
            <p className="text-[11px] text-secondary italic mt-1.5 flex items-center gap-1">
              <ArrowRight className="w-3 h-3" />
              {fact.takeaway}
            </p>
          </div>
        </div>
      </Link>

      {/* ── Mini Feed Window ──────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-heading text-base font-semibold text-foreground">Discover</h2>
          <button
            onClick={() => navigate('/feed')}
            className="text-xs text-secondary flex items-center gap-0.5 hover:underline"
          >
            Open Feed <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {feedItems.length === 0 ? (
          <div className="w-full h-44 rounded-xl bg-muted animate-pulse" />
        ) : (
          <div
            onClick={handleFeedTap}
            className={cn(
              'relative w-full h-44 rounded-xl bg-gradient-to-br overflow-hidden cursor-pointer border select-none',
              gradient,
              isDark ? 'border-white/10' : 'border-border'
            )}
          >
            {/* Progress dots */}
            <div className="absolute top-2.5 left-0 right-0 z-20 flex justify-center gap-1 px-4">
              {feedItems.map((_, i) => (
                <div key={i} className={cn('h-0.5 rounded-full flex-1 max-w-6 transition-all duration-300', i === current ? 'bg-secondary' : isDark ? 'bg-white/20' : 'bg-foreground/15')} />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 pt-5"
              >
                {renderMiniCard(feedItem)}
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 opacity-0 hover:opacity-40 transition-opacity">
              <ChevronLeft className={cn('w-4 h-4', isDark ? 'text-white' : 'text-foreground')} />
            </div>
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 opacity-0 hover:opacity-40 transition-opacity">
              <ChevronRight className={cn('w-4 h-4', isDark ? 'text-white' : 'text-foreground')} />
            </div>
          </div>
        )}
        <p className="text-[9px] text-muted-foreground text-center mt-1.5 opacity-50">Tap to browse · Open for full experience</p>
      </div>
    </div>
  );
};
