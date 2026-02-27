import { motion } from 'framer-motion';
import { IQQuestion } from '@/data/iqTypes';

/**
 * Rich SVG visual aids for spatial/pattern IQ questions.
 * Provides immersive animated diagrams for cubes, rotations, reflections, nets, cross-sections, and 3D shapes.
 */

// ─── Animated Isometric Cube ───
const CubeVisual = ({ variant = 'basic', label }: { variant?: 'basic' | 'painted' | 'view'; label?: string }) => (
  <div className="flex flex-col items-center gap-2">
    {label && <span className="text-[9px] text-muted-foreground font-mono uppercase">{label}</span>}
    <motion.svg
      width="100" height="100" viewBox="0 0 100 100"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back edges */}
      <motion.line x1="50" y1="12" x2="80" y2="28" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.3" strokeDasharray="3,3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      <motion.line x1="80" y1="28" x2="80" y2="68" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
      <motion.line x1="80" y1="68" x2="50" y2="84" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
      
      {/* Top face - gradient fill */}
      <motion.polygon
        points="50,12 80,28 50,44 20,28"
        fill="hsl(var(--secondary))"
        fillOpacity="0.15"
        stroke="hsl(var(--secondary))"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      {/* Left face */}
      <motion.polygon
        points="20,28 50,44 50,84 20,68"
        fill="hsl(var(--secondary))"
        fillOpacity="0.08"
        stroke="hsl(var(--secondary))"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      {/* Right face */}
      <motion.polygon
        points="50,44 80,28 80,68 50,84"
        fill="hsl(var(--secondary))"
        fillOpacity="0.04"
        stroke="hsl(var(--secondary))"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      
      {variant === 'painted' && (
        <>
          {/* Grid lines on top face for 3x3x3 */}
          <line x1="30" y1="20" x2="60" y2="36" stroke="hsl(var(--secondary))" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="16" x2="70" y2="32" stroke="hsl(var(--secondary))" strokeWidth="0.6" opacity="0.4" />
          <line x1="36.7" y1="25.3" x2="66.7" y2="25.3" stroke="hsl(var(--secondary))" strokeWidth="0.6" opacity="0.4" />
          <line x1="43.3" y1="30.7" x2="73.3" y2="30.7" stroke="hsl(var(--secondary))" strokeWidth="0.6" opacity="0.4" />
          {/* Left face grid */}
          <line x1="20" y1="41.3" x2="50" y2="57.3" stroke="hsl(var(--secondary))" strokeWidth="0.4" opacity="0.3" />
          <line x1="20" y1="54.7" x2="50" y2="70.7" stroke="hsl(var(--secondary))" strokeWidth="0.4" opacity="0.3" />
          <line x1="30" y1="34.7" x2="30" y2="74.7" stroke="hsl(var(--secondary))" strokeWidth="0.4" opacity="0.3" />
          <line x1="40" y1="40.7" x2="40" y2="80.7" stroke="hsl(var(--secondary))" strokeWidth="0.4" opacity="0.3" />
          {/* Paint indicators on corners */}
          <motion.circle cx="20" cy="28" r="2.5" fill="hsl(var(--destructive))" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
          <motion.circle cx="80" cy="28" r="2.5" fill="hsl(var(--destructive))" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
          <motion.circle cx="50" cy="12" r="2.5" fill="hsl(var(--destructive))" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
          <text x="50" y="97" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">3×3×3</text>
        </>
      )}
      
      {/* Subtle glow */}
      <motion.circle
        cx="50" cy="48" r="35"
        fill="hsl(var(--secondary))"
        fillOpacity="0.03"
        initial={{ r: 20 }}
        animate={{ r: [35, 38, 35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  </div>
);

// ─── Rotation Visual with Animated Arrow ───
const RotationVisual = ({ degrees, letter }: { degrees: number; letter?: string }) => {
  const startAngle = 0;
  const endAngle = (degrees * Math.PI) / 180;
  
  return (
    <div className="flex items-center gap-5 justify-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Before</span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-xl border-2 border-secondary/40 bg-secondary/5 flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-foreground">{letter || '▲'}</span>
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <motion.svg width="48" height="48" viewBox="0 0 48 48">
          <motion.path
            d={`M 24 8 A 16 16 0 ${degrees > 180 ? 1 : 0} 1 ${24 + 16 * Math.sin(endAngle)} ${24 - 16 * Math.cos(endAngle)}`}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.polygon
            points={`${24 + 16 * Math.sin(endAngle)},${24 - 16 * Math.cos(endAngle)} ${24 + 12 * Math.sin(endAngle - 0.3)},${24 - 12 * Math.cos(endAngle - 0.3)} ${24 + 12 * Math.sin(endAngle + 0.3)},${24 - 12 * Math.cos(endAngle + 0.3)}`}
            fill="hsl(var(--secondary))"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
        </motion.svg>
        <span className="text-[10px] text-secondary font-mono font-bold">{degrees}°</span>
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">After</span>
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: degrees }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-xl border-2 border-secondary/20 bg-muted/20 flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-muted-foreground/50">?</span>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Mirror/Reflection Visual ───
const MirrorVisual = ({ letter, axis }: { letter: string; axis: 'horizontal' | 'vertical' }) => (
  <div className="flex items-center gap-4 justify-center">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-16 h-16 rounded-xl border-2 border-secondary/40 bg-secondary/5 flex items-center justify-center"
    >
      <span className="text-3xl font-bold text-foreground">{letter}</span>
    </motion.div>
    
    <div className="flex flex-col items-center gap-1">
      <motion.svg width="32" height="56" viewBox="0 0 32 56">
        {axis === 'horizontal' ? (
          <>
            <motion.line x1="16" y1="0" x2="16" y2="56" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="4,3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <motion.polygon points="4,24 12,20 12,28" fill="hsl(var(--secondary))" fillOpacity="0.6"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6] }} transition={{ delay: 0.5, duration: 0.5 }} />
            <motion.polygon points="28,24 20,20 20,28" fill="hsl(var(--secondary))" fillOpacity="0.6"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6] }} transition={{ delay: 0.7, duration: 0.5 }} />
          </>
        ) : (
          <>
            <motion.line x1="0" y1="28" x2="32" y2="28" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="4,3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <motion.polygon points="16,10 12,18 20,18" fill="hsl(var(--secondary))" fillOpacity="0.6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
            <motion.polygon points="16,46 12,38 20,38" fill="hsl(var(--secondary))" fillOpacity="0.6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
          </>
        )}
      </motion.svg>
      <span className="text-[9px] text-secondary font-mono">{axis === 'horizontal' ? '← MIRROR →' : '↕ FLIP'}</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="w-16 h-16 rounded-xl border-2 border-muted/40 bg-muted/10 flex items-center justify-center"
    >
      <span className="text-3xl font-bold text-muted-foreground/30">?</span>
    </motion.div>
  </div>
);

