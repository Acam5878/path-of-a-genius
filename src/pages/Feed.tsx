import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { lessonQuizzes, QuizQuestion } from '@/data/quizzes';
import { Brain, Quote, BookOpen, CheckCircle, XCircle, ArrowRight, GraduationCap, Globe, Volume2, VolumeX, Heart, Bookmark, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';
import { startAmbient, stopAmbient, isAmbientPlaying } from '@/lib/ambientAudio';
import { getGeniusPortrait } from '@/data/portraits';

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

// ── Types ────────────────────────────────────────────────────────────────

type FeedItem =
  | { type: 'quote'; data: { text: string; author: string; field: string } }
  | { type: 'insight'; data: { title: string; body: string; category: string; icon: string } }
  | { type: 'story'; data: { headline: string; body: string; genius: string } }
  | { type: 'connection'; data: { term: string; origin: string; meaning: string; modern: string } }
  | { type: 'whyStudy'; data: { subject: string; text: string; icon: string } }
  | { type: 'quiz'; data: QuizQuestion };

// Background gradients per card type
const cardGradients: Record<string, string> = {
  quote: 'from-[hsl(217,30%,12%)] to-[hsl(217,30%,20%)]',
  insight: 'from-[hsl(40,33%,90%)] to-[hsl(40,25%,85%)]',
  story: 'from-[hsl(345,30%,15%)] to-[hsl(345,20%,22%)]',
  connection: 'from-[hsl(43,40%,18%)] to-[hsl(43,30%,12%)]',
  whyStudy: 'from-[hsl(152,30%,14%)] to-[hsl(152,20%,20%)]',
  quiz: 'from-[hsl(40,33%,92%)] to-[hsl(40,25%,88%)]',
};
const darkTypes = new Set(['quote', 'story', 'connection', 'whyStudy']);

// ── Content pools ────────────────────────────────────────────────────────

const quotes: FeedItem[] = geniuses.map(g => ({
  type: 'quote' as const,
  data: { text: g.famousQuote, author: g.name, field: g.field },
}));

const insights: FeedItem[] = [
  { type: 'insight', data: { title: 'The Interruption Method', body: "Mill's father never said \"look it up.\" When young John encountered an unknown Greek word, he asked immediately. This constant interruption forced active engagement \u2014 the vocabulary stuck because it was tied to the frustration and relief of a real reading moment, not an abstract flashcard.", category: 'Learning', icon: '\u{1F9E0}' } },
  { type: 'insight', data: { title: 'Why Euclid Still Matters', body: "Einstein kept a copy of Euclid's Elements on his desk his entire life. He called it his \"holy little geometry book.\" The reason? Euclid doesn't just teach geometry \u2014 he teaches you how to think from first principles.", category: 'Mathematics', icon: '\u{1F4D0}' } },
  { type: 'insight', data: { title: 'The Power of Back-Translation', body: "Mill would translate a passage from Greek to English, set it aside for a week, then translate his English back into Greek \u2014 and compare it to the original. The gaps revealed what he truly understood versus what he merely recognised.", category: 'Languages', icon: '\u{1F30D}' } },
  { type: 'insight', data: { title: "Tesla's Mental Workshop", body: "Tesla didn't sketch prototypes. He built complete machines in his imagination, let them run for weeks, then checked for wear on the imaginary parts. When he finally built the real thing, it worked on the first try.", category: 'Engineering', icon: '\u26A1' } },
  { type: 'insight', data: { title: "Newton's Plague Year", body: "When Cambridge closed for plague in 1665, 23-year-old Newton went home and had the most productive 18 months in scientific history. He developed calculus, the theory of colour, and began work on gravity.", category: 'Physics', icon: '\u{1F34E}' } },
  { type: 'insight', data: { title: "Curie's Glowing Notebooks", body: "Marie Curie's personal notebooks from the 1890s are still so radioactive that they are kept in lead-lined boxes. To read them, you must sign a liability waiver and wear protective clothing.", category: 'Science', icon: '\u2622\uFE0F' } },
  { type: 'insight', data: { title: 'The Trivium & Quadrivium', body: "The classical education model has three stages: Grammar, Logic, and Rhetoric. Then four mathematical arts: Arithmetic, Geometry, Music, and Astronomy. This 1,500-year-old framework is the backbone of this curriculum.", category: 'Education', icon: '\u{1F3DB}\uFE0F' } },
  { type: 'insight', data: { title: "Leonardo's Mirror Writing", body: "Da Vinci wrote over 7,000 pages of notes \u2014 all backwards, readable only in a mirror. Whatever the reason, his notebooks remain one of history's greatest records of curiosity.", category: 'Art', icon: '\u{1FA9E}' } },
  { type: 'insight', data: { title: "Pascal's Wager", body: "At 19, Pascal built the first mechanical calculator. But his most famous argument is philosophical: if God exists and you believe, you gain everything. If not, you lose nothing. The logic is fascinating regardless.", category: 'Philosophy', icon: '\u{1F3B2}' } },
  { type: 'insight', data: { title: 'Binary: From Leibniz to Your Phone', body: "Leibniz invented binary (0 and 1) in 1703, inspired by the Chinese I Ching. Three centuries later, every computer on Earth runs on his system. He had no idea.", category: 'Computing', icon: '\u{1F4BB}' } },
  { type: 'insight', data: { title: "Goethe's Colour Theory", body: "Goethe challenged Newton's optics \u2014 and was mostly wrong scientifically. But his insights about how humans perceive colour were revolutionary. Modern psychology confirms many of his observations.", category: 'Science', icon: '\u{1F3A8}' } },
  { type: 'insight', data: { title: 'Aristotle Walked While Teaching', body: "Aristotle's school was called the Peripatetic school \u2014 from the Greek meaning walking about. Modern research confirms: walking genuinely improves creative thinking.", category: 'Philosophy', icon: '\u{1F6B6}' } },
];

const stories: FeedItem[] = [
  { type: 'story', data: { headline: 'The Boy Who Read Greek at Three', body: "James Mill decided his son would receive the greatest education in history. By age 3, John Stuart Mill was reading Aesop's Fables in the original Greek. By 14, he had completed a university-level education. He later said his father's method proved that ordinary children could achieve extraordinary things.", genius: 'John Stuart Mill' } },
  { type: 'story', data: { headline: 'Einstein Failed No Exams', body: "The myth that Einstein failed maths is entirely false. He scored top marks throughout school. What he struggled with was the rigid, authoritarian style of German education. His theory of relativity came from years of daydreaming about what it would be like to ride a beam of light.", genius: 'Albert Einstein' } },
  { type: 'story', data: { headline: 'The War of the Currents', body: "Edison launched a propaganda campaign against Tesla's AC power, publicly electrocuting animals to prove AC was dangerous. Tesla responded by running AC current through his own body at the 1893 World's Fair. AC won. Every power grid on Earth uses Tesla's system.", genius: 'Nikola Tesla' } },
  { type: 'story', data: { headline: "Marie Curie's Mobile X-Rays", body: "When WWI broke out, Curie converted her car into a mobile X-ray unit, drove it to the front lines, and trained women to operate the equipment. She personally drove through battlefields to help surgeons locate bullets and shrapnel. She was 47.", genius: 'Marie Curie' } },
  { type: 'story', data: { headline: 'Da Vinci Bought Caged Birds', body: "Leonardo regularly visited markets in Florence, bought caged birds, and immediately set them free. He was a vegetarian in an era when that was almost unheard of. He believed the time would come when people would look upon the killing of animals as they looked upon the killing of men.", genius: 'Leonardo da Vinci' } },
  { type: 'story', data: { headline: 'Goethe Spent 60 Years on One Play', body: "Goethe began Faust at age 21 and did not finish Part Two until he was 82, months before his death. The play spans heaven and hell, love and war, classical Greece and medieval Germany.", genius: 'Johann Wolfgang von Goethe' } },
];

const connections: FeedItem[] = [
  { type: 'connection', data: { term: 'Philosophy', origin: '\u03C6\u03B9\u03BB\u03BF\u03C3\u03BF\u03C6\u03AF\u03B1 (philosophia)', meaning: 'Love of wisdom', modern: "From philos (love) + sophia (wisdom). Every time you say philosophy you are speaking Ancient Greek." } },
  { type: 'connection', data: { term: 'Calculus', origin: 'Latin: calculus', meaning: 'Small pebble', modern: "Romans counted with pebbles. Newton and Leibniz named the mathematics of change after them." } },
  { type: 'connection', data: { term: 'Atom', origin: '\u1F04\u03C4\u03BF\u03BC\u03BF\u03C2 (atomos)', meaning: 'Uncuttable', modern: "The Greeks imagined the smallest possible particle. We kept the name \u2014 even after we split it." } },
  { type: 'connection', data: { term: 'Democracy', origin: '\u03B4\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4\u03AF\u03B1', meaning: 'Power of the people', modern: "From demos (people) + kratos (power). The Athenians invented both the word and the system." } },
  { type: 'connection', data: { term: 'Electricity', origin: '\u1F24\u03BB\u03B5\u03BA\u03C4\u03C1\u03BF\u03BD (elektron)', meaning: 'Amber', modern: "The Greeks noticed that rubbed amber attracted feathers. 2,400 years later, Tesla harnessed the same force to light cities." } },
  { type: 'connection', data: { term: 'Gravity', origin: 'Latin: gravitas', meaning: 'Weight, seriousness', modern: "The same root gives us grave, gravity, and gravitas. Newton formalised the concept; the Romans named it." } },
];

const whyStudyItems: FeedItem[] = pathModules.slice(0, 8).map(m => ({
  type: 'whyStudy' as const,
  data: { subject: m.name, text: m.whyStudy || m.introText || '', icon: m.icon },
}));

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

const QuizCard = ({ item, onNext, onCorrect }: { item: FeedItem & { type: 'quiz' }; onNext: () => void; onCorrect: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const q = item.data;
  const isCorrect = selected === q.correctAnswer;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctAnswer) onCorrect();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Quick Quiz</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg font-bold text-foreground text-center mb-6 leading-relaxed max-w-md">
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const lastTapRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const feedItems: FeedItem[] = useMemo(() => {
    const contentItems: FeedItem[] = [
      ...shuffleArray(insights).slice(0, 8),
      ...shuffleArray(stories).slice(0, 4),
      ...shuffleArray(quotes).slice(0, 5),
      ...shuffleArray(connections).slice(0, 4),
      ...shuffleArray(whyStudyItems).slice(0, 3),
    ];
    const quizItems: FeedItem[] = shuffleArray(
      lessonQuizzes.flatMap(lq => lq.questions.map(q => ({ type: 'quiz' as const, data: q })))
    ).slice(0, 8);

    const result: FeedItem[] = [];
    const content = shuffleArray(contentItems);
    let ci = 0, qi = 0;
    while (ci < content.length || qi < quizItems.length) {
      const batch = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < batch && ci < content.length; j++) result.push(content[ci++]);
      if (qi < quizItems.length) result.push(quizItems[qi++]);
    }
    return result;
  }, []);

  const currentItem = feedItems[currentIndex];
  const isQuiz = currentItem?.type === 'quiz';
  const isDark = currentItem ? darkTypes.has(currentItem.type) : false;

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
  }, [feedItems.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // Swipe handling
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -60) goNext();
    else if (info.offset.y > 60) goPrev();
  };

  // Double tap to heart
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    lastTapRef.current = now;
  };

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

  // Save/bookmark
  const toggleSave = () => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });
  };

  // Confetti on correct quiz answer
  const handleCorrectAnswer = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1300);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { if (isAmbientPlaying()) stopAmbient(); };
  }, []);

  if (!currentItem) return null;

  const gradient = cardGradients[currentItem.type] || cardGradients.insight;

  return (
    <div className="fixed inset-0 z-40">
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
          onTap={handleTap}
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
                    <AutoAdvanceBar duration={AUTO_ADVANCE_MS} paused={false} onComplete={goNext} />
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
              <div className="flex items-center gap-3">
                <button onClick={toggleAudio} className={cn("p-1.5 rounded-full transition-colors", isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                  {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button onClick={toggleSave} className={cn("p-1.5 rounded-full transition-colors", saved.has(currentIndex) ? "text-secondary" : isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                  <Bookmark className={cn("w-4 h-4", saved.has(currentIndex) && "fill-secondary")} />
                </button>
                <button onClick={() => { if (isAmbientPlaying()) stopAmbient(); navigate(-1); }} className={cn("p-1.5 rounded-full transition-colors", isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
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
            {currentItem.type === 'quiz' && <QuizCard item={currentItem as any} onNext={goNext} onCorrect={handleCorrectAnswer} />}
          </div>

          {/* Bottom safe area */}
          <div className="flex-shrink-0 pb-[env(safe-area-inset-bottom)] px-4 pb-4">
            {!isQuiz && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1 }}
                className={cn("text-[10px] text-center", isDark ? "text-white/40" : "text-muted-foreground/60")}
              >
                Swipe up for next &bull; Double tap to love
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;
