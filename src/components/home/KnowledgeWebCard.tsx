import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// All subjects from the curriculum, positioned in a wide web
const NODES = [
  { id: 'greek', label: 'Ancient Greek', x: 5, y: 8, icon: '🏛️' },
  { id: 'latin', label: 'Latin', x: 22, y: 5, icon: '📜' },
  { id: 'logic', label: 'Logic', x: 42, y: 8, icon: '🧠' },
  { id: 'math', label: 'Mathematics', x: 62, y: 5, icon: '📐' },
  { id: 'physics', label: 'Physics', x: 82, y: 8, icon: '⚡' },
  { id: 'chemistry', label: 'Chemistry', x: 95, y: 22, icon: '⚗️' },
  { id: 'philosophy', label: 'Philosophy', x: 8, y: 38, icon: '💭' },
  { id: 'history', label: 'History', x: 25, y: 30, icon: '📖' },
  { id: 'economics', label: 'Economics', x: 50, y: 32, icon: '📊' },
  { id: 'engineering', label: 'Engineering', x: 75, y: 30, icon: '⚙️' },
  { id: 'anatomy', label: 'Anatomy', x: 92, y: 45, icon: '🫀' },
  { id: 'art', label: 'Art & Music', x: 12, y: 62, icon: '🎨' },
  { id: 'ethics', label: 'Ethics', x: 32, y: 55, icon: '⚖️' },
  { id: 'literature', label: 'Literature', x: 55, y: 58, icon: '✍️' },
  { id: 'languages', label: 'Languages', x: 78, y: 55, icon: '🌍' },
  { id: 'geometry', label: 'Geometry', x: 48, y: 18, icon: '📏' },
];

// Connections showing how subjects interrelate
const EDGES: [string, string][] = [
  ['greek', 'latin'], ['greek', 'philosophy'], ['greek', 'history'],
  ['latin', 'logic'], ['latin', 'history'], ['latin', 'literature'],
  ['logic', 'math'], ['logic', 'philosophy'], ['logic', 'ethics'],
  ['math', 'physics'], ['math', 'geometry'], ['math', 'engineering'],
  ['physics', 'chemistry'], ['physics', 'engineering'],
  ['chemistry', 'anatomy'],
  ['philosophy', 'ethics'], ['philosophy', 'economics'], ['philosophy', 'history'],
  ['history', 'economics'], ['history', 'literature'],
  ['economics', 'ethics'],
  ['engineering', 'anatomy'],
  ['art', 'philosophy'], ['art', 'literature'], ['art', 'anatomy'],
  ['ethics', 'literature'],
  ['languages', 'literature'], ['languages', 'latin'],
  ['geometry', 'art'], ['geometry', 'engineering'],
  ['geometry', 'physics'],
];

// All 10 geniuses positioned at meaningful intersections
const GENIUSES = [
  { name: 'Mill', x: 15, y: 22, delay: 1.2 },
  { name: 'da Vinci', x: 52, y: 45, delay: 1.4 },
  { name: 'Newton', x: 72, y: 18, delay: 1.6 },
  { name: 'Curie', x: 88, y: 33, delay: 1.8 },
  { name: 'Tesla', x: 82, y: 42, delay: 2.0 },
  { name: 'Einstein', x: 68, y: 42, delay: 2.2 },
  { name: 'Aristotle', x: 25, y: 45, delay: 2.4 },
  { name: 'Pascal', x: 45, y: 26, delay: 2.6 },
  { name: 'Leibniz', x: 55, y: 12, delay: 2.8 },
  { name: 'Goethe', x: 38, y: 62, delay: 3.0 },
];

export const KnowledgeWebCard = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
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

      EDGES.forEach(([fromId, toId], i) => {
        const from = NODES.find(n => n.id === fromId)!;
        const to = NODES.find(n => n.id === toId)!;
        const x1 = (from.x / 100) * w;
        const y1 = (from.y / 100) * h;
        const x2 = (to.x / 100) * w;
        const y2 = (to.y / 100) * h;

        const pulse = 0.1 + 0.1 * Math.sin(t * 0.02 + i * 0.5);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsla(43, 62%, 52%, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Travelling dot
        const dotPos = (Math.sin(t * 0.012 + i * 1.1) + 1) / 2;
        const dx = x1 + (x2 - x1) * dotPos;
        const dy = y1 + (y2 - y1) * dotPos;
        ctx.beginPath();
        ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 62%, 52%, ${0.3 + 0.25 * Math.sin(t * 0.03 + i)})`;
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
          Latin unlocks science. Logic sharpens mathematics. Philosophy deepens art. When you learn what the great minds learned, every subject strengthens the others.
        </motion.p>
      </div>

      {/* Knowledge Web - taller for breathing room */}
      <div className="relative w-full" style={{ height: 340 }}>
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
            transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-9 h-9 rounded-full bg-[hsl(217,30%,18%)] border border-secondary/30 flex items-center justify-center shadow-lg shadow-secondary/10">
              <span className="text-sm">{node.icon}</span>
            </div>
            <span className="text-[8px] font-semibold text-white/50 mt-0.5 whitespace-nowrap leading-none">{node.label}</span>
          </motion.div>
        ))}

        {/* Genius names */}
        {GENIUSES.map((g) => (
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
            <span className="text-[7px] font-bold text-secondary/40 uppercase tracking-wider whitespace-nowrap">
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
