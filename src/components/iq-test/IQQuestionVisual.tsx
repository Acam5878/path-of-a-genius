import { motion } from 'framer-motion';
import { IQQuestion } from '@/data/iqTypes';

/**
 * Generates inline SVG visual aids for spatial/pattern IQ questions
 * that benefit from diagrams rather than text-only descriptions.
 */

// Map question IDs or keywords to visual generators
const VISUAL_GENERATORS: Record<string, (q: IQQuestion) => JSX.Element | null> = {};

// Helper: render a simple shape grid
const ShapeRow = ({ shapes, label }: { shapes: string[]; label?: string }) => (
  <div className="flex flex-col items-center gap-1">
    {label && <span className="text-[9px] text-muted-foreground font-mono uppercase">{label}</span>}
    <div className="flex items-center gap-2">
      {shapes.map((s, i) => (
        <span key={i} className="text-2xl">{s}</span>
      ))}
    </div>
  </div>
);

// Rotation visual: show arrow pointing in directions
const RotationVisual = ({ degrees, startDirection = 'up' }: { degrees: number; startDirection?: string }) => {
  const startAngle = startDirection === 'up' ? 0 : startDirection === 'right' ? 90 : startDirection === 'down' ? 180 : 270;
  
  return (
    <div className="flex items-center gap-4 justify-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-muted-foreground font-mono">START</span>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
          <line
            x1="24" y1="24"
            x2={24 + 14 * Math.sin((startAngle * Math.PI) / 180)}
            y2={24 - 14 * Math.cos((startAngle * Math.PI) / 180)}
            stroke="hsl(var(--secondary))"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="3" fill="hsl(var(--secondary))" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: degrees }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
          className="text-secondary text-lg"
        >
          ↻
        </motion.div>
        <span className="text-[10px] text-secondary font-mono">{degrees}°</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-muted-foreground font-mono">?</span>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
          <circle cx="24" cy="24" r="3" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          <text x="24" y="28" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="14" opacity="0.5">?</text>
        </svg>
      </div>
    </div>
  );
};

// Net folding visual
const NetVisual = ({ shape }: { shape: 'cross' | 'triangle' }) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-muted-foreground font-mono">FLAT NET</span>
      {shape === 'cross' ? (
        <svg width="64" height="64" viewBox="0 0 64 64">
          <rect x="22" y="2" width="20" height="20" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <rect x="2" y="22" width="20" height="20" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <rect x="22" y="22" width="20" height="20" fill="hsl(var(--secondary))" fillOpacity="0.15" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <rect x="42" y="22" width="20" height="20" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <rect x="22" y="42" width="20" height="20" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg width="64" height="64" viewBox="0 0 64 64">
          <polygon points="32,4 4,56 60,56" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
        </svg>
      )}
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-secondary text-lg"
    >
      → ?
    </motion.div>
  </div>
);

// Mirror reflection visual for letter questions
const MirrorVisual = ({ letter, axis }: { letter: string; axis: 'horizontal' | 'vertical' }) => (
  <div className="flex items-center gap-3 justify-center">
    <span className="text-3xl font-bold text-foreground">{letter}</span>
    <div className="flex flex-col items-center">
      {axis === 'horizontal' ? (
        <svg width="24" height="40" viewBox="0 0 24 40">
          <line x1="12" y1="0" x2="12" y2="40" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="4,3" />
          <text x="12" y="38" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">↔</text>
        </svg>
      ) : (
        <svg width="40" height="24" viewBox="0 0 40 24">
          <line x1="0" y1="12" x2="40" y2="12" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="4,3" />
          <text x="20" y="22" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">↕</text>
        </svg>
      )}
    </div>
    <span className="text-3xl font-bold text-muted-foreground/40">?</span>
  </div>
);

// Cube visual
const CubeVisual = ({ variant = 'basic' }: { variant?: 'basic' | 'painted' | 'view' }) => (
  <div className="flex justify-center">
    <svg width="80" height="80" viewBox="0 0 80 80">
      {/* Isometric cube */}
      <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
      <line x1="40" y1="10" x2="40" y2="40" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="25" x2="40" y2="40" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="25" x2="40" y2="40" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.5" />
      {/* Top face */}
      <polygon points="40,10 70,25 40,40 10,25" fill="hsl(var(--secondary))" fillOpacity="0.1" />
      {/* Right face */}
      <polygon points="70,25 70,55 40,70 40,40" fill="hsl(var(--secondary))" fillOpacity="0.06" />
      {variant === 'painted' && (
        <>
          <text x="40" y="78" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">3×3×3</text>
          {/* Grid lines on top face */}
          <line x1="20" y1="17.5" x2="50" y2="32.5" stroke="hsl(var(--secondary))" strokeWidth="0.5" opacity="0.4" />
          <line x1="30" y1="12.5" x2="60" y2="27.5" stroke="hsl(var(--secondary))" strokeWidth="0.5" opacity="0.4" />
        </>
      )}
    </svg>
  </div>
);

