import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const platformGuide = [
  {
    emoji: '📜',
    title: 'The Feed',
    desc: 'Swipe through bite-sized insights from history\'s greatest minds. 2 minutes each.',
    route: '/feed',
  },
  {
    emoji: '🏛️',
    title: 'The Path',
    desc: 'Follow the classical curriculum: Greek → Logic → Mathematics → Philosophy.',
    route: '/the-path',
  },
  {
    emoji: '🧠',
    title: 'IQ Tests',
    desc: 'Take 5 cognitive assessments and map your strengths across 12 brain regions.',
    route: '/iq-tests',
  },
  {
    emoji: '⚔️',
    title: 'The Arena',
    desc: '60-second blitz rounds against AI opponents. Combos, streaks, rankings.',
    route: '/challenge',
  },
];

const tips = [
  { emoji: '⏱️', text: '10 minutes a day is all you need' },
  { emoji: '🔥', text: 'Build a streak to stay consistent' },
  { emoji: '🧠', text: 'Your brain card tracks progress across 12 regions' },
  { emoji: '📊', text: 'Retake IQ tests to measure improvement' },
];

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden xl:flex flex-col gap-3 pt-28 pr-4 w-52 shrink-0 sticky top-0 h-screen overflow-y-auto pb-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[9px] font-mono text-secondary uppercase tracking-widest mb-1 text-right"
      >
        How it works
      </motion.p>

      {platformGuide.map((item, i) => (
        <motion.button
          key={item.title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          onClick={() => navigate(item.route)}
          className="text-right bg-card/50 border border-border/40 rounded-xl px-3 py-2.5 hover:border-secondary/30 transition-colors group"
        >
          <div className="flex items-center justify-end gap-1.5 mb-1">
            <span className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">{item.title}</span>
            <span className="text-base">{item.emoji}</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.button>
      ))}
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="hidden xl:flex flex-col gap-3 pt-28 pl-4 w-52 shrink-0 sticky top-0 h-screen overflow-y-auto pb-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[9px] font-mono text-secondary uppercase tracking-widest mb-1"
      >
        Quick tips
      </motion.p>

      {tips.map((tip, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          className="flex items-start gap-2 bg-card/50 border border-border/40 rounded-xl px-3 py-2.5"
        >
          <span className="text-base flex-shrink-0 mt-0.5">{tip.emoji}</span>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{tip.text}</p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-2 bg-secondary/8 border border-secondary/20 rounded-xl px-3 py-3 text-center"
      >
        <p className="text-[10px] text-secondary font-semibold mb-0.5">Need help?</p>
        <p className="text-[10px] text-muted-foreground">Tap the 🎓 tutor button on any page for instant guidance.</p>
      </motion.div>
    </div>
  );
};

export const DesktopSidePanels = { Left: LeftPanel, Right: RightPanel };
