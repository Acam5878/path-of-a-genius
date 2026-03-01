import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Users, Brain, BookOpen, Zap, BarChart3, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';

export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();
  const [loading, setLoading] = useState<'apple' | 'google' | null>(null);

  // Brain refs
  const nowMountRef = useRef<HTMLDivElement>(null);
  const futureMountRef = useRef<HTMLDivElement>(null);
  const nowRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const futureRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  // Get diagnostic results from localStorage
  const diagnosticRegions = (() => {
    try {
      const stored = localStorage.getItem('genius-academy-diagnostic-regions');
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  })();

  useEffect(() => {
    const nowMount = nowMountRef.current;
    const futureMount = futureMountRef.current;
    if (!nowMount || !futureMount) return;

    const timer = setTimeout(() => {
      if (nowMount.clientWidth === 0) return;
      
      nowRendererRef.current = createBrainRenderer(nowMount);
      nowRendererRef.current.updateOptions({ activeRegions: diagnosticRegions, isLocked: false });
      
      futureRendererRef.current = createBrainRenderer(futureMount);
      const allRegions = new Set(Object.keys(REGIONS));
      futureRendererRef.current.updateOptions({ activeRegions: allRegions, isLocked: false });
      
      Object.keys(REGIONS).forEach((r, i) => {
        setTimeout(() => futureRendererRef.current?.triggerRegionFire(r, 1.0), i * 100);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      nowRendererRef.current?.dispose();
      futureRendererRef.current?.dispose();
      nowRendererRef.current = null;
      futureRendererRef.current = null;
    };
  }, []);

  const nowCount = diagnosticRegions.size;
  const totalRegions = Object.keys(REGIONS).length;
  const estimatedCurrentIQ = 90 + nowCount * 3;
  const estimatedFutureIQ = estimatedCurrentIQ + 15;

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
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">
      
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-mono uppercase tracking-widest text-secondary/60 mb-3"
        >
          Analysis Complete
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold leading-tight max-w-sm mb-3"
        >
          Your brain scored{' '}
          <span className="text-secondary">{nowCount}/{totalRegions}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm max-w-xs mb-2 leading-relaxed"
        >
          Estimated IQ range: <span className="text-white/80 font-semibold">{estimatedCurrentIQ}–{estimatedCurrentIQ + 5}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-secondary/80 text-xs max-w-xs leading-relaxed"
        >
          With training: <span className="font-bold text-secondary">{estimatedFutureIQ}+</span> estimated in 2 weeks
        </motion.p>
      </section>

      {/* ── Brain Comparison ─────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Your Brain Now */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Your Brain Now</p>
              <div
                ref={nowMountRef}
                className="w-full rounded-2xl overflow-hidden bg-white/[0.02]"
                style={{ height: 200 }}
              />
              <div className="mt-3 flex items-center gap-1">
                <span className="text-sm font-mono font-bold text-secondary">{nowCount}</span>
                <span className="text-[10px] text-white/30">/ {totalRegions} active</span>
              </div>
            </motion.div>

            {/* Your Brain in Two Weeks */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-3">In Two Weeks</p>
              <div
                ref={futureMountRef}
                className="w-full rounded-2xl overflow-hidden bg-white/[0.02]"
                style={{ height: 200 }}
              />
              <div className="mt-3 flex items-center gap-1">
                <span className="text-sm font-mono font-bold" style={{ color: '#00F0AA' }}>{totalRegions}</span>
                <span className="text-[10px] text-white/30">/ {totalRegions} active</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA — Get Full Analysis ─────────────────────────── */}
      <section className="px-6 pb-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm space-y-2.5"
        >
          <button
            onClick={() => handleSignIn('apple')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-gray-800 font-semibold text-base shadow-xl active:scale-95 transition-transform disabled:opacity-60"
          >
            {loading === 'apple' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C2.79 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            )}
            Get Full Analysis
          </button>
          <button
            onClick={() => handleSignIn('google')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-base active:scale-95 transition-transform disabled:opacity-60"
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
        </motion.div>
      </section>

      {/* ── What You Get ─────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-sm mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4 text-center"
          >
            What's included
          </motion.p>
          <div className="space-y-3">
            {[
              { icon: <BarChart3 className="w-4 h-4" />, title: 'Full IQ Assessment', desc: 'Measure verbal, logical, spatial, numerical, memory & pattern recognition' },
              { icon: <Brain className="w-4 h-4" />, title: 'Live Brain Mapping', desc: 'Watch your neural regions activate as you learn and grow' },
              { icon: <BookOpen className="w-4 h-4" />, title: "Einstein's Curriculum", desc: '200+ lessons following the study paths of history\'s greatest minds' },
              { icon: <Zap className="w-4 h-4" />, title: 'AI Tutor', desc: 'Personal tutor that explains any concept instantly, Socratic style' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
              >
                <div className="mt-0.5 text-secondary flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{item.title}</p>
                  <p className="text-[11px] text-white/40 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ─────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-sm mx-auto space-y-2.5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="text-[11px] text-white/40">4.8 on the App Store</span>
          </motion.div>

          {[
            { text: 'I replaced my doomscrolling with this.', name: 'Alex', city: 'London' },
            { text: 'My kids love the IQ tests.', name: 'Sarah', city: 'Sydney' },
            { text: 'Finally, an app that makes me feel smarter.', name: 'Marco', city: 'Berlin' },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-start gap-3"
            >
              <span className="text-secondary text-lg mt-0.5">"</span>
              <div>
                <p className="text-sm text-white/80 leading-snug">{t.text}</p>
                <p className="text-[11px] text-white/30 mt-1">{t.name}, {t.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────── */}
      <section className="px-6 pt-2 pb-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-white/30">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px]">Free to start</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[10px]">{learnerCount} learners</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/auth')}
          className="text-[11px] text-white/30 hover:text-white/50 transition-colors"
        >
          Sign in with email instead →
        </button>
      </section>
    </div>
  );
};
