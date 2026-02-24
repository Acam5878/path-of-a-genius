import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, BookOpen } from 'lucide-react';
import { REGIONS } from '@/components/home/brain/brainRenderer';
import { cn } from '@/lib/utils';

interface IQScores {
  verbal_iq: number | null;
  numerical_iq: number | null;
  spatial_iq: number | null;
  logical_iq: number | null;
  memory_iq: number | null;
  pattern_recognition_iq: number | null;
}

const AXES = [
  {
    key: 'verbal_iq' as const, label: 'Verbal', region: 'wernicke', module: 'ancient-greek', icon: '🗣️',
    training: 'Ancient Greek & Latin',
    hook: 'Greek & Latin vocabulary builds the neural pathways that power articulate thinking.',
    action: 'Start with the Greek alphabet',
  },
  {
    key: 'logical_iq' as const, label: 'Logical', region: 'prefrontal', module: 'logic', icon: '⚖️',
    training: 'Logic & Critical Thinking',
    hook: 'Syllogisms and deduction sharpen the same circuits that made Mill the greatest debater of his age.',
    action: 'Learn your first syllogism',
  },
  {
    key: 'numerical_iq' as const, label: 'Numerical', region: 'leftParietal', module: 'mathematics', icon: '📐',
    training: 'Mathematics',
    hook: "Euclid's proofs train precision thinking — Einstein called it his 'sacred little geometry book.'",
    action: 'Begin with Euclid',
  },
  {
    key: 'pattern_recognition_iq' as const, label: 'Pattern', region: 'occipital', module: 'chemistry', icon: '⚗️',
    training: 'Chemistry & Visual Patterns',
    hook: 'Molecular structures and reaction patterns train the same visual cortex used by Da Vinci.',
    action: 'Explore molecular patterns',
  },
  {
    key: 'spatial_iq' as const, label: 'Spatial', region: 'rightParietal', module: 'physics', icon: '🔭',
    training: 'Natural Philosophy',
    hook: "Newton's laws and Archimedes' principles build the spatial intuition that unlocks physics.",
    action: 'Discover forces & motion',
  },
  {
    key: 'memory_iq' as const, label: 'Memory', region: 'leftTemporal', module: 'reading', icon: '📖',
    training: 'Deep Reading',
    hook: "Mill read Herodotus at 6. Sustained reading builds lasting neural connections no app can replicate.",
    action: 'Start the reading list',
  },
];

const CENTER = 120;
const MAX_R = 90;
const RINGS = [0.25, 0.5, 0.75, 1.0];

const normalize = (score: number | null): number => {
  if (!score || score <= 0) return 0.15;
  return Math.min(1, Math.max(0.1, (score - 60) / 100));
};

const polarToXY = (angle: number, radius: number): [number, number] => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
};

const getScoreLevel = (score: number | null): { label: string; color: string } => {
  if (!score || score <= 0) return { label: 'Untested', color: 'rgba(255,255,255,0.3)' };
  if (score < 85) return { label: 'Needs work', color: '#FF6B6B' };
  if (score < 100) return { label: 'Developing', color: '#FFAA44' };
  if (score < 115) return { label: 'Solid', color: '#44DD88' };
  return { label: 'Strong', color: '#44BBFF' };
};

interface Props {
  scores: IQScores | null;
  hasData: boolean;
}

