import { Crown, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Genius } from '@/data/geniuses';
import { getGeniusPortrait } from '@/data/portraits';
import { cn } from '@/lib/utils';

interface GeniusCardProps {
  genius: Genius;
  variant?: 'grid' | 'featured';
}

export const GeniusCard = ({ genius, variant = 'grid' }: GeniusCardProps) => {
  const portrait = getGeniusPortrait(genius.id);
  if (variant === 'featured') {
    return (
      <Link to={`/genius/${genius.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl gradient-hero p-6 text-primary-foreground"
        >
          <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-mono font-bold px-2 py-1 rounded-full">
            IQ {genius.iqMin}-{genius.iqMax}
          </div>
          
          <div className="flex items-center gap-4">
            {portrait ? (
              <img 
                src={portrait} 
                alt={genius.name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-cream/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-cream/20 flex items-center justify-center text-4xl font-heading">
                {genius.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <span className="text-xs uppercase tracking-wider text-cream/70">{genius.field}</span>
              <h3 className="font-heading text-2xl font-bold mt-1">{genius.name}</h3>
              <p className="text-sm text-cream/80 mt-1">{genius.hook}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-cream/60">{genius.era} Era</span>
            <span className="text-sm font-medium flex items-center gap-1">
              Explore <span className="text-lg">→</span>
            </span>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/genius/${genius.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative overflow-hidden rounded-xl bg-card border border-border",
          "transition-shadow duration-300 hover:shadow-lg",
          genius.isPremium && "opacity-90"
        )}
      >
        {/* Portrait */}
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
          {portrait ? (
            <img 
              src={portrait} 
              alt={genius.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl font-heading text-primary/40">{genius.name.charAt(0)}</span>
          )}
          
          {/* Premium lock overlay */}
          {genius.isPremium && (
            <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Lock className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
          )}
          
          {/* IQ badge */}
          <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
            IQ {genius.iqMin}+
          </div>
          
          {/* Premium badge */}
          {genius.isPremium && (
            <div className="absolute top-2 left-2 bg-premium text-premium-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Crown className="w-3 h-3" /> Premium
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h4 className="font-heading font-semibold text-sm text-foreground truncate">{genius.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{genius.birthYear > 0 ? genius.birthYear : Math.abs(genius.birthYear) + ' BC'}-{genius.deathYear > 0 ? genius.deathYear : Math.abs(genius.deathYear) + ' BC'}</p>
          <div className="mt-2">
            <span className="inline-block text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {genius.field}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{genius.hook}</p>
        </div>
      </motion.div>
    </Link>
  );
};
