import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { lessonQuizzes, QuizQuestion } from '@/data/quizzes';
import { Brain, Quote, BookOpen, CheckCircle, XCircle, ArrowRight, GraduationCap, Globe, Volume2, VolumeX, Heart, Bookmark, X, ExternalLink, BookOpenText, Settings2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { startAmbient, stopAmbient, isAmbientPlaying } from '@/lib/ambientAudio';
import { getGeniusPortrait } from '@/data/portraits';
import {
  FeedItem, fetchFeedContent, whyStudyItems, getClueForQuiz, cardGradients, darkTypes
} from '@/data/feedContent';
import { filterByTopics } from '@/data/feedTopics';
import { FeedTopicSetup } from '@/components/feed/FeedTopicSetup';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTutor } from '@/contexts/TutorContext';
import { OnboardingProgressBar } from '@/components/onboarding/OnboardingProgressBar';
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

const InsightCard = ({ item }: { item: FeedItem & { type: 'insight' } }) => (
  <div className="relative flex flex-col items-center justify-center h-full px-8">
    <FloatingParticles count={6} isDark={false} />
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
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-base text-muted-foreground text-center leading-relaxed max-w-sm">
      {item.data.body}
    </motion.p>
  </div>
);

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
    </div>
  );
};

const ConnectionCard = ({ item }: { item: FeedItem & { type: 'connection' } }) => (
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 max-w-sm">
      <p className="text-sm text-white/80 leading-relaxed">{item.data.modern}</p>
    </motion.div>
  </div>
);

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
      </motion.div>
    </div>
  );
};

const QuizCard = ({ item, onNext, onCorrect }: { item: FeedItem & { type: 'quiz' }; onNext: () => void; onCorrect: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const q = item.data;
  const isCorrect = selected === q.correctAnswer;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctAnswer) {
      onCorrect();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Quick Quiz</span>
      </motion.div>

      {q.clue && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-2.5 mb-5 max-w-sm"
        >
          <p className="text-xs italic text-muted-foreground text-center leading-relaxed">{q.clue}</p>
        </motion.div>
      )}

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg font-bold text-foreground text-center mb-5 leading-relaxed max-w-md">
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
              "w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-300 font-medium text-sm",
              selected === null && "border-border bg-card hover:border-secondary hover:bg-secondary/5 active:scale-[0.98]",
              selected !== null && i === q.correctAnswer && "border-green-500 bg-green-500/10",
              selected !== null && i === selected && i !== q.correctAnswer && "border-red-400 bg-red-400/10",
              selected !== null && i !== q.correctAnswer && i !== selected && "border-border/30 opacity-40",
            )}
          >
            {opt}
          </motion.button>
        ))}
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-sm">
          <div className={cn(
            "flex items-start gap-2 px-4 py-3 rounded-xl text-xs",
            isCorrect ? "bg-green-500/10" : "bg-red-400/10"
          )}>
            {isCorrect ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />}
            <span className="text-muted-foreground">{q.explanation}</span>
          </div>
          <Button onClick={onNext} className="w-full mt-3" variant="secondary" size="sm">
            Next <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// ── Main Feed ───────────────────────────────────────────────────────────

const AUTO_ADVANCE_MS = 8000;

