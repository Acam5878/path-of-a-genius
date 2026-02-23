import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BrainRegion {
  id: string;
  label: string;
  // SVG path for each brain region
  path: string;
  // Position for the label
  labelX: number;
  labelY: number;
}

// Simplified brain regions as SVG paths (top-down brain view)
const brainRegions: BrainRegion[] = [
  {
    id: 'frontal',
    label: 'Abstract Thinking',
    path: 'M100,45 Q120,20 150,18 Q180,20 200,45 Q195,55 190,65 Q170,60 150,58 Q130,60 110,65 Q105,55 100,45Z',
    labelX: 150,
    labelY: 32,
  },
  {
    id: 'parietal',
    label: 'Pattern Recognition',
    path: 'M190,65 Q195,55 200,45 Q220,55 235,75 Q238,95 230,110 Q210,95 190,85 Q185,75 190,65Z',
    labelX: 220,
    labelY: 78,
  },
  {
    id: 'temporal-r',
    label: 'Visual-Spatial',
    path: 'M110,65 Q105,55 100,45 Q80,55 65,75 Q62,95 70,110 Q90,95 110,85 Q115,75 110,65Z',
    labelX: 80,
    labelY: 78,
  },
  {
    id: 'occipital',
    label: 'Creative Insight',
    path: 'M70,110 Q62,120 65,140 Q75,160 100,168 Q125,172 150,174 Q175,172 200,168 Q225,160 235,140 Q238,120 230,110 Q210,95 190,85 Q170,90 150,92 Q130,90 110,85 Q90,95 70,110Z',
    labelX: 150,
    labelY: 145,
  },
  {
    id: 'central',
    label: 'Logical Core',
    path: 'M110,85 Q130,90 150,92 Q170,90 190,85 Q185,75 190,65 Q170,60 150,58 Q130,60 110,65 Q115,75 110,85Z',
    labelX: 150,
    labelY: 76,
  },
];

interface GlowingBrainVisualProps {
  /** Which question indices (0,1,2) the user got correct */
  correctQuestions: boolean[];
  /** Label to show below */
  title?: string;
}

export const GlowingBrainVisual = ({ correctQuestions, title = 'Your Brain' }: GlowingBrainVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Map quiz performance to brain regions that "light up"
  // Q0 (Einstein - Abstract) → frontal + central
  // Q1 (Da Vinci - Visual) → temporal-r + occipital  
  // Q2 (Newton - Pattern) → parietal + central
  const activeRegions = useMemo(() => {
    const active = new Set<string>();
    if (correctQuestions[0]) { active.add('frontal'); active.add('central'); }
    if (correctQuestions[1]) { active.add('temporal-r'); active.add('occipital'); }
    if (correctQuestions[2]) { active.add('parietal'); active.add('central'); }
    return active;
  }, [correctQuestions]);

  // Canvas particle effect for glowing regions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 300;
    const H = 220;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const regionCenters = brainRegions
      .filter(r => activeRegions.has(r.id))
      .map(r => ({ x: r.labelX, y: r.labelY }));

    let animId: number;

    const spawn = () => {
      if (regionCenters.length === 0) return;
      const center = regionCenters[Math.floor(Math.random() * regionCenters.length)];
      particles.push({
        x: center.x + (Math.random() - 0.5) * 40,
        y: center.y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 1 + Math.random() * 2,
        hue: 43 + Math.random() * 20,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Spawn particles
      if (Math.random() < 0.4) spawn();

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 62%, 52%, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 62%, 52%, ${alpha * 0.15})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [activeRegions]);

  return (
    <div className="flex flex-col items-center mb-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-2"
      >
        {title}
      </motion.p>
      
      <div className="relative w-[300px] h-[220px]">
        {/* Canvas particles behind */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: 300, height: 220 }}
        />

        {/* SVG brain */}
        <svg
          viewBox="0 0 300 200"
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 8px hsla(43,62%,52%,0.15))' }}
        >
          {/* Brain outline glow */}
          <defs>
            <filter id="brain-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="region-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43,62%,52%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(43,62%,62%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {brainRegions.map((region) => {
            const isActive = activeRegions.has(region.id);
            return (
              <motion.path
                key={region.id}
                d={region.path}
                fill={isActive ? 'url(#active-gradient)' : 'hsla(var(--muted-foreground), 0.06)'}
                stroke={isActive ? 'hsl(43,62%,52%)' : 'hsla(var(--muted-foreground), 0.15)'}
                strokeWidth={isActive ? 1.5 : 0.5}
                filter={isActive ? 'url(#region-glow)' : undefined}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  fillOpacity: isActive ? [0.4, 0.7, 0.4] : 0.06,
                }}
                transition={isActive ? {
                  fillOpacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.5, delay: 0.3 },
                } : {
                  opacity: { duration: 0.5, delay: 0.3 },
                }}
              />
            );
          })}

          {/* Region labels for active areas */}
          {brainRegions.filter(r => activeRegions.has(r.id)).map((region, i) => (
            <motion.text
              key={region.id}
              x={region.labelX}
              y={region.labelY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="7"
              fontFamily="monospace"
              fill="hsl(43,62%,52%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              {region.label}
            </motion.text>
          ))}

          {/* Dim labels for inactive */}
          {brainRegions.filter(r => !activeRegions.has(r.id)).map((region) => (
            <motion.text
              key={region.id}
              x={region.labelX}
              y={region.labelY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="6"
              fontFamily="monospace"
              fill="hsl(var(--muted-foreground))"
              opacity={0.3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
            >
              {region.label}
            </motion.text>
          ))}

          {/* Center dividing line (brain hemispheres) */}
          <motion.line
            x1="150" y1="18" x2="150" y2="174"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="0.5"
            opacity={0.15}
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </svg>
      </div>
    </div>
  );
};
