import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Brain, Zap, Flame, Shield, Target } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getGeniusPortrait } from '@/data/portraits';
import type { GeniusCognitiveProfile } from '@/data/geniusCognitiveProfiles';

interface MatchupScreenProps {
  opponent: GeniusCognitiveProfile;
  userIQ: number | null;
  onComplete: () => void;
}

const MATCHUP_DURATION = 6000; // 6 seconds

// Stat bar that animates in
const StatBar = ({ label, value, maxValue, color, delay, icon }: {
  label: string; value: number; maxValue: number; color: string; delay: number;
  icon: React.ReactNode;
}) => {
  const pct = Math.min(100, Math.round((value / maxValue) * 100));
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        </div>
        <span className={`text-xs font-mono font-bold ${color}`}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.includes('secondary') ? 'bg-secondary' : color.includes('orange') ? 'bg-orange-500' : color.includes('green') ? 'bg-green-500' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export const MatchupScreen = ({ opponent, userIQ, onComplete }: MatchupScreenProps) => {
  const [phase, setPhase] = useState<'enter' | 'stats' | 'vs' | 'countdown'>('enter');
  const [countdownNum, setCountdownNum] = useState(3);

  const portrait = opponent.difficulty === 'genius' ? getGeniusPortrait(opponent.geniusId) : null;
  const displayIQ = userIQ ?? 100;

  // Phase timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('stats'), 600),
      setTimeout(() => setPhase('vs'), 3500),
      setTimeout(() => setPhase('countdown'), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Countdown within the matchup
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdownNum <= 0) {
      onComplete();
      return;
    }
    const t = setTimeout(() => setCountdownNum(n => n - 1), 500);
    return () => clearTimeout(t);
  }, [phase, countdownNum, onComplete]);

  // Compute opponent "stats" for the boxing card
  const opponentAccAvg = Math.round(
    Object.values(opponent.accuracy).reduce((s, v) => s + v, 0) / Object.values(opponent.accuracy).length * 100
  );
  const opponentSpeed = Math.round(100 - (opponent.responseSpeed / 20) * 100);

  // User estimated stats (derived from IQ or defaults)
  const userAccuracy = Math.min(95, Math.round(50 + (displayIQ - 85) * 0.8));
  const userSpeed = 65; // Default assumption

  // Best opponent categories
  const topCats = Object.entries(opponent.accuracy)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cat]) => cat.replace('-', ' '));

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.06),transparent_70%)]" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, hsl(var(--secondary) / 0.08), transparent 50%)',
            'radial-gradient(circle at 70% 50%, hsl(var(--destructive) / 0.08), transparent 50%)',
            'radial-gradient(circle at 30% 50%, hsl(var(--secondary) / 0.08), transparent 50%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Diagonal split line */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-secondary/30 to-transparent -translate-x-1/2" />
      </motion.div>

      {/* Main matchup container */}
      <div className="relative w-full max-w-md z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Swords className="w-4 h-4 text-secondary" />
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary font-mono">Match Preview</span>
          </div>
        </motion.div>

        {/* Two fighter cards side by side */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* USER CARD */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative p-4 rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 via-card to-card overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-secondary/10 blur-2xl" />
            
            <div className="relative text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto rounded-2xl bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center shadow-lg shadow-secondary/10"
              >
                <span className="text-2xl font-bold text-secondary">You</span>
              </motion.div>
              
              <div>
                <p className="text-xs font-bold text-foreground">Challenger</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl font-bold font-mono text-secondary"
                >
                  {displayIQ}
                </motion.p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Est. IQ</p>
              </div>

              <AnimatePresence>
                {(phase === 'stats' || phase === 'vs' || phase === 'countdown') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2 border-t border-border/50"
                  >
                    <StatBar
                      label="Accuracy"
                      value={userAccuracy}
                      maxValue={100}
                      color="text-secondary"
                      delay={0.8}
                      icon={<Target className="w-3 h-3 text-secondary" />}
                    />
                    <StatBar
                      label="Speed"
                      value={userSpeed}
                      maxValue={100}
                      color="text-green-400"
                      delay={1.0}
                      icon={<Zap className="w-3 h-3 text-green-400" />}
                    />
                    <StatBar
                      label="Resilience"
                      value={Math.min(90, 40 + Math.round((displayIQ - 85) * 0.6))}
                      maxValue={100}
                      color="text-orange-400"
                      delay={1.2}
                      icon={<Shield className="w-3 h-3 text-orange-400" />}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* OPPONENT CARD */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative p-4 rounded-2xl border border-destructive/30 bg-gradient-to-bl from-destructive/10 via-card to-card overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-destructive/10 blur-2xl" />
            
            <div className="relative text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                {portrait ? (
                  <Avatar className="w-16 h-16 mx-auto border-2 border-destructive/40 shadow-lg shadow-destructive/10">
                    <AvatarImage src={portrait} alt={opponent.name} />
                    <AvatarFallback className="bg-muted text-lg">{opponent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-destructive/20 border-2 border-destructive/40 flex items-center justify-center text-3xl shadow-lg shadow-destructive/10">
                    {opponent.icon || '🤖'}
                  </div>
                )}
              </motion.div>
              
              <div>
                <p className="text-xs font-bold text-foreground truncate">{opponent.name.split(' ').pop()}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-2xl font-bold font-mono text-destructive"
                >
                  {opponent.iq}
                </motion.p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">IQ Rating</p>
              </div>

              <AnimatePresence>
                {(phase === 'stats' || phase === 'vs' || phase === 'countdown') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2 border-t border-border/50"
                  >
                    <StatBar
                      label="Accuracy"
                      value={opponentAccAvg}
                      maxValue={100}
                      color="text-destructive"
                      delay={0.9}
                      icon={<Target className="w-3 h-3 text-destructive" />}
                    />
                    <StatBar
                      label="Speed"
                      value={opponentSpeed}
                      maxValue={100}
                      color="text-green-400"
                      delay={1.1}
                      icon={<Zap className="w-3 h-3 text-green-400" />}
                    />
                    <StatBar
                      label="Resilience"
                      value={Math.min(95, Math.round(opponent.iq * 0.45))}
                      maxValue={100}
                      color="text-orange-400"
                      delay={1.3}
                      icon={<Shield className="w-3 h-3 text-orange-400" />}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* VS Badge */}
        <motion.div
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
        >
          <div className="relative">
            <motion.div
              className="w-14 h-14 rounded-full bg-card border-2 border-secondary/50 flex items-center justify-center shadow-xl"
              animate={{
                boxShadow: [
                  '0 0 0px hsl(var(--secondary) / 0)',
                  '0 0 25px hsl(var(--secondary) / 0.3)',
                  '0 0 0px hsl(var(--secondary) / 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-lg font-black font-mono text-secondary">VS</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Opponent taunt */}
        <AnimatePresence>
          {(phase === 'stats' || phase === 'vs') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2.2 }}
              className="text-center mb-4"
            >
              <p className="text-xs italic text-muted-foreground px-6">"{opponent.taunt}"</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Brain className="w-3 h-3 text-muted-foreground" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
                  Strong in: {topCats.join(' & ')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rules strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {[
            { icon: <Flame className="w-3.5 h-3.5 text-orange-400" />, text: 'Combos' },
            { icon: <Zap className="w-3.5 h-3.5 text-secondary" />, text: '×5 max' },
            { icon: <Swords className="w-3.5 h-3.5 text-muted-foreground" />, text: '60 sec' },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/20 border border-border/50">
              {r.icon}
              <span className="text-[9px] font-bold text-muted-foreground">{r.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Countdown overlay */}
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdownNum}
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {countdownNum > 0 ? (
                    <span className="text-7xl font-black font-mono text-secondary drop-shadow-[0_0_30px_hsl(var(--secondary)/0.5)]">
                      {countdownNum}
                    </span>
                  ) : (
                    <motion.span
                      className="text-5xl font-black font-mono text-secondary drop-shadow-[0_0_30px_hsl(var(--secondary)/0.5)]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      FIGHT!
                    </motion.span>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
