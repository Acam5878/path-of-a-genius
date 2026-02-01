import { motion } from 'framer-motion';
import { Brain, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IQEstimateCardProps {
  completedLessons: number;
  totalLessons: number;
  className?: string;
}

// Famous genius IQ benchmarks for comparison
const geniusBenchmarks = [
  { name: 'Average', iq: 100 },
  { name: 'Gifted', iq: 130 },
  { name: 'Einstein', iq: 160 },
  { name: 'J.S. Mill', iq: 180 },
];

export const IQEstimateCard = ({ 
  completedLessons, 
  totalLessons,
  className 
}: IQEstimateCardProps) => {
  // Calculate IQ estimate: starts at 100, maxes at 160
  // Linear progression based on lesson completion
  const progressRatio = totalLessons > 0 ? completedLessons / totalLessons : 0;
  const iqGain = Math.floor(progressRatio * 60); // Max 60 point gain
  const currentIQ = 100 + iqGain;
  
  // Find the current benchmark level
  const currentBenchmark = geniusBenchmarks.reduce((prev, curr) => 
    currentIQ >= curr.iq ? curr : prev
  );
  
  // Calculate progress to next benchmark
  const nextBenchmark = geniusBenchmarks.find(b => b.iq > currentIQ);
  const progressToNext = nextBenchmark 
    ? ((currentIQ - currentBenchmark.iq) / (nextBenchmark.iq - currentBenchmark.iq)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-gradient-to-br from-secondary/10 via-secondary/5 to-accent/10 rounded-2xl border border-secondary/20 p-5 relative overflow-hidden",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">IQ Potential</h3>
            <p className="text-xs text-muted-foreground">Based on curriculum mastery</p>
          </div>
        </div>

        {/* IQ Display */}
        <div className="flex items-end gap-2 mb-4">
          <motion.span
            key={currentIQ}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-mono text-5xl font-bold text-secondary"
          >
            {currentIQ}
          </motion.span>
          <div className="flex items-center gap-1 text-success mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{iqGain} pts</span>
          </div>
        </div>

        {/* Benchmark comparison */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current level: <span className="text-foreground font-medium">{currentBenchmark.name}</span></span>
            {nextBenchmark && (
              <span className="text-muted-foreground">Next: <span className="text-secondary font-medium">{nextBenchmark.name}</span></span>
            )}
          </div>
          
          {/* Progress bar with benchmarks */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentIQ - 100) / 80 * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute h-full bg-gradient-to-r from-secondary to-accent rounded-full"
            />
            {/* Benchmark markers */}
            {geniusBenchmarks.slice(1).map((benchmark) => (
              <div
                key={benchmark.iq}
                className="absolute top-0 h-full w-0.5 bg-foreground/20"
                style={{ left: `${(benchmark.iq - 100) / 80 * 100}%` }}
              />
            ))}
          </div>
          
          {/* Benchmark labels */}
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>100</span>
            <span>130</span>
            <span>160</span>
            <span>180</span>
          </div>
        </div>

        {/* Lessons progress */}
        <div className="flex items-center justify-between p-3 bg-card/50 rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-foreground">Lessons Completed</span>
          </div>
          <span className="font-mono text-sm font-bold text-secondary">
            {completedLessons}/{totalLessons}
          </span>
        </div>

        {/* Motivational message */}
        {currentIQ < 160 && (
          <p className="text-xs text-muted-foreground mt-3 text-center italic">
            Complete more lessons to unlock your genius potential!
          </p>
        )}
        {currentIQ >= 160 && (
          <p className="text-xs text-success mt-3 text-center font-medium">
            🎉 You've reached Einstein-level mastery!
          </p>
        )}
      </div>
    </motion.div>
  );
};
