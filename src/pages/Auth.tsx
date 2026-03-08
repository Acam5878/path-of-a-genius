import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, Star, Users, ShieldCheck, Brain, BookOpen, Trophy, Sparkles, Zap, ArrowRight, GraduationCap, Crown, Check, X, BarChart3, Target, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { trackAuthPageViewed, trackSignupCompleted, trackLoginCompleted } from '@/lib/posthog';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { REGIONS } from '@/components/home/brain/brainRegions';

import screenshotBrainMap from '@/assets/screenshot-brain-map.png';
import screenshotCognitiveProfile from '@/assets/screenshot-cognitive-profile.png';
import screenshotIQProfile from '@/assets/screenshot-iq-profile.png';
import screenshotArena from '@/assets/screenshot-arena.png';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

type AuthView = 'login' | 'signup' | 'forgot';

const FIRST_VISIT_KEY = 'genius-academy-has-visited';

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

const Auth = () => {
  const { formatted: learnerCount } = useLearnerCount();
  const isFirstVisit = !localStorage.getItem(FIRST_VISIT_KEY);
  const fromDiagnostic = new URLSearchParams(window.location.search).get('from') === 'diagnostic';
  const [view, setView] = useState<AuthView>(isFirstVisit || fromDiagnostic ? 'signup' : 'login');
  const [showAuthForm, setShowAuthForm] = useState(false);

  // Diagnostic data
  const diagnosticRegions: string[] = JSON.parse(localStorage.getItem('genius-academy-diagnostic-regions') || '[]');
  const regionsActivated = diagnosticRegions.length;
  const totalRegions = Object.keys(REGIONS).length;
  const estimatedIQ = 90 + regionsActivated * 3;
  const projectedIQ = estimatedIQ + 15;
  const strengths = diagnosticRegions.slice(0, 3).map(r => REGION_STRENGTHS[r]).filter(Boolean);
  const hasDiagnosticData = regionsActivated > 0;

  useEffect(() => {
    trackAuthPageViewed(view);
  }, [view]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      sessionStorage.removeItem('genius-academy-auth-redirect');
      const isNewUser = sessionStorage.getItem('genius-academy-just-signed-up');
      if (isNewUser) {
        sessionStorage.removeItem('genius-academy-just-signed-up');
        const userType = localStorage.getItem('genius-academy-user-type');
        const typeRoutes: Record<string, string> = {
          'self-improver': '/iq-tests?start=verbal',
          'curious-learner': '/feed',
          'parent': '/iq-tests',
          'student': '/the-path',
        };
        navigate(typeRoutes[userType || ''] || '/the-path', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    if (view !== 'forgot') {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.errors[0].message });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) toast.error(error.message);
      else setResetSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'forgot') { handleForgotPassword(); return; }
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (view === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) toast.error('Invalid email or password');
          else if (error.message.includes('Email not confirmed')) toast.error('Please verify your email before signing in.');
          else toast.error(error.message);
          return;
        }
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
        trackLoginCompleted();
        toast.success('Welcome back!', { duration: 2000 });
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) toast.error('This email is already registered. Try logging in instead.');
          else toast.error(error.message);
          return;
        }
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
        sessionStorage.setItem('genius-academy-just-signed-up', 'true');
        trackSignupCompleted();
        toast.success('Check your email to verify your account!', { duration: 5000 });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrowseAsGuest = () => {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
    navigate('/feed');
  };

  const handleOAuth = async (provider: 'apple' | 'google') => {
    if (Capacitor.isNativePlatform()) {
      const { error } = await nativeOAuthSignIn(provider);
      if (error) toast.error(error);
    } else {
      const { error } = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (error) toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  const featureShowcase = [
    {
      image: screenshotBrainMap,
      title: 'Your Interactive Brain Map',
      description: 'See which neural regions light up as you learn. Track activation across all 12 brain areas in real-time.',
      icon: Brain,
    },
    {
      image: screenshotCognitiveProfile,
      title: 'Personalised Cognitive Profile',
      description: 'Get a detailed radar chart of your strengths across Verbal, Logical, Numerical, Spatial, Memory & Pattern recognition.',
      icon: Target,
    },
    {
      image: screenshotIQProfile,
      title: 'IQ Tracking & Analysis',
      description: 'Take real assessments, see where you rank in the population, and track your cognitive growth over time.',
      icon: BarChart3,
    },
    {
      image: screenshotArena,
      title: 'Challenge Arena',
      description: 'Race against historical geniuses and AI opponents in 60-second IQ blitzes. Prove you\'re smarter.',
      icon: Trophy,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 32px)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(259_56%_30%/0.15)] to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-lg mx-auto px-6 pb-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.05 }}
            className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20"
          >
            <Brain className="w-8 h-8 text-secondary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            {fromDiagnostic ? (
              <>Unlock Your<br /><span className="text-secondary">Full Brain Map</span></>
            ) : (
              <>Unlock Your<br /><span className="text-secondary">Full Intelligence</span></>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed"
          >
            {fromDiagnostic
              ? 'Sign up to see your complete brain map, personalised curriculum, and full cognitive analysis.'
              : 'Map your brain, measure your IQ, and follow personalised curricula designed from history\'s greatest minds.'}
          </motion.p>

          {/* Personalised diagnostic summary */}
          {hasDiagnosticData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="bg-card/60 border border-border/40 rounded-2xl p-4 mb-6 max-w-sm mx-auto"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">Your Diagnostic Results</p>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <p className="font-mono font-bold text-lg text-secondary">{regionsActivated}/{totalRegions}</p>
                  <p className="text-[9px] text-muted-foreground">Regions Active</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-lg text-foreground">{estimatedIQ}</p>
                  <p className="text-[9px] text-muted-foreground">Estimated IQ</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-lg text-secondary">{projectedIQ}</p>
                  <p className="text-[9px] text-muted-foreground">2-Week Target</p>
                </div>
              </div>
              {strengths.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {strengths.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] bg-secondary/10 text-secondary border border-secondary/20">
                      <Zap className="w-2.5 h-2.5" />
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 max-w-xs mx-auto"
          >
            <Button
              onClick={() => handleOAuth('apple')}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold py-6 rounded-2xl flex items-center justify-center gap-3 text-base"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Unlock full brain analysis (free)
            </Button>

            <Button
              onClick={() => handleOAuth('google')}
              variant="outline"
              className="w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-base font-semibold border-border/50"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Unlock full brain analysis (free)
            </Button>

            <button
              onClick={() => { setView('signup'); setShowAuthForm(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-card/50 border border-border/30 text-muted-foreground font-medium text-sm hover:bg-card/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Unlock full brain analysis with email (free)
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-6 flex-wrap"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs">{learnerCount} learners</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-xs">4.8 rated</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs">Free to start</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Feature Showcase with Real Screenshots ─── */}
      <section className="px-6 py-12 border-t border-border/30">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-2xl font-semibold mb-2">
              {hasDiagnosticData ? (
                <>Your personalised<br /><span className="text-secondary">intelligence plan includes</span></>
              ) : (
                <>What you'll unlock with<br /><span className="text-secondary">your free account</span></>
              )}
            </h2>
            {hasDiagnosticData && (
              <p className="text-sm text-muted-foreground mt-2">Based on your {regionsActivated} activated brain regions</p>
            )}
          </motion.div>

          <div className="space-y-8">
            {featureShowcase.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card/50 border border-border/30 overflow-hidden"
              >
                {/* Screenshot */}
                <div className="relative overflow-hidden bg-background/50">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                {/* Text */}
                <div className="p-5 -mt-8 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                      <feature.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof ─── */}
      <section className="px-6 py-12 border-t border-border/30">
        <div className="max-w-lg mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-semibold text-center mb-8"
          >
            Real people, real results
          </motion.h2>

          <div className="grid gap-4">
            {[
              {
                text: "I scored 127 on the IQ assessment and the personalised curriculum helped me push past 135 in 3 months.",
                author: "James T.",
                role: "Software Engineer",
                stars: 5,
              },
              {
                text: "Finally an app that makes me feel smarter, not dumber. My kids and I do the brain training together.",
                author: "Sarah M.",
                role: "Homeschool Parent",
                stars: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-card/50 border border-border/30"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-3 italic">"{t.text}"</p>
                <p className="text-xs text-muted-foreground font-medium">— {t.author}, {t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-6 py-12 border-t border-border/30">
        <div className="max-w-xs mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-xl font-semibold mb-2">Ready to unlock your mind?</h2>
            <p className="text-sm text-muted-foreground mb-6">See your full cognitive profile — free, no credit card.</p>

            <Button
              onClick={() => handleOAuth('apple')}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold py-6 rounded-2xl flex items-center justify-center gap-3 text-base mb-3"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Unlock full brain analysis (free)
            </Button>

            <Button
              onClick={() => handleOAuth('google')}
              variant="outline"
              className="w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-base font-semibold border-border/50 mb-3"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Unlock full brain analysis (free)
            </Button>

            <button
              onClick={() => { setView('signup'); setShowAuthForm(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-card/50 border border-border/30 text-muted-foreground font-medium text-sm hover:bg-card/80 transition-colors mb-4"
            >
              <Mail className="w-4 h-4" />
              Unlock full brain analysis with email (free)
            </button>

            <button
              onClick={handleBrowseAsGuest}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
            >
              Explore first, sign up later <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      </section>

      <div className="px-6 pb-8 text-center">
        <p className="text-[10px] text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* ─── Email Auth Drawer ─── */}
      <AnimatePresence>
        {showAuthForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) setShowAuthForm(false); }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-10 border-t border-border/50 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-5" />

              {view === 'forgot' && resetSent ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-14 h-14 text-[hsl(var(--success))] mx-auto mb-4" />
                  <h2 className="font-heading text-xl font-semibold mb-2">Check your email</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    We've sent a reset link to <strong className="text-foreground">{email}</strong>
                  </p>
                  <Button variant="ghost" onClick={() => { setView('login'); setResetSent(false); }} className="text-secondary">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                </div>
              ) : (
                <>
                  {view !== 'forgot' && (
                    <div className="flex bg-muted rounded-xl p-1 mb-5">
                      <button
                        onClick={() => setView('signup')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${view === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
                      >
                        Create Account
                      </button>
                      <button
                        onClick={() => setView('login')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${view === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
                      >
                        Sign In
                      </button>
                    </div>
                  )}

                  {view === 'forgot' && (
                    <button onClick={() => setView('login')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-sm">Your Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="displayName" type="text" placeholder="What should we call you?" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-10" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }} className={`pl-10 ${errors.email ? 'border-destructive' : ''}`} />
                      </div>
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    {view !== 'forgot' && (
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }} className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                      </div>
                    )}

                    {view === 'login' && (
                      <button type="button" onClick={() => setView('forgot')} className="text-xs text-secondary hover:underline">
                        Forgot your password?
                      </button>
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold py-5 rounded-xl">
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : view === 'login' ? 'Sign In' : view === 'signup' ? 'Unlock My Brain Map →' : 'Send Reset Link'}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
