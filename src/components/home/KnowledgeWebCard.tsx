import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Node definitions for the knowledge web
const NODES = [
  { id: 'latin', label: 'Latin & Greek', x: 15, y: 22, icon: '🌍' },
  { id: 'logic', label: 'Logic', x: 50, y: 10, icon: '🏛️' },
  { id: 'math', label: 'Mathematics', x: 85, y: 22, icon: '📐' },
  { id: 'philosophy', label: 'Philosophy', x: 20, y: 60, icon: '💭' },
  { id: 'physics', label: 'Physics', x: 80, y: 60, icon: '⚡' },
  { id: 'art', label: 'Art & Music', x: 50, y: 78, icon: '🎨' },
];

// Connections between nodes
const EDGES: [string, string][] = [
  ['latin', 'logic'],
  ['latin', 'philosophy'],
  ['logic', 'math'],
  ['logic', 'philosophy'],
  ['math', 'physics'],
  ['philosophy', 'art'],
  ['physics', 'art'],
  ['latin', 'math'],
  ['philosophy', 'physics'],
];

// Genius portraits that appear at intersections
const GENIUSES = [
  { name: 'da Vinci', x: 50, y: 44, delay: 1.5 },
  { name: 'Newton', x: 68, y: 38, delay: 2.0 },
  { name: 'Aristotle', x: 32, y: 38, delay: 2.5 },
];

export const KnowledgeWebCard = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for animate-on-scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Canvas animation for pulsing connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    let t = 0;
    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Draw edges with pulsing glow
      EDGES.forEach(([fromId, toId], i) => {
        const from = NODES.find(n => n.id === fromId)!;
        const to = NODES.find(n => n.id === toId)!;
        const x1 = (from.x / 100) * w;
        const y1 = (from.y / 100) * h;
        const x2 = (to.x / 100) * w;
        const y2 = (to.y / 100) * h;

        const pulse = 0.15 + 0.12 * Math.sin(t * 0.02 + i * 0.7);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsla(43, 62%, 52%, ${pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Travelling dot along the line
        const dotPos = (Math.sin(t * 0.015 + i * 1.2) + 1) / 2;
        const dx = x1 + (x2 - x1) * dotPos;
        const dy = y1 + (y2 - y1) * dotPos;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 62%, 52%, ${0.4 + 0.3 * Math.sin(t * 0.03 + i)})`;
        ctx.fill();
      });

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isVisible]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-4 rounded-2xl border border-border overflow-hidden bg-gradient-to-b from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)]"
    >
      {/* Header text */}
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
          className="text-white/50 text-sm mt-2 leading-relaxed max-w-sm"
        >
          Latin unlocks science. Logic sharpens mathematics. Philosophy deepens art. When you learn what the great minds learned, every subject strengthens the others.
        </motion.p>
      </div>

      {/* Interactive Knowledge Web */}
      <div className="relative w-full" style={{ height: 220 }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Subject nodes */}
        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[hsl(217,30%,18%)] border border-secondary/30 flex items-center justify-center shadow-lg shadow-secondary/10">
              <span className="text-lg">{node.icon}</span>
            </div>
            <span className="text-[9px] font-semibold text-white/60 mt-1 whitespace-nowrap">{node.label}</span>
          </motion.div>
        ))}

        {/* Genius names at intersections */}
        {GENIUSES.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: g.delay, duration: 0.5 }}
            className="absolute"
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-[8px] font-bold text-secondary/50 uppercase tracking-wider">
              {g.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <p className="text-white/70 text-xs leading-relaxed mb-3">
            <span className="text-white font-semibold">The Path of a Genius</span> is a classical curriculum that teaches these subjects the way they were designed to be learned — interconnected, building on each other, unlocking your full cognitive potential.
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
