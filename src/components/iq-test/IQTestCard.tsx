import { motion } from 'framer-motion';
import { Clock, Brain, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IQTest, categoryIcons } from '@/data/iqTests';

interface IQTestCardProps {
  test: IQTest;
  onClick: () => void;
}

export const IQTestCard = ({ test, onClick }: IQTestCardProps) => {
  const difficultyColors = {
    beginner: 'text-success bg-success/10',
    intermediate: 'text-secondary bg-secondary/10',
    advanced: 'text-accent bg-accent/10',
    genius: 'text-purple-500 bg-purple-500/10'
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left bg-card rounded-2xl border border-border p-4 hover:border-secondary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl shrink-0">
          {categoryIcons[test.category]}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground mb-1">{test.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{test.description}</p>
          
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {test.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Brain className="w-3 h-3" />
              {test.questions.length} questions
            </span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
              difficultyColors[test.difficulty]
            )}>
              {test.difficulty}
            </span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>
    </motion.button>
  );
};
