import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { REGIONS } from '@/components/home/brain/brainRenderer';

interface IQScores {
  verbal_iq: number | null;
  numerical_iq: number | null;
  spatial_iq: number | null;
  logical_iq: number | null;
  memory_iq: number | null;
  pattern_recognition_iq: number | null;
}

const AXES = [
  { key: 'verbal_iq' as const, label: 'Verbal', region: 'wernicke', module: 'ancient-greek', icon: '🗣️' },
  { key: 'logical_iq' as const, label: 'Logical', region: 'prefrontal', module: 'logic', icon: '⚖️' },
  { key: 'numerical_iq' as const, label: 'Numerical', region: 'leftParietal', module: 'mathematics', icon: '🔢' },
  { key: 'pattern_recognition_iq' as const, label: 'Pattern', region: 'occipital', module: 'chemistry', icon: '🔬' },
  { key: 'spatial_iq' as const, label: 'Spatial', region: 'rightParietal', module: 'physics', icon: '📐' },
  { key: 'memory_iq' as const, label: 'Memory', region: 'leftTemporal', module: 'reading', icon: '🧠' },
];

const CENTER = 120;
const MAX_R = 90;
const RINGS = [0.25, 0.5, 0.75, 1.0];

// Normalize IQ score (typically 60-160) to 0-1 range
const normalize = (score: number | null): number => {
  if (!score || score <= 0) return 0.15; // Small base so the shape is visible
  return Math.min(1, Math.max(0.1, (score - 60) / 100));
};

const polarToXY = (angle: number, radius: number): [number, number] => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
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

  // Find weakest axis
  const weakest = useMemo(() => {
    if (!scores) return null;
    let min = Infinity;
    let minAxis: typeof AXES[0] | null = null;
    AXES.forEach(axis => {
      const v = scores[axis.key];
      if (v !== null && v > 0 && v < min) {
        min = v;
        minAxis = axis;
      }
    });
    return minAxis;
  }, [scores]);

  return (
    <div className="space-y-2">
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
            const isWeak = weakest?.key === axis.key;
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

          {/* Data polygon — animated */}
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
            const isWeak = weakest?.key === p.axis.key;
            const labelAngle = i * angleStep;
            const [lx, ly] = polarToXY(labelAngle, MAX_R + 18);

            return (
              <g
                key={p.axis.key}
                onClick={() => setSelectedAxis(isSelected ? null : p.axis)}
                className="cursor-pointer"
              >
                {/* Dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 5 : 3.5}
                  fill={region.glowColor}
                  stroke={isSelected ? region.glowColor : 'none'}
                  strokeWidth={isSelected ? 2 : 0}
                  opacity={isSelected ? 1 : 0.8}
                  style={{ filter: `drop-shadow(0 0 ${isSelected ? 8 : 4}px ${region.glowColor})` }}
                />

                {/* Score text near dot */}
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

                {/* Label */}
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

      {/* Selected axis info panel */}
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
                {REGIONS[selectedAxis.region].desc}
              </p>
              <button
                onClick={() => navigate(`/the-path?module=${selectedAxis.module}`)}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-secondary hover:text-secondary/80 transition-colors"
              >
                Train {selectedAxis.label} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No data prompt */}
      {!hasData && (
        <button
          onClick={() => navigate('/iq-tests')}
          className="w-full flex items-center justify-center gap-2 text-xs text-secondary font-medium py-2 hover:text-secondary/80 transition-colors"
        >
          Take an IQ test to map your brain <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
