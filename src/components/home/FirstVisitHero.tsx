import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, Sparkles, XCircle, Brain, BookOpen, Zap, ArrowRight, ChevronDown, Shield, Loader2 } from 'lucide-react';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { trackHeroCompleted } from '@/lib/posthog';
import { AtomVisual } from './hero-visuals/AtomVisual';
import { CinematicVisual } from './hero-visuals/CinematicVisual';
import { ConstellationVisual } from './hero-visuals/ConstellationVisual';
import { NeuralPathwayVisual } from './hero-visuals/NeuralPathwayVisual';
import { GlowingBrainVisual } from './hero-visuals/GlowingBrainVisual';
import { createBrainRenderer, REGIONS } from './brain/brainRenderer';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';

// ── XP reward pop ──────────────────────────────────────────────────────
const XPRewardPop = ({ xp, show }: { xp: number; show: boolean }) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -60, scale: [0.5, 1.2, 1, 0.8] }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <div className="flex items-center gap-1.5 bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg shadow-secondary/30">
        <Zap className="w-5 h-5 fill-current" />
        +{xp} XP
      </div>
    </motion.div>
  );
};

// ── Inline sign-in for result screen ─────────────────────────────────
const ResultSignInButtons = () => {
  const [loading, setLoading] = useState<'apple' | 'google' | null>(null);

  const handleSignIn = async (provider: 'apple' | 'google') => {
    setLoading(provider);
    try {
      if (Capacitor.isNativePlatform()) {
        const { error } = await nativeOAuthSignIn(provider);
        if (error) toast.error(error);
      } else {
        const { error } = await lovable.auth.signInWithOAuth(provider, {
          redirect_uri: window.location.origin,
        });
        if (error) toast.error(error.message);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full space-y-2.5">
      <button
        onClick={() => handleSignIn('apple')}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
      >
        {loading === 'apple' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
        )}
        Continue with Apple
      </button>
      <button
        onClick={() => handleSignIn('google')}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-card border border-border font-semibold text-sm text-foreground transition-all hover:bg-muted disabled:opacity-50"
      >
        {loading === 'google' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        )}
        Continue with Google
      </button>
    </div>
  );
};

