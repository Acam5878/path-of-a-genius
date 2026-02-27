import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Zap, Clock, Crown } from 'lucide-react';
import { geniusCognitiveProfiles } from '@/data/geniusCognitiveProfiles';
import { getGeniusPortrait } from '@/data/portraits';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const ChallengeArenaCard = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(true);

  // Pick a rotating featured genius based on the day
  const dayIndex = Math.floor(Date.now() / 86400000) % geniusCognitiveProfiles.length;
  const featured = geniusCognitiveProfiles[dayIndex];
  const portrait = getGeniusPortrait(featured.geniusId);
  const isPremium = featured.difficulty === 'genius';

  // Pulsing animation
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

          {/* Main content */}
          <div className="flex items-center gap-4">
            {/* Genius portrait */}
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16 border-2 border-secondary/40">
                {portrait && <AvatarImage src={portrait} alt={featured.name} />}
                <AvatarFallback className="bg-muted text-foreground font-bold">
                  {featured.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isPremium && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                  <Crown className="w-3 h-3 text-secondary-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Today's featured opponent</p>
              <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                {featured.name}
              </h3>
              <p className="text-xs text-secondary italic">"{featured.taunt}"</p>
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
              <span className="text-xs font-bold text-secondary">Combo × 5</span>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              Answer fast. Beat the genius.
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
