import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

const STACK_DISMISSED_KEY = 'genius-academy-stack-dismissed';

const stackLayers = [
  { label: 'Latin & Greek', emoji: '🏛️', description: 'The root of all Western knowledge' },
  { label: 'Logic & Rhetoric', emoji: '⚖️', description: 'How to think and persuade' },
  { label: 'Mathematics', emoji: '📐', description: 'The language of the universe' },
  { label: 'Natural Philosophy', emoji: '🔬', description: 'How the world works' },
  { label: 'History & Literature', emoji: '📚', description: 'The wisdom of civilization' },
];

export const GeniusStackCard = () => {
  const navigate = useNavigate();
  const dismissed = localStorage.getItem(STACK_DISMISSED_KEY);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 rounded-2xl border border-secondary/20 bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <button
        onClick={() => {
          localStorage.setItem(STACK_DISMISSED_KEY, 'true');
          // Force re-render by dispatching storage event
          window.dispatchEvent(new Event('storage'));
          // Hide via DOM
          const el = document.getElementById('genius-stack-card');
          if (el) el.style.display = 'none';
        }}
        className="absolute top-3 right-3 text-white/30 hover:text-white/60 text-xs z-10"
      >
        ✕
      </button>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-[10px] text-secondary font-mono uppercase tracking-widest">The Genius Stack</p>
          </div>
        </div>

        <h3 className="font-heading text-base font-bold text-foreground mb-1.5">
          How geniuses were built — layer by layer
        </h3>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Every great mind in history started with the same foundation. Latin and Greek unlocked all other knowledge. Each layer builds on the last.
        </p>

        {/* Stack visualization */}
        <div className="space-y-1.5 mb-4">
          {stackLayers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5"
              style={{ marginLeft: `${i * 4}px` }}
            >
              <span className="text-sm">{layer.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-foreground">{layer.label}</span>
                <span className="text-[10px] text-muted-foreground ml-2">{layer.description}</span>
              </div>
              {i === 0 && (
                <span className="text-[9px] font-mono text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">START</span>
              )}
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate('/the-path')}
          className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
        >
          Begin The Path
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
