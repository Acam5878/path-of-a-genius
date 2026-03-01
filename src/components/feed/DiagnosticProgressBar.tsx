import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface DiagnosticProgressBarProps {
  current: number; // 0-indexed
  total: number;
}

export const DiagnosticProgressBar = ({ current, total }: DiagnosticProgressBarProps) => {
  const displayCurrent = Math.min(current + 1, total);
  const progress = (displayCurrent / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Brain className="w-4 h-4 text-secondary" />
          </motion.div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/60">
            <span className="text-secondary font-bold">{displayCurrent}</span>
            <span className="text-white/30">/{total}</span>
            {' · '}
            <span className="text-white/50">Analysing Your Brain</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-secondary/80 to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};
