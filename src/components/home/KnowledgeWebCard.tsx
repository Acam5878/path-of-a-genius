import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// All coordinates in a 0-1000 square SVG viewBox — compact layout
const NODES = [
  { id: 'greek', label: 'Greek & Latin', cx: 160, cy: 120, icon: '📜' },
  { id: 'logic', label: 'Logic', cx: 500, cy: 50, icon: '🧠' },
  { id: 'math', label: 'Mathematics', cx: 840, cy: 120, icon: '📐' },
  { id: 'philosophy', label: 'Philosophy', cx: 100, cy: 400, icon: '💭' },
  { id: 'history', label: 'History', cx: 330, cy: 280, icon: '📖' },
  { id: 'physics', label: 'Physics', cx: 900, cy: 400, icon: '⚡' },
  { id: 'engineering', label: 'Engineering', cx: 670, cy: 280, icon: '⚙️' },
  { id: 'art', label: 'Art & Literature', cx: 260, cy: 560, icon: '🎨' },
  { id: 'ethics', label: 'Ethics', cx: 500, cy: 480, icon: '⚖️' },
  { id: 'science', label: 'Science', cx: 740, cy: 560, icon: '🔬' },
];

const EDGES: [string, string][] = [
  ['greek', 'logic'], ['greek', 'philosophy'], ['greek', 'history'],
  ['greek', 'art'],
  ['logic', 'math'], ['logic', 'philosophy'], ['logic', 'engineering'],
  ['logic', 'ethics'], ['logic', 'science'],
  ['math', 'physics'], ['math', 'engineering'], ['math', 'science'],
  ['philosophy', 'ethics'], ['philosophy', 'history'], ['philosophy', 'art'],
  ['philosophy', 'science'],
  ['history', 'art'], ['history', 'ethics'], ['history', 'engineering'],
  ['physics', 'engineering'], ['physics', 'science'],
  ['engineering', 'science'],
  ['art', 'ethics'],
  ['ethics', 'science'],
];

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

const GENIUSES = [
  { name: 'Mill', cx: (100 + 330) / 2, cy: (400 + 280) / 2 },
  { name: 'Aristotle', cx: (100 + 500) / 2, cy: (400 + 480) / 2 },
  { name: 'da Vinci', cx: (330 + 500) / 2, cy: (280 + 480) / 2 },
  { name: 'Newton', cx: (840 + 900) / 2, cy: (120 + 400) / 2 },
  { name: 'Einstein', cx: (900 + 740) / 2, cy: (400 + 560) / 2 },
  { name: 'Pascal', cx: (500 + 840) / 2, cy: (50 + 120) / 2 },
  { name: 'Leibniz', cx: (500 + 670) / 2, cy: (50 + 280) / 2 },
  { name: 'Curie', cx: (500 + 740) / 2, cy: (480 + 560) / 2 },
  { name: 'Tesla', cx: (900 + 670) / 2, cy: (400 + 280) / 2 },
  { name: 'Goethe', cx: (260 + 500) / 2, cy: (560 + 480) / 2 },
];

const ICON_R = 24;

// Animated line with pulsing opacity
const PulsingLine = ({ from, to, index }: { from: typeof NODES[0]; to: typeof NODES[0]; index: number }) => (
  <motion.line
    x1={from.cx} y1={from.cy}
    x2={to.cx} y2={to.cy}
    stroke="hsla(43, 62%, 52%, 0.3)"
    strokeWidth="1.5"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0.15, 0.3] }}
    transition={{
      delay: 0.3 + index * 0.04,
      duration: 4,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }}
  />
);

export const KnowledgeWebCard = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-4 rounded-2xl border border-border overflow-hidden bg-gradient-to-b from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)]"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-2 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-2"
        >
          Why This Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-xl font-heading font-bold text-white leading-tight"
        >
          Everything is{' '}
          <span className="text-secondary">connected.</span>
          <br />
          The geniuses knew it.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm mt-1.5 leading-relaxed"
        >
          Latin unlocks science. Logic sharpens mathematics. Philosophy deepens art. Every subject strengthens the others.
        </motion.p>
      </div>

      {/* Knowledge Web — square SVG */}
      <svg
        viewBox="0 0 1000 630"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines with pulse */}
        {isVisible && EDGES.map(([fromId, toId], i) => (
          <PulsingLine
            key={`${fromId}-${toId}`}
            from={nodeMap[fromId]}
            to={nodeMap[toId]}
            index={i}
          />
        ))}

        {/* Subject nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          >
            <circle
              cx={node.cx} cy={node.cy} r={ICON_R}
              fill="hsl(217, 30%, 18%)"
              stroke="hsla(43, 62%, 52%, 0.25)"
              strokeWidth="1.5"
            />
            <foreignObject
              x={node.cx - ICON_R} y={node.cy - ICON_R}
              width={ICON_R * 2} height={ICON_R * 2}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontSize: 16 }}>{node.icon}</span>
              </div>
            </foreignObject>
            <text
              x={node.cx} y={node.cy + ICON_R + 14}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontWeight="600"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Genius labels */}
        {GENIUSES.map((g, i) => (
          <motion.text
            key={g.name}
            x={g.cx} y={g.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsla(43, 62%, 52%, 0.5)"
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
          >
            {g.name.toUpperCase()}
          </motion.text>
        ))}
      </svg>

      {/* CTA */}
      <div className="px-5 pb-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <p className="text-white/70 text-xs leading-relaxed mb-3">
            <span className="text-white font-semibold">The Path of a Genius</span> teaches these subjects the way they were designed to be learned — interconnected, building on each other, unlocking your full cognitive potential.
          </p>
          <Button
            onClick={() => navigate('/the-path')}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 text-sm font-semibold rounded-xl"
          >
            Explore The Path
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
