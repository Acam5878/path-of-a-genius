import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface IQBellCurveProps {
  userIQ: number;
}

const getClassification = (iq: number): string => {
  if (iq >= 145) return 'Genius';
  if (iq >= 130) return 'Very Superior';
  if (iq >= 120) return 'Superior';
  if (iq >= 110) return 'High Average';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Low Average';
  return 'Below Average';
};

const getPercentile = (iq: number): number => {
  // Approximate percentile from IQ using normal distribution (mean=100, sd=15)
  const z = (iq - 100) / 15;
  // Simple approximation of cumulative normal distribution
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return Math.round((z > 0 ? (1 - p) : p) * 100);
};

export const IQBellCurve = ({ userIQ }: IQBellCurveProps) => {
  const percentile = getPercentile(userIQ);
  const classification = getClassification(userIQ);

  // Generate bell curve points
  const curvePoints = useMemo(() => {
    const points: string[] = [];
    const width = 280;
    const height = 80;
    
    for (let i = 0; i <= width; i++) {
      const x = i;
      const iq = 55 + (i / width) * 90; // IQ range 55-145
      const z = (iq - 100) / 15;
      const y = height - (Math.exp(-z * z / 2) * height * 0.95);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }, []);

  // Position of user marker (0-280)
  const markerX = Math.max(0, Math.min(280, ((userIQ - 55) / 90) * 280));

  // Filled area points (up to user's IQ)
  const filledPoints = useMemo(() => {
    const points: string[] = [`0,80`];
    const width = 280;
    const height = 80;
    const maxI = Math.max(0, Math.min(width, ((userIQ - 55) / 90) * width));
    
    for (let i = 0; i <= maxI; i++) {
      const iq = 55 + (i / width) * 90;
      const z = (iq - 100) / 15;
      const y = height - (Math.exp(-z * z / 2) * height * 0.95);
      points.push(`${i},${y}`);
    }
    points.push(`${maxI},80`);
    return points.join(' ');
  }, [userIQ]);

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground">Population Distribution</p>
        <span className="text-xs font-mono font-semibold text-secondary">
          Top {100 - percentile}%
        </span>
      </div>

      <div className="relative">
        <svg viewBox="0 0 280 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Filled area under curve up to user's position */}
          <polygon
            points={filledPoints}
            fill="hsl(var(--secondary))"
            opacity="0.15"
          />
          
          {/* Bell curve line */}
          <polyline
            points={curvePoints}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* User marker line */}
          <line
            x1={markerX}
            y1={0}
            x2={markerX}
            y2={80}
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            strokeDasharray="3,2"
          />

          {/* User marker dot */}
          <circle
            cx={markerX}
            cy={(() => {
              const z = (userIQ - 100) / 15;
              return 80 - (Math.exp(-z * z / 2) * 80 * 0.95);
            })()}
            r="4"
            fill="hsl(var(--secondary))"
          />

          {/* IQ labels */}
          <text x="0" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.6">55</text>
          <text x="93" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.6">85</text>
          <text x="140" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="bold" opacity="0.8">100</text>
          <text x="187" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.6">115</text>
          <text x="234" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.6">130</text>
          <text x="276" y="95" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.6">145</text>
        </svg>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          Your IQ: <span className="font-mono font-bold text-foreground">{userIQ}</span>
        </span>
        <span className="text-xs font-medium text-secondary">{classification}</span>
      </div>
    </div>
  );
};