// ─── Net Folding Visual ───
const NetVisual = ({ shape }: { shape: 'cross' | 'T' }) => (
  <div className="flex items-center gap-5 justify-center">
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">Flat Net</span>
      <motion.svg width="80" height="80" viewBox="0 0 80 80" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Cross net with animated squares */}
        {[
          { x: 27, y: 2, delay: 0 },    // top
          { x: 2, y: 27, delay: 0.1 },   // left
          { x: 27, y: 27, delay: 0.2 },  // center
          { x: 52, y: 27, delay: 0.3 },  // right
          { x: 27, y: 52, delay: 0.4 },  // bottom
        ].map((sq, i) => (
          <motion.rect
            key={i}
            x={sq.x} y={sq.y} width="25" height="25"
            fill={i === 2 ? 'hsl(var(--secondary))' : 'none'}
            fillOpacity={i === 2 ? 0.15 : 0}
            stroke="hsl(var(--secondary))"
            strokeWidth="1.5"
            rx="1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: sq.delay * 0.5 + 0.2, duration: 0.3 }}
          />
        ))}
        {/* Fold lines */}
        {[
          { x1: 27, y1: 27, x2: 52, y2: 27 },
          { x1: 27, y1: 52, x2: 52, y2: 52 },
          { x1: 27, y1: 2, x2: 27, y2: 77 },
          { x1: 52, y1: 2, x2: 52, y2: 77 },
        ].map((l, i) => (
          <motion.line
            key={`fold-${i}`}
            {...l}
            stroke="hsl(var(--secondary))"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        ))}
      </motion.svg>
    </div>
    
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring' }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-2xl text-secondary"
      >
        →
      </motion.div>
      <span className="text-[9px] text-secondary font-mono">FOLD</span>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">3D Shape</span>
      <div className="text-4xl text-muted-foreground/40 font-bold">?</div>
    </motion.div>
  </div>
);

