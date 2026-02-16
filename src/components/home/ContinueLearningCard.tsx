import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { cn } from '@/lib/utils';

interface LessonInfo {
  id: string;
  title: string;
  moduleId: string;
  moduleName: string;
  moduleIcon: string;
  estimatedMinutes: number;
}

export const ContinueLearningCard = () => {
  const navigate = useNavigate();
  const { isLessonCompleted, getCompletedCount } = usePathProgress();
  const completedCount = getCompletedCount();
  
  const [nextLesson, setNextLesson] = useState<LessonInfo | null>(null);

  useEffect(() => {
    import('@/data/pathCurriculum').then(({ getAllPathLessons, getPathModules }) => {
      const allLessons = getAllPathLessons();
      const modules = getPathModules();
      const next = allLessons.find(lesson => !isLessonCompleted(lesson.id));
      if (!next) return;
      
      const mod = modules.find(m => m.id === next.moduleId);
      setNextLesson({
        id: next.id,
        title: next.title,
        moduleId: next.moduleId,
        moduleName: mod?.name || '',
        moduleIcon: mod?.icon || '',
        estimatedMinutes: next.estimatedMinutes,
      });
    });
  }, [completedCount, isLessonCompleted]);
  
  // Always render the card (for grid sizing), show different content based on state
  const hasStarted = nextLesson && completedCount > 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/the-path')}
      className={cn(
        "w-full text-left p-3 rounded-xl transition-all flex flex-col items-center justify-center min-h-[120px]",
        "bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)]",
        "border border-white/10 hover:border-secondary/30"
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
        <Play className="w-4 h-4 text-secondary" />
      </div>
      <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">
        {hasStarted ? 'Continue' : 'Start Learning'}
      </p>
      <h3 className="font-heading font-semibold text-white/90 text-xs text-center leading-tight line-clamp-2">
        {hasStarted ? nextLesson.title : 'Your Journey'}
      </h3>
      {hasStarted && (
        <p className="text-[10px] text-white/40 mt-1">
          {nextLesson.estimatedMinutes} min
        </p>
      )}
    </motion.button>
  );
};
