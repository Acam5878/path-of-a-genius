import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, Star, Users, ShieldCheck, Brain, Flame, Trophy, ArrowRight } from 'lucide-react';
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

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

type AuthView = 'login' | 'signup' | 'forgot';

const FIRST_VISIT_KEY = 'genius-academy-has-visited';

const valuePoints = [
  { icon: Brain, text: 'Think sharper, reason better' },
  { icon: Flame, text: 'Build a daily genius habit' },
  { icon: Trophy, text: 'Track real cognitive growth' },
];

const review = {
  text: "I've tried dozens of learning apps. This is the only one that's actually changed how I think. 10 minutes a day and I genuinely feel smarter.",
  author: "James T.",
  role: "Software Engineer · 3 month streak",
  stars: 5,
};

const Auth = () => {
  const isFirstVisit = !localStorage.getItem(FIRST_VISIT_KEY);
  const [view, setView] = useState<AuthView>(isFirstVisit ? 'signup' : 'login');

  // Track auth page view
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
      navigate('/feed', { replace: true });
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
      if (error) {
        toast.error(error.message);
      } else {
        setResetSent(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'forgot') {
      handleForgotPassword();
      return;
    }
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (view === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please verify your email before signing in. Check your inbox.');
          } else {
            toast.error(error.message);
          }
          return;
        }
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
        trackLoginCompleted();
        toast.success('Welcome back!', { duration: 2000 });
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Try logging in instead.');
          } else {
            toast.error(error.message);
          }
          return;
        }
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
        trackSignupCompleted();
        toast.success('Check your email to verify your account!', { duration: 5000 });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrowseAsGuest = () => {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
    navigate('/the-path');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, hsl(259 56% 30%) 0%, hsl(240 40% 20%) 50%, hsl(217 30% 10%) 100%)' }}>
      {/* Hero Header */}
      <div className="relative overflow-hidden" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)', paddingBottom: '48px' }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.05 }}
            className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
          >
            <span className="text-2xl">🧠</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl font-bold text-cream mb-2"
          >
            Path of a Genius
          </motion.h1>

          {view === 'forgot' ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cream/80 text-sm">
              Reset your password
            </motion.p>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-cream/90 text-base font-medium mb-4 max-w-xs mx-auto leading-snug"
              >
                You chose depth over scrolling. Save your progress — it's free.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-4 mb-4 flex-wrap"
              >
                {valuePoints.map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-cream/80 text-xs">
                    <Icon className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mx-auto max-w-xs border border-white/15"
              >
                <div className="flex gap-0.5 justify-center mb-1.5">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-cream/90 text-xs leading-relaxed italic mb-1.5">"{review.text}"</p>
                <p className="text-cream/60 text-[10px] font-medium">— {review.author} · {review.role}</p>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Form area — seamless, no background set so gradient shows through */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 px-6 pt-2 pb-6"
      >
        <div className="max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {view === 'forgot' && resetSent ? (
              <motion.div
                key="reset-sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Check your email</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We've sent a password reset link to <strong className="text-foreground">{email}</strong>
                </p>
                <Button
                  variant="ghost"
                  onClick={() => { setView('login'); setResetSent(false); }}
                  className="text-secondary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, x: view === 'forgot' ? 20 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Toggle (login/signup) */}
                {view !== 'forgot' && (
                  <div className="flex bg-muted rounded-xl p-1 mb-5">
                    <button
                      onClick={() => setView('signup')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        view === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Create Account
                    </button>
                    <button
                      onClick={() => setView('login')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        view === 'login' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      Sign In
                    </button>
                  </div>
                )}

                {view === 'forgot' && (
                  <button
                    onClick={() => setView('login')}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                  </button>
                )}

                {/* Google One-Tap — primary CTA */}
                {view !== 'forgot' && (
                  <div className="mb-5 space-y-2">
                    <Button
                      type="button"
                      className="w-full bg-white hover:bg-white/90 text-gray-800 font-semibold py-6 rounded-2xl shadow-md flex items-center justify-center gap-3 text-base border border-white/20"
                      onClick={async () => {
                        if (Capacitor.isNativePlatform()) {
                          const { error } = await nativeOAuthSignIn('apple');
                          if (error) toast.error(error);
                        } else {
                          const { error } = await lovable.auth.signInWithOAuth("apple", {
                            redirect_uri: window.location.origin,
                          });
                          if (error) toast.error(error.message);
                        }
                      }}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Continue with Apple
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-base font-semibold border-white/20 text-foreground"
                      onClick={async () => {
                        if (Capacitor.isNativePlatform()) {
                          const { error } = await nativeOAuthSignIn('google');
                          if (error) toast.error(error);
                        } else {
                          const { error } = await lovable.auth.signInWithOAuth("google", {
                            redirect_uri: window.location.origin,
                          });
                          if (error) toast.error(error.message);
                        }
                      }}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </Button>

                    <div className="relative flex items-center justify-center my-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                      </div>
                      <span className="relative px-3 text-xs text-muted-foreground bg-transparent">or use email</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {view === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="displayName" className="text-sm text-foreground">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="displayName"
                          type="text"
                          placeholder="What should we call you?"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                        className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  {view !== 'forgot' && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                          className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    </div>
                  )}

                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-xs text-secondary hover:underline"
                    >
                      Forgot your password?
                    </button>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : view === 'login' ? (
                      'Sign In'
                    ) : view === 'signup' ? (
                      'Start My Journey →'
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                {/* Apple Sign-In moved to top */}

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span className="text-[10px]">1,000+ learners</span>
                  </div>
                  <div className="w-px h-2.5 bg-border" />
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-3 h-3 text-secondary fill-secondary" />
                    <span className="text-[10px]">4.8 rated</span>
                  </div>
                  <div className="w-px h-2.5 bg-border" />
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px]">Private & secure</span>
                  </div>
                </div>

                {/* Guest Browse Option */}
                {view !== 'forgot' && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleBrowseAsGuest}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto"
                    >
                      Explore first, sign up later
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <p className="text-center text-[10px] text-muted-foreground mt-3">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
