import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Mail, Loader2, Star, Brain, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { Capacitor } from '@capacitor/core';
import { nativeOAuthSignIn } from '@/lib/nativeOAuth';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';
import { REGIONS } from '@/components/home/brain/brainRegions';

import feedGoals from '@/assets/screenshots/feed-goals.png';
import feedTopics from '@/assets/screenshots/feed-topics.png';
import feedQuiz from '@/assets/screenshots/feed-quiz.png';
import feedBrainQuiz from '@/assets/screenshots/feed-brain-quiz.png';
import arenaSelect from '@/assets/screenshots/arena-select.png';
import arenaMatchup from '@/assets/screenshots/arena-matchup.png';
import arenaBlitz from '@/assets/screenshots/arena-blitz.png';
import arenaResults from '@/assets/screenshots/arena-results.png';
import pathWelcome from '@/assets/screenshots/path-welcome.png';
import pathQuiz from '@/assets/screenshots/path-quiz.png';
import pathVocabulary from '@/assets/screenshots/path-vocabulary.png';
import pathConnected from '@/assets/screenshots/path-connected.png';

/* ── Phone Mockup ─────────────────────────────────────── */
const PhoneMockup = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
  <div className={`flex-shrink-0 ${className}`} style={{ width: 200 }}>
    <div className="rounded-[2rem] border-[2.5px] border-white/[0.1] bg-[hsl(220,30%,6%)] p-1.5 shadow-2xl shadow-black/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[hsl(220,30%,6%)] rounded-b-xl z-10" />
      <div className="rounded-[1.6rem] overflow-hidden">
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      </div>
    </div>
  </div>
);

/* ── Horizontal Phone Row ─────────────────────────────── */
const PhoneRow = ({ screenshots }: { screenshots: { src: string; alt: string }[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[hsl(220,40%,4%)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[hsl(220,40%,4%)] to-transparent z-10 pointer-events-none" />
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-8 py-4 snap-x snap-mandatory justify-center"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        {screenshots.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center"
          >
            <PhoneMockup src={s.src} alt={s.alt} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Feature Section ──────────────────────────────────── */
const FeatureSection = ({
  label,
  title,
  description,
  screenshots,
}: {
  label: string;
  title: string;
  description: string;
  screenshots: { src: string; alt: string }[];
}) => (
  <section className="py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 px-6"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/60 mb-3">{label}</p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-3 max-w-md mx-auto">{title}</h2>
      <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">{description}</p>
    </motion.div>

    <PhoneRow screenshots={screenshots} />
  </section>
);

/* ── Main Component ───────────────────────────────────── */
export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();
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
    } catch (e: any) {
      toast.error(e.message || 'Sign-in failed');
    } finally {
      setLoading(null);
    }
  };

  const features = [
    {
      label: 'The Feed',
      title: 'A daily quiz that trains your brain',
      description: 'Pick your cognitive goals, get personalised topics, and watch your brain map grow — one question at a time.',
      screenshots: [
        { src: feedGoals, alt: 'Pick your cognitive goals' },
        { src: feedTopics, alt: 'Personalised topic selection' },
        { src: feedQuiz, alt: 'Interactive quiz with brain mapping' },
        { src: feedBrainQuiz, alt: 'Brain quiz with 3D visualisation' },
      ],
    },
    {
      label: 'Challenge Arena',
      title: 'Race opponents in a 60-second IQ blitz',
      description: 'Choose your rival, build combos for score multipliers, and get a full cognitive breakdown after every match.',
      screenshots: [
        { src: arenaSelect, alt: 'Choose your opponent' },
        { src: arenaMatchup, alt: 'Match preview with fighter cards' },
        { src: arenaBlitz, alt: '60-second IQ blitz gameplay' },
        { src: arenaResults, alt: 'Post-match cognitive breakdown' },
      ],
    },
    {
      label: 'The Path',
      title: 'A classical curriculum built for modern learners',
      description: 'Master what Newton, Einstein, and da Vinci learned — from Latin vocabulary to interconnected knowledge maps.',
      screenshots: [
        { src: pathWelcome, alt: 'Welcome to your first lesson' },
        { src: pathQuiz, alt: 'Interactive quiz with instant feedback' },
        { src: pathVocabulary, alt: 'Vocabulary cards with etymology' },
        { src: pathConnected, alt: 'Connected knowledge web' },
      ],
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">

      {/* ── HERO ── */}
      <section className="relative px-6 pt-20 pb-14 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-[2rem] md:text-4xl font-bold leading-[1.1] mb-4"
          >
            Replace scrolling with
            <br />
            <span className="text-secondary">60 seconds of genius</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto"
          >
            A daily quiz that maps your brain, trains your thinking, and makes you smarter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xs mx-auto mb-6"
          >
            <button
              onClick={() => navigate('/feed')}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors active:scale-[0.97]"
            >
              Try the 60-second quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* App Store badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://apps.apple.com/au/app/path-of-a-genius/id6758322387"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.1] rounded-xl px-4 py-2.5 hover:bg-white/[0.12] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[9px] leading-tight text-white/50">Download on the</p>
                <p className="text-xs font-semibold leading-tight text-white">App Store</p>
              </div>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 text-white/25 mt-6"
          >
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px]">{learnerCount} learners</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-[11px]">4.8 on App Store</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px]">Free</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURE SECTIONS ── */}
      {features.map((f, i) => (
        <div key={i}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <FeatureSection {...f} />
        </div>
      ))}

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-white mb-2">Ready to start?</h2>
          <p className="text-sm text-white/35 mb-8">Takes 60 seconds. No credit card.</p>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/feed')}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors active:scale-[0.97]"
            >
              Start the quiz
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Apple sign in */}
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
              Continue with Apple
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

            <button
              onClick={() => navigate('/auth')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white/50 font-medium text-sm active:scale-[0.97] transition-all hover:bg-white/[0.1]"
            >
              <Mail className="w-4 h-4" />
              Sign in with email
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
