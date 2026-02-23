import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Results screen: Abstract neural pathways — synapses firing across
 * the background, building a glowing network based on the user's score.
 */

interface NeuralPathwayVisualProps {
  score: number;
  total: number;
}

interface Neuron {
  x: number;
  y: number;
  radius: number;
  pulseSpeed: number;
  pulsePhase: number;
  connections: number[];
}

export const NeuralPathwayVisual = ({ score, total }: NeuralPathwayVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Generate neural network layout
  const neurons = useMemo(() => {
    const count = 12 + score * 6; // More neurons for higher score
    const result: Neuron[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        x: Math.random(),
        y: Math.random(),
        radius: 2 + Math.random() * 3,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }
    // Connect nearby neurons
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const dx = result[i].x - result[j].x;
        const dy = result[i].y - result[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.3) {
          result[i].connections.push(j);
        }
      }
    }
    return result;
  }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    // Get CSS variable color
    const style = getComputedStyle(document.documentElement);
    const secondaryHsl = style.getPropertyValue('--secondary').trim();

    const draw = (time: number) => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const t = time / 1000;

      // Draw connections with flowing pulses
      neurons.forEach((neuron, i) => {
        const nx = neuron.x * w;
        const ny = neuron.y * h;

        neuron.connections.forEach((j) => {
          const other = neurons[j];
          const ox = other.x * w;
          const oy = other.y * h;

          // Base line
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = `hsl(${secondaryHsl} / 0.08)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Flowing pulse along connection
          const pulsePos = (Math.sin(t * neuron.pulseSpeed + i * 0.5) + 1) / 2;
          const px = nx + (ox - nx) * pulsePos;
          const py = ny + (oy - ny) * pulsePos;

          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${secondaryHsl} / 0.4)`;
          ctx.fill();
        });
      });

      // Draw neurons
      neurons.forEach((neuron) => {
        const nx = neuron.x * w;
        const ny = neuron.y * h;
        const pulse = Math.sin(t * neuron.pulseSpeed + neuron.pulsePhase);
        const r = neuron.radius + pulse * 1;
        const alpha = 0.3 + pulse * 0.15;

        // Glow
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 4);
        gradient.addColorStop(0, `hsl(${secondaryHsl} / ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsl(${secondaryHsl} / 0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${secondaryHsl} / ${alpha + 0.2})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [neurons]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ position: 'absolute', inset: 0 }}
      />
    </motion.div>
  );
};
