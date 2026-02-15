import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const QUOTES = [
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "Imagination is more important than knowledge.", author: "Einstein" },
  { text: "I think, therefore I am.", author: "Descartes" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "Simplicity is the ultimate sophistication.", author: "da Vinci" },
];

const SUBJECTS = ['📜', '🧠', '📐', '💭', '📖', '⚡', '⚙️', '🎨', '⚖️', '🔬'];

const LeftPanel = () => (
  <div className="hidden xl:flex flex-col items-end gap-6 pt-28 pr-6 w-48 shrink-0 sticky top-0 h-screen overflow-hidden">
    {/* Decorative subject icons */}
    <div className="flex flex-col items-center gap-4 opacity-20">
      {SUBJECTS.slice(0, 5).map((icon, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.2 }}
          className="text-2xl"
        >
          {icon}
        </motion.span>
      ))}
    </div>

    {/* Vertical line */}
    <div className="w-px h-32 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

    {/* Quote */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-right max-w-[160px]"
    >
      <Quote className="w-3.5 h-3.5 text-secondary/40 ml-auto mb-1.5" />
      <p className="text-xs text-muted-foreground/60 italic leading-relaxed">
        "{QUOTES[0].text}"
      </p>
      <p className="text-[10px] text-muted-foreground/40 mt-1">— {QUOTES[0].author}</p>
    </motion.div>

    <div className="w-px h-20 bg-gradient-to-b from-transparent via-secondary/15 to-transparent" />

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="text-right max-w-[160px]"
    >
      <p className="text-xs text-muted-foreground/60 italic leading-relaxed">
        "{QUOTES[2].text}"
      </p>
      <p className="text-[10px] text-muted-foreground/40 mt-1">— {QUOTES[2].author}</p>
    </motion.div>
  </div>
);

const RightPanel = () => (
  <div className="hidden xl:flex flex-col items-start gap-6 pt-28 pl-6 w-48 shrink-0 sticky top-0 h-screen overflow-hidden">
    {/* Quote */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-left max-w-[160px]"
    >
      <Quote className="w-3.5 h-3.5 text-secondary/40 mb-1.5" />
      <p className="text-xs text-muted-foreground/60 italic leading-relaxed">
        "{QUOTES[1].text}"
      </p>
      <p className="text-[10px] text-muted-foreground/40 mt-1">— {QUOTES[1].author}</p>
    </motion.div>

    <div className="w-px h-20 bg-gradient-to-b from-transparent via-secondary/15 to-transparent" />

    {/* Decorative subject icons */}
    <div className="flex flex-col items-center gap-4 opacity-20">
      {SUBJECTS.slice(5).map((icon, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 + i * 0.2 }}
          className="text-2xl"
        >
          {icon}
        </motion.span>
      ))}
    </div>

    <div className="w-px h-32 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
      className="text-left max-w-[160px]"
    >
      <p className="text-xs text-muted-foreground/60 italic leading-relaxed">
        "{QUOTES[5].text}"
      </p>
      <p className="text-[10px] text-muted-foreground/40 mt-1">— {QUOTES[5].author}</p>
    </motion.div>
  </div>
);

export const DesktopSidePanels = { Left: LeftPanel, Right: RightPanel };
