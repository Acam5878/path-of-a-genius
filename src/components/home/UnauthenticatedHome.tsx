import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Flame, Star, Users, ShieldCheck, Zap, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import einsteinPortrait from '@/assets/geniuses/einstein-portrait.jpg';
import newtonPortrait from '@/assets/geniuses/newton-portrait.jpg';
import davincPortrait from '@/assets/geniuses/davinci-portrait.jpg';
import aristotlePortrait from '@/assets/geniuses/aristotle-portrait.jpg';

const features = [
  {
    icon: '🏛️',
    title: 'The Classic Curriculum',
    desc: 'Latin → Logic → Mathematics → Sciences → Humanities → Great Books. The exact path of every great mind in history.',
  },
  {
    icon: '🧠',
    title: 'Measure Your Intelligence',
    desc: 'Free IQ tests across 6 cognitive domains. Know exactly where you stand and track your growth over time.',
  },
  {
    icon: '⚡',
    title: 'Just 10 Minutes a Day',
    desc: 'Spaced repetition and bite-sized lessons build deep, lasting knowledge — not trivia that fades by morning.',
  },
];

const geniuses = [
  { name: 'Einstein', portrait: einsteinPortrait },
  { name: 'Newton', portrait: newtonPortrait },
  { name: 'Da Vinci', portrait: davincPortrait },
  { name: 'Aristotle', portrait: aristotlePortrait },
];

export const UnauthenticatedHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-secondary/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-5 pt-16 pb-10 flex flex-col items-center text-center max-w-md mx-auto">
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-1.5 text-secondary text-[10px] font-mono uppercase tracking-widest mb-5"
          >
            <Star className="w-3 h-3 fill-secondary" />
            <span>Path of a Genius</span>
            <Star className="w-3 h-3 fill-secondary" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-heading text-4xl font-bold text-foreground leading-[1.1] mb-4"
          >
            Learn exactly what<br />
            <span className="text-secondary">Einstein studied.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xs"
          >
            The curriculum that built every great mind in history — rebuilt for 10 minutes a day.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="w-full space-y-3 mb-6"
          >
            <Button
              onClick={() => navigate('/the-path')}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-7 rounded-2xl font-bold shadow-lg shadow-secondary/20"
            >
              Start The Path — Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/feed')}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-muted/60 border border-border/60 text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <Zap className="w-4 h-4 text-secondary" />
                Daily Feed
              </button>
              <button
                onClick={() => navigate('/iq-tests')}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-muted/60 border border-border/60 text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <Brain className="w-4 h-4 text-secondary" />
                IQ Test
              </button>
            </div>
          </motion.div>

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-4 text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px]">1,000+ learners</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-[11px]">4.8 rating</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px]">Free forever</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── GENIUSES STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 mb-8"
      >
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-3 text-center">
          Follow in their footsteps
        </p>
        <div className="grid grid-cols-4 gap-2">
          {geniuses.map((g, i) => (
            <motion.button
              key={g.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              onClick={() => navigate('/geniuses')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-colors">
                <img
                  src={g.portrait}
                  alt={g.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{g.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── FEATURES ── */}
      <div className="px-5 mb-8 space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.08 }}
            className="flex gap-4 bg-card/60 border border-border/60 rounded-2xl p-4"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">{f.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── STATS STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-5 mb-8 grid grid-cols-3 gap-2 text-center"
      >
        {[
          { icon: BookOpen, value: '200+', label: 'Lessons' },
          { icon: Trophy, value: '6', label: 'Modules' },
          { icon: Flame, value: '10 min', label: 'Per day' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-muted/40 rounded-2xl py-4 px-2 flex flex-col items-center gap-1.5">
            <Icon className="w-4 h-4 text-secondary" />
            <span className="font-heading text-xl font-bold text-foreground">{value}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── BOTTOM CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-5 pb-8 space-y-4"
      >
        <div className="bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/25 rounded-2xl p-5 text-center">
          <p className="font-heading text-lg font-bold text-foreground mb-1">Ready to think differently?</p>
          <p className="text-xs text-muted-foreground mb-4">Create a free account to save your progress, track your IQ, and build your streak.</p>
          <Button
            onClick={() => navigate('/auth')}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 rounded-xl font-bold"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-[10px] text-muted-foreground mt-3">No credit card · Cancel anytime</p>
        </div>

        {/* App Store */}
        <div className="flex flex-col items-center gap-3 py-4 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Also on</p>
          <a
            href="https://apps.apple.com/au/app/path-of-a-genius/id6758322387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground text-background rounded-xl px-5 py-3 hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] leading-tight opacity-70">Download on the</p>
              <p className="text-base font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>

        {/* Already have an account */}
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <button onClick={() => navigate('/auth')} className="text-secondary underline underline-offset-2">
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};