// ─── Cross-Section Visual ───
const CrossSectionVisual = ({ shape }: { shape: 'cone' | 'cylinder' | 'sphere' }) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">{shape}</span>
      <motion.svg width="64" height="64" viewBox="0 0 64 64" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {shape === 'cone' && (
          <>
            <motion.polygon
              points="32,8 8,56 56,56"
              fill="hsl(var(--secondary))"
              fillOpacity="0.08"
              stroke="hsl(var(--secondary))"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <motion.line
              x1="8" y1="38" x2="56" y2="38"
              stroke="hsl(var(--destructive))"
              strokeWidth="2"
              strokeDasharray="4,3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            <motion.circle cx="32" cy="38" r="2" fill="hsl(var(--destructive))"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ delay: 0.8 }} />
          </>
        )}
        {shape === 'cylinder' && (
          <>
            <motion.ellipse cx="32" cy="12" rx="18" ry="6" fill="hsl(var(--secondary))" fillOpacity="0.1"
              stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <motion.line x1="14" y1="12" x2="14" y2="52" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <motion.line x1="50" y1="12" x2="50" y2="52" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <motion.ellipse cx="32" cy="52" rx="18" ry="6" fill="hsl(var(--secondary))" fillOpacity="0.05"
              stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            <motion.line
              x1="32" y1="6" x2="32" y2="58"
              stroke="hsl(var(--destructive))"
              strokeWidth="2"
              strokeDasharray="4,3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </>
        )}
        {shape === 'sphere' && (
          <>
            <motion.circle cx="32" cy="32" r="24" fill="hsl(var(--secondary))" fillOpacity="0.06"
              stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            {/* Equator ellipse for 3D feel */}
            <motion.ellipse cx="32" cy="32" rx="24" ry="8" fill="none"
              stroke="hsl(var(--secondary))" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3" />
            <motion.line
              x1="8" y1="32" x2="56" y2="32"
              stroke="hsl(var(--destructive))"
              strokeWidth="2"
              strokeDasharray="4,3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </>
        )}
      </motion.svg>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-secondary text-lg">→</span>
      <span className="text-[9px] text-secondary font-mono">CUT</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="w-14 h-14 rounded-xl border-2 border-muted/30 bg-muted/10 flex items-center justify-center"
    >
      <span className="text-2xl text-muted-foreground/30 font-bold">?</span>
    </motion.div>
  </div>
);

