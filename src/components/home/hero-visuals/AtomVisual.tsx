import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Q1 – Einstein: A glowing 3D-ish atom with orbiting electron rings.
 * On correct answer, particles burst outward.
 */

interface AtomVisualProps {
  answered: boolean;
  correct: boolean;
}

export const AtomVisual = ({ answered, correct }: AtomVisualProps) => {
  // Nucleus glow particles
  const nucleusParticles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 3,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        delay: Math.random() * 2,
      })),
    []
  );

  // Burst particles on correct
  const burstParticles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * Math.PI * 2,
        distance: 80 + Math.random() * 60,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.2,
      })),
    []
  );

  return (
    <div className="relative w-48 h-48 mx-auto mb-4">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbit ring 1 — tilted */}
      <motion.div
        className="absolute inset-4 rounded-full border border-secondary/30"
        style={{ transform: 'rotateX(70deg) rotateZ(0deg)' }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-secondary shadow-[0_0_12px_hsl(var(--secondary))]"
          style={{ top: '-6px', left: '50%', marginLeft: '-6px' }}
        />
      </motion.div>

      {/* Orbit ring 2 — different tilt */}
      <motion.div
        className="absolute inset-6 rounded-full border border-secondary/20"
        style={{ transform: 'rotateX(70deg) rotateZ(60deg)' }}
        animate={{ rotateZ: [60, 420] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-secondary/80 shadow-[0_0_10px_hsl(var(--secondary))]"
          style={{ top: '-5px', left: '50%', marginLeft: '-5px' }}
        />
      </motion.div>

      {/* Orbit ring 3 */}
      <motion.div
        className="absolute inset-8 rounded-full border border-secondary/15"
        style={{ transform: 'rotateX(70deg) rotateZ(120deg)' }}
        animate={{ rotateZ: [120, 480] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-secondary/60 shadow-[0_0_8px_hsl(var(--secondary))]"
          style={{ top: '-4px', left: '50%', marginLeft: '-4px' }}
        />
      </motion.div>

      {/* Nucleus */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, hsl(var(--secondary)), hsl(var(--secondary) / 0.6))',
          boxShadow: '0 0 30px hsl(var(--secondary) / 0.4), 0 0 60px hsl(var(--secondary) / 0.2)',
        }}
        animate={
          answered && correct
            ? { scale: [1, 1.4, 0.8, 1.1], boxShadow: ['0 0 30px hsl(var(--secondary) / 0.4)', '0 0 80px hsl(var(--secondary) / 0.8)', '0 0 30px hsl(var(--secondary) / 0.4)'] }
            : { scale: [1, 1.05, 1] }
        }
        transition={answered ? { duration: 0.6 } : { duration: 2, repeat: Infinity }}
      >
        {nucleusParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-secondary-foreground/30"
            style={{
              width: p.size,
              height: p.size,
              top: `calc(50% + ${p.y}px)`,
              left: `calc(50% + ${p.x}px)`,
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Burst on correct */}
      {answered && correct &&
        burstParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-secondary"
            style={{
              width: p.size,
              height: p.size,
              top: '50%',
              left: '50%',
              boxShadow: '0 0 6px hsl(var(--secondary))',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 0.8, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
    </div>
  );
};
