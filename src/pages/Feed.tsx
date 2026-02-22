import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '@/data/quizzes';
import { Brain, Quote, BookOpen, CheckCircle, XCircle, ArrowRight, GraduationCap, Globe, Volume2, VolumeX, Heart, Bookmark, X, ExternalLink, BookOpenText, MessageCircle, Sparkles, LogOut, UserPlus, Share2, RotateCcw, Eye, Timer } from 'lucide-react';
import { FeedScoreOverlay } from '@/components/feed/FeedScoreOverlay';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { startClassicalMusic, stopClassicalMusic, isClassicalPlaying, getCurrentTrack } from '@/lib/classicalMusic';
import { getGeniusPortrait } from '@/data/portraits';
import {
  FeedItem, fetchFeedContent, whyStudyItems, getClueForQuiz, cardGradients, darkTypes
} from '@/data/feedContent';
import { filterByTopics } from '@/data/feedTopics';
import { getRelevantModuleId, getModuleName } from '@/data/feedModuleMapping';
import { FeedTopicSetup } from '@/components/feed/FeedTopicSetup';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useTutor } from '@/contexts/TutorContext';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';

import { hasSeenHero } from '@/components/home/FirstVisitHero';

// ── Floating particles background ───────────────────────────────────────

const FloatingParticles = ({ count = 12, isDark = true }: { count?: number; isDark?: boolean }) => {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.15 + 0.05,
  })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: isDark ? 'hsl(43, 62%, 52%)' : 'hsl(217, 30%, 15%)',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ── Animated geometric shapes ────────────────────────────────────────────

const GeometricShapes = ({ variant = 'default' }: { variant?: 'default' | 'golden' | 'academic' }) => {
  const shapes = useMemo(() => {
    const baseShapes = [
      { type: 'circle', x: 85, y: 15, size: 80, rotation: 0 },
      { type: 'ring', x: 10, y: 75, size: 60, rotation: 45 },
      { type: 'line', x: 70, y: 80, size: 100, rotation: -30 },
      { type: 'dot', x: 20, y: 20, size: 8, rotation: 0 },
      { type: 'dot', x: 90, y: 60, size: 6, rotation: 0 },
    ];
    return baseShapes;
  }, []);

  const color = variant === 'golden' ? 'hsl(43, 62%, 52%)' : variant === 'academic' ? 'hsl(152, 48%, 35%)' : 'hsl(345, 73%, 31%)';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1, rotate: s.rotation }}
          transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
        >
          {s.type === 'circle' && (
            <div style={{ width: s.size, height: s.size, borderRadius: '50%', border: `1px solid ${color}` }} />
          )}
          {s.type === 'ring' && (
            <div style={{ width: s.size, height: s.size, borderRadius: '50%', border: `2px solid ${color}` }} />
          )}
          {s.type === 'line' && (
            <div style={{ width: s.size, height: 1, backgroundColor: color }} />
          )}
          {s.type === 'dot' && (
            <div style={{ width: s.size, height: s.size, borderRadius: '50%', backgroundColor: color }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Confetti burst ──────────────────────────────────────────────────────

const ConfettiBurst = () => {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 200 + 100),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.6 + 0.4,
    color: ['hsl(43,62%,52%)', 'hsl(345,73%,31%)', 'hsl(152,48%,35%)', 'hsl(217,30%,15%)', 'hsl(259,56%,59%)'][i % 5],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 w-3 h-3 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// ── Double-tap heart ────────────────────────────────────────────────────

const HeartBurst = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 1.5, opacity: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <Heart className="w-24 h-24 fill-red-500 text-red-500" />
  </motion.div>
);

// ── Auto-advance progress bar ───────────────────────────────────────────

const AutoAdvanceBar = ({ duration, paused, onComplete }: { duration: number; paused: boolean; onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef(Date.now());
  const pausedAtRef = useRef(0);

  useEffect(() => {
    if (paused) {
      pausedAtRef.current = progress;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startRef.current = Date.now() - (pausedAtRef.current * duration);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct >= 1) {
        onComplete();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, duration, onComplete]);

  // Reset on mount
  useEffect(() => {
    setProgress(0);
    pausedAtRef.current = 0;
    startRef.current = Date.now();
  }, []);

  return (
    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-secondary rounded-full"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0 }}
      />
    </div>
  );
};

// ── Card components ─────────────────────────────────────────────────────

// Helper to find genius portrait by name
const findPortraitByName = (name: string): string | undefined => {
  const genius = geniuses.find(g => g.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(g.name.split(' ').pop()?.toLowerCase() || ''));
  return genius ? getGeniusPortrait(genius.id) : undefined;
};

const QuoteCard = ({ item }: { item: FeedItem & { type: 'quote' } }) => {
  const portrait = findPortraitByName(item.data.author);
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={8} isDark />
      <GeometricShapes variant="default" />
      
      {portrait && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-64 h-64 rounded-full overflow-hidden"
          style={{ filter: 'blur(1px)' }}
        >
          <img src={portrait} alt="" className="w-full h-full object-cover" />
        </motion.div>
      )}
      
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ delay: 0.2 }} className="relative z-10">
        <Quote className="w-16 h-16 text-secondary mb-6" />
      </motion.div>
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 text-2xl md:text-3xl font-serif italic text-white text-center leading-relaxed max-w-lg mb-8"
      >
        &ldquo;{item.data.text}&rdquo;
      </motion.blockquote>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="relative z-10 flex items-center gap-3">
        {portrait && (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.8 }}
            src={portrait}
            alt={item.data.author}
            className="w-10 h-10 rounded-full object-cover border border-secondary/30"
          />
        )}
        <div className="text-center">
          <p className="font-semibold text-white/90 text-lg">{item.data.author}</p>
          <p className="text-sm text-white/50">{item.data.field}</p>
        </div>
      </motion.div>
    </div>
  );
};

// ── Learn More Button ──────────────────────────────────────────────────

