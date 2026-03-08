import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, Loader2, Brain, Zap, Target, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';
import { REGIONS } from '@/components/home/brain/brainRegions';
import { createBrainRenderer } from '@/components/home/brain/brainRenderer';

/* ── Strength / Weakness mapping ───────────────────────── */
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

const DiagnosticResults = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<'apple' | 'google' | null>(null);
  const brainMountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const regions: string[] = JSON.parse(localStorage.getItem('genius-academy-diagnostic-regions') || '[]');
  const regionsActivated = regions.length;
  const totalRegions = ALL_REGION_KEYS.length;
  const activationPct = Math.round((regionsActivated / totalRegions) * 100);
  const estimatedIQ = 90 + regionsActivated * 3;
  const projectedIQ = estimatedIQ + 15;

  const strengths = regions.slice(0, 4).map(r => REGION_STRENGTHS[r]).filter(Boolean);
  const inactiveRegions = ALL_REGION_KEYS.filter(r => !regions.includes(r));
  const weaknesses = inactiveRegions.slice(0, 3).map(r => REGION_STRENGTHS[r]).filter(Boolean);

  // Redirect if no diagnostic data
  useEffect(() => {
    if (regionsActivated === 0) {
      navigate('/feed');
    }
  }, [regionsActivated, navigate]);

  // Init blurred brain
  useEffect(() => {
    const mount = brainMountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount, { cameraZ: 5.0 });
      rendererRef.current.updateOptions({
        activeRegions: new Set(regions),
        isLocked: false,
      });
      // Staggered pulse
      regions.forEach((r, i) => {
        setTimeout(() => {
          rendererRef.current?.triggerRegionFire(r, 1.0);
        }, i * 200);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

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
    } catch (e: any) {
      toast.error(e.message || 'Sign-in failed');
    } finally {
      setLoading(null);
    }
  };

  if (regionsActivated === 0) return null;

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">
      <div className="max-w-md mx-auto px-6 pt-12 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/60 mb-2">Analysis Complete</p>
          <h1 className="font-heading text-2xl font-bold text-white">Your Brain Map</h1>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: 'Regions Activated', value: `${regionsActivated}/${totalRegions}`, color: 'text-secondary' },
            { label: 'Activation', value: `${activationPct}%`, color: 'text-secondary' },
            { label: 'Estimated IQ', value: `${estimatedIQ}+`, color: 'text-secondary' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 text-center"
            >
              <p className={`font-mono font-bold text-lg ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] text-white/35 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* IQ Projection — above brain */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-6"
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

        {/* 3D Brain — blurred with lock overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="relative mb-6"
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 overflow-hidden">
            <div className="relative">
              <div
                ref={brainMountRef}
                className="w-full cursor-grab active:cursor-grabbing"
                style={{ height: 200 }}
              />
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-[6px] bg-black/30 rounded-xl flex flex-col items-center justify-center">
                <Lock className="w-6 h-6 text-white/30 mb-2" />
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/35">Full Brain Map Locked</p>
                <p className="text-[10px] text-white/25 mt-1">Sign up to explore every region</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active regions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center gap-1.5">
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
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {/* Strengths */}
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

          {/* Weaknesses */}
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

        {/* What you'll unlock */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 text-center mb-4">What You'll Unlock</p>
          <div className="space-y-2.5">
            {[
              { icon: Brain, text: 'Full interactive brain map with all 12 regions' },
              { icon: Sparkles, text: 'Personalised curriculum based on your profile' },
              { icon: Shield, text: 'Detailed cognitive strengths & weaknesses report' },
              { icon: TrendingUp, text: 'Weekly IQ tracking with progress insights' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                <item.icon className="w-4 h-4 text-secondary/50 flex-shrink-0" />
                <p className="text-[12px] text-white/50">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sign-up CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-2.5"
        >
          <button
            onClick={() => handleSignIn('apple')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white text-gray-800 font-semibold text-[15px] active:scale-[0.97] transition-transform disabled:opacity-60"
          >
            {loading === 'apple' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C2.79 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            )}
            Unlock full brain analysis
          </button>

          <button
            onClick={() => handleSignIn('google')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-[15px] active:scale-[0.97] transition-transform disabled:opacity-60"
          >
            {loading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          <button
            onClick={() => navigate('/auth')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white/50 font-medium text-sm active:scale-[0.97] transition-all hover:bg-white/[0.1]"
          >
            <Mail className="w-4 h-4" />
            Sign in with email
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-[10px] text-white/20 text-center mt-4"
        >
          No credit card required · Free to start
        </motion.p>
      </div>
    </div>
  );
};

export default DiagnosticResults;
