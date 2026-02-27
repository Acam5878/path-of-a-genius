import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Zap, Clock, Crown, Users } from 'lucide-react';
import { getBotOpponents, getGeniusOpponents } from '@/data/geniusCognitiveProfiles';
import { getGeniusPortrait } from '@/data/portraits';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const ChallengeArenaCard = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(true);

  const bots = getBotOpponents();
  const geniuses = getGeniusOpponents();
  
  // Rotate featured genius daily
  const dayIndex = Math.floor(Date.now() / 86400000) % geniuses.length;
  const featuredGenius = geniuses[dayIndex];
  const portrait = getGeniusPortrait(featuredGenius.geniusId);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-4"
    >
      <button
        onClick={() => navigate('/challenge')}
        className="w-full text-left relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-[hsl(var(--card))] via-[hsl(217,30%,14%)] to-[hsl(217,35%,10%)]"
      >
        {/* Animated glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />

        <div className="relative p-5">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Swords className="w-5 h-5 text-secondary" />
                <motion.div
                  animate={{ scale: pulse ? 1.4 : 1, opacity: pulse ? 0 : 0.6 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-full bg-secondary/30"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                Challenge Arena
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/20 border border-destructive/30">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Opponent tiers preview */}
          <div className="space-y-3">
            {/* Opponent row */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {bots.slice(0, 4).map(b => (
                  <div key={b.geniusId} className="w-8 h-8 rounded-full bg-muted/60 border-2 border-card flex items-center justify-center text-sm">
                    {b.icon}
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">Challenge an Opponent</p>
                <p className="text-[10px] text-muted-foreground">IQ 95 – 140 • Free</p>
              </div>
              <Badge variant="outline" className="text-[9px] border-green-500/40 text-green-400 shrink-0">Free</Badge>
            </div>

            {/* Genius row */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {geniuses.slice(0, 4).map(g => {
                  const p = getGeniusPortrait(g.geniusId);
                  return (
                    <Avatar key={g.geniusId} className="w-8 h-8 border-2 border-card">
                      {p && <AvatarImage src={p} alt={g.name} />}
                      <AvatarFallback className="bg-muted text-[10px]">{g.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  );
                })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">Challenge a Genius</p>
                <p className="text-[10px] text-muted-foreground">IQ 180 – 215</p>
              </div>
              <Badge variant="outline" className="text-[9px] border-secondary/40 text-secondary shrink-0">
                <Crown className="w-3 h-3 mr-0.5" /> Premium
              </Badge>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-bold text-secondary">60s</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20">
              <Zap className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-bold text-secondary">Combo ×5</span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-4 py-2.5 rounded-xl bg-secondary/20 border border-secondary/30 text-center">
            <span className="text-sm font-bold text-secondary">
              ⚔️ Start Challenge →
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
};