const LearnMoreButton = ({ item, isDark = false }: { item: FeedItem; isDark?: boolean }) => {
  const navigate = useNavigate();
  const moduleId = getRelevantModuleId(item);
  if (!moduleId) return null;
  
  const moduleName = getModuleName(moduleId);
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/the-path?module=${moduleId}&lesson=first`);
      }}
      className={cn(
        "flex items-center gap-1.5 px-4 py-2 mt-4 rounded-full text-xs font-medium transition-colors",
        isDark
          ? "bg-secondary/20 border border-secondary/30 text-secondary hover:bg-secondary/30"
          : "bg-secondary/15 border border-secondary/25 text-secondary hover:bg-secondary/25"
      )}
    >
      <BookOpen className="w-3 h-3" />
      Learn {moduleName}
    </motion.button>
  );
};

const InsightCard = ({ item }: { item: FeedItem & { type: 'insight' } }) => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={6} isDark />
      <GeometricShapes variant="golden" />
      
      <div className="relative mb-3">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: 'hsl(43, 62%, 52%)', opacity: 0.1 }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: 0.1 }} className="relative text-5xl block">
          {item.data.icon}
        </motion.span>
      </div>
      
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
        {item.data.category}
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-foreground text-center mb-5 max-w-md">
        {item.data.title}
      </motion.h2>
      
      {/* Tap-to-reveal body */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={(e) => { e.stopPropagation(); if (!revealed) setRevealed(true); }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        className="relative max-w-sm cursor-pointer"
      >
        <motion.p
          animate={{ filter: revealed ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.4 }}
          className="text-base text-muted-foreground text-center leading-relaxed select-none"
        >
          {item.data.body}
        </motion.p>
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2"
              >
                <Eye className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary">Tap to reveal</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <LearnMoreButton item={item} isDark />
    </div>
  );
};

const StoryCard = ({ item }: { item: FeedItem & { type: 'story' } }) => {
  const genius = geniuses.find(g => g.name === item.data.genius || item.data.genius.includes(g.name.split(' ').pop() || ''));
  const portrait = genius ? getGeniusPortrait(genius.id) : undefined;
  
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={10} isDark />
      
      {portrait && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={portrait} alt="" className="w-full h-full object-cover" style={{ filter: 'blur(2px) grayscale(0.5)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(345,30%,15%)]" />
        </motion.div>
      )}
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative z-10 flex items-center gap-2 mb-3">
        {portrait ? (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.15 }}
            src={portrait}
            alt={item.data.genius}
            className="w-8 h-8 rounded-full object-cover border border-secondary/40"
          />
        ) : (
          <BookOpen className="w-4 h-4 text-secondary" />
        )}
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{item.data.genius}</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 text-2xl font-bold text-white text-center mb-6 max-w-md">
        {item.data.headline}
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-sm">
        <p className="text-sm text-white/80 leading-relaxed">{item.data.body}</p>
      </motion.div>
      <LearnMoreButton item={item} isDark />
    </div>
  );
};

const ConnectionCard = ({ item }: { item: FeedItem & { type: 'connection' } }) => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={8} isDark />
      <GeometricShapes variant="golden" />
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative z-10 flex items-center gap-2 mb-6">
        <Globe className="w-4 h-4 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Word Origin</span>
      </motion.div>
      
      <div className="relative">
        <motion.div
          className="absolute inset-0 blur-2xl"
          style={{ backgroundColor: 'hsl(43, 62%, 52%)' }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.h2 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="relative text-4xl font-bold text-white mb-3">
          {item.data.term}
        </motion.h2>
      </div>
      
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm font-medium text-secondary mb-1">
        {item.data.origin}
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm italic text-white/50 mb-8">
        &ldquo;{item.data.meaning}&rdquo;
      </motion.p>
      
      {/* Tap-to-reveal modern usage */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={(e) => { e.stopPropagation(); if (!revealed) setRevealed(true); }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 max-w-sm cursor-pointer"
      >
        <motion.p
          animate={{ filter: revealed ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.4 }}
          className="text-sm text-white/80 leading-relaxed select-none"
        >
          {item.data.modern}
        </motion.p>
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2"
              >
                <Eye className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary">Tap to reveal</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <LearnMoreButton item={item} isDark />
    </div>
  );
};

const WhyStudyCard = ({ item }: { item: FeedItem & { type: 'whyStudy' } }) => (
  <div className="relative flex flex-col items-center justify-center h-full px-8">
    <FloatingParticles count={8} isDark />
    <GeometricShapes variant="academic" />
    
    <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.1 }} className="relative z-10 text-5xl mb-4">
      {item.data.icon}
    </motion.span>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10 flex items-center gap-2 mb-5">
      <GraduationCap className="w-4 h-4 text-secondary" />
      <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Why Study This?</span>
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 text-2xl font-bold text-white text-center mb-5">
      {item.data.subject}
    </motion.h2>
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10 text-sm text-white/70 text-center leading-relaxed max-w-sm">
      {item.data.text}
    </motion.p>
    <LearnMoreButton item={item} isDark />
  </div>
);

// ── Excerpt Card ────────────────────────────────────────────────────────

const ExcerptCard = ({ item }: { item: FeedItem & { type: 'excerpt' } }) => {
  const portrait = findPortraitByName(item.data.author);
  const handleLink = () => {
    window.open(item.data.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={6} isDark />

      {portrait && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute w-72 h-72 rounded-full overflow-hidden"
          style={{ filter: 'blur(2px)' }}
        >
          <img src={portrait} alt="" className="w-full h-full object-cover" />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative z-10 flex items-center gap-2 mb-6">
        <BookOpenText className="w-4 h-4 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">From the Source</span>
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 text-xl md:text-2xl font-serif italic text-white text-center leading-relaxed max-w-lg mb-6"
      >
        &ldquo;{item.data.text}&rdquo;
      </motion.blockquote>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          {portrait && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.7 }}
              src={portrait}
              alt={item.data.author}
              className="w-8 h-8 rounded-full object-cover border border-secondary/30"
            />
          )}
          <div className="text-center">
            <p className="font-semibold text-white/90 text-sm">{item.data.author}</p>
            <p className="text-xs text-white/50">{item.data.workTitle} ({item.data.year})</p>
          </div>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={handleLink}
          className="flex items-center gap-1.5 px-4 py-2 mt-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium hover:bg-secondary/30 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Read the full work
        </motion.button>
        <LearnMoreButton item={item as any} isDark />
      </motion.div>
    </div>
  );
};

const QuizCard = ({ item, onNext, onCorrect, onWrong }: { item: FeedItem & { type: 'quiz' }; onNext: (fromQuiz?: boolean) => void; onCorrect: () => void; onWrong?: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const q = item.data;
  const isCorrect = selected === q.correctAnswer;
  const startTimeRef = useRef(Date.now());
  const [answerTime, setAnswerTime] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    setAnswerTime(elapsed);
    setSelected(i);
    if (i === q.correctAnswer) {
      onCorrect();
    } else {
      onWrong?.();
    }
  };

  const speedLabel = answerTime !== null
    ? answerTime < 3 ? '⚡ Lightning!' : answerTime < 6 ? '🔥 Fast!' : answerTime < 10 ? '✓ Good' : '🐢 Slow'
    : null;

  return (
    <div className="flex flex-col items-center justify-start h-full px-8 pt-6">
      <FloatingParticles count={6} isDark />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Quick Quiz</span>
      </motion.div>

      {/* Speed timer */}
      {selected === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1.5 mb-3"
        >
          <Timer className="w-3 h-3 text-white/30" />
          <span className="text-[10px] text-white/30 font-mono">Answer fast for bonus XP</span>
        </motion.div>
      )}

      {q.clue && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-2.5 mb-5 max-w-sm"
        >
          <p className="text-xs italic text-white/50 text-center leading-relaxed">{q.clue}</p>
        </motion.div>
      )}

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg font-bold text-white text-center mb-5 leading-relaxed max-w-md">
        {q.question}
      </motion.h2>
      <div className="w-full max-w-sm space-y-3">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "relative w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-300 font-medium text-sm",
              selected === null && "border-white/15 bg-white/5 text-white/80 hover:border-secondary hover:bg-secondary/10 active:scale-[0.98]",
              selected !== null && i === q.correctAnswer && "border-green-500 bg-green-500/10 text-white",
              selected !== null && i === selected && i !== q.correctAnswer && "border-red-400 bg-red-400/10 text-white",
              selected !== null && i !== q.correctAnswer && i !== selected && "border-white/10 opacity-40 text-white/50",
            )}
          >
            {/* Correct answer glow pulse */}
            {selected !== null && i === q.correctAnswer && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-green-400"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1, repeat: 2 }}
              />
            )}
            {opt}
          </motion.button>
        ))}
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-sm" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
          {/* Speed result */}
          {answerTime !== null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <span className="text-sm font-bold text-white/80">{speedLabel}</span>
              <span className="text-xs text-white/40">{answerTime.toFixed(1)}s</span>
            </motion.div>
          )}
          <div className={cn(
            "flex items-start gap-2 px-4 py-3 rounded-xl text-xs",
            isCorrect ? "bg-green-500/10" : "bg-red-400/10"
          )}>
            {isCorrect ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />}
            <span className="text-white/60">{q.explanation}</span>
          </div>
          <Button onClick={() => onNext(true)} className="w-full mt-3" variant="secondary" size="sm">
            Next <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// ── Flashcard Card (multiple choice) ────────────────────────────────────

const FlashcardCard = ({ item, onNext, onCorrect, onWrong }: { item: FeedItem & { type: 'flashcard' }; onNext: (fromQuiz?: boolean) => void; onCorrect: () => void; onWrong?: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const options: string[] = item.data.options || [item.data.back];
  const correctAnswer: number = item.data.correctAnswer ?? 0;
  const isCorrect = selected === correctAnswer;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === correctAnswer) onCorrect();
    else onWrong?.();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8">
      <FloatingParticles count={6} isDark />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative z-10 flex items-center gap-2 mb-2">
        <GraduationCap className="w-4 h-4 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Content Review</span>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-[10px] text-white/40 uppercase tracking-widest mb-5">
        {item.data.moduleName}
      </motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 text-base font-bold text-white text-center mb-5 leading-relaxed max-w-md">
        {item.data.front}
      </motion.h2>

      <div className="w-full max-w-sm space-y-3 relative z-10">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-300 font-medium text-sm",
              selected === null && "border-white/15 bg-white/5 text-white/80 hover:border-secondary hover:bg-secondary/10 active:scale-[0.98]",
              selected !== null && i === correctAnswer && "border-green-500 bg-green-500/10 text-white",
              selected !== null && i === selected && i !== correctAnswer && "border-red-400 bg-red-400/10 text-white",
              selected !== null && i !== correctAnswer && i !== selected && "border-white/10 opacity-40 text-white/50",
            )}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-sm relative z-10" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
          <div className={cn(
            "flex items-start gap-2 px-4 py-3 rounded-xl text-xs",
            isCorrect ? "bg-green-500/10" : "bg-red-400/10"
          )}>
            {isCorrect ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />}
            <span className="text-white/70">{isCorrect ? 'Correct!' : `The answer is: ${options[correctAnswer]}`}</span>
          </div>
          <Button onClick={() => onNext(true)} className="w-full mt-3" variant="secondary" size="sm">
            Next <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// ── Main Feed ───────────────────────────────────────────────────────────

const AUTO_ADVANCE_MS = 8000;

// Free tier: soft gate (dismissible) then hard gate (non-dismissible)
const FREE_SLIDE_LIMIT = 5;
const HARD_SLIDE_LIMIT = 10;

// In-feed conversion card shown after free limit
const FeedConversionCard = ({ onContinue, onLearn }: { onContinue: () => void; onLearn: () => void }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">
      <FloatingParticles count={6} isDark />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
        className="text-5xl mb-4"
      >
        🔓
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xs font-mono uppercase tracking-widest text-secondary mb-3"
      >
        You've seen {FREE_SLIDE_LIMIT} of 2,000+ slides
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="font-heading text-2xl font-bold text-white mb-2 max-w-sm"
      >
        {user ? 'Unlock unlimited scrolling' : 'This is just the beginning'}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-white/60 text-sm leading-relaxed mb-2 max-w-xs"
      >
        {user
          ? 'Get unlimited access to 2,000+ slides across 12 topics — philosophy, science, history, languages, and more.'
          : 'Create a free account to keep scrolling, then try 7 days of unlimited access across 12 topics and 2,000+ slides.'}
      </motion.p>
      {/* Trial badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 bg-secondary/15 border border-secondary/25 rounded-full px-4 py-2 mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-secondary" />
        <span className="text-xs font-semibold text-secondary">7-day free trial · Cancel anytime</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full max-w-xs space-y-3"
      >
        {user ? (
          <button
            onClick={onLearn}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-colors"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onLearn}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up Free
          </button>
        )}
        <button
          onClick={onContinue}
          className="w-full text-white/40 text-xs py-2 hover:text-white/60 transition-colors"
        >
          Keep browsing
        </button>
      </motion.div>
    </div>
  );
};

// Hard gate — shown after HARD_SLIDE_LIMIT, no dismiss option
const FeedHardGateCard = ({ onLearn }: { onLearn: () => void }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">
      <FloatingParticles count={10} isDark />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
        className="text-5xl mb-4"
      >
        🧠
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xs font-mono uppercase tracking-widest text-secondary mb-3"
      >
        Free preview complete
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="font-heading text-2xl font-bold text-white mb-2 max-w-sm"
      >
        {user ? "You've outgrown free mode" : "You're clearly curious"}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-white/60 text-sm leading-relaxed mb-2 max-w-xs"
      >
        {user
          ? "You've explored all your free slides. Unlock 2,000+ slides across philosophy, science, history, and 9 more topics."
          : "Most people scroll past. You didn't. Sign up free and keep building the smartest version of yourself."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 bg-secondary/15 border border-secondary/25 rounded-full px-4 py-2 mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-secondary" />
        <span className="text-xs font-semibold text-secondary">7-day free trial · Cancel anytime</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full max-w-xs space-y-3"
      >
        {user ? (
          <button
            onClick={onLearn}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-colors"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onLearn}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up Free
          </button>
        )}
        <button
          onClick={() => navigate('/')}
          className="w-full text-white/40 text-xs py-2 hover:text-white/60 transition-colors"
        >
          Back to home
        </button>
      </motion.div>
    </div>
  );
};

const Feed = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const { openTutor, setLessonContext, clearMessages, addMessage } = useTutor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<string[] | null>(null); // null = loading
  const [showSetup, setShowSetup] = useState(false);
  const [dbContent, setDbContent] = useState<Awaited<ReturnType<typeof fetchFeedContent>> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [userFlashcards, setUserFlashcards] = useState<FeedItem[]>([]);
  const [showActionChooser, setShowActionChooser] = useState(false);
  const [showConversionCard, setShowConversionCard] = useState(false);
  const [showHardGate, setShowHardGate] = useState(false);

  // Dopamine mechanics: streak + XP
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);
  const [lastXpGain, setLastXpGain] = useState(0);

  const lastTapRef = useRef(0);
  const lastTapSideRef = useRef<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Parallelized data loading — fire everything at once
  useEffect(() => {
    // Always fetch feed content (cached after first call)
    fetchFeedContent().then(setDbContent);
  }, []);

  // Load user preferences + review cards in parallel once auth resolves
  useEffect(() => {
    if (authLoading) return;

    const loadPrefs = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_feed_preferences')
          .select('selected_topics')
          .eq('user_id', user.id)
          .maybeSingle();

        // Always show everything — topic filtering is de-prioritised
        setSelectedTopics(data?.selected_topics ?? []);
      } else {
        // Guest: show everything, no setup
        setSelectedTopics([]);
      }
      // Never show topic setup — we randomise for them
      setShowSetup(false);
    };

    const loadCards = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('user_review_cards')
        .select('id, front, back, module_id, card_type, extra_data')
        .eq('user_id', user.id)
        .limit(50);
      if (data && data.length > 0) {
        const { getModuleName } = await import('@/data/feedModuleMapping');
        const usableCards = data.filter(c => c.card_type === 'flashcard' && !c.back.startsWith('[') && !c.back.startsWith('{'));
        // Filter out pronunciation/letter cards: backs like "ah (as in father)", "r (rolled)", "oh (short, as in off)"
        const isPronunciationCard = (card: { front: string; back: string }) => {
          // Back contains "(as in" or "(rolled" or "(short" or "(long" — pronunciation guide
          if (/\(as in\s/i.test(card.back)) return true;
          if (/\((rolled|short|long)[,)]/i.test(card.back)) return true;
          // Front is a single Greek/Latin letter pair like "Α α" or "Σ σ/ς"
          if (/^[^\s]{1,3}\s[^\s]{1,4}$/.test(card.front.trim()) && card.front.trim().length <= 7) return true;
          return false;
        };
        const meaningCards = usableCards.filter(c => !isPronunciationCard(c));
        const backsByModule: Record<string, string[]> = {};
        for (const c of meaningCards) {
          if (!backsByModule[c.module_id]) backsByModule[c.module_id] = [];
          backsByModule[c.module_id].push(c.back);
        }
        const cards: FeedItem[] = shuffleArray(meaningCards).map(c => {
          const question = `What does "${c.front}" mean?`;
          const sameModuleBacks = (backsByModule[c.module_id] || []).filter(b => b !== c.back);
          let wrongOptions = shuffleArray(sameModuleBacks).slice(0, 3);
          if (wrongOptions.length < 3) {
            const otherBacks = meaningCards.filter(o => o.module_id !== c.module_id).map(o => o.back);
            wrongOptions.push(...shuffleArray(otherBacks).slice(0, 3 - wrongOptions.length));
          }
          while (wrongOptions.length < 3) wrongOptions.push('—');
          const options = shuffleArray([c.back, ...wrongOptions]);
          const correctAnswer = options.indexOf(c.back);
          return {
            type: 'flashcard' as const,
            data: {
              front: question,
              back: c.back,
              moduleId: c.module_id,
              moduleName: getModuleName(c.module_id),
              cardId: c.id,
              options,
              correctAnswer,
            },
          };
        });
        setUserFlashcards(cards);
      }
    };

    // Fire both in parallel
    loadPrefs();
    loadCards();
  }, [user, authLoading]);

  const handleSetupComplete = (topics: string[]) => {
    setSelectedTopics(topics);
    setShowSetup(false);
    setCurrentIndex(0);
  };

  // Lazy-load lesson quizzes (avoid importing huge quiz data at page load)
  const [lessonQuizData, setLessonQuizData] = useState<any[] | null>(null);
  useEffect(() => {
    import('@/data/quizzes').then(m => setLessonQuizData(m.lessonQuizzes));
  }, []);

  // Build feed items whenever data changes
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const prevItemCountRef = useRef(0);

  useEffect(() => {
    if (!dbContent || selectedTopics === null || lessonQuizData === null) return;

    const contentItems: FeedItem[] = [
      ...shuffleArray(dbContent.insights).slice(0, 14),
      ...shuffleArray(dbContent.stories).slice(0, 8),
      ...shuffleArray(dbContent.allQuotes).slice(0, 10),
      ...shuffleArray(dbContent.connections).slice(0, 12),
      ...shuffleArray(dbContent.excerpts).slice(0, 8),
      ...shuffleArray(whyStudyItems).slice(0, 4),
    ];
    const lessonQuizItems: FeedItem[] = lessonQuizData.flatMap(lq => lq.questions.map((q: any) => ({
      type: 'quiz' as const,
      data: { ...q, clue: getClueForQuiz(lq.lessonId) },
    })));
    const quizItems: FeedItem[] = shuffleArray([
      ...lessonQuizItems,
      ...dbContent.feedQuizQuestions,
    ]).slice(0, 18);

    const topics = selectedTopics;
    const isReviewOnly = topics.length === 1 && topics[0] === 'content-review';
    const includesReview = topics.length === 0 || topics.includes('content-review');

    if (isReviewOnly) {
      if (userFlashcards.length > 0) {
        setFeedItems(shuffleArray(userFlashcards));
      } else {
        setFeedItems(shuffleArray([...contentItems, ...quizItems]));
      }
      return;
    }

    const filteredContent = filterByTopics(shuffleArray(contentItems), topics);
    const filteredQuizzes = filterByTopics(quizItems, topics);
    const filteredFlashcards = includesReview ? shuffleArray(userFlashcards) : [];

    const result: FeedItem[] = [];
    let ci = 0, qi = 0, fi = 0;
    let sinceFlashcard = 0;
    while (ci < filteredContent.length || qi < filteredQuizzes.length) {
      const batch = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < batch && ci < filteredContent.length; j++) {
        result.push(filteredContent[ci++]);
        sinceFlashcard++;
      }
      if (qi < filteredQuizzes.length) { result.push(filteredQuizzes[qi++]); sinceFlashcard++; }
      if (sinceFlashcard >= 8 && fi < filteredFlashcards.length) {
        const clusterSize = Math.min(2 + Math.floor(Math.random() * 2), filteredFlashcards.length - fi);
        for (let k = 0; k < clusterSize; k++) result.push(filteredFlashcards[fi++]);
        sinceFlashcard = 0;
      }
    }
    while (fi < filteredFlashcards.length) result.push(filteredFlashcards[fi++]);

    // For unauthenticated first-time visitors: prepend a hand-curated hook sequence
    // so the first 5 slides are the most engaging/viral content we have
    let finalResult = result;
    if (!user && !localStorage.getItem('genius-academy-feed-converted')) {
      const curatedOpeners: FeedItem[] = [
        { type: 'quote', data: { text: 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.', author: 'Albert Einstein', field: 'Physics' } },
        { type: 'quiz', data: { id: 'curated-1', question: 'What fascinated 5-year-old Einstein and sparked his lifelong curiosity?', options: ['A telescope', 'A compass', 'A prism', 'A pendulum'], correctAnswer: 1, explanation: 'Einstein was amazed that an invisible force could move a compass needle — this wonder about invisible forces never left him and led to the Theory of Relativity.' } },
        { type: 'insight', data: { title: 'Why Latin Unlocks Everything', body: 'Over 60% of English words have Latin roots. Learning Latin doesn\'t just teach you a dead language — it gives you the skeleton key to biology, law, medicine, and classical literature all at once.', category: 'Latin', icon: '📜' } },
        { type: 'connection', data: { term: 'Philosophy', origin: 'Greek: φίλος (philos) + σοφία (sophia)', meaning: 'Love of Wisdom', modern: 'Every academic discipline — science, law, medicine — grew out of philosophy. Understanding the root reveals why they all still ask the same fundamental question: "What is true?"' } },
        { type: 'quiz', data: { id: 'curated-2', question: 'Newton\'s First Law states that an object in motion stays in motion unless...', options: ['It runs out of energy', 'An external force acts on it', 'Gravity pulls it down', 'Friction increases'], correctAnswer: 1, explanation: 'Inertia — the tendency to resist change. Newton saw this pattern in everything from falling apples to orbiting planets.' } },
      ];
      // Remove anything from result that would duplicate the curated items
      const curatedIds = new Set(['curated-1', 'curated-2']);
      const restResult = result.filter(item => !(item.type === 'quiz' && curatedIds.has((item.data as any).id)));
      finalResult = [...curatedOpeners, ...restResult];
    }

    // Only reset index if feed was empty before (first load)
    if (prevItemCountRef.current === 0 && finalResult.length > 0) {
      setCurrentIndex(0);
    }
    prevItemCountRef.current = finalResult.length;
    setFeedItems(finalResult);
  }, [dbContent, selectedTopics, userFlashcards, lessonQuizData]);

  // Clamp currentIndex to valid range when feedItems changes
  const clampedIndex = feedItems.length > 0 ? Math.min(currentIndex, feedItems.length - 1) : 0;
  const currentItem = feedItems[clampedIndex];
  const isQuiz = currentItem?.type === 'quiz';
  const isFlashcard = currentItem?.type === 'flashcard';
  const isInteractive = isQuiz || isFlashcard;
  const isDark = currentItem ? darkTypes.has(currentItem.type) : false;

  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  // Track total slides seen (all types) for the free-tier gate
  const slidesSeenCount = useRef(0);
  const gateDismissedThisSession = useRef(false);

  const goNext = useCallback((fromQuiz = false) => {
    const nextIndex = currentIndex + 1;
    // Count every slide toward the limit (quizzes included)
    slidesSeenCount.current += 1;
    // Premium users get unlimited slides — skip the gate entirely
    if (!isPremium) {
      // Hard gate at HARD_SLIDE_LIMIT — non-dismissible
      if (slidesSeenCount.current >= HARD_SLIDE_LIMIT) {
        if (isClassicalPlaying()) stopClassicalMusic();
        setShowHardGate(true);
        return;
      }
      // Soft gate at FREE_SLIDE_LIMIT — dismissible (only if not already dismissed)
      if (!gateDismissedThisSession.current && slidesSeenCount.current >= FREE_SLIDE_LIMIT) {
        if (isClassicalPlaying()) stopClassicalMusic();
        setShowConversionCard(true);
        setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
        return;
      }
    }
    if (currentIndex >= feedItems.length - 1) {
      // Feed finished — prompt signup for unauthenticated users
      if (!user) {
        setShowSignupPrompt(true);
        return;
      }
    }
    setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
  }, [feedItems.length, currentIndex, user, isPremium]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);


  // Instagram-style tap zones: left 30% = go back, right 70% = go next
  // Disabled on quiz cards — user must use the Next button
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isInteractive) return; // no tap navigation on quizzes/flashcards
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width * 0.3;
    lastTapSideRef.current = isLeft ? 'left' : 'right';

    // Pause immediately on finger down
    setIsPaused(true);
  }, [isInteractive]);

  const handlePointerUp = useCallback(() => {
    setIsPaused(false);
    if (isInteractive) return; // no tap navigation on quizzes/flashcards

    const now = Date.now();
    const side = lastTapSideRef.current;

    if (side === 'right') {
      // Double-tap right = heart
      if (now - lastTapRef.current < 300) {
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 900);
      } else {
        // Single tap right = next
        goNext();
      }
    } else if (side === 'left') {
      // Tap left = go back
      goPrev();
    }

    lastTapRef.current = now;
  }, [isInteractive, goNext, goPrev]);

  const handlePointerCancel = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Toggle audio
  const toggleAudio = () => {
    if (isClassicalPlaying()) {
      stopClassicalMusic();
      setAudioOn(false);
    } else {
      startClassicalMusic();
      setAudioOn(true);
    }
  };

  // Save/bookmark — persist as a note in user_lesson_notes
  const toggleSave = async () => {
    const alreadySaved = saved.has(clampedIndex);
    setSaved(prev => {
      const next = new Set(prev);
      if (alreadySaved) next.delete(clampedIndex);
      else next.add(clampedIndex);
      return next;
    });

    if (!alreadySaved && user) {
      const item = feedItems[clampedIndex];
      let title = 'Feed Bookmark';
      let content = '';

      if (item.type === 'quote') {
        title = `Quote — ${item.data.author}`;
        content = `"${item.data.text}"\n\n— ${item.data.author}`;
      } else if (item.type === 'insight') {
        title = `Insight — ${item.data.title}`;
        content = item.data.body;
      } else if (item.type === 'story') {
        title = `Story — ${item.data.genius}`;
        content = `${item.data.headline}\n\n${item.data.body}`;
      } else if (item.type === 'connection') {
        title = `Word Origin — ${item.data.term}`;
        content = `${item.data.term} (${item.data.origin})\n\n${item.data.meaning}`;
      } else if (item.type === 'excerpt') {
        title = `Excerpt — ${item.data.workTitle}`;
        content = `"${item.data.text}"\n\n— ${item.data.author}, ${item.data.workTitle}`;
      } else if (item.type === 'whyStudy') {
        title = `Why Study — ${item.data.subject}`;
        content = item.data.text;
      } else if (item.type === 'quiz') {
        title = `Quiz — ${item.data.question.substring(0, 60)}`;
        content = `Q: ${item.data.question}\nA: ${item.data.options[item.data.correctAnswer]}`;
      } else if (item.type === 'flashcard') {
        title = `Flashcard — ${item.data.moduleName}`;
        content = `Q: ${item.data.front}\nA: ${item.data.back}`;
      }

      await supabase.from('user_lesson_notes').insert({
        user_id: user.id,
        title,
        content,
        module_id: 'feed-bookmark',
      });
    }
  };

  // First-correct celebration
  const [showFirstCorrect, setShowFirstCorrect] = useState(false);
  const hasEverAnsweredCorrect = useRef(false);

  // Confetti + haptic + streak/XP on correct quiz answer
  const handleCorrectAnswer = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1300);

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate([50, 30, 80]);

    // Update streak
    setStreak(prev => prev + 1);

    // XP: base 10 + streak bonus (2 per streak level, capped at 20)
    const streakBonus = Math.min(streak * 2, 20);
    const gain = 10 + streakBonus;
    setLastXpGain(gain);
    setXp(prev => prev + gain);
    setShowXpPop(true);
    setTimeout(() => setShowXpPop(false), 900);

    if (!hasEverAnsweredCorrect.current) {
      hasEverAnsweredCorrect.current = true;
      setShowFirstCorrect(true);
      setTimeout(() => setShowFirstCorrect(false), 4000);
    }
  };

  // Reset streak on wrong answer
  const handleWrongAnswer = () => {
    setStreak(0);
  };

  // Explain current item via AI tutor
  const handleExplain = () => {
    const item = feedItems[clampedIndex];
    if (!item) return;

    let contextContent = '';
    let contextTitle = 'Feed Item';

    if (item.type === 'quote') {
      contextTitle = `Quote by ${item.data.author}`;
      contextContent = `"${item.data.text}" — ${item.data.author} (${item.data.field})`;
    } else if (item.type === 'insight') {
      contextTitle = item.data.title;
      contextContent = `${item.data.title}\n\n${item.data.body}`;
    } else if (item.type === 'story') {
      contextTitle = `Story: ${item.data.headline}`;
      contextContent = `${item.data.headline}\n\n${item.data.body}\n\nGenius: ${item.data.genius}`;
    } else if (item.type === 'connection') {
      contextTitle = `Word Origin: ${item.data.term}`;
      contextContent = `${item.data.term} — Origin: ${item.data.origin}\nMeaning: ${item.data.meaning}\n\n${item.data.modern}`;
    } else if (item.type === 'whyStudy') {
      contextTitle = `Why Study ${item.data.subject}`;
      contextContent = item.data.text;
    } else if (item.type === 'excerpt') {
      contextTitle = `Excerpt from ${item.data.workTitle}`;
      contextContent = `"${item.data.text}"\n\n— ${item.data.author}, ${item.data.workTitle} (${item.data.year})`;
    } else if (item.type === 'quiz') {
      contextTitle = `Quiz Question`;
      contextContent = `Question: ${item.data.question}\nCorrect Answer: ${item.data.options[item.data.correctAnswer]}\nExplanation: ${item.data.explanation}`;
    } else if (item.type === 'flashcard') {
      contextTitle = `Study Card — ${item.data.moduleName}`;
      contextContent = `Front: ${item.data.front}\nBack: ${item.data.back}`;
    }

    clearMessages();
    setLessonContext({
      geniusId: 'feed',
      geniusName: 'Feed',
      subjectId: 'feed',
      subjectName: contextTitle,
      lessonContent: contextContent,
    });
    // Pre-populate with the context as an assistant message so user sees info immediately
    addMessage({
      role: 'assistant',
      content: `📖 **${contextTitle}**\n\n${contextContent}\n\n---\n\nAsk me anything about this — I can explain further, give historical context, or explore related ideas.`,
    });
    openTutor();
  };

  const handleClose = () => {
    if (isClassicalPlaying()) stopClassicalMusic();
    navigate('/');
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { if (isClassicalPlaying()) stopClassicalMusic(); };
  }, []);

  if (selectedTopics === null) {
    // Show a smooth loading state instead of blank flash
    return (
      <div className="fixed inset-0 z-40 bg-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          <p className="text-primary-foreground/60 text-sm font-mono">Loading your feed...</p>
        </motion.div>
      </div>
    );
  }
  if (showSetup) {
    return <FeedTopicSetup onComplete={handleSetupComplete} initialTopics={selectedTopics} />;
  }

  const isStillLoading = !currentItem && !dbContent;
  const isEmptyFeed = !currentItem && dbContent;

  if (isStillLoading) return (
    <div className="fixed inset-0 z-40 bg-primary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
        <p className="text-primary-foreground/60 text-sm font-mono">Loading your feed...</p>
      </motion.div>
    </div>
  );

  if (isEmptyFeed) return (
    <div className="fixed inset-0 z-40 bg-primary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4 px-6 text-center"
      >
        <Sparkles className="w-8 h-8 text-secondary" />
        <p className="text-primary-foreground/80 text-base">No review cards yet.</p>
        <p className="text-primary-foreground/50 text-sm">Complete some lessons in The Path to generate flashcards for review.</p>
        <button onClick={() => navigate('/path')} className="mt-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium">
          Go to The Path
        </button>
      </motion.div>
    </div>
  );

  const gradient = cardGradients[currentItem.type] || cardGradients.insight;

  // Show onboarding bar for first-time visitors on feed
  const isFirstVisitFeed = hasSeenHero() && !localStorage.getItem('genius-academy-onboarding-complete');

  return (
    <div className="fixed inset-0 z-40">
      {/* Action Chooser modal — fires after FREE_SLIDE_LIMIT slides */}
      <OnboardingModal
        open={showActionChooser}
        onClose={() => {
          localStorage.setItem('genius-academy-feed-converted', 'true');
          setShowActionChooser(false);
          // Continue letting them scroll after dismissing
        }}
      />
      
      {showConfetti && <ConfettiBurst />}
      {showHeart && <HeartBurst />}
      <FeedScoreOverlay streak={streak} xp={xp} showXpPop={showXpPop} xpGain={lastXpGain} />

      {/* First correct answer celebration */}
      <AnimatePresence>
        {showFirstCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-32 left-4 right-4 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4 max-w-sm mx-auto">
              <span className="text-3xl flex-shrink-0">🧠</span>
              <div>
                <p className="font-heading font-bold text-secondary-foreground text-sm">You're already thinking differently.</p>
                <p className="text-secondary-foreground/75 text-xs mt-0.5">Just 10 minutes a day builds real cognitive depth. You're on the path.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup prompt after feed completion */}
      <AnimatePresence>
        {showSignupPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowSignupPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="gradient-premium p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-14 h-14 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center"
                >
                  <UserPlus className="w-7 h-7 text-cream" />
                </motion.div>
                <h2 className="font-heading text-xl font-bold text-cream">You're on a roll!</h2>
                <p className="text-cream/70 text-sm mt-1">Create a free account to save your progress</p>
              </div>
              <div className="p-6 space-y-3">
                <Button
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() => {
                    sessionStorage.setItem('genius-academy-auth-redirect', '/feed');
                    navigate('/auth');
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Free Account
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => setShowSignupPrompt(false)}
                >
                  Maybe later
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={clampedIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          drag={isInteractive ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_e, info) => {
            if (isInteractive) return;
            if (info.offset.x < -60) goNext();
            else if (info.offset.x > 60) goPrev();
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className={cn(
            "h-full w-full bg-gradient-to-b flex flex-col",
            isInteractive ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            gradient
          )}
          style={{ touchAction: isInteractive ? 'pan-y' : 'none' }}
          ref={containerRef}
        >
          {/* Top bar: progress + controls */}
          <div className="flex-shrink-0 pt-[env(safe-area-inset-top)] px-4 pt-3 pb-2 z-10">
            {/* Story-style progress segments */}
            <div className="flex gap-1 mb-3">
              {feedItems.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/10">
                  {i < clampedIndex && <div className="h-full w-full bg-secondary" />}
                  {i === clampedIndex && !isInteractive && (
                    <AutoAdvanceBar duration={AUTO_ADVANCE_MS} paused={isPaused} onComplete={goNext} />
                  )}
                  {i === clampedIndex && isInteractive && <div className="h-full w-full bg-secondary/40" />}
                </div>
              )).slice(
                Math.max(0, clampedIndex - 4),
                Math.min(feedItems.length, clampedIndex + 6)
              )}
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center gap-3" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSetup(true);
                  }}
                  className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors border", isDark ? "text-secondary/60 border-secondary/20 hover:bg-secondary/10" : "text-secondary/60 border-secondary/20 hover:bg-secondary/10")}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Topics</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleAudio(); }} className={cn("p-1.5 rounded-full transition-colors", isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                  {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className={cn("p-1.5 rounded-full transition-colors", isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card content - fills remaining space */}
          <div className={cn("flex-1 min-h-0", isInteractive ? "overflow-y-auto" : "overflow-hidden")}>
            {showHardGate ? (
              <FeedHardGateCard
                onLearn={() => {
                  setShowHardGate(false);
                  if (user) {
                    showPaywall();
                  } else {
                    navigate('/auth');
                  }
                }}
              />
            ) : showConversionCard ? (
              <FeedConversionCard
                onLearn={() => {
                  setShowConversionCard(false);
                  if (user) {
                    showPaywall();
                  } else {
                    navigate('/auth');
                  }
                }}
                onContinue={() => {
                  gateDismissedThisSession.current = true;
                  setShowConversionCard(false);
                  slidesSeenCount.current = 0;
                }}
              />
            ) : (
              <>
                {currentItem.type === 'quote' && <QuoteCard item={currentItem as any} />}
                {currentItem.type === 'insight' && <InsightCard item={currentItem as any} />}
                {currentItem.type === 'story' && <StoryCard item={currentItem as any} />}
                {currentItem.type === 'connection' && <ConnectionCard item={currentItem as any} />}
                {currentItem.type === 'whyStudy' && <WhyStudyCard item={currentItem as any} />}
                {currentItem.type === 'excerpt' && <ExcerptCard item={currentItem as any} />}
                {currentItem.type === 'quiz' && <QuizCard item={currentItem as any} onNext={goNext} onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />}
                {currentItem.type === 'flashcard' && <FlashcardCard item={currentItem as any} onNext={goNext} onCorrect={handleCorrectAnswer} onWrong={handleWrongAnswer} />}
              </>
            )}
          </div>

          {/* Bottom action bar */}
          <div className="flex-shrink-0 px-4 pb-1 z-10" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
            {/* Close / "I'm ready to learn" — always above Save/Share/Explain */}
            {isFirstVisitFeed ? (
              <div className="flex justify-center mb-2">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  I'm ready to learn
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-2">
                <button
                  onClick={handleClose}
                  className={cn(
                    "flex items-center gap-1.5 px-5 py-2 rounded-full text-[10px] font-medium transition-colors",
                    isDark
                      ? "text-white/40 hover:text-white/60"
                      : "text-muted-foreground/60 hover:text-muted-foreground"
                  )}
                >
                  <LogOut className="w-3 h-3" />
                  Close
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleSave}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors border",
                  saved.has(clampedIndex)
                    ? "border-secondary bg-secondary/20 text-secondary"
                    : isDark
                      ? "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                      : "border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20"
                )}
              >
                <Bookmark className={cn("w-3.5 h-3.5", saved.has(clampedIndex) && "fill-secondary")} />
                {saved.has(clampedIndex) ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const item = feedItems[clampedIndex];
                  let text = '';
                  if (item.type === 'quote') text = `"${item.data.text}" — ${item.data.author}`;
                  else if (item.type === 'insight') text = `${item.data.title}: ${item.data.body}`;
                  else if (item.type === 'story') text = `${item.data.headline} — ${item.data.genius}`;
                  else if (item.type === 'connection') text = `${item.data.term} (${item.data.origin}): ${item.data.meaning}`;
                  else if (item.type === 'whyStudy') text = `Why study ${item.data.subject}? ${item.data.text}`;
                  else if (item.type === 'excerpt') text = `"${item.data.text}" — ${item.data.author}, ${item.data.workTitle}`;
                  else if (item.type === 'quiz') text = `Can you answer this? ${item.data.question}`;
                  else if (item.type === 'flashcard') text = `Study card: ${item.data.front} → ${item.data.back}`;
                  
                  const shareText = text.length > 280 ? text.slice(0, 277) + '...' : text;
                  const shareUrl = window.location.origin;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Path of a Genius', text: shareText, url: shareUrl }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).then(() => {
                      import('sonner').then(({ toast }) => toast('Copied to clipboard!'));
                    }).catch(() => {});
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors border",
                  isDark
                    ? "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                    : "border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20"
                )}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                onClick={handleExplain}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors border",
                  isDark
                    ? "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                    : "border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20"
                )}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Explain
              </button>
            </div>
          </div>

          {/* Safe area spacer — extra padding for mobile web browser chrome */}
          <div className="flex-shrink-0" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 16px), 32px)' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;
