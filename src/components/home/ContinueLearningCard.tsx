import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { getAllPathLessons, getPathModules, PathLesson } from '@/data/pathCurriculum';
import { cn } from '@/lib/utils';

export const ContinueLearningCard = () => {
  const navigate = useNavigate();
  const { isLessonCompleted, getCompletedCount } = usePathProgress();
  
  const allLessons = getAllPathLessons();
  const modules = getPathModules();
  const completedCount = getCompletedCount();
  
  // Find the first incomplete lesson
  const nextLesson: PathLesson | undefined = allLessons.find(
    lesson => !isLessonCompleted(lesson.id)
  );
  
  // If all lessons complete or no lessons, don't show the card
  if (!nextLesson || allLessons.length === 0) return null;
  
  // Don't show if user hasn't started yet (show PathHeroCard instead)
  if (completedCount === 0) return null;
  
  const module = modules.find(m => m.id === nextLesson.moduleId);
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/the-path')}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all",
        "bg-gradient-to-r from-secondary/10 to-accent/10",
        "border-secondary/30 hover:border-secondary/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
          <Play className="w-5 h-5 text-secondary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">Continue Learning</p>
          <h3 className="font-heading font-semibold text-foreground text-sm truncate">
            {nextLesson.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {module?.icon} {module?.name} • {nextLesson.estimatedMinutes} min
          </p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>
    </motion.button>
  );
};
