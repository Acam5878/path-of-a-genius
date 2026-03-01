import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Swords, RotateCcw, Star, Users, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';

const features = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    emoji: '📚',
    title: 'Bite-sized Lessons',
    desc: 'Philosophy, science, logic — 2 min reads from Einstein to Aristotle.',
  },
  {
    icon: <Swords className="w-5 h-5" />,
    emoji: '⚔️',
    title: 'Challenge Arena',
    desc: "Test yourself against history's greatest minds.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    emoji: '🧠',
    title: 'IQ Training',
    desc: 'Track growth across 6 intelligence types.',
  },
  {
    icon: <RotateCcw className="w-5 h-5" />,
    emoji: '🔁',
    title: 'Smart Review',
    desc: 'Spaced repetition that makes knowledge stick.',
  },
];

const testimonials = [
  { text: 'I replaced my doomscrolling with this.', name: 'Alex', city: 'London' },
  { text: 'My kids love the IQ tests.', name: 'Sarah', city: 'Sydney' },
  { text: 'Finally, an app that makes me feel smarter.', name: 'Marco', city: 'Berlin' },
];

export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();

  const handleCTA = () => navigate('/auth');

  return (
    <div className="min-h-[100dvh] bg-primary text-primary-foreground">
      
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />

        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="text-5xl mb-6"
        >
          🧠
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold leading-tight max-w-md mb-4"
        >
          Think deeper.{' '}
          <span className="text-secondary">Learn faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary-foreground/60 text-base max-w-sm mb-8 leading-relaxed"
        >
          Join {learnerCount} people training their minds with history's greatest thinkers.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleCTA}
          className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-2xl px-8 py-4 text-base font-bold shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-colors mb-6"
        >
          Find out how smart you are
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
            ))}
          </div>
          <span className="text-xs text-primary-foreground/50">4.8 on the App Store</span>
        </motion.div>
      </section>

      {/* ── What do you get? ─────────────────────────────────── */}
      <section className="px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-xl font-bold text-center mb-8"
        >
          What do you get?
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 border border-border/50 rounded-2xl p-4 flex flex-col gap-2"
            >
              <span className="text-2xl">{f.emoji}</span>
              <h3 className="font-semibold text-sm text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-card/30 border border-border/40 rounded-xl px-4 py-3 flex items-start gap-3"
            >
              <span className="text-secondary text-lg mt-0.5">"</span>
              <div>
                <p className="text-sm text-foreground leading-snug">{t.text}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{t.name}, {t.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA + App Store ───────────────────────────── */}
      <section className="px-6 pt-6 pb-12 flex flex-col items-center gap-5">
        <button
          onClick={handleCTA}
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-secondary text-secondary-foreground rounded-2xl py-4 text-base font-bold shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-colors"
        >
          Find out how smart you are
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Trust bar */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px]">No credit card</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[10px]">{learnerCount} learners</span>
          </div>
        </div>

        {/* App Store badge */}
        <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/40 w-full max-w-sm">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Available on</p>
          <a
            href="https://apps.apple.com/au/app/path-of-a-genius/id6758322387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground text-background rounded-xl px-5 py-3 hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] leading-tight opacity-70">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
