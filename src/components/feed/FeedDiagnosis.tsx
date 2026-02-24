import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { COGNITIVE_STRUGGLES } from '@/data/cognitiveStruggles';
import { REGIONS } from '@/components/home/brain/brainRenderer';

interface FeedDiagnosisProps {
  onSelect?: (struggleIds: string[], regionIds: string[]) => void;
}

export const FeedDiagnosis = ({ onSelect }: FeedDiagnosisProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const regions = new Set<string>();
    COGNITIVE_STRUGGLES.filter(s => selected.has(s.id)).forEach(s => s.brainRegions.forEach(r => regions.add(r)));
    onSelect?.(Array.from(selected), Array.from(regions));
  };

  const selectedStruggles = COGNITIVE_STRUGGLES.filter(s => selected.has(s.id));
  const activeRegions = new Set<string>();
  selectedStruggles.forEach(s => s.brainRegions.forEach(r => activeRegions.add(r)));

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/20 flex items-center justify-center"
            >
              <Brain className="w-7 h-7 text-secondary" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-widest text-secondary text-center mb-2"
            >
              Self-Diagnosis
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-heading font-bold text-white text-center mb-1"
            >
              What do you struggle with?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-white/50 text-center mb-6"
            >
              Select all that apply — we'll show you which brain regions need training
            </motion.p>

            <div className="grid grid-cols-2 gap-2.5">
              {COGNITIVE_STRUGGLES.map((struggle, i) => (
                <motion.button
                  key={struggle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={(e) => { e.stopPropagation(); toggle(struggle.id); }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                    selected.has(struggle.id)
                      ? 'border-secondary/50 bg-secondary/15 ring-1 ring-secondary/30'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl mb-1">{struggle.icon}</span>
                  <span className={`text-xs font-semibold ${selected.has(struggle.id) ? 'text-secondary' : 'text-white/80'}`}>
                    {struggle.label}
                  </span>
                  <span className="text-[9px] text-white/40 leading-tight mt-0.5">
                    {struggle.description}
                  </span>
                </motion.button>
              ))}
            </div>

            {selected.size > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                className="w-full mt-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/90 transition-colors"
              >
                Show me my brain →
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-mono uppercase tracking-widest text-secondary mb-3"
            >
              Your training targets
            </motion.p>

            <div className="space-y-2 mb-4">
              {Array.from(activeRegions).map((regionId, i) => {
                const region = REGIONS[regionId];
                if (!region) return null;
                return (
                  <motion.div
                    key={regionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: region.glowColor, boxShadow: `0 0 8px ${region.glowColor}` }}
                    />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">{region.label}</p>
                      <p className="text-[10px] text-white/50">{region.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {selectedStruggles.length > 0 && (
              <div className="space-y-1.5 mb-4">
                {selectedStruggles.map((s, i) => (
                  <motion.p
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="text-[11px] text-secondary/80 leading-relaxed"
                  >
                    {s.icon} {s.benefit}
                  </motion.p>
                ))}
              </div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[10px] text-white/30"
            >
              Swipe to continue →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