// ─── 3D Shape Visual (Tetrahedron, Octahedron, etc.) ───
const PolyhedronVisual = ({ shape }: { shape: 'tetrahedron' | 'octahedron' | 'dodecahedron' | 'prism' | 'hexagonal-prism' }) => (
  <div className="flex justify-center">
    <motion.svg
      width="90" height="90" viewBox="0 0 90 90"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.6 }}
    >
      {shape === 'tetrahedron' && (
        <>
          <motion.polygon points="45,10 15,70 75,70" fill="hsl(var(--secondary))" fillOpacity="0.08"
            stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <motion.line x1="45" y1="10" x2="55" y2="50" stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <motion.line x1="15" y1="70" x2="55" y2="50" stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <motion.line x1="75" y1="70" x2="55" y2="50" stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          {/* Vertices */}
          {[[45,10],[15,70],[75,70],[55,50]].map(([cx,cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r="3" fill="hsl(var(--secondary))"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} />
          ))}
        </>
      )}
      {shape === 'octahedron' && (
        <>
          <motion.polygon points="45,8 80,45 45,82 10,45" fill="hsl(var(--secondary))" fillOpacity="0.08"
            stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <motion.line x1="10" y1="45" x2="80" y2="45" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
          <motion.line x1="45" y1="8" x2="45" y2="82" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4" />
          {/* 3D depth lines */}
          <motion.line x1="45" y1="8" x2="58" y2="45" stroke="hsl(var(--secondary))" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.3" />
          <motion.line x1="45" y1="82" x2="58" y2="45" stroke="hsl(var(--secondary))" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.3" />
        </>
      )}
      {shape === 'prism' && (
        <>
          {/* Front triangle */}
          <motion.polygon points="20,70 45,20 70,70" fill="hsl(var(--secondary))" fillOpacity="0.1"
            stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          {/* Back triangle (offset) */}
          <motion.polygon points="30,65 55,15 80,65" fill="none"
            stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          {/* Connecting edges */}
          <motion.line x1="20" y1="70" x2="30" y2="65" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.6" />
          <motion.line x1="45" y1="20" x2="55" y2="15" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.6" />
          <motion.line x1="70" y1="70" x2="80" y2="65" stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.6" />
        </>
      )}
      {shape === 'hexagonal-prism' && (
        <>
          {/* Top hexagon */}
          <motion.polygon
            points="45,10 65,20 65,40 45,50 25,40 25,20"
            fill="hsl(var(--secondary))" fillOpacity="0.12"
            stroke="hsl(var(--secondary))" strokeWidth="1.5"
          />
          {/* Vertical edges */}
          <motion.line x1="25" y1="40" x2="25" y2="60" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <motion.line x1="45" y1="50" x2="45" y2="70" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          <motion.line x1="65" y1="40" x2="65" y2="60" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          {/* Bottom partial hexagon */}
          <motion.polyline points="25,60 45,70 65,60" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
        </>
      )}
      {shape === 'dodecahedron' && (
        <>
          {/* Simplified dodecahedron outline */}
          <motion.polygon
            points="45,6 72,22 72,58 45,78 18,58 18,22"
            fill="hsl(var(--secondary))" fillOpacity="0.06"
            stroke="hsl(var(--secondary))" strokeWidth="1.5"
          />
          {/* Inner pentagon */}
          <motion.polygon
            points="45,20 60,32 56,52 34,52 30,32"
            fill="none"
            stroke="hsl(var(--secondary))" strokeWidth="1" opacity="0.4"
          />
          {/* Connect inner to outer */}
          {[[45,6,45,20],[72,22,60,32],[72,58,56,52],[18,58,34,52],[18,22,30,32]].map(([x1,y1,x2,y2], i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(var(--secondary))" strokeWidth="0.8" opacity="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.1 }} />
          ))}
        </>
      )}
      {/* Ambient glow */}
      <motion.circle cx="45" cy="45" r="30" fill="hsl(var(--secondary))" fillOpacity="0.02"
        animate={{ r: [30, 33, 30] }} transition={{ duration: 3, repeat: Infinity }} />
    </motion.svg>
  </div>
);