export const IQRadarChart = ({ scores, hasData }: Props) => {
  const navigate = useNavigate();
  const [selectedAxis, setSelectedAxis] = useState<typeof AXES[0] | null>(null);

  const angleStep = 360 / AXES.length;

  const points = useMemo(() => {
    return AXES.map((axis, i) => {
      const angle = i * angleStep;
      const value = scores ? normalize(scores[axis.key]) : 0.15;
      const [x, y] = polarToXY(angle, value * MAX_R);
      return { x, y, value, axis, angle };
    });
  }, [scores]);

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

  // Sort axes by score to find strengths & weaknesses
  const ranked = useMemo(() => {
    if (!scores) return { weakest: null, strongest: null };
    const scored = AXES.map(axis => ({ axis, score: scores[axis.key] ?? 0 }))
      .filter(a => a.score > 0)
      .sort((a, b) => a.score - b.score);
    return {
      weakest: scored.length > 0 ? scored[0].axis : null,
      strongest: scored.length > 0 ? scored[scored.length - 1].axis : null,
    };
  }, [scores]);

  return (
    <div className="space-y-3">
      {/* SVG Radar */}
      <div className="flex justify-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-[280px]" style={{ overflow: 'visible' }}>
          {/* Background rings */}
          {RINGS.map((r, i) => {
            const ringPoints = AXES.map((_, j) => {
              const [x, y] = polarToXY(j * angleStep, r * MAX_R);
              return `${j === 0 ? 'M' : 'L'}${x},${y}`;
            }).join(' ') + 'Z';
            return (
              <path
                key={i}
                d={ringPoints}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={0.5}
              />
            );
          })}

          {/* Axis lines */}
          {AXES.map((axis, i) => {
            const angle = i * angleStep;
            const [x, y] = polarToXY(angle, MAX_R);
            const region = REGIONS[axis.region];
            const isSelected = selectedAxis?.key === axis.key;
            return (
              <line
                key={axis.key}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={isSelected ? region.glowColor : 'rgba(255,255,255,0.08)'}
                strokeWidth={isSelected ? 1 : 0.5}
              />
            );
          })}

          {/* Data polygon */}
          <motion.path
            d={polygonPath}
            fill="hsla(45, 90%, 55%, 0.12)"
            stroke="hsl(45, 90%, 55%)"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* Data points + labels */}
          {points.map((p, i) => {
            const region = REGIONS[p.axis.region];
            const isSelected = selectedAxis?.key === p.axis.key;
            const isWeak = ranked.weakest?.key === p.axis.key;
            const labelAngle = i * angleStep;
            const [lx, ly] = polarToXY(labelAngle, MAX_R + 18);

            return (
              <g
                key={p.axis.key}
                onClick={() => setSelectedAxis(isSelected ? null : p.axis)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 5 : 3.5}
                  fill={region.glowColor}
                  opacity={isSelected ? 1 : 0.8}
                  style={{ filter: `drop-shadow(0 0 ${isSelected ? 8 : 4}px ${region.glowColor})` }}
                />

                {hasData && scores && scores[p.axis.key] && (
                  <text
                    x={p.x}
                    y={p.y - 7}
                    textAnchor="middle"
                    fill={region.glowColor}
                    fontSize={isSelected ? 9 : 7}
                    fontFamily="monospace"
                    opacity={isSelected ? 1 : 0.7}
                  >
                    {scores[p.axis.key]}
                  </text>
                )}

                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? region.glowColor : isWeak ? '#FF6B6B' : 'rgba(255,255,255,0.5)'}
                  fontSize={9}
                  fontWeight={isSelected || isWeak ? 700 : 500}
                  fontFamily="system-ui"
                  style={isSelected ? { filter: `drop-shadow(0 0 6px ${region.glowColor})` } : undefined}
                >
                  {p.axis.label}
                </text>
                {isWeak && hasData && (
                  <text
                    x={lx}
                    y={ly + 10}
                    textAnchor="middle"
                    fill="#FF6B6B"
                    fontSize={6}
                    fontFamily="monospace"
                  >
                    ▼ weakest
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected axis detail panel */}
      <AnimatePresence>
        {selectedAxis && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: REGIONS[selectedAxis.region].glowColor,
                    boxShadow: `0 0 8px ${REGIONS[selectedAxis.region].glowColor}`,
                  }}
                />
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                  {REGIONS[selectedAxis.region].label}
                </span>
                {hasData && scores && scores[selectedAxis.key] && (
                  <span
                    className="text-[10px] font-mono font-bold ml-auto"
                    style={{ color: REGIONS[selectedAxis.region].glowColor }}
                  >
                    IQ: {scores[selectedAxis.key]}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed mb-2">
                {selectedAxis.hook}
              </p>
              <button
                onClick={() => navigate(`/the-path?module=${selectedAxis.module}`)}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-secondary hover:text-secondary/80 transition-colors"
              >
                {selectedAxis.action} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Training recommendations grid ── */}
      <div className="border-t border-white/10 pt-3 space-y-1.5">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono px-0.5 mb-2">
          {hasData ? 'How to improve each area' : 'Train every dimension'}
        </p>
        {AXES.map((axis, i) => {
          const region = REGIONS[axis.region];
          const score = scores?.[axis.key] ?? null;
          const level = getScoreLevel(score);
          const isWeak = ranked.weakest?.key === axis.key;
          const isStrong = ranked.strongest?.key === axis.key;

          return (
            <motion.button
              key={axis.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/the-path?module=${axis.module}`)}
              className={cn(
                'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all group',
                isWeak
                  ? 'bg-red-500/8 ring-1 ring-red-500/20 hover:bg-red-500/12'
                  : 'bg-white/[0.03] ring-1 ring-white/[0.06] hover:bg-white/[0.06]'
              )}
            >
              {/* Icon + color dot */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-base">{axis.icon}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: region.glowColor, boxShadow: `0 0 6px ${region.glowColor}` }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white/80">{axis.training}</span>
                  {isWeak && hasData && (
                    <span className="text-[8px] font-bold text-red-400 bg-red-500/15 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingDown className="w-2.5 h-2.5" /> Focus here
                    </span>
                  )}
                  {isStrong && hasData && (
                    <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> Strength
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-white/35 leading-tight line-clamp-1">
                  {axis.hook}
                </span>
              </div>

              {/* Score badge + arrow */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {hasData && score ? (
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ color: level.color, background: `${level.color}15` }}
                  >
                    {score}
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-white/20 px-1.5 py-0.5">—</span>
                )}
                <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-secondary transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* No data CTA */}
      {!hasData && (
        <button
          onClick={() => navigate('/iq-tests')}
          className="w-full flex items-center justify-center gap-2 text-xs text-secondary font-medium py-2 rounded-xl bg-secondary/10 hover:bg-secondary/15 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Take an IQ test to reveal your profile
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
