import { motion } from 'framer-motion';
import davinciPortrait from '@/assets/geniuses/davinci-portrait.jpg';

/**
 * Q2 – Da Vinci: Full-screen cinematic card with portrait,
 * ink-wash overlay, and theatrical depth.
 */

interface CinematicVisualProps {
  answered: boolean;
  correct: boolean;
}

export const CinematicVisual = ({ answered, correct }: CinematicVisualProps) => {
  return (
    <div className="relative w-full max-w-xs mx-auto mb-4 overflow-hidden rounded-2xl aspect-[3/4]">
      {/* Portrait with parallax feel */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: answered ? 1.0 : 1.15 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src={davinciPortrait}
          alt="Leonardo da Vinci"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Ink-wash gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(var(--background) / 0.1) 0%, 
              hsl(var(--background) / 0.3) 30%,
              hsl(var(--background) / 0.85) 75%,
              hsl(var(--background)) 100%
            )
          `,
        }}
      />

      {/* Sfumato-inspired smoky edges */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: `
            radial-gradient(ellipse at center, 
              transparent 40%, 
              hsl(var(--background) / 0.6) 70%,
              hsl(var(--background) / 0.9) 100%
            )
          `,
        }}
      />

      {/* Golden vignette on correct */}
      {answered && correct && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2] }}
          transition={{ duration: 1.5 }}
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--secondary) / 0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Floating brushstroke accents */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 40 + i * 20,
            height: 2,
            background: `hsl(var(--secondary) / ${0.1 + i * 0.05})`,
            top: `${20 + i * 15}%`,
            left: `${10 + i * 8}%`,
            transform: `rotate(${-15 + i * 8}deg)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
        />
      ))}

      {/* "Sfumato" label */}
      <motion.div
        className="absolute bottom-4 left-4 right-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-1">
          Renaissance Master
        </p>
        <p className="text-lg font-heading font-bold text-foreground/90">
          Leonardo da Vinci
        </p>
      </motion.div>
    </div>
  );
};
