import { motion } from 'framer-motion';
import { Clock, Brain, ChevronRight, Lock, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IQTest, categoryIcons } from '@/data/iqTypes';

interface IQTestCardProps {
  test: IQTest;
  onClick: () => void;
  isPremium?: boolean;
  isLocked?: boolean;
}

export const IQTestCard = ({ test, onClick, isPremium = false, isLocked = false }: IQTestCardProps) => {
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
      className={cn(
        "w-full text-left bg-card rounded-2xl border border-border p-4 transition-colors",
        isLocked ? "opacity-75" : "hover:border-secondary/50"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
          isLocked ? "bg-muted" : "bg-secondary/10"
        )}>
          {isLocked ? <Lock className="w-5 h-5 text-muted-foreground" /> : categoryIcons[test.category]}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-semibold text-foreground">{test.name}</h3>
            {isPremium && !isLocked && (
              <Crown className="w-4 h-4 text-secondary" />
            )}
          </div>
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
            {isLocked && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                Premium
              </span>
            )}
          </div>
        </div>

        <ChevronRight className={cn(
          "w-5 h-5 shrink-0",
          isLocked ? "text-muted-foreground/50" : "text-muted-foreground"
        )} />
      </div>
    </motion.button>
  );
};
