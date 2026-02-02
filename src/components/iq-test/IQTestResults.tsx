import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestResult, IQCalculator, categoryDisplayNames } from '@/data/iqTests';

interface IQTestResultsProps {
  result: TestResult;
  onRetake: () => void;
  onBackToTests: () => void;
}

export const IQTestResults = ({ result, onRetake, onBackToTests }: IQTestResultsProps) => {
  const percentile = IQCalculator.getPercentile(result.estimatedIQ);
  const classification = IQCalculator.getClassification(result.estimatedIQ);
  const correctCount = result.questionResults.filter(r => r.isCorrect).length;
  const totalCount = result.questionResults.length;

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-premium text-primary-foreground p-6 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6" />
            <h2 className="font-heading text-xl font-bold">Your Results</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-4xl font-mono font-bold"
              >
                {result.estimatedIQ}
              </motion.div>
              <div className="text-sm text-cream/80">Est. IQ</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-4xl font-mono font-bold"
              >
                {percentile}%
              </motion.div>
              <div className="text-sm text-cream/80">Percentile</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="text-4xl font-mono font-bold"
              >
                {result.percentageScore.toFixed(0)}%
              </motion.div>
              <div className="text-sm text-cream/80">Score</div>
            </div>
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full">
              <Award className="w-4 h-4" />
              <span className="font-medium">{classification}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-5"
      >
        <h3 className="font-heading font-semibold text-foreground mb-4">Score Breakdown</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-4 bg-success/10 rounded-xl border border-success/20">
            <div className="text-2xl font-mono font-bold text-success">{correctCount}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <div className="text-2xl font-mono font-bold text-destructive">{totalCount - correctCount}</div>
            <div className="text-sm text-muted-foreground">Incorrect</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="font-mono font-bold text-secondary">{result.percentageScore.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.percentageScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Strengths & Areas for Improvement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {result.strengthAreas.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-success" />
              <h3 className="font-heading font-semibold text-foreground">Strengths</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.strengthAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-success/10 text-success rounded-full text-sm capitalize"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {result.improvementAreas.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold text-foreground">Areas to Improve</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.improvementAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm capitalize"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border p-5"
      >
        <div className="text-sm text-muted-foreground mb-1">Test Category</div>
        <div className="font-heading font-semibold text-foreground">
          {categoryDisplayNames[result.category]}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Time taken: {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3"
      >
        <Button
          onClick={onRetake}
          variant="outline"
          className="flex-1"
        >
          Retake Test
        </Button>
        <Button
          onClick={onBackToTests}
          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          More Tests <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};
