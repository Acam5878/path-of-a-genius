import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface PageExplainerProps {
  pageKey: string;
  icon?: string;
  title: string;
  description: string;
  tips?: string[];
}

const DISMISSED_KEY_PREFIX = 'genius-explainer-seen-';

export const PageExplainer = ({ pageKey, icon, title, description, tips }: PageExplainerProps) => {
  const storageKey = `${DISMISSED_KEY_PREFIX}${pageKey}`;
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(storageKey) === '1');

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(storageKey, '1');
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="mx-4 bg-gradient-to-br from-secondary/10 to-accent/5 rounded-xl border border-secondary/20 p-4 relative"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          {icon ? (
            <span className="text-2xl shrink-0">{icon}</span>
          ) : (
            <HelpCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
            {tips && tips.length > 0 && (
              <ul className="mt-2 space-y-1">
                {tips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