const Feed = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
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
  const lastTapRef = useRef(0);
  const lastTapSideRef = useRef<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Load feed content from database
  useEffect(() => {
    fetchFeedContent().then(setDbContent);
  }, []);

  // Load preferences from DB — wait for auth to finish first
  useEffect(() => {
    if (authLoading) return; // don't decide until auth resolves

    const loadPrefs = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_feed_preferences')
          .select('selected_topics')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data && data.selected_topics && data.selected_topics.length > 0) {
          setSelectedTopics(data.selected_topics);
        } else {
          // No preferences yet — show setup
          setSelectedTopics([]);
          setShowSetup(true);
        }
      } else {
        setSelectedTopics([]);
        setShowSetup(true);
      }
    };
    loadPrefs();
  }, [user, authLoading]);

  const handleSetupComplete = (topics: string[]) => {
    setSelectedTopics(topics);
    setShowSetup(false);
    setCurrentIndex(0);
  };

  const feedItems: FeedItem[] = useMemo(() => {
    if (!dbContent) return [];

    const contentItems: FeedItem[] = [
      ...shuffleArray(dbContent.insights).slice(0, 14),
      ...shuffleArray(dbContent.stories).slice(0, 8),
      ...shuffleArray(dbContent.allQuotes).slice(0, 10),
      ...shuffleArray(dbContent.connections).slice(0, 12),
      ...shuffleArray(dbContent.excerpts).slice(0, 8),
      ...shuffleArray(whyStudyItems).slice(0, 4),
    ];
    const lessonQuizItems: FeedItem[] = lessonQuizzes.flatMap(lq => lq.questions.map(q => ({
      type: 'quiz' as const,
      data: { ...q, clue: getClueForQuiz(lq.lessonId) },
    })));
    const quizItems: FeedItem[] = shuffleArray([
      ...lessonQuizItems,
      ...dbContent.feedQuizQuestions,
    ]).slice(0, 18);

    // Apply topic filter to content and quizzes separately
    const filteredContent = filterByTopics(shuffleArray(contentItems), selectedTopics || []);
    const filteredQuizzes = filterByTopics(quizItems, selectedTopics || []);

    const result: FeedItem[] = [];
    let ci = 0, qi = 0;
    while (ci < filteredContent.length || qi < filteredQuizzes.length) {
      const batch = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < batch && ci < filteredContent.length; j++) result.push(filteredContent[ci++]);
      if (qi < filteredQuizzes.length) result.push(filteredQuizzes[qi++]);
    }
    return result;
  }, [selectedTopics, dbContent]);

  const currentItem = feedItems[currentIndex];
  const isQuiz = currentItem?.type === 'quiz';
  const isDark = currentItem ? darkTypes.has(currentItem.type) : false;

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
  }, [feedItems.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // Swipe handling — disabled on quiz cards so user must use the Next button
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isQuiz) return;
    if (info.offset.y < -60) goNext();
    else if (info.offset.y > 60) goPrev();
  };

  // Instagram-style tap zones: left 30% = go back, right 70% = go next
  // Disabled on quiz cards — user must use the Next button
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isQuiz) return; // no tap navigation on quizzes
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width * 0.3;
    lastTapSideRef.current = isLeft ? 'left' : 'right';

    // Start hold timer for pause
    holdTimerRef.current = setTimeout(() => {
      setIsPaused(true);
    }, 200);
  }, [isQuiz]);

  const handlePointerUp = useCallback(() => {
    // Clear hold timer
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = undefined;
    }
    if (isQuiz) return; // no tap navigation on quizzes
    // If was paused via hold, just unpause — don't navigate
    if (isPaused) {
      setIsPaused(false);
      return;
    }

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
  }, [isPaused, isQuiz, goNext, goPrev]);

  const handlePointerCancel = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = undefined;
    }
    if (isPaused) setIsPaused(false);
  }, [isPaused]);

  // Toggle audio
  const toggleAudio = () => {
    if (isAmbientPlaying()) {
      stopAmbient();
      setAudioOn(false);
    } else {
      startAmbient();
      setAudioOn(true);
    }
  };

  // Save/bookmark — persist as a note in user_lesson_notes
  const toggleSave = async () => {
    const alreadySaved = saved.has(currentIndex);
    setSaved(prev => {
      const next = new Set(prev);
      if (alreadySaved) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });

    if (!alreadySaved && user) {
      const item = feedItems[currentIndex];
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
      }

      await supabase.from('user_lesson_notes').insert({
        user_id: user.id,
        title,
        content,
        module_id: 'feed-bookmark',
      });
    }
  };

  // Confetti on correct quiz answer
  const handleCorrectAnswer = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1300);
  };

  // Explain current item via AI tutor
  const handleExplain = () => {
    const item = feedItems[currentIndex];
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
    if (isAmbientPlaying()) stopAmbient();
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { if (isAmbientPlaying()) stopAmbient(); };
  }, []);

  if (selectedTopics === null) return null; // loading
  if (showSetup) {
    return <FeedTopicSetup onComplete={handleSetupComplete} initialTopics={selectedTopics} />;
  }

  if (!currentItem) return null;

  const gradient = cardGradients[currentItem.type] || cardGradients.insight;

  // Show onboarding bar for first-time visitors on feed
  const isFirstVisitFeed = hasSeenHero() && !localStorage.getItem('genius-academy-onboarding-complete');

  return (
    <div className="fixed inset-0 z-40">
      {isFirstVisitFeed && <OnboardingProgressBar currentStep={1} />}
      {showConfetti && <ConfettiBurst />}
      {showHeart && <HeartBurst />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className={cn(
            "h-full w-full bg-gradient-to-b cursor-grab active:cursor-grabbing flex flex-col",
            gradient
          )}
          ref={containerRef}
        >
          {/* Top bar: progress + controls */}
          <div className="flex-shrink-0 pt-[env(safe-area-inset-top)] px-4 pt-3 pb-2 z-10">
            {/* Story-style progress segments */}
            <div className="flex gap-1 mb-3">
              {feedItems.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/10">
                  {i < currentIndex && <div className="h-full w-full bg-secondary" />}
                  {i === currentIndex && !isQuiz && (
                    <AutoAdvanceBar duration={AUTO_ADVANCE_MS} paused={isPaused} onComplete={goNext} />
                  )}
                  {i === currentIndex && isQuiz && <div className="h-full w-full bg-secondary/40" />}
                </div>
              )).slice(
                Math.max(0, currentIndex - 4),
                Math.min(feedItems.length, currentIndex + 6)
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className={cn("text-xs font-medium", isDark ? "text-white/50" : "text-muted-foreground")}>
                {currentIndex + 1} / {feedItems.length}
              </span>
              <div className="flex items-center gap-3" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); setShowSetup(true); }} className={cn("p-1.5 rounded-full transition-colors", isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                  <Settings2 className="w-4 h-4" />
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
          <div className="flex-1 min-h-0 overflow-hidden">
            {currentItem.type === 'quote' && <QuoteCard item={currentItem as any} />}
            {currentItem.type === 'insight' && <InsightCard item={currentItem as any} />}
            {currentItem.type === 'story' && <StoryCard item={currentItem as any} />}
            {currentItem.type === 'connection' && <ConnectionCard item={currentItem as any} />}
            {currentItem.type === 'whyStudy' && <WhyStudyCard item={currentItem as any} />}
            {currentItem.type === 'excerpt' && <ExcerptCard item={currentItem as any} />}
            {currentItem.type === 'quiz' && <QuizCard item={currentItem as any} onNext={goNext} onCorrect={handleCorrectAnswer} />}
          </div>

          {/* Bottom action bar */}
          <div className="flex-shrink-0 px-4 pb-2 mb-2 z-10" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleSave}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors border",
                  saved.has(currentIndex)
                    ? "border-secondary bg-secondary/20 text-secondary"
                    : isDark
                      ? "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                      : "border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20"
                )}
              >
                <Bookmark className={cn("w-3.5 h-3.5", saved.has(currentIndex) && "fill-secondary")} />
                {saved.has(currentIndex) ? 'Saved' : 'Save'}
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

          {/* Safe area spacer */}
          <div className="flex-shrink-0" style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;
