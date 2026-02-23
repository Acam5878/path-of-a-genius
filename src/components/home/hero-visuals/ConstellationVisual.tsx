import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Q3 – Newton: An animated knowledge constellation connecting
 * Einstein → Da Vinci → Newton with glowing lines and twinkling stars.
 */

interface ConstellationVisualProps {
  answered: boolean;
  correct: boolean;
  /** How many questions answered so far (0-2 before this one) */
  questionsCompleted: number;
}

// Node positions in SVG coordinates (viewBox 0 0 300 200)
const nodes = [
  { id: 'einstein', label: '🧠', name: 'Einstein', x: 60, y: 50 },
  { id: 'davinci', label: '🎨', name: 'Da Vinci', x: 150, y: 35 },
  { id: 'newton', label: '🍎', name: 'Newton', x: 240, y: 55 },
  // Background constellation stars
  { id: 'star1', label: '✦', name: '', x: 30, y: 140 },
  { id: 'star2', label: '✦', name: '', x: 110, y: 160 },
  { id: 'star3', label: '✦', name: '', x: 200, y: 150 },
  { id: 'star4', label: '✦', name: '', x: 270, y: 130 },
];

const connections = [
  { from: 'einstein', to: 'davinci' },
  { from: 'davinci', to: 'newton' },
  { from: 'einstein', to: 'newton' },
  // Background constellation lines
  { from: 'star1', to: 'star2' },
  { from: 'star2', to: 'star3' },
  { from: 'star3', to: 'star4' },
  { from: 'star1', to: 'einstein' },
  { from: 'star4', to: 'newton' },
];

export const ConstellationVisual = ({ answered, correct, questionsCompleted }: ConstellationVisualProps) => {
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), []);

  // Twinkling background stars
  const bgStars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 200,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="relative w-full max-w-xs mx-auto mb-4">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Background stars */}
        {bgStars.map((s) => (
          <motion.circle
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={s.size}
            fill="hsl(var(--secondary) / 0.3)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}

        {/* Connection lines */}
        {connections.map(({ from, to }, i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          const isMain = ['einstein', 'davinci', 'newton'].includes(from) && ['einstein', 'davinci', 'newton'].includes(to);
          return (
            <motion.line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isMain ? 'hsl(var(--secondary))' : 'hsl(var(--secondary) / 0.15)'}
              strokeWidth={isMain ? 1.5 : 0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isMain ? 0.6 : 0.3 }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.15 }}
            />
          );
        })}

        {/* Flowing dots along main connections */}
        {connections.slice(0, 3).map(({ from, to }, i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          return (
            <motion.circle
              key={`dot-${i}`}
              r={2}
              fill="hsl(var(--secondary))"
              filter="url(#glow)"
              initial={{ cx: a.x, cy: a.y }}
              animate={{ cx: [a.x, b.x], cy: [a.y, b.y] }}
              transition={{
                duration: 2 + i * 0.5,
                delay: 1 + i * 0.8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Genius nodes */}
        {nodes.slice(0, 3).map((node, i) => {
          const isActive = i <= questionsCompleted;
          return (
            <g key={node.id}>
              {/* Glow ring */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill="none"
                stroke={isActive ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground) / 0.2)'}
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                  opacity: isActive ? [0.4, 0.8, 0.4] : 0.3,
                }}
                transition={
                  isActive
                    ? { duration: 2, repeat: Infinity, delay: i * 0.3 }
                    : { duration: 0.5, delay: 0.5 + i * 0.2 }
                }
              />
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill={isActive ? 'hsl(var(--secondary) / 0.15)' : 'hsl(var(--muted) / 0.5)'}
                stroke={isActive ? 'hsl(var(--secondary) / 0.5)' : 'hsl(var(--border))'}
                strokeWidth={1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 + i * 0.15 }}
              />
              {/* Emoji */}
              <motion.text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                {node.label}
              </motion.text>
              {/* Name label */}
              <motion.text
                x={node.x}
                y={node.y + 30}
                textAnchor="middle"
                fontSize={8}
                fill={isActive ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground))'}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.7 + i * 0.15 }}
              >
                {node.name}
              </motion.text>
            </g>
          );
        })}

        {/* Burst effect on correct answer */}
        {answered && correct && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const node = nodes[2]; // Newton
              return (
                <motion.circle
                  key={`burst-${i}`}
                  cx={node.x}
                  cy={node.y}
                  r={2}
                  fill="hsl(var(--secondary))"
                  initial={{ cx: node.x, cy: node.y, opacity: 1 }}
                  animate={{
                    cx: node.x + Math.cos(angle) * 40,
                    cy: node.y + Math.sin(angle) * 40,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
};
