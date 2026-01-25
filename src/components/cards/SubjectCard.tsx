import { Plus, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Subject, getGeniusById } from '@/data/geniuses';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: Subject;
  isAdded?: boolean;
  progress?: number;
  onAdd?: () => void;
  showGenius?: boolean;
  variant?: 'default' | 'compact' | 'progress';
}

const categoryColors: Record<string, string> = {
  language: 'bg-blue-100 text-blue-700',
  math: 'bg-green-100 text-green-700',
  science: 'bg-purple-100 text-purple-700',
  philosophy: 'bg-amber-100 text-amber-700',
  arts: 'bg-rose-100 text-rose-700',
};

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-secondary/20 text-secondary-foreground',
  Advanced: 'bg-accent/10 text-accent',
};

export const SubjectCard = ({ 
  subject, 
  isAdded, 
  progress = 0, 
  onAdd, 
  showGenius = false,
  variant = 'default' 
}: SubjectCardProps) => {
  const genius = showGenius ? getGeniusById(subject.geniusId) : null;

  if (variant === 'progress') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-xl border border-border p-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{subject.subjectName}</h4>
            {genius && (
              <p className="text-xs text-muted-foreground mt-0.5">From: {genius.name}</p>
            )}
          </div>
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-muted"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${progress}, 100`}
                className="text-secondary"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold">
              {progress}%
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last studied: 2 days ago</span>
          <Button size="sm" className="h-7 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Continue
          </Button>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
      >
        <div className="flex-1">
          <h4 className="font-medium text-sm text-foreground">{subject.subjectName}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", categoryColors[subject.category])}>
              {subject.category}
            </span>
            <span className="text-xs text-muted-foreground">Age {subject.ageStarted}+</span>
          </div>
        </div>
        {isAdded ? (
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-success" />
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 text-secondary hover:text-secondary hover:bg-secondary/10"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-card rounded-xl border border-border p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">{subject.subjectName}</h4>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", difficultyColors[subject.difficulty])}>
              {subject.difficulty}
            </span>
          </div>
          {genius && (
            <p className="text-xs text-muted-foreground mt-0.5">From: {genius.name}</p>
          )}
        </div>
        <span className={cn("text-xs px-2 py-0.5 rounded-full", categoryColors[subject.category])}>
          {subject.category}
        </span>
      </div>
      
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span>Age {subject.ageStarted}{subject.ageCompleted ? `-${subject.ageCompleted}` : '+'}</span>
        <span>•</span>
        <span>{subject.timeInvestment}</span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          View Details <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
        {isAdded ? (
          <div className="flex items-center gap-1 text-success text-xs">
            <Check className="w-4 h-4" /> Added
          </div>
        ) : (
          <Button 
            size="sm" 
            className="h-7 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={onAdd}
          >
            <Plus className="w-3 h-3 mr-1" /> Add to Path
          </Button>
        )}
      </div>
    </motion.div>
  );
};
