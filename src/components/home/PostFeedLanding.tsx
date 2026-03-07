import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Brain, BookOpen, Zap, BarChart3, Loader2, Lock, CheckCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { REGIONS } from '@/components/home/brain/brainRegions';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';
import { GlowingBrainVisual } from '@/components/home/hero-visuals/GlowingBrainVisual';

/* ── Diagnostic stats helpers ──────────────────────────── */
const REGION_LABELS: Record<string, string> = {
  rightParietal: 'Spatial Reasoning',
  wernicke: 'Language Comprehension',
  prefrontal: 'Critical Thinking',
  leftParietal: 'Pattern Recognition',
  broca: 'Verbal Processing',
  leftTemporal: 'Memory Recall',
  rightTemporal: 'Creative Thinking',
  anteriorCing: 'Moral Reasoning',
  cerebellum: 'Scientific Thinking',
};

const getDiagnosticResults = () => {
  try {
    const stored = localStorage.getItem('genius-academy-diagnostic-regions');
    return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  } catch {
    return new Set<string>();
  }
};

/* ── Stat pill ─────────────────────────────────────────── */
const StatPill = ({ label, value, color }: { label: string; value: string; color: 'green' | 'amber' | 'muted' }) => {
  const colorMap = {
    green: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    amber: 'text-secondary border-secondary/20 bg-secondary/5',
    muted: 'text-white/60 border-white/10 bg-white/[0.03]',
  };
  return (
    <div className={`rounded-xl border px-3 py-2.5 text-center ${colorMap[color]}`}>
      <p className="text-lg font-bold font-mono">{value}</p>
      <p className="text-[10px] opacity-70 mt-0.5">{label}</p>
    </div>
  );
};

/* ── Main component ────────────────────────────────────── */
export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();
  const [loading, setLoading] = useState<'apple' | 'google' | null>(null);

  const diagnosticRegions = getDiagnosticResults();
  const nowCount = diagnosticRegions.size;
  const totalRegions = Object.keys(REGIONS).length;
  const percentage = Math.round((nowCount / totalRegions) * 100);
  const estimatedIQ = 90 + nowCount * 3;

  // Determine strengths/weaknesses from regions
  const activeList = Array.from(diagnosticRegions);
  const allRegionKeys = Object.keys(REGION_LABELS);
  const inactiveList = allRegionKeys.filter(r => !diagnosticRegions.has(r));

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

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto relative">

      {/* ── Visible results (quiz stats) ──────────────── */}
      <section className="relative px-6 pt-14 pb-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/6 blur-[120px] pointer-events-none" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-mono uppercase tracking-widest text-secondary/60 mb-2 text-center"
        >
          Brain Analysis Complete
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-heading text-2xl md:text-3xl font-bold leading-tight text-center mb-6"
        >
          You activated{' '}
          <span className="text-secondary">{nowCount}/{totalRegions}</span>{' '}
          brain regions
        </motion.h1>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto mb-6"
        >
          <StatPill label="Regions Active" value={`${nowCount}/${totalRegions}`} color={nowCount >= 6 ? 'green' : 'amber'} />
          <StatPill label="Activation" value={`${percentage}%`} color={percentage >= 60 ? 'green' : 'amber'} />
          <StatPill label="Est. IQ Range" value={`${estimatedIQ}+`} color="muted" />
        </motion.div>

        {/* Strengths detected */}
        {activeList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-sm mx-auto mb-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Strengths detected</p>
            <div className="flex flex-wrap gap-1.5">
              {activeList.slice(0, 5).map(r => (
                <span key={r} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-[10px] text-secondary/90">
                  <CheckCircle className="w-2.5 h-2.5" />
                  {REGION_LABELS[r] || r}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Areas to develop */}
        {inactiveList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Areas to develop</p>
            <div className="flex flex-wrap gap-1.5">
              {inactiveList.slice(0, 4).map(r => (
                <span key={r} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/40">
                  {REGION_LABELS[r] || r}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* ── Blurred brain with their actual results ──── */}
      <section className="px-6 pb-4 pt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-sm mx-auto relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {/* Lock overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[hsl(220,40%,4%)]/50 backdrop-blur-[6px]">
              <Lock className="w-6 h-6 text-secondary/90 mb-2" />
              <p className="text-[12px] text-white/80 font-semibold">Your Full Brain Map</p>
              <p className="text-[10px] text-white/50 mt-0.5">Sign in to unlock your cognitive profile</p>
            </div>
            {/* Actual 3D brain with their quiz results — blurred behind lock */}
            <div className="pointer-events-none select-none py-4">
              <GlowingBrainVisual
                correctQuestions={correctQuestions}
                title="Your Cognitive Map"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── What you'll unlock ─────────────────────────── */}
      <section className="px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-sm mx-auto"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3 text-center">
            What you'll unlock
          </p>
          <div className="space-y-2">
            {[
              { icon: <BarChart3 className="w-3.5 h-3.5" />, title: 'Full Cognitive Profile', desc: 'Detailed breakdown across all 9 intelligence dimensions' },
              { icon: <Brain className="w-3.5 h-3.5" />, title: 'Personalised Growth Plan', desc: 'Targeted training for your weaker brain regions' },
              { icon: <BookOpen className="w-3.5 h-3.5" />, title: "200+ Genius-Level Lessons", desc: 'Follow the study paths of Einstein, Da Vinci & Newton' },
              { icon: <Zap className="w-3.5 h-3.5" />, title: 'AI Tutor', desc: 'Ask anything, get Socratic explanations instantly' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 py-2.5">
                <div className="mt-0.5 text-secondary/80 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[12px] font-semibold text-white/85">{item.title}</p>
                  <p className="text-[10px] text-white/35 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Auth CTA section ───────────────────────────── */}
      <section className="px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="max-w-sm mx-auto space-y-2.5"
        >
          {/* Apple sign in */}
          <button
            onClick={() => handleSignIn('apple')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white text-gray-800 font-semibold text-[15px] shadow-xl active:scale-[0.97] transition-transform disabled:opacity-60"
          >
            {loading === 'apple' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C2.79 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            )}
            See Full Analysis
          </button>

          {/* Google sign in */}
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

          {/* Email sign in — prominent */}
          <button
            onClick={() => navigate('/auth')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white/80 font-medium text-[15px] active:scale-[0.97] transition-all hover:bg-white/[0.1]"
          >
            <Mail className="w-4 h-4" />
            Sign in with email
          </button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 pt-2 text-white/30">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[10px]">Free to start</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              <span className="text-[10px]">{learnerCount} learners</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
