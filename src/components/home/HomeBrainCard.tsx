import { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lock, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';

// 6 cognitive domains mapped to brain regions
interface CognitiveDomain {
  id: string;
  label: string;
  path: string;
  labelX: number;
  labelY: number;
  premium: boolean; // Whether this region requires premium to fully illuminate
}

const domains: CognitiveDomain[] = [
  {
    id: 'verbal',
    label: 'Verbal',
    path: 'M60,50 Q70,25 95,20 Q110,22 120,35 Q115,50 108,58 Q90,55 70,58 Q62,54 60,50Z',
    labelX: 90, labelY: 40,
    premium: false,
  },
  {
    id: 'logical',
    label: 'Logic',
    path: 'M120,35 Q130,22 155,20 Q180,25 190,50 Q188,54 180,58 Q160,55 142,58 Q135,50 120,35Z',
    labelX: 155, labelY: 40,
    premium: false,
  },
  {
    id: 'numerical',
    label: 'Numerical',
    path: 'M190,50 Q198,60 200,75 Q195,90 182,100 Q165,95 150,92 Q142,80 142,58 Q160,55 180,58 Q188,54 190,50Z',
    labelX: 175, labelY: 78,
    premium: false,
  },
  {
    id: 'spatial',
    label: 'Spatial',
    path: 'M60,50 Q62,54 70,58 Q90,55 108,58 Q108,80 100,92 Q85,95 68,100 Q55,90 50,75 Q52,60 60,50Z',
    labelX: 75, labelY: 78,
    premium: true,
  },
  {
    id: 'memory',
    label: 'Memory',
    path: 'M68,100 Q85,95 100,92 Q108,105 115,115 Q125,130 120,142 Q105,148 85,145 Q65,138 55,125 Q50,110 55,100 Q60,98 68,100Z',
    labelX: 85, labelY: 122,
    premium: true,
  },
  {
    id: 'pattern',
    label: 'Pattern',
    path: 'M182,100 Q165,95 150,92 Q142,105 135,115 Q125,130 130,142 Q145,148 165,145 Q185,138 195,125 Q200,110 195,100 Q190,98 182,100Z',
    labelX: 165, labelY: 122,
    premium: true,
  },
];

// Map IQ profile values (0–200 scale) to intensity (0–1)
const iqToIntensity = (iq: number | null): number => {
  if (!iq || iq <= 0) return 0;
  // Map 80–150 to 0.1–1.0
  return Math.min(1, Math.max(0.05, (iq - 80) / 70));
};

export const HomeBrainCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // IQ domain scores
  const [domainScores, setDomainScores] = useState<Record<string, number>>({});
  const [heroScore, setHeroScore] = useState<Record<string, boolean>>({});

  // Load hero quiz results for unauthenticated users
  useEffect(() => {
    try {
      const stored = localStorage.getItem('genius-academy-hero-score');
      if (stored) {
        const { score } = JSON.parse(stored);
        // Light up "verbal" slightly if they got any right
        if (score >= 1) setHeroScore({ verbal: true });
        if (score >= 2) setHeroScore({ verbal: true, logical: true });
        if (score >= 3) setHeroScore({ verbal: true, logical: true, numerical: true });
      }
    } catch {}
  }, []);

  // Load IQ profile for authenticated users
  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  // Compute active intensities
  const intensities = useMemo(() => {
    const result: Record<string, number> = {};
    domains.forEach(d => {
      if (user) {
        // Authenticated: use IQ scores, but premium-gated for some
        const score = domainScores[d.id] || 0;
        if (d.premium && !isPremium) {
          result[d.id] = Math.min(score, 0.15); // Show faint hint, locked
        } else {
          result[d.id] = score;
        }
      } else {
        // Unauthenticated: hero quiz gives a tiny glow
        result[d.id] = heroScore[d.id] ? 0.25 : 0;
      }
    });
    return result;
  }, [domainScores, heroScore, user, isPremium]);

  const totalLit = Object.values(intensities).filter(v => v > 0.1).length;
  const pctLit = Math.round((totalLit / 6) * 100);

  // Canvas particle glow effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 250, H = 170;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    interface P { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; hue: number; }
    const particles: P[] = [];

    const activeCenters = domains
      .filter(d => intensities[d.id] > 0.1)
      .map(d => ({ x: d.labelX, y: d.labelY, intensity: intensities[d.id] }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Spawn
      if (activeCenters.length > 0 && Math.random() < 0.3) {
        const c = activeCenters[Math.floor(Math.random() * activeCenters.length)];
        particles.push({
          x: c.x + (Math.random() - 0.5) * 30,
          y: c.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: 0, maxLife: 50 + Math.random() * 30,
          size: 0.8 + Math.random() * 1.5,
          hue: 43 + Math.random() * 15,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life > p.maxLife) { particles.splice(i, 1); continue; }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 62%, 52%, ${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 62%, 52%, ${alpha * 0.12})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [intensities]);

  const handleTap = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/iq-tests');
    }
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
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[120px] bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-secondary" />
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">Your Brain</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{pctLit}% illuminated</span>
          </div>

          {/* Brain SVG */}
          <div className="relative w-full flex justify-center">
            <div className="relative" style={{ width: 250, height: 170 }}>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ width: 250, height: 170 }}
              />
              <svg viewBox="0 0 250 170" className="w-full h-full relative z-10">
                <defs>
                  <filter id="home-brain-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Hemisphere line */}
                <line x1="125" y1="20" x2="125" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.12" strokeDasharray="3 3" />

                {domains.map(domain => {
                  const intensity = intensities[domain.id] || 0;
                  const isLocked = domain.premium && !isPremium && user;
                  const isActive = intensity > 0.1;

                  return (
                    <g key={domain.id}>
                      <motion.path
                        d={domain.path}
                        fill={isActive
                          ? `hsla(43, 62%, 52%, ${intensity * 0.5})`
                          : 'hsla(var(--muted-foreground), 0.04)'
                        }
                        stroke={isActive
                          ? `hsla(43, 62%, 52%, ${intensity * 0.7})`
                          : 'hsla(var(--muted-foreground), 0.12)'
                        }
                        strokeWidth={isActive ? 1 : 0.4}
                        filter={isActive ? 'url(#home-brain-glow)' : undefined}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          fillOpacity: isActive ? [intensity * 0.3, intensity * 0.6, intensity * 0.3] : 0.04,
                        }}
                        transition={isActive ? {
                          fillOpacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                          opacity: { duration: 0.6 },
                        } : { opacity: { duration: 0.6 } }}
                      />
                      <text
                        x={domain.labelX}
                        y={domain.labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="7"
                        fontFamily="monospace"
                        fill={isActive ? 'hsl(43, 62%, 52%)' : 'hsl(var(--muted-foreground))'}
                        opacity={isActive ? 0.9 : 0.25}
                      >
                        {domain.label}
                      </text>
                      {isLocked && (
                        <g transform={`translate(${domain.labelX - 4}, ${domain.labelY + 8})`}>
                          <rect x="0" y="0" width="8" height="8" rx="2" fill="hsl(var(--muted))" opacity="0.8" />
                          <text x="4" y="6.5" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.6">🔒</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* CTA based on state */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {!user ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Zap className="w-3.5 h-3.5" />
                <span>Sign up free to light up your brain</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            ) : totalLit < 3 ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Brain className="w-3.5 h-3.5" />
                <span>Take IQ tests to illuminate more regions</span>
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
                <span>Keep testing to max out your brain ✨</span>
              </div>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
};
