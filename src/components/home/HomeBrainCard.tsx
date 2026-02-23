import { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lock, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';

// 6 cognitive domains
interface CognitiveDomain {
  id: string;
  label: string;
  cx: number;
  cy: number;
  premium: boolean;
  // Subjects that contribute to this domain
  subjectPrefixes: string[];
}

const domains: CognitiveDomain[] = [
  { id: 'verbal', label: 'Verbal', cx: 0.33, cy: 0.22, premium: false, subjectPrefixes: ['latin', 'greek', 'rhetoric'] },
  { id: 'logical', label: 'Logic', cx: 0.67, cy: 0.22, premium: false, subjectPrefixes: ['logic', 'philosophy'] },
  { id: 'numerical', label: 'Numerical', cx: 0.8, cy: 0.5, premium: false, subjectPrefixes: ['math', 'calculus', 'arithmetic'] },
  { id: 'spatial', label: 'Spatial', cx: 0.2, cy: 0.5, premium: true, subjectPrefixes: ['geometry', 'physics', 'astronomy'] },
  { id: 'memory', label: 'Memory', cx: 0.33, cy: 0.78, premium: true, subjectPrefixes: ['history', 'classics'] },
  { id: 'pattern', label: 'Pattern', cx: 0.67, cy: 0.78, premium: true, subjectPrefixes: ['science', 'biology', 'chemistry'] },
];

// Neural connections between domains
const connections: [number, number][] = [
  [0, 1], [0, 3], [0, 4], [1, 2], [1, 5],
  [2, 5], [3, 4], [4, 5], [0, 2], [1, 3],
  [3, 5], [2, 4],
];

const iqToIntensity = (iq: number | null): number => {
  if (!iq || iq <= 0) return 0;
  return Math.min(1, Math.max(0.08, (iq - 80) / 70));
};

export const HomeBrainCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const [domainScores, setDomainScores] = useState<Record<string, number>>({});
  const [lessonScores, setLessonScores] = useState<Record<string, number>>({});
  const [heroScore, setHeroScore] = useState<Record<string, boolean>>({});

  // Load hero quiz results for unauth
  useEffect(() => {
    try {
      const stored = localStorage.getItem('genius-academy-hero-score');
      if (stored) {
        const { score } = JSON.parse(stored);
        if (score >= 1) setHeroScore(prev => ({ ...prev, verbal: true }));
        if (score >= 2) setHeroScore(prev => ({ ...prev, verbal: true, logical: true }));
        if (score >= 3) setHeroScore(prev => ({ ...prev, verbal: true, logical: true, numerical: true }));
      }
    } catch {}
  }, []);

  // Load IQ profile + lesson progress for authenticated users
  useEffect(() => {
    if (!user) return;

    // IQ scores
    supabase.from('user_iq_profiles').select('*').eq('user_id', user.id).maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setDomainScores({
          verbal: iqToIntensity(data.verbal_iq),
          logical: iqToIntensity(data.logical_iq),
          numerical: iqToIntensity(data.numerical_iq),
          spatial: iqToIntensity(data.spatial_iq),
          memory: iqToIntensity(data.memory_iq),
          pattern: iqToIntensity(data.pattern_recognition_iq),
        });
      });

    // Lesson progress — count completed lessons per subject prefix
    supabase.from('user_progress').select('subject_id').eq('user_id', user.id).eq('completed', true)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const counts: Record<string, number> = {};
        data.forEach(row => {
          const prefix = row.subject_id.split('-')[0];
          counts[prefix] = (counts[prefix] || 0) + 1;
        });
        // Map to domain scores (0-1 scale, roughly 10 lessons = full)
        const result: Record<string, number> = {};
        domains.forEach(d => {
          const total = d.subjectPrefixes.reduce((sum, p) => sum + (counts[p] || 0), 0);
          result[d.id] = Math.min(1, total / 10);
        });
        setLessonScores(result);
      });
  }, [user]);

  // Combine IQ + lesson scores
  const intensities = useMemo(() => {
    const result: Record<string, number> = {};
    domains.forEach(d => {
      if (user) {
        const iq = domainScores[d.id] || 0;
        const lessons = lessonScores[d.id] || 0;
        // Blend: whichever is higher dominates, but both contribute
        const combined = Math.min(1, Math.max(iq, lessons) * 0.7 + Math.min(iq, lessons) * 0.3);
        if (d.premium && !isPremium) {
          result[d.id] = Math.min(combined, 0.15);
        } else {
          result[d.id] = combined;
        }
      } else {
        result[d.id] = heroScore[d.id] ? 0.2 : 0;
      }
    });
    return result;
  }, [domainScores, lessonScores, heroScore, user, isPremium]);

  const totalLit = Object.values(intensities).filter(v => v > 0.1).length;
  const pctLit = Math.round((totalLit / 6) * 100);

  // Canvas — 3D brain with neural network, particles, and depth
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 320, H = 240;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    const pad = 40;
    const innerW = W - pad * 2;
    const innerH = H - pad * 2;

    // Node positions
    const nodes = domains.map(d => ({
      x: pad + d.cx * innerW,
      y: pad + d.cy * innerH,
      intensity: intensities[d.id] || 0,
      id: d.id,
      premium: d.premium,
    }));

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; hue: number; alpha: number;
    }

    interface Synapse {
      from: number; to: number; progress: number; speed: number; active: boolean; delay: number;
    }

    const particles: Particle[] = [];
    const synapses: Synapse[] = connections
      .filter(([a, b]) => nodes[a].intensity > 0.05 && nodes[b].intensity > 0.05)
      .map(([from, to]) => ({
        from, to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        active: true,
        delay: Math.random() * 100,
      }));

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // --- Ambient brain silhouette (3D depth effect) ---
      const grd = ctx.createRadialGradient(W / 2, H / 2 - 10, 20, W / 2, H / 2, 130);
      grd.addColorStop(0, 'hsla(43, 40%, 30%, 0.06)');
      grd.addColorStop(0.5, 'hsla(43, 30%, 20%, 0.03)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // --- Brain outline (organic shape) ---
      ctx.save();
      ctx.beginPath();
      // Left hemisphere
      ctx.moveTo(W / 2, pad - 5);
      ctx.bezierCurveTo(W / 2 - 60, pad - 10, pad - 10, H * 0.3, pad + 5, H / 2);
      ctx.bezierCurveTo(pad - 5, H * 0.7, W / 2 - 50, H - pad + 15, W / 2, H - pad + 5);
      // Right hemisphere
      ctx.bezierCurveTo(W / 2 + 50, H - pad + 15, W - pad + 5, H * 0.7, W - pad - 5, H / 2);
      ctx.bezierCurveTo(W - pad + 10, H * 0.3, W / 2 + 60, pad - 10, W / 2, pad - 5);
      ctx.closePath();
      ctx.strokeStyle = 'hsla(43, 30%, 50%, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Faint fill for depth
      const brainFill = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, 120);
      brainFill.addColorStop(0, 'hsla(43, 30%, 40%, 0.04)');
      brainFill.addColorStop(1, 'hsla(43, 30%, 20%, 0.01)');
      ctx.fillStyle = brainFill;
      ctx.fill();
      ctx.restore();

      // --- Hemisphere dividing line ---
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(W / 2, pad - 5);
      ctx.lineTo(W / 2, H - pad + 5);
      ctx.strokeStyle = 'hsla(43, 20%, 50%, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // --- Brain folds/sulci (organic curves for realism) ---
      const sulci = [
        { x1: W * 0.25, y1: H * 0.25, cx1: W * 0.15, cy1: H * 0.45, cx2: W * 0.25, cy2: H * 0.65, x2: W * 0.35, y2: H * 0.75 },
        { x1: W * 0.75, y1: H * 0.25, cx1: W * 0.85, cy1: H * 0.45, cx2: W * 0.75, cy2: H * 0.65, x2: W * 0.65, y2: H * 0.75 },
        { x1: W * 0.3, y1: H * 0.15, cx1: W * 0.4, cy1: H * 0.35, cx2: W * 0.35, cy2: H * 0.55, x2: W * 0.45, y2: H * 0.7 },
        { x1: W * 0.7, y1: H * 0.15, cx1: W * 0.6, cy1: H * 0.35, cx2: W * 0.65, cy2: H * 0.55, x2: W * 0.55, y2: H * 0.7 },
      ];
      ctx.save();
      sulci.forEach(s => {
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.bezierCurveTo(s.cx1, s.cy1, s.cx2, s.cy2, s.x2, s.y2);
        ctx.strokeStyle = 'hsla(43, 20%, 45%, 0.06)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      ctx.restore();

      // --- Neural connections (glowing lines between active nodes) ---
      connections.forEach(([a, b]) => {
        const nA = nodes[a], nB = nodes[b];
        const strength = Math.min(nA.intensity, nB.intensity);
        if (strength < 0.02) return;

        ctx.beginPath();
        // Curved connection for organic feel
        const mx = (nA.x + nB.x) / 2 + (Math.sin(a + b) * 15);
        const my = (nA.y + nB.y) / 2 + (Math.cos(a * b) * 10);
        ctx.moveTo(nA.x, nA.y);
        ctx.quadraticCurveTo(mx, my, nB.x, nB.y);
        ctx.strokeStyle = `hsla(43, 55%, 55%, ${strength * 0.25})`;
        ctx.lineWidth = strength * 1.5;
        ctx.stroke();
      });

      // --- Travelling synapses along active connections ---
      synapses.forEach(syn => {
        if (frame < syn.delay) return;
        syn.progress += syn.speed;
        if (syn.progress > 1) syn.progress = 0;

        const nA = nodes[syn.from], nB = nodes[syn.to];
        const t = syn.progress;
        const mx = (nA.x + nB.x) / 2 + (Math.sin(syn.from + syn.to) * 15);
        const my = (nA.y + nB.y) / 2 + (Math.cos(syn.from * syn.to) * 10);
        // Quadratic bezier point
        const sx = (1 - t) * (1 - t) * nA.x + 2 * (1 - t) * t * mx + t * t * nB.x;
        const sy = (1 - t) * (1 - t) * nA.y + 2 * (1 - t) * t * my + t * t * nB.y;

        const intensity = Math.min(nA.intensity, nB.intensity);
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
        glow.addColorStop(0, `hsla(43, 70%, 65%, ${intensity * 0.7})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(sx - 6, sy - 6, 12, 12);

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 80%, 70%, ${intensity * 0.9})`;
        ctx.fill();
      });

      // --- Node orbs (3D spheres with gradient) ---
      nodes.forEach((node, i) => {
        const intensity = node.intensity;
        const baseR = 18;
        const pulse = intensity > 0.1 ? 1 + Math.sin(frame * 0.03 + i * 1.2) * 0.08 : 1;
        const r = baseR * pulse;

        // Outer glow
        if (intensity > 0.05) {
          const outerGlow = ctx.createRadialGradient(node.x, node.y, r * 0.5, node.x, node.y, r * 2.5);
          outerGlow.addColorStop(0, `hsla(43, 60%, 55%, ${intensity * 0.2})`);
          outerGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = outerGlow;
          ctx.fillRect(node.x - r * 2.5, node.y - r * 2.5, r * 5, r * 5);
        }

        // 3D sphere gradient (light from top-left)
        const sphereGrad = ctx.createRadialGradient(
          node.x - r * 0.3, node.y - r * 0.3, r * 0.1,
          node.x, node.y, r
        );
        if (intensity > 0.1) {
          sphereGrad.addColorStop(0, `hsla(43, 70%, 75%, ${0.15 + intensity * 0.5})`);
          sphereGrad.addColorStop(0.5, `hsla(43, 60%, 50%, ${0.1 + intensity * 0.35})`);
          sphereGrad.addColorStop(1, `hsla(43, 50%, 25%, ${0.05 + intensity * 0.15})`);
        } else {
          sphereGrad.addColorStop(0, 'hsla(220, 15%, 35%, 0.12)');
          sphereGrad.addColorStop(0.5, 'hsla(220, 15%, 25%, 0.08)');
          sphereGrad.addColorStop(1, 'hsla(220, 15%, 15%, 0.04)');
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // Rim highlight
        if (intensity > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(43, 60%, 60%, ${intensity * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Inner bright core
        if (intensity > 0.2) {
          const coreGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 0.4);
          coreGlow.addColorStop(0, `hsla(43, 80%, 80%, ${intensity * 0.4})`);
          coreGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = coreGlow;
          ctx.fillRect(node.x - r * 0.4, node.y - r * 0.4, r * 0.8, r * 0.8);
        }

        // Label
        ctx.font = `600 ${intensity > 0.1 ? '8.5' : '7.5'}px ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = intensity > 0.1
          ? `hsla(43, 65%, 65%, ${0.6 + intensity * 0.4})`
          : 'hsla(220, 10%, 55%, 0.35)';
        ctx.fillText(domains[i].label, node.x, node.y + r + 10);

        // Lock icon for premium domains
        if (node.premium && !isPremium && user) {
          ctx.font = '8px sans-serif';
          ctx.fillText('🔒', node.x, node.y + r + 20);
        }
      });

      // --- Ambient floating particles ---
      const activeCenters = nodes.filter(n => n.intensity > 0.1);
      if (activeCenters.length > 0 && Math.random() < 0.25) {
        const c = activeCenters[Math.floor(Math.random() * activeCenters.length)];
        particles.push({
          x: c.x + (Math.random() - 0.5) * 50,
          y: c.y + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3 - 0.1,
          life: 0, maxLife: 60 + Math.random() * 50,
          size: 0.5 + Math.random() * 1.2,
          hue: 40 + Math.random() * 20,
          alpha: 0,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life > p.maxLife) { particles.splice(i, 1); continue; }
        p.alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${p.alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [intensities, isPremium, user]);

  const handleTap = () => {
    if (!user) navigate('/auth');
    else navigate('/iq-tests');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <button
        onClick={handleTap}
        className="w-full bg-card border border-border rounded-2xl p-4 relative overflow-hidden text-left active:scale-[0.98] transition-transform"
      >
        {/* Deep ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[200px] bg-secondary/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-secondary" />
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">Your Brain</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{pctLit}% illuminated</span>
          </div>

          {/* Canvas brain */}
          <div className="relative w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="w-full pointer-events-none"
              style={{ maxWidth: 320, height: 240 }}
            />
          </div>

          {/* CTA */}
          <div className="mt-1 flex items-center justify-center gap-2">
            {!user ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Zap className="w-3.5 h-3.5" />
                <span>Sign up free to light up your brain</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            ) : totalLit < 3 ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Brain className="w-3.5 h-3.5" />
                <span>Complete lessons & IQ tests to illuminate more</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            ) : !isPremium ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Go Premium to unlock all 6 regions</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-secondary/70 text-xs">
                <span>Keep learning to max out your brain ✨</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
};
