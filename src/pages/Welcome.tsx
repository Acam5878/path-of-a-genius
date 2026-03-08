import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Zap, Target, TrendingUp, Sparkles, ArrowRight,
  BookOpen, Swords, ScrollText, Check, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { REGIONS } from '@/components/home/brain/brainRegions';
import { createBrainRenderer } from '@/components/home/brain/brainRenderer';

const WELCOME_COMPLETE_KEY = 'genius-academy-welcome-complete';

const REGION_STRENGTHS: Record<string, string> = {
  prefrontal: 'Critical thinking & decision-making',
  broca: 'Articulate communication',
  wernicke: 'Deep language comprehension',
  leftParietal: 'Mathematical reasoning',
  rightParietal: 'Spatial & physics intuition',
  leftTemporal: 'Verbal memory & recall',
  rightTemporal: 'Creative & narrative thinking',
  occipital: 'Visual pattern recognition',
  anteriorCing: 'Moral reasoning & empathy',
  rightFrontal: 'Abstract philosophical thinking',
  somatosensory: 'Body awareness & physical intuition',
  cerebellum: 'Procedural skill & precision',
};

const ALL_REGION_KEYS = Object.keys(REGIONS);

type Step = 'results' | 'pillars' | 'plan';

const pillars = [
  {
    emoji: '🧠',
    title: 'IQ Tests',
    subtitle: 'Measure your mind',
    desc: 'Take real cognitive assessments across 6 intelligence types. See where you rank and track growth.',
    color: 'hsl(var(--secondary))',
    stat: 'Average +12 IQ points in 90 days',
    icon: Brain,
  },
  {
    emoji: '🏛️',
    title: 'The Path',
    subtitle: 'Structured curriculum',
    desc: 'Latin, Logic, Mathematics, Sciences, Humanities, Great Books — the same foundations that built genius minds.',
    color: '#11CCFF',
    stat: '10 min/day → measurable results in 2 weeks',
    icon: BookOpen,
  },
  {
    emoji: '📜',
    title: 'The Feed',
    subtitle: 'Scroll & learn',
    desc: 'Replace mindless scrolling with 2-minute lessons from history\'s greatest thinkers.',
    color: '#FFD700',
    stat: '35+ new mental models in your first week',
    icon: ScrollText,
  },
  {
    emoji: '⚔️',
    title: 'The Arena',
    subtitle: 'Challenge mode',
    desc: '60-second blitz rounds against AI opponents — from a Graduate to Einstein.',
    color: '#FF9933',
    stat: 'Sharpen processing speed by 22%',
    icon: Swords,
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [step, setStep] = useState<Step>('results');
  const brainMountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const regions: string[] = JSON.parse(localStorage.getItem('genius-academy-diagnostic-regions') || '[]');
  const regionsActivated = regions.length;
  const totalRegions = ALL_REGION_KEYS.length;
  const estimatedIQ = 90 + regionsActivated * 3;
  const projectedIQ = estimatedIQ + 15;
  const strengths = regions.slice(0, 4).map(r => REGION_STRENGTHS[r]).filter(Boolean);
  const inactiveRegions = ALL_REGION_KEYS.filter(r => !regions.includes(r));
  const weaknesses = inactiveRegions.slice(0, 3).map(r => REGION_STRENGTHS[r]).filter(Boolean);

  // Redirect if not authenticated or already completed welcome
  useEffect(() => {
    if (isLoading) return;
    if (!user) { navigate('/auth', { replace: true }); return; }
    if (localStorage.getItem(WELCOME_COMPLETE_KEY)) { navigate('/', { replace: true }); }
  }, [user, isLoading, navigate]);

  // Init brain renderer for results step
  useEffect(() => {
    if (step !== 'results') return;
    const mount = brainMountRef.current;
    if (!mount) return;
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount, { cameraZ: 5.0 });
      rendererRef.current.updateOptions({
        activeRegions: new Set(regions),
        isLocked: false,
      });
      regions.forEach((r, i) => {
        setTimeout(() => rendererRef.current?.triggerRegionFire(r, 1.0), i * 200);
      });
    }, 400);
    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [step]);

  const completeWelcome = () => {
    localStorage.setItem(WELCOME_COMPLETE_KEY, 'true');
    navigate('/', { replace: true });
  };

  if (!user || isLoading) return null;

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">
      <div className="max-w-md mx-auto px-6 pt-10 pb-16">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['results', 'pillars', 'plan'] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-secondary' : i < ['results', 'pillars', 'plan'].indexOf(step) ? 'w-4 bg-secondary/50' : 'w-4 bg-white/15'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: Results Unlock ═══ */}
          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/15 flex items-center justify-center border border-secondary/25"
                >
                  <Check className="w-7 h-7 text-secondary" />
                </motion.div>
                <h1 className="font-heading text-2xl font-bold mb-1">Your Brain Map — Unlocked</h1>
                <p className="text-white/40 text-sm">Here's your full cognitive profile</p>
              </div>

              {/* IQ Projection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-5"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-secondary/60" />
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">2-Week Projection</p>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-white/40 text-[10px] mb-1">Current</p>
                    <p className="font-mono font-bold text-3xl text-white/60">{estimatedIQ}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-secondary/50" />
                  <div className="text-center">
                    <p className="text-secondary/60 text-[10px] mb-1">Projected</p>
                    <p className="font-mono font-bold text-3xl text-secondary">{projectedIQ}</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/25 text-center mt-3">Based on 10 min/day of personalised training</p>
              </motion.div>

              {/* 3D Brain — fully unlocked */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 mb-5"
              >
                <div
                  ref={brainMountRef}
                  className="w-full cursor-grab active:cursor-grabbing"
                  style={{ height: 220 }}
                />
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {regions.map((r) => {
                    const region = REGIONS[r];
                    if (!region) return null;
                    return (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-white/[0.06] border border-white/[0.1]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.glowColor }} />
                        <span className="text-white/70">{region.label}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Strengths & Weaknesses */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Zap className="w-3.5 h-3.5 text-secondary" />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-secondary/70">Strengths</p>
                  </div>
                  <div className="space-y-2">
                    {strengths.map((s, i) => (
                      <p key={i} className="text-[11px] text-white/60 leading-tight">• {s}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Target className="w-3.5 h-3.5 text-white/40" />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">To Improve</p>
                  </div>
                  <div className="space-y-2">
                    {weaknesses.map((w, i) => (
                      <p key={i} className="text-[11px] text-white/40 leading-tight">• {w}</p>
                    ))}
                  </div>
                </div>
              </motion.div>

              <Button
                onClick={() => setStep('pillars')}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 rounded-2xl font-semibold text-base"
              >
                See your training plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* ═══ STEP 2: Platform Pillars ═══ */}
          {step === 'pillars' && (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h1 className="font-heading text-2xl font-bold mb-1">Four Ways to Train</h1>
                <p className="text-white/40 text-sm">10 minutes a day. Real, measurable results.</p>
              </div>

              <div className="space-y-3 mb-8">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{p.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm text-white">{p.title}</p>
                          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-white/10 text-white/40">
                            {p.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed mb-2">{p.desc}</p>
                        <p className="text-[11px] font-medium" style={{ color: p.color }}>
                          ↑ {p.stat}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setStep('plan')}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 rounded-2xl font-semibold text-base"
                >
                  See your personalised plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button onClick={() => setStep('results')} className="w-full text-xs text-white/30 hover:text-white/50 py-2">
                  ← Back to results
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: Your Plan ═══ */}
          {step === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/15 flex items-center justify-center border border-secondary/25"
                >
                  <Sparkles className="w-7 h-7 text-secondary" />
                </motion.div>
                <h1 className="font-heading text-2xl font-bold mb-1">Your First Week</h1>
                <p className="text-white/40 text-sm">Here's exactly what to do next</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  {
                    step: 'Now',
                    title: 'Take your full IQ test',
                    desc: 'Get your real cognitive score across 6 intelligence types. Takes ~10 minutes.',
                    highlight: true,
                    route: '/iq-tests?start=verbal',
                  },
                  {
                    step: 'Today',
                    title: 'Start The Path — Module 1',
                    desc: 'Begin with the foundations: language, logic, and first principles thinking.',
                    highlight: false,
                    route: '/the-path',
                  },
                  {
                    step: 'Daily',
                    title: 'Scroll your personalised Feed',
                    desc: '2-minute insights from history\'s greatest minds. Replaces mindless scrolling.',
                    highlight: false,
                    route: '/feed',
                  },
                  {
                    step: 'This week',
                    title: 'Challenge an AI opponent',
                    desc: '60-second blitz to test your speed. Start with a Graduate and work up to Einstein.',
                    highlight: false,
                    route: '/challenge',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className={`rounded-2xl p-4 border ${
                      item.highlight
                        ? 'bg-secondary/10 border-secondary/25'
                        : 'bg-white/[0.04] border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-lg mt-0.5 ${
                        item.highlight ? 'bg-secondary/20 text-secondary' : 'bg-white/10 text-white/40'
                      }`}>
                        {item.step}
                      </span>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${item.highlight ? 'text-secondary' : 'text-white'}`}>{item.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => {
                    completeWelcome();
                    navigate('/iq-tests?start=verbal', { replace: true });
                  }}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 rounded-2xl font-semibold text-base"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Take my IQ test now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button
                  onClick={completeWelcome}
                  className="w-full text-xs text-white/30 hover:text-white/50 py-2"
                >
                  I'll explore on my own
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Welcome;