// Cross-section visual
const CrossSectionVisual = ({ shape, cut }: { shape: string; cut: string }) => (
  <div className="flex items-center gap-3 justify-center">
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-muted-foreground font-mono">{shape.toUpperCase()}</span>
      <svg width="48" height="48" viewBox="0 0 48 48">
        {shape === 'cone' && (
          <>
            <polygon points="24,6 6,42 42,42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <line x1="6" y1="28" x2="42" y2="28" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="3,2" />
          </>
        )}
        {shape === 'cylinder' && (
          <>
            <rect x="10" y="8" width="28" height="32" rx="2" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <ellipse cx="24" cy="8" rx="14" ry="4" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <line x1="24" y1="4" x2="24" y2="44" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="3,2" />
          </>
        )}
        {shape === 'sphere' && (
          <>
            <circle cx="24" cy="24" r="18" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <line x1="6" y1="24" x2="42" y2="24" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="3,2" />
          </>
        )}
      </svg>
    </div>
    <span className="text-secondary text-sm">→ ?</span>
  </div>
);

/**
 * Determines if a question benefits from a visual and returns the appropriate component.
 */
export function getQuestionVisual(question: IQQuestion): JSX.Element | null {
  const q = question.question.toLowerCase();
  const id = question.id;

  // Rotation questions
  if (q.includes('rotate') && q.includes('45°')) {
    return <RotationVisual degrees={180} startDirection="up" />;
  }
  if (q.includes('rotate') && q.includes('180°') && q.includes('letter')) {
    const letterMatch = question.question.match(/letter "(\w)"/);
    if (letterMatch) return <MirrorVisual letter={letterMatch[1]} axis="horizontal" />;
  }
  if (q.includes('rotate') && q.includes('90°') && q.includes('square')) {
    return <RotationVisual degrees={90} />;
  }

  // Reflection/mirror questions
  if (q.includes('reflect') && q.includes('horizontally')) {
    const letterMatch = question.question.match(/letter "(\w)"/);
    if (letterMatch) return <MirrorVisual letter={letterMatch[1]} axis="horizontal" />;
  }
  if (q.includes('reflect') && q.includes('vertically')) {
    const letterMatch = question.question.match(/letter "(\w)"/);
    if (letterMatch) return <MirrorVisual letter={letterMatch[1]} axis="vertical" />;
  }
  if (q.includes('mirror')) {
    return <MirrorVisual letter="A" axis="horizontal" />;
  }

  // Net/folding questions
  if (q.includes('fold') && q.includes('cross shape')) {
    return <NetVisual shape="cross" />;
  }

  // Cube questions with painted faces
  if (q.includes('painted') && q.includes('cube') && q.includes('27')) {
    return <CubeVisual variant="painted" />;
  }

  // Cross-section questions
  if (q.includes('cut') && q.includes('cone')) {
    return <CrossSectionVisual shape="cone" cut="horizontal" />;
  }
  if (q.includes('cut') && q.includes('cylinder') && q.includes('vertically')) {
    return <CrossSectionVisual shape="cylinder" cut="vertical" />;
  }
  if (q.includes('sphere') && q.includes('cut') || q.includes('sphere') && q.includes('half')) {
    return <CrossSectionVisual shape="sphere" cut="horizontal" />;
  }

  // Basic cube questions
  if (q.includes('cube') && (q.includes('faces') || q.includes('vertices') || q.includes('edges') || q.includes('look at'))) {
    return <CubeVisual variant="basic" />;
  }

  // Unfold cylinder
  if (q.includes('unfold') && q.includes('cylinder')) {
    return <CrossSectionVisual shape="cylinder" cut="vertical" />;
  }

  return null;
}

interface IQQuestionVisualProps {
  question: IQQuestion;
}

export const IQQuestionVisual = ({ question }: IQQuestionVisualProps) => {
  const visual = getQuestionVisual(question);
  if (!visual) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 border border-border rounded-xl p-4 mb-3"
    >
      {visual}
    </motion.div>
  );
};
