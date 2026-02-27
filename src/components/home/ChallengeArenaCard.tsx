import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Zap, Clock, Crown, Flame, Trophy } from 'lucide-react';
import { getBotOpponents, getGeniusOpponents } from '@/data/geniusCognitiveProfiles';
import { getGeniusPortrait } from '@/data/portraits';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Animated particle spark
const Spark = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-secondary"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      y: [0, -20, -40],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

// Floating sword animation
const FloatingSword = ({ side }: { side: 'left' | 'right' }) => (
  <motion.div
    className={`absolute ${side === 'left' ? 'left-4 top-16' : 'right-4 top-20'}`}
    animate={{
      y: [0, -8, 0],
      rotate: side === 'left' ? [0, -5, 0] : [0, 5, 0],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: side === 'left' ? 0 : 1.5 }}
  >
    <Swords className={`w-6 h-6 ${side === 'left' ? 'text-secondary/20' : 'text-destructive/15'}`} />
  </motion.div>
);

export const ChallengeArenaCard = () => {
  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState<'opponents' | 'geniuses'>('opponents');
  const [tickerIndex, setTickerIndex] = useState(0);

  const bots = getBotOpponents();
  const geniuses = getGeniusOpponents();
  const allOpponents = [...bots, ...geniuses];

  // Cycle through opponents for the ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(i => (i + 1) % allOpponents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allOpponents.length]);

  // Auto-switch highlighted row
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow(r => r === 'opponents' ? 'geniuses' : 'opponents');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentOpponent = allOpponents[tickerIndex];
  const currentPortrait = currentOpponent.difficulty === 'genius'
    ? getGeniusPortrait(currentOpponent.geniusId) : null;

  // Sparks positions
  const sparks = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 0.3,
    x: 10 + Math.random() * 80,
    y: 20 + Math.random() * 60,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-4"
    >
      <button
        onClick={() => navigate('/challenge')}
        className="w-full text-left relative overflow-hidden rounded-2xl border border-secondary/40 group"
      >
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--card))] via-[hsl(220,30%,12%)] to-[hsl(240,25%,8%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--destructive)/0.08),transparent_50%)]" />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Sparks */}
        {sparks.map((s, i) => <Spark key={i} {...s} />)}

        {/* Floating swords */}
        <FloatingSword side="left" />
        <FloatingSword side="right" />

        {/* Animated corner glows */}
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px]"
          animate={{
            background: [
              'radial-gradient(circle, hsl(var(--secondary) / 0.15), transparent)',
              'radial-gradient(circle, hsl(var(--secondary) / 0.25), transparent)',
              'radial-gradient(circle, hsl(var(--secondary) / 0.15), transparent)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px]"
          animate={{
            background: [
              'radial-gradient(circle, hsl(var(--destructive) / 0.08), transparent)',
              'radial-gradient(circle, hsl(var(--destructive) / 0.16), transparent)',
              'radial-gradient(circle, hsl(var(--destructive) / 0.08), transparent)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <div className="relative p-5 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <motion.div
                className="relative"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Swords className="w-5 h-5 text-secondary" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 0px hsl(var(--secondary) / 0)',
                      '0 0 12px hsl(var(--secondary) / 0.4)',
                      '0 0 0px hsl(var(--secondary) / 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                Challenge Arena
              </span>
            </div>
            <motion.div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/20 border border-destructive/30"
              animate={{ borderColor: ['hsl(var(--destructive) / 0.3)', 'hsl(var(--destructive) / 0.6)', 'hsl(var(--destructive) / 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-destructive"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">Live</span>
            </motion.div>
          </div>

          {/* Rotating opponent ticker */}
          <div className="mb-5 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Now challenging</p>
            <div className="h-12 overflow-hidden relative">
              <AnimatedOpponentName
                key={tickerIndex}
                name={currentOpponent.name}
                iq={currentOpponent.iq}
                icon={currentOpponent.icon}
                portrait={currentPortrait}
              />
            </div>
          </div>

          {/* Two tier rows */}
          <div className="space-y-2.5 mb-5">
            {/* Opponents row */}
            <motion.div
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                activeRow === 'opponents'
                  ? 'border-secondary/30 bg-secondary/5'
                  : 'border-border/50 bg-muted/10'
              }`}
              animate={activeRow === 'opponents' ? { borderColor: 'hsl(var(--secondary) / 0.4)' } : {}}
            >
              <div className="flex -space-x-2.5">
                {bots.map(b => (
                  <motion.div
                    key={b.geniusId}
                    className="w-9 h-9 rounded-full bg-muted/60 border-2 border-card flex items-center justify-center text-base shadow-lg"
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                  >
                    {b.icon}
                  </motion.div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">Challenge an Opponent</p>
                <p className="text-[10px] text-muted-foreground">IQ 95 – 140</p>
              </div>
              <Badge variant="outline" className="text-[9px] border-green-500/40 text-green-400 shrink-0 font-bold">
                Free
              </Badge>
            </motion.div>

            {/* Genius row */}
            <motion.div
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                activeRow === 'geniuses'
                  ? 'border-secondary/30 bg-secondary/5'
                  : 'border-border/50 bg-muted/10'
              }`}
              animate={activeRow === 'geniuses' ? { borderColor: 'hsl(var(--secondary) / 0.4)' } : {}}
            >
              <div className="flex -space-x-2.5">
                {geniuses.slice(0, 4).map(g => {
                  const p = getGeniusPortrait(g.geniusId);
                  return (
                    <motion.div key={g.geniusId} whileHover={{ scale: 1.15, zIndex: 10 }}>
                      <Avatar className="w-9 h-9 border-2 border-card shadow-lg">
                        {p && <AvatarImage src={p} alt={g.name} />}
                        <AvatarFallback className="bg-muted text-[10px]">{g.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                  );
                })}
                <div className="w-9 h-9 rounded-full bg-secondary/20 border-2 border-card flex items-center justify-center">
                  <span className="text-[9px] font-bold text-secondary">+{geniuses.length - 4}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground">Challenge a Genius</p>
                <p className="text-[10px] text-muted-foreground">IQ 180 – 215</p>
              </div>
              <Badge variant="outline" className="text-[9px] border-secondary/40 text-secondary shrink-0 font-bold">
                <Crown className="w-3 h-3 mr-0.5" /> Premium
              </Badge>
            </motion.div>
          </div>

          {/* Stats strip with animated counters */}
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-bold text-secondary font-mono">60s</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400 font-mono">Combos</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-bold text-secondary font-mono">×5</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/30 border border-border/40 ml-auto"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground">Leaderboard</span>
            </motion.div>
          </div>

          {/* CTA Button - dramatic */}
          <motion.div
            className="relative py-3 rounded-xl text-center overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient bg */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                background: [
                  'linear-gradient(135deg, hsl(var(--secondary) / 0.25), hsl(var(--secondary) / 0.15))',
                  'linear-gradient(135deg, hsl(var(--secondary) / 0.35), hsl(var(--secondary) / 0.20))',
                  'linear-gradient(135deg, hsl(var(--secondary) / 0.25), hsl(var(--secondary) / 0.15))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-xl border"
              animate={{
                borderColor: [
                  'hsl(var(--secondary) / 0.3)',
                  'hsl(var(--secondary) / 0.6)',
                  'hsl(var(--secondary) / 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative text-sm font-bold text-secondary flex items-center justify-center gap-2">
              <Swords className="w-4 h-4" />
              Enter the Arena
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
};

// Animated opponent name ticker
function AnimatedOpponentName({ name, iq, icon, portrait }: {
  name: string; iq: number; icon?: string; portrait: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-3"
    >
      {portrait ? (
        <Avatar className="w-10 h-10 border-2 border-secondary/40">
          <AvatarImage src={portrait} alt={name} />
          <AvatarFallback className="bg-muted text-xs">{name.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-xl border-2 border-secondary/20">
          {icon || '🤖'}
        </div>
      )}
      <div className="text-left">
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="text-[10px] font-mono text-secondary font-bold">IQ {iq}</p>
      </div>
    </motion.div>
  );
}
