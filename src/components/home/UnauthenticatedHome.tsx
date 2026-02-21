import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Flame, Star, Users, ShieldCheck, Zap, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import einsteinPortrait from '@/assets/geniuses/einstein-portrait.jpg';
import newtonPortrait from '@/assets/geniuses/newton-portrait.jpg';
import davincPortrait from '@/assets/geniuses/davinci-portrait.jpg';
import aristotlePortrait from '@/assets/geniuses/aristotle-portrait.jpg';
import { KnowledgeWebCard } from '@/components/home/KnowledgeWebCard';

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

// Mini IQ teaser — 3 quick questions, then a curiosity-gap result
const iqQuestions = [
  {
    q: 'Book is to Reading as Compass is to…',
    options: ['Pointing', 'Navigation', 'North', 'Maps'],
    correct: 1,
  },
  {
    q: 'Which number comes next? 2, 4, 8, 16, __',
    options: ['24', '30', '32', '64'],
    correct: 2,
  },
  {
    q: 'All roses are flowers. Some flowers fade quickly. Therefore…',
    options: ['All roses fade quickly', 'Some roses may fade quickly', 'Roses never fade', 'Flowers are roses'],
    correct: 1,
  },
];

const IQTeaser = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const current = iqQuestions[step];
  const score = answers.filter((a, i) => a === iqQuestions[i].correct).length;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers, idx];
    setTimeout(() => {
      if (step < iqQuestions.length - 1) {
        setAnswers(newAnswers);
        setStep(s => s + 1);
        setSelected(null);
      } else {
        setAnswers(newAnswers);
        setShowResult(true);
      }
    }, 700);
  };

  const label = score === 3 ? 'High Performer' : score === 2 ? 'Above Average' : 'On the Path';
  const message = score === 3
    ? 'Your pattern recognition and logical reasoning are strong. Full analysis needs your profile.'
    : score === 2
    ? 'You show solid reasoning ability. Create a free account to see your detailed cognitive map.'
    : 'Your journey is just starting. Consistent 10-min/day practice moves IQ measurably upward.';

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-secondary/30 rounded-2xl p-5 text-center"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-2">Your Quick Result</p>
        <div className="text-4xl font-heading font-bold text-foreground mb-1">{score}/3</div>
        <p className="text-sm font-semibold text-secondary mb-2">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{message}</p>
        <Button
          onClick={() => navigate('/auth')}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
        >
          See Your Full IQ Profile — Free
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
        <button onClick={onDone} className="w-full text-muted-foreground text-xs py-2 mt-1">
          Skip for now
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-secondary">Quick IQ Check · {step + 1}/3</p>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-5 h-1 rounded-full transition-colors ${i <= step ? 'bg-secondary' : 'bg-border'}`} />
          ))}
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground mb-3 leading-snug">{current.q}</p>
      <div className="space-y-2">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          const showFeedback = selected !== null;
          let cls = 'border-border bg-muted/30 hover:bg-muted/60 hover:border-secondary/30';
          if (showFeedback) {
            if (isCorrect) cls = 'border-emerald-600/50 bg-emerald-500/10';
            else if (isSelected) cls = 'border-destructive/50 bg-destructive/10 opacity-60';
            else cls = 'border-border/30 opacity-40';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${cls}`}
            >
              {showFeedback && isCorrect
                ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                : <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px] text-muted-foreground flex-shrink-0">{String.fromCharCode(65 + i)}</span>
              }
              <span className="text-foreground">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Rotating activity ticker items
const activityItems = [
  { name: 'Alex', action: 'completed Logic · Introduction', time: '2m ago', emoji: '⚖️' },
  { name: 'Sarah', action: 'scored 138 on IQ Test', time: '5m ago', emoji: '🧠' },
  { name: 'James', action: 'started Ancient Greek', time: '8m ago', emoji: '🏛️' },
  { name: 'Priya', action: 'built a 7-day streak', time: '12m ago', emoji: '🔥' },
  { name: 'Marco', action: 'completed Mathematics Lesson 3', time: '15m ago', emoji: '📐' },
  { name: 'Elena', action: 'asked the AI Tutor about Aristotle', time: '18m ago', emoji: '💬' },
];

const ActivityTicker = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % activityItems.length), 3000);
    return () => clearInterval(t);
  }, []);
  const item = activityItems[idx];
  return (
    <div className="px-5 mb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2.5 bg-muted/50 border border-border/50 rounded-xl px-3.5 py-2.5"
        >
          <span className="text-base flex-shrink-0">{item.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">
              <span className="font-semibold">{item.name}</span> {item.action}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] text-muted-foreground">{item.time}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const UnauthenticatedHome = () => {
  const navigate = useNavigate();
  const [showIQTeaser, setShowIQTeaser] = useState(true);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-secondary/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-5 pt-16 pb-10 flex flex-col items-center text-center max-w-md mx-auto">
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-heading text-4xl font-bold text-foreground leading-[1.1] mb-4"
          >
            The smartest people<br />in history all learned<br />
            <span className="text-secondary">the same things.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xs"
          >
            Einstein. Newton. Da Vinci. The same classical curriculum — rebuilt for 10 minutes a day.
          </motion.p>

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
                Scroll & Learn
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

      {/* ── KNOWLEDGE WEB ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="mb-5"
      >
        <KnowledgeWebCard />
      </motion.div>

      {/* ── ACTIVITY TICKER ── */}
      <ActivityTicker />

      {/* ── IQ CURIOSITY TEASER ── */}
      {showIQTeaser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 mb-6"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2 text-center">
            Try 3 quick questions
          </p>
          <IQTeaser onDone={() => setShowIQTeaser(false)} />
        </motion.div>
      )}

      {/* ── GENIUSES STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
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
              transition={{ delay: 0.65 + i * 0.05 }}
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

      {/* ── LIVE FEED PREVIEW ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="px-5 mb-8"
      >
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-3 text-center">
          Your daily intellectual feed — a taste
        </p>
        <div className="space-y-2">
          {[
            {
              emoji: '💡',
              label: 'Einstein · Thought Experiments',
              title: 'Why Einstein never memorised anything',
              body: 'He said rote memorisation was a waste of mental energy. Instead, he trained himself to reason from first principles — the same skill you build in Module 1.',
            },
            {
              emoji: '🏛️',
              label: 'Latin · Classical Roots',
              title: '"Amo, Amas, Amat" — and why it still matters',
              body: '65% of English words derive from Latin. Learning it doesn\'t just teach a language — it unlocks the architecture of thought itself.',
            },
            {
              emoji: '⚖️',
              label: 'Logic · Mill\'s Methods',
              title: 'The one logical fallacy that ruins most arguments',
              body: 'Post hoc ergo propter hoc: "After this, therefore because of this." The most common reasoning error — and once you see it, you can\'t unsee it.',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-card border border-border/60 rounded-2xl p-4 relative overflow-hidden"
            >
              {i === 0 && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-full blur-2xl" />
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{card.emoji}</span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{card.label}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1 leading-snug">{card.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{card.body}</p>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => navigate('/feed')}
          className="w-full mt-3 py-2.5 text-xs text-secondary font-medium border border-secondary/25 rounded-xl hover:bg-secondary/5 transition-colors"
        >
          See your full feed →
        </button>
      </motion.div>

      {/* ── FEATURES ── */}
      <div className="px-5 mb-8 space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 + i * 0.08 }}
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
