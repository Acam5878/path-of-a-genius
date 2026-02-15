import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Core subjects in a clean circular/elliptical layout with good spacing
const NODES = [
  { id: 'greek', label: 'Greek & Latin', x: 14, y: 15, icon: '📜' },
  { id: 'logic', label: 'Logic', x: 50, y: 6, icon: '🧠' },
  { id: 'math', label: 'Mathematics', x: 86, y: 15, icon: '📐' },
  { id: 'philosophy', label: 'Philosophy', x: 8, y: 55, icon: '💭' },
  { id: 'history', label: 'History', x: 32, y: 38, icon: '📖' },
  { id: 'physics', label: 'Physics', x: 92, y: 55, icon: '⚡' },
  { id: 'engineering', label: 'Engineering', x: 68, y: 38, icon: '⚙️' },
  { id: 'art', label: 'Art & Literature', x: 28, y: 78, icon: '🎨' },
  { id: 'ethics', label: 'Ethics', x: 50, y: 65, icon: '⚖️' },
  { id: 'science', label: 'Science', x: 72, y: 78, icon: '🔬' },
];

// Liberal connections — everything truly interconnected
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

// Geniuses at exact edge midpoints (calculated from node coordinates)
const GENIUSES = [
  { name: 'Mill', x: 20, y: 46, delay: 1.5 },         // philosophy(8,55)↔history(32,38) midpoint
  { name: 'Aristotle', x: 29, y: 60, delay: 1.7 },     // philosophy(8,55)↔ethics(50,65) midpoint
  { name: 'da Vinci', x: 41, y: 52, delay: 1.9 },      // history(32,38)↔ethics(50,65) midpoint
  { name: 'Newton', x: 89, y: 35, delay: 2.1 },         // math(86,15)↔physics(92,55) midpoint
  { name: 'Einstein', x: 82, y: 66, delay: 2.3 },       // physics(92,55)↔science(72,78) midpoint
  { name: 'Pascal', x: 68, y: 10, delay: 2.5 },         // logic(50,6)↔math(86,15) midpoint
  { name: 'Leibniz', x: 59, y: 22, delay: 2.7 },        // logic(50,6)↔engineering(68,38) midpoint
  { name: 'Curie', x: 61, y: 72, delay: 2.9 },          // ethics(50,65)↔science(72,78) midpoint
  { name: 'Tesla', x: 80, y: 46, delay: 3.1 },          // physics(92,55)↔engineering(68,38) midpoint
  { name: 'Goethe', x: 39, y: 72, delay: 3.3 },         // art(28,78)↔ethics(50,65) midpoint
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

        const pulse = 0.08 + 0.08 * Math.sin(t * 0.02 + i * 0.6);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsla(43, 62%, 52%, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const dotPos = (Math.sin(t * 0.012 + i * 1.1) + 1) / 2;
        const dx = x1 + (x2 - x1) * dotPos;
        const dy = y1 + (y2 - y1) * dotPos;
        ctx.beginPath();
        ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 62%, 52%, ${0.25 + 0.2 * Math.sin(t * 0.03 + i)})`;
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
          Latin unlocks science. Logic sharpens mathematics. Philosophy deepens art. Every subject strengthens the others.
        </motion.p>
      </div>

      {/* Knowledge Web */}
      <div className="relative w-full px-3" style={{ height: 300 }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex flex-col items-center pointer-events-none"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[hsl(217,30%,18%)] border border-secondary/25 flex items-center justify-center">
              <span className="text-xs">{node.icon}</span>
            </div>
            <span className="text-[7px] font-semibold text-white/45 mt-0.5 whitespace-nowrap leading-none">{node.label}</span>
          </motion.div>
        ))}

        {GENIUSES.map((g) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: g.delay, duration: 0.6 }}
            className="absolute pointer-events-none"
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-[6px] font-bold text-secondary/30 uppercase tracking-wider whitespace-nowrap">
              {g.name}
            </span>
          </motion.div>
        ))}
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
