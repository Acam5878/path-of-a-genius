import { motion } from 'framer-motion';
import { IQBellCurve } from '@/components/iq-test/IQBellCurve';
import { Brain, TrendingUp, Clock, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIQPersistence } from '@/hooks/useIQPersistence';
import { categoryDisplayNames, IQCategory } from '@/data/iqTypes';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface IQProgressCardProps {
  variant?: 'compact' | 'full';
  showHistory?: boolean;
}

export const IQProgressCard = ({ variant = 'compact', showHistory = false }: IQProgressCardProps) => {
  const { profile, testHistory, isLoading } = useIQPersistence();

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-border p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="h-16 bg-muted rounded" />
      </div>
    );
  }

  // No tests taken yet
  if (!profile || profile.totalTestsTaken === 0) {
    return (
      <Link to="/iq-tests?start=verbal">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="w-full text-center bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)] rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center min-h-[120px]"
        >
          <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
            <Brain className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">IQ Test</p>
          <h3 className="font-heading font-semibold text-white/90 text-xs">Discover Your IQ</h3>
          <p className="text-[10px] text-white/40 mt-1">Take a test</p>
        </motion.div>
      </Link>
    );
  }

  const getClassification = (iq: number): string => {
    if (iq >= 145) return 'Genius';
    if (iq >= 130) return 'Very Superior';
    if (iq >= 120) return 'Superior';
    if (iq >= 110) return 'High Average';
    if (iq >= 90) return 'Average';
    return 'Developing';
  };

  const categoryScores = [
    { key: 'verbal', label: 'Verbal', value: profile.verbalIQ },
    { key: 'numerical', label: 'Numerical', value: profile.numericalIQ },
    { key: 'logical', label: 'Logical', value: profile.logicalIQ },
    { key: 'spatial', label: 'Spatial', value: profile.spatialIQ },
    { key: 'memory', label: 'Memory', value: profile.memoryIQ },
    { key: 'pattern-recognition', label: 'Pattern', value: profile.patternRecognitionIQ },
  ].filter(c => c.value !== null);

  if (variant === 'compact') {
    return (
      <Link to="/iq-tests">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)] rounded-xl border border-white/10 p-3 text-white flex flex-col items-center justify-center min-h-[120px]"
        >
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-2">
            <Brain className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Your IQ</p>
          <span className="font-heading text-2xl font-bold">{profile.overallIQ}</span>
          <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full mt-1">
            {getClassification(profile.overallIQ)}
          </span>
        </motion.div>
      </Link>
    );
  }

  // Full variant for IQ Tests page
  return (
    <div className="space-y-4">
      {/* Main IQ Score Card */}
      <div className="bg-gradient-to-br from-primary/90 to-accent/80 rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5" />
          <span className="font-medium">Your IQ Profile</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-heading text-5xl font-bold">{profile.overallIQ}</span>
            <p className="text-sm opacity-80 mt-1">{getClassification(profile.overallIQ)}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4" />
              <span>{profile.totalTestsTaken} tests taken</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{Math.round(profile.averageScore)}% average</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {categoryScores.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {categoryScores.slice(0, 6).map((cat) => (
              <div key={cat.key} className="bg-white/10 rounded-lg p-2 text-center">
                <span className="text-lg font-bold">{cat.value}</span>
                <p className="text-xs opacity-70">{cat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bell Curve */}
      <IQBellCurve userIQ={profile.overallIQ} />

      {/* Test History */}
      {showHistory && testHistory.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Recent Tests
          </h3>
          <div className="space-y-2">
            {testHistory.slice(0, 5).map((test) => (
              <div 
                key={test.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-lg">
                    {test.category === 'verbal' && '📚'}
                    {test.category === 'numerical' && '🔢'}
                    {test.category === 'spatial' && '🧊'}
                    {test.category === 'logical' && '🧠'}
                    {test.category === 'memory' && '💭'}
                    {test.category === 'pattern-recognition' && '🔍'}
                    {test.category === 'comprehensive' && '🎯'}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {categoryDisplayNames[test.category as IQCategory] || test.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(test.completedAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "font-mono font-bold",
                    test.estimatedIQ >= 120 ? "text-success" :
                    test.estimatedIQ >= 100 ? "text-secondary" : "text-muted-foreground"
                  )}>
                    {test.estimatedIQ}
                  </span>
                  <p className="text-xs text-muted-foreground">{Math.round(test.percentageScore)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