// ── Mini confetti burst ─────────────────────────────────────────────────
const CelebrationConfetti = () => {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 280,
      y: -(Math.random() * 200 + 60),
      rotate: Math.random() * 720 - 360,
      scale: Math.random() * 0.6 + 0.4,
      color: ['hsl(43,62%,52%)', 'hsl(142,71%,45%)', 'hsl(217,91%,60%)', 'hsl(0,84%,60%)', 'hsl(280,65%,60%)'][i % 5],
      delay: Math.random() * 0.3,
      size: Math.random() * 6 + 4,
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: '50%',
            top: '45%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            scale: [0, p.scale, p.scale * 0.5],
            rotate: p.rotate,
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

const HERO_SEEN_KEY = 'genius-academy-hero-seen';

export const hasSeenHero = () => {
  return localStorage.getItem(HERO_SEEN_KEY) === 'true';
};

// ── Three compelling questions across genius domains ──────────────────
const heroQuestions = [
  {
    question: 'What did Einstein say was more important than knowledge?',
    options: ['Hard work', 'Imagination', 'Mathematics', 'Experience'],
    correctIndex: 1,
    insight: "Einstein said: \"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.\"",
    genius: 'Einstein',
    emoji: '🧠',
  },
  {
    question: 'What secret technique did Da Vinci use to paint the Mona Lisa\'s smile?',
    options: ['Multiple layers of oil', 'Sfumato — smoky blending', 'A mirror reflection trick', 'Painting with his left hand'],
    correctIndex: 1,
    insight: "Da Vinci invented \"sfumato\" — applying dozens of ultra-thin transparent layers so edges dissolve like smoke. No visible brushstrokes. It took him 16 years.",
    genius: 'Da Vinci',
    emoji: '🎨',
  },
  {
    question: 'Newton discovered gravity. But what else did he invent that you use every day?',
    options: ['The telescope', 'Calculus', 'The thermometer', 'The compass'],
    correctIndex: 1,
    insight: "Newton invented calculus at 23 — the mathematics behind every GPS route, search algorithm, and smartphone animation you use daily. He did it during a plague lockdown.",
    genius: 'Newton',
    emoji: '🍎',
  },
];

interface FirstVisitHeroProps {
  onComplete: () => void;
}

export const FirstVisitHero = ({ onComplete }: FirstVisitHeroProps) => {
  const [phase, setPhase] = useState<'brain' | 'quiz' | 'results'>('brain');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const { formatted: learnerCount } = useLearnerCount(1200);
  const brainMountRef = useRef<HTMLDivElement>(null);
  const brainRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [brainRegionsLit, setBrainRegionsLit] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const question = heroQuestions[currentQ];
  const isLast = currentQ === heroQuestions.length - 1;

  // Initialize the full-screen brain
  useEffect(() => {
    if (phase !== 'brain' || !brainMountRef.current) return;
    const renderer = createBrainRenderer(brainMountRef.current);
    brainRendererRef.current = renderer;
    renderer.updateOptions({ activeRegions: new Set(), isLocked: false });

    // Progressively light up regions for dramatic effect
    const regionKeys = Object.keys(REGIONS);
    let litCount = 0;
    const interval = setInterval(() => {
      if (litCount < 5) {
        const region = regionKeys[litCount];
        renderer.triggerRegionFire(region, 0.7);
        renderer.updateOptions({
          activeRegions: new Set(regionKeys.slice(0, litCount + 1)),
          isLocked: false,
        });
        litCount++;
        setBrainRegionsLit(litCount);
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => {
      clearInterval(interval);
      renderer.dispose();
    };
  }, [phase]);

  // Handle scroll transition from brain to quiz
  useEffect(() => {
    if (phase !== 'brain') return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      const threshold = window.innerHeight * 0.5;
      if (scrollY > threshold) {
        setPhase('quiz');
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [phase]);

  // Ref for quiz container to scroll to top on transition
  const quizContainerRef = useRef<HTMLDivElement>(null);

  const [showXP, setShowXP] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    const correct = index === question.correctIndex;
    setCorrectAnswers(prev => [...prev, correct]);
    if (correct) {
      setScore(prev => prev + 1);
      setShowCelebration(true);
      // XP reward
      const xpEarned = 10 + (currentQ * 5); // 10, 15, 20
      setTotalXP(prev => prev + xpEarned);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1200);
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
    } else {
      // Lighter haptic for wrong
      if (navigator.vibrate) navigator.vibrate(20);
    }

    // Auto-advance after reading the insight
    setTimeout(() => {
      if (isLast) {
        handleShowResults();
      } else {
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setShowCelebration(false);
        quizContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 3000);
  };

  // (phase state replaces showResults)

  // Derive strengths/gaps from answers
  const getProfile = () => {
    const strengths: string[] = [];
    const gaps: string[] = [];
    // Map question index to domain
    const domains = ['Abstract Thinking', 'Visual-Spatial Intelligence', 'Pattern Recognition'];
    heroQuestions.forEach((_, i) => {
      // Check if the user got this one right by comparing score progression
      // Since we track total score, we approximate per-question correctness
    });
    if (score >= 2) { strengths.push('Strong intuition'); strengths.push('Quick pattern recognition'); }
    else if (score === 1) { strengths.push('Creative thinking'); gaps.push('Classical reasoning frameworks'); }
    else { strengths.push('Curiosity & openness'); gaps.push('Structured analytical thinking'); gaps.push('Classical knowledge foundations'); }
    return { strengths, gaps };
  };

  const handleStart = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    localStorage.setItem('genius-academy-hero-score', JSON.stringify({ score, total: heroQuestions.length }));
    trackHeroCompleted();
    onComplete();
  };

  // Show results screen after last question
  const handleShowResults = () => {
    localStorage.setItem(HERO_SEEN_KEY, 'true');
    localStorage.setItem('genius-academy-hero-score', JSON.stringify({ score, total: heroQuestions.length }));
    trackHeroCompleted();
    setPhase('results');
  };

  if (phase === 'results') {
    const { strengths, gaps } = getProfile();
    const pct = score / heroQuestions.length;
    const percentile = pct >= 0.67 ? 73 : pct >= 0.33 ? 48 : 27;
    const geniusMatch = pct >= 0.67 ? 'Einstein' : pct >= 0.33 ? 'Da Vinci' : 'Newton';
    const estimatedLabel = pct >= 0.67 ? 'Above Average' : pct >= 0.33 ? 'Average' : 'Developing';
    
    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <NeuralPathwayVisual score={score} total={heroQuestions.length} />

        <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center flex-1 py-10 min-h-screen">
          <CelebrationConfetti />

          <GlowingBrainVisual correctQuestions={correctAnswers} title="Your Brain" />

          {/* Identity framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="mb-1"
          >
            <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.3em]">You think like</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl font-bold text-foreground mb-1"
          >
            {geniusMatch}
          </motion.h2>

          {/* Score + Percentile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-2"
          >
            <span className="text-secondary font-bold text-lg">{score}/{heroQuestions.length}</span>
            <span className="text-muted-foreground text-sm">· {estimatedLabel}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 mb-5"
          >
            <Zap className="w-3 h-3 text-secondary" />
            <span className="text-[11px] text-secondary font-semibold">Top {100 - percentile}% of test-takers</span>
            {totalXP > 0 && (
              <span className="text-[10px] text-secondary/70 ml-1">· {totalXP} XP earned</span>
            )}
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-secondary/8 border border-secondary/20 rounded-xl p-4 mb-3 text-left"
          >
            <p className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-2">✓ Your strengths</p>
            <div className="space-y-1">
              {strengths.map((s, i) => (
                <p key={i} className="text-sm text-foreground">{s}</p>
              ))}
            </div>
          </motion.div>

          {/* Gaps with curiosity teaser */}
          {gaps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-muted/50 border border-border rounded-xl p-4 mb-3 text-left"
            >
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">↑ Areas to develop</p>
              <div className="space-y-1">
                {gaps.map((g, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{g}</p>
                ))}
              </div>
              <p className="text-[11px] text-secondary mt-2 italic">
                Da Vinci trained verbal reasoning by studying Ancient Greek at age 14 →
              </p>
            </motion.div>
          )}

          {/* Loss aversion signup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="w-full bg-card border border-secondary/20 rounded-2xl p-5 mb-4"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-secondary" />
              <p className="text-sm font-bold text-foreground">Save Your Genius Profile</p>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">
              Your results will be lost if you leave. Create a free account to keep your profile, XP, and personalized path.
            </p>
            <ResultSignInButtons />
            <p className="text-[10px] text-muted-foreground/60 text-center mt-2">Free forever · No credit card</p>
          </motion.div>

          {/* Skip option */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            onClick={handleStart}
            className="text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2 mb-4"
          >
            Skip — explore without an account →
          </motion.button>
        </div>
      </div>
    );
  }

  // ── BRAIN INTRO PHASE ──
  if (phase === 'brain') {
    return (
      <div
        ref={scrollContainerRef}
        className="fixed inset-0 z-[60] overflow-y-auto bg-background"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Full-screen brain */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] font-mono text-secondary uppercase tracking-[0.3em] mb-4"
            >
              Your brain is extraordinary
            </motion.p>

            {/* Interactive 3D Brain */}
            <div
              ref={brainMountRef}
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-full cursor-grab active:cursor-grabbing"
            />

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground text-center mt-6 mb-3"
            >
              What is your brain<br />capable of?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-muted-foreground text-center max-w-xs mb-2"
            >
              {brainRegionsLit > 0 && (
                <span className="text-secondary font-semibold">{brainRegionsLit} regions illuminated</span>
              )}
              {brainRegionsLit > 0 && ' · '}
              Let's find out which areas light up for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 mt-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] text-secondary font-medium">{learnerCount} learners active</span>
            </motion.div>
          </motion.div>

          {/* Scroll indicator — also tappable */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            onClick={() => setPhase('quiz')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Tap to begin</span>
            <ChevronDown className="w-5 h-5 text-secondary animate-bounce" />
          </motion.button>
        </div>

        {/* Spacer to enable scrolling */}
        <div className="h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center px-6"
          >
            <p className="text-muted-foreground text-sm">3 questions. 60 seconds. Discover your genius profile.</p>
            <button
              onClick={() => setPhase('quiz')}
              className="mt-4 inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors"
            >
              Start the Quiz <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── QUIZ PHASE ──
  return (
    <div
      ref={quizContainerRef}
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Subtle ambient gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center flex-1 justify-center py-10 min-h-screen">

        {/* Progress dots + score */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-1.5 text-secondary text-[10px] font-mono uppercase tracking-widest">
            <Star className="w-3 h-3 fill-secondary" />
            <span>Path of a Genius</span>
            <Star className="w-3 h-3 fill-secondary" />
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] text-secondary font-medium">{learnerCount} learners active this week</span>
          </div>
          
          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-2">
            {heroQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentQ ? 'w-6 bg-secondary' :
                  i === currentQ ? 'w-8 bg-secondary' :
                  'w-4 bg-muted-foreground/20'
                }`}
              />
            ))}
            {score > 0 && (
              <span className="text-[10px] text-secondary font-bold ml-2">{score}/{heroQuestions.length}</span>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            {/* Dynamic visual per question */}
            {currentQ === 0 && (
              <AtomVisual answered={answered} correct={selectedAnswer === question.correctIndex} />
            )}
            {currentQ === 1 && (
              <CinematicVisual answered={answered} correct={selectedAnswer === question.correctIndex} />
            )}
            {currentQ === 2 && (
              <ConstellationVisual answered={answered} correct={selectedAnswer === question.correctIndex} questionsCompleted={currentQ} />
            )}

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="font-heading text-xl font-bold text-foreground mb-6 text-left w-full leading-snug"
            >
              {question.question}
            </motion.h2>

            <div className="w-full space-y-3 mb-6">
              {question.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === question.correctIndex;
                const showResult = answered;

                let stateClass = 'border-border bg-card/50 hover:bg-card hover:border-secondary/30 active:scale-[0.98]';
                if (showResult) {
                  if (isCorrect) stateClass = 'border-emerald-600/50 bg-emerald-500/10';
                  else if (isSelected && !isCorrect) stateClass = 'border-destructive/50 bg-destructive/10 opacity-60';
                  else stateClass = 'border-border/40 opacity-40';
                }

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${stateClass}`}
                  >
                    {showResult && isCorrect
                      ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      : showResult && isSelected && !isCorrect
                      ? <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      : (
                        <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground flex-shrink-0 font-mono">
                          {String.fromCharCode(65 + i)}
                        </span>
                      )
                    }
                    <span className="text-sm text-foreground">{option}</span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  {showCelebration && <CelebrationConfetti />}
                  <XPRewardPop xp={10 + currentQ * 5} show={showXP} />
                  
                  {showCelebration && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="flex items-center justify-center gap-2 mb-4"
                    >
                      <Sparkles className="w-5 h-5 text-secondary" />
                      <span className="font-heading text-lg font-bold text-secondary">
                        {selectedAnswer === question.correctIndex ? 'Brilliant!' : ''}
                      </span>
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </motion.div>
                  )}

                  <div className="bg-secondary/8 border border-secondary/25 rounded-xl p-4 mb-5 text-left">
                    <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">
                      {selectedAnswer === question.correctIndex ? '✓ Exactly right —' : 'The answer —'}
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">{question.insight}</p>
                  </div>
                  
                  {!isLast ? (
                    <p className="text-xs text-muted-foreground text-center">
                      Next question in a moment…
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">
                      Building your genius profile…
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!answered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={handleStart}
                className="mt-4 text-muted-foreground text-xs hover:text-foreground/60 transition-colors py-2"
              >
                Skip — take me straight in
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