// ─── Symmetry Visual ───
const SymmetryVisual = ({ shape, lines }: { shape: string; lines: number }) => (
  <div className="flex justify-center">
    <motion.svg width="80" height="80" viewBox="0 0 80 80"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {shape === 'circle' && (
        <>
          <circle cx="40" cy="40" r="28" fill="hsl(var(--secondary))" fillOpacity="0.06"
            stroke="hsl(var(--secondary))" strokeWidth="1.5" />
          {/* Show infinite symmetry lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            return (
              <motion.line key={i}
                x1={40 + 28 * Math.cos(angle)} y1={40 + 28 * Math.sin(angle)}
                x2={40 - 28 * Math.cos(angle)} y2={40 - 28 * Math.sin(angle)}
                stroke="hsl(var(--secondary))" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.1 }}
              />
            );
          })}
          <text x="40" y="76" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">∞ lines</text>
        </>
      )}
      {shape === 'pentagon' && (
        <>
          {(() => {
            const pts = Array.from({ length: 5 }).map((_, i) => {
              const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
              return `${40 + 26 * Math.cos(a)},${40 + 26 * Math.sin(a)}`;
            }).join(' ');
            return (
              <motion.polygon points={pts} fill="hsl(var(--secondary))" fillOpacity="0.08"
                stroke="hsl(var(--secondary))" strokeWidth="1.5" />
            );
          })()}
          {/* Symmetry lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            return (
              <motion.line key={i}
                x1={40 + 26 * Math.cos(a)} y1={40 + 26 * Math.sin(a)}
                x2={40 - 26 * Math.cos(a)} y2={40 - 26 * Math.sin(a)}
                stroke="hsl(var(--destructive))" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.15 }}
              />
            );
          })}
        </>
      )}
    </motion.svg>
  </div>
);

// ─── Top-Down View Visual ───
const TopDownVisual = ({ shape }: { shape: 'square' | 'hexagon' }) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-muted-foreground font-mono">3D SHAPE</span>
      {shape === 'square' ? <CubeVisual /> : <PolyhedronVisual shape="hexagonal-prism" />}
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
      className="flex flex-col items-center gap-1">
      <span className="text-secondary text-sm">↓ 👁️</span>
      <span className="text-[9px] text-secondary font-mono">TOP VIEW</span>
    </motion.div>
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
      className="w-14 h-14 rounded-xl border-2 border-muted/30 bg-muted/10 flex items-center justify-center">
      <span className="text-2xl text-muted-foreground/30 font-bold">?</span>
    </motion.div>
  </div>
);

/**
 * Determines if a question benefits from a visual and returns the appropriate component.
 */
export function getQuestionVisual(question: IQQuestion): JSX.Element | null {
  const q = question.question.toLowerCase();

  // Rotation questions
  if (q.includes('rotate') && q.includes('90°') && q.includes('square'))
    return <RotationVisual degrees={90} letter="□" />;
  if (q.includes('rotate') && q.includes('180°')) {
    const letterMatch = question.question.match(/letter "(\w)"|"(\w)" 180/);
    const letter = letterMatch?.[1] || letterMatch?.[2];
    return <RotationVisual degrees={180} letter={letter || 'N'} />;
  }
  if (q.includes('rotate') && q.includes('45°'))
    return <RotationVisual degrees={45} />;

  // Reflection/mirror questions  
  if (q.includes('reflect') && q.includes('horizontally')) {
    const m = question.question.match(/letter "(\w)"/);
    return <MirrorVisual letter={m?.[1] || 'b'} axis="horizontal" />;
  }
  if (q.includes('reflect') && q.includes('vertically')) {
    const m = question.question.match(/letter "(\w)"/);
    return <MirrorVisual letter={m?.[1] || 'p'} axis="vertical" />;
  }
  if (q.includes('mirror') || (q.includes('reflected') && q.includes('mirror')))
    return <MirrorVisual letter="A" axis="horizontal" />;

  // Net/folding
  if (q.includes('fold') && (q.includes('cross') || q.includes('+')))
    return <NetVisual shape="cross" />;

  // Cube questions - painted
  if (q.includes('painted') && q.includes('cube') && (q.includes('27') || q.includes('3×3×3')))
    return <CubeVisual variant="painted" />;

  // Cross-sections
  if (q.includes('cut') && q.includes('cone'))
    return <CrossSectionVisual shape="cone" />;
  if (q.includes('cut') && q.includes('cylinder') && q.includes('vertically'))
    return <CrossSectionVisual shape="cylinder" />;
  if ((q.includes('sphere') && q.includes('cut')) || (q.includes('sphere') && q.includes('half')))
    return <CrossSectionVisual shape="sphere" />;

  // 3D shapes
  if (q.includes('tetrahedron') || (q.includes('triangular pyramid') && q.includes('edges')))
    return <PolyhedronVisual shape="tetrahedron" />;
  if (q.includes('octahedron'))
    return <PolyhedronVisual shape="octahedron" />;
  if (q.includes('dodecahedron'))
    return <PolyhedronVisual shape="dodecahedron" />;
  if (q.includes('triangular prism'))
    return <PolyhedronVisual shape="prism" />;
  if (q.includes('hexagonal prism'))
    return <PolyhedronVisual shape="hexagonal-prism" />;

  // Cube basics
  if (q.includes('cube') && (q.includes('faces') || q.includes('vertices') || q.includes('edges') || q.includes('look at') || q.includes('maximum')))
    return <CubeVisual variant="basic" />;

  // Top-down views
  if (q.includes('from directly above') || q.includes('from above') || q.includes('top-down') || (q.includes('look') && q.includes('above'))) {
    if (q.includes('hexagonal')) return <TopDownVisual shape="hexagon" />;
    return <TopDownVisual shape="square" />;
  }

  // Symmetry
  if (q.includes('lines of symmetry') && q.includes('circle'))
    return <SymmetryVisual shape="circle" lines={Infinity} />;
  if (q.includes('lines of symmetry') && q.includes('pentagon'))
    return <SymmetryVisual shape="pentagon" lines={5} />;
  if (q.includes('most lines of symmetry'))
    return <SymmetryVisual shape="circle" lines={Infinity} />;

  // Unfold cylinder
  if (q.includes('unfold') && q.includes('cylinder'))
    return <CrossSectionVisual shape="cylinder" />;

  // Cone shape description
  if (q.includes('circular face') && q.includes('point'))
    return <CrossSectionVisual shape="cone" />;

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
