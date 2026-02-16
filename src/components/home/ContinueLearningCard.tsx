import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
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

  // Lazy-load curriculum data to find the next lesson
  useEffect(() => {
    if (completedCount === 0) return; // Don't show if user hasn't started
    
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
  
  if (!nextLesson || completedCount === 0) return null;
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/the-path')}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all",
        "bg-gradient-to-r from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)]",
        "border border-white/10 hover:border-secondary/30"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
          <Play className="w-4 h-4 text-secondary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-white/40 mb-0.5 uppercase tracking-wider">Continue Learning</p>
          <h3 className="font-heading font-semibold text-white/90 text-sm truncate">
            {nextLesson.title}
          </h3>
          <p className="text-xs text-white/50">
            {nextLesson.moduleIcon} {nextLesson.moduleName} • {nextLesson.estimatedMinutes} min
          </p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-white/30 shrink-0" />
      </div>
    </motion.button>
  );
};
