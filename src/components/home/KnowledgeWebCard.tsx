import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// All coordinates in a 0-1000 SVG viewBox
const NODES = [
  { id: 'greek', label: 'Greek & Latin', cx: 180, cy: 150, icon: '📜' },
  { id: 'logic', label: 'Logic', cx: 500, cy: 80, icon: '🧠' },
  { id: 'math', label: 'Mathematics', cx: 820, cy: 150, icon: '📐' },
  { id: 'philosophy', label: 'Philosophy', cx: 120, cy: 550, icon: '💭' },
  { id: 'history', label: 'History', cx: 340, cy: 380, icon: '📖' },
  { id: 'physics', label: 'Physics', cx: 880, cy: 550, icon: '⚡' },
  { id: 'engineering', label: 'Engineering', cx: 660, cy: 380, icon: '⚙️' },
  { id: 'art', label: 'Art & Literature', cx: 300, cy: 780, icon: '🎨' },
  { id: 'ethics', label: 'Ethics', cx: 500, cy: 650, icon: '⚖️' },
  { id: 'science', label: 'Science', cx: 700, cy: 780, icon: '🔬' },
];

// Liberal connections
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

// Geniuses at exact edge midpoints
const GENIUSES = [
  { name: 'Mill', cx: (120 + 340) / 2, cy: (550 + 380) / 2, delay: 1.5 },
  { name: 'Aristotle', cx: (120 + 500) / 2, cy: (550 + 650) / 2, delay: 1.7 },
  { name: 'da Vinci', cx: (340 + 500) / 2, cy: (380 + 650) / 2, delay: 1.9 },
  { name: 'Newton', cx: (820 + 880) / 2, cy: (150 + 550) / 2, delay: 2.1 },
  { name: 'Einstein', cx: (880 + 700) / 2, cy: (550 + 780) / 2, delay: 2.3 },
  { name: 'Pascal', cx: (500 + 820) / 2, cy: (80 + 150) / 2, delay: 2.5 },
  { name: 'Leibniz', cx: (500 + 660) / 2, cy: (80 + 380) / 2, delay: 2.7 },
  { name: 'Curie', cx: (500 + 700) / 2, cy: (650 + 780) / 2, delay: 2.9 },
  { name: 'Tesla', cx: (880 + 660) / 2, cy: (550 + 380) / 2, delay: 3.1 },
  { name: 'Goethe', cx: (300 + 500) / 2, cy: (780 + 650) / 2, delay: 3.3 },
];

const ICON_R = 40; // icon circle radius in SVG units

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

  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-4 rounded-2xl border border-border overflow-hidden bg-gradient-to-b from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)]"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 relative z-10">
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
          className="text-white/50 text-sm mt-2 leading-relaxed"
        >
          Latin unlocks science. Logic sharpens mathematics. Philosophy deepens art. Every subject strengthens the others.
        </motion.p>
      </div>

      {/* Knowledge Web - single SVG for guaranteed alignment */}
      <div className="relative w-full" style={{ aspectRatio: '10 / 9' }}>
        <svg
          viewBox="0 0 1000 900"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection lines */}
          {isVisible && EDGES.map(([fromId, toId], i) => {
            const from = nodeMap[fromId];
            const to = nodeMap[toId];
            return (
              <motion.line
                key={`${fromId}-${toId}`}
                x1={from.cx} y1={from.cy}
                x2={to.cx} y2={to.cy}
                stroke="hsla(43, 62%, 52%, 0.15)"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
              />
            );
          })}

          {/* Subject nodes */}
          {NODES.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            >
              {/* Circle background */}
              <circle
                cx={node.cx} cy={node.cy} r={ICON_R}
                fill="hsl(217, 30%, 18%)"
                stroke="hsla(43, 62%, 52%, 0.25)"
                strokeWidth="1.5"
              />
              {/* Emoji icon */}
              <foreignObject
                x={node.cx - ICON_R} y={node.cy - ICON_R}
                width={ICON_R * 2} height={ICON_R * 2}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontSize: 28 }}>{node.icon}</span>
                </div>
              </foreignObject>
              {/* Label */}
              <text
                x={node.cx} y={node.cy + ICON_R + 22}
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="14"
                fontWeight="600"
              >
                {node.label}
              </text>
            </motion.g>
          ))}

          {/* Genius labels */}
          {GENIUSES.map((g) => (
            <motion.text
              key={g.name}
              x={g.cx} y={g.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsla(43, 62%, 52%, 0.3)"
              fontSize="12"
              fontWeight="700"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: g.delay, duration: 0.6 }}
            >
              {g.name.toUpperCase()}
            </motion.text>
          ))}
        </svg>
      </div>

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
