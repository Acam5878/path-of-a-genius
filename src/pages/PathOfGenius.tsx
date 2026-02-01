import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Lock, Check, Play, BookOpen, Brain } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { IQEstimateCard } from '@/components/cards/IQEstimateCard';
import { LessonDetailModal } from '@/components/lesson/LessonDetailModal';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { useTutor } from '@/contexts/TutorContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { getAllLessons, Lesson } from '@/data/lessons';
import { cn } from '@/lib/utils';

// Define the unified Path of a Genius stages
const pathStages = [
  { 
    id: 'foundations', 
    name: 'Foundations', 
    description: "Mill's early education: reading, basic arithmetic, and mental discipline",
    icon: '📚',
    premium: false,
    subjectPatterns: ['greek-1', 'greek-2', 'greek-3', 'history', 'arithmetic']
  },
  { 
    id: 'reasoning', 
    name: 'Reasoning', 
    description: 'Logic, rhetoric, and the art of clear thinking',
    icon: '🧠',
    premium: false,
    subjectPatterns: ['logic', 'rhetoric', 'philosophy']
  },
  { 
    id: 'ancient-greek', 
    name: 'Ancient Greek Mastery', 
    description: 'Full Greek alphabet, vocabulary, grammar, and reading Plato',
    icon: '🏛️',
    premium: true,
    subjectPatterns: ['mill-greek', 'greek']
  },
  { 
    id: 'latin', 
    name: 'Latin Mastery', 
    description: 'Latin language from basics to reading Virgil and Cicero',
    icon: '📜',
    premium: true,
    subjectPatterns: ['latin', 'mill-latin']
  },
  { 
    id: 'mathematics', 
    name: 'Mathematics', 
    description: 'From Euclidean geometry to Newtonian calculus',
    icon: '📐',
    premium: true,
    subjectPatterns: ['math', 'geometry', 'calculus', 'newton']
  },
  { 
    id: 'science', 
    name: 'Science', 
    description: 'Natural philosophy, physics, and experimental method',
    icon: '🔬',
    premium: true,
    subjectPatterns: ['physics', 'science', 'curie', 'tesla']
  },
  { 
    id: 'creativity', 
    name: 'Creativity', 
    description: 'Art, music, literature, and the creative mind',
    icon: '🎨',
    premium: true,
    subjectPatterns: ['art', 'music', 'davinci', 'goethe']
  },
  { 
    id: 'mastery', 
    name: 'Mastery', 
    description: 'Integration of all knowledge into wisdom',
    icon: '👑',
    premium: true,
    subjectPatterns: ['mastery', 'synthesis', 'leibniz']
  },
];

const PathOfGenius = () => {
  const { isLessonCompleted, toggleLessonComplete } = useLearningPath();
  const { setLessonContext } = useTutor();
  const { isPremium, showPaywall } = useSubscription();
  
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  
  // Get all lessons and organize by stage
  const allLessons = getAllLessons();
  
  // Calculate completion stats
  const completedLessons = allLessons.filter(lesson => 
    isLessonCompleted(lesson.subjectId, lesson.id)
  ).length;
  
  // Get lessons for a stage based on subject patterns
  const getLessonsForStage = (stage: typeof pathStages[0]) => {
    return allLessons.filter(lesson => 
      stage.subjectPatterns.some(pattern => 
        lesson.subjectId.toLowerCase().includes(pattern.toLowerCase())
      )
    ).sort((a, b) => a.order - b.order);
  };

  const handleLessonOpen = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonModal(true);
    
    // Set tutor context
    setLessonContext({
      geniusId: lesson.subjectId.split('-')[0],
      geniusName: lesson.subjectId.includes('mill') ? 'John Stuart Mill' : 'Historical Genius',
      subjectId: lesson.subjectId,
      subjectName: lesson.subjectId,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonContent: lesson.content,
    });
  };

  const handleLessonClose = () => {
    setShowLessonModal(false);
    setSelectedLesson(null);
  };

  const handleToggleComplete = (lessonId: string) => {
    if (selectedLesson) {
      toggleLessonComplete(selectedLesson.subjectId, lessonId);
    }
  };

  const getStageProgress = (stage: typeof pathStages[0]) => {
    const stageLessons = getLessonsForStage(stage);
    if (stageLessons.length === 0) return 0;
    
    const completed = stageLessons.filter(lesson => 
      isLessonCompleted(lesson.subjectId, lesson.id)
    ).length;
    
    return Math.round((completed / stageLessons.length) * 100);
  };

  const isStageAccessible = (stage: typeof pathStages[0]) => {
    return !stage.premium || isPremium;
  };

  return (
    <AppLayout>
      <Header 
        title="Path of a Genius"
        rightActions={
          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-mono text-secondary">{completedLessons}</span>
          </div>
        }
      />

      <div className="py-4 space-y-6">
        {/* IQ Estimate Card */}
        <div className="px-4">
          <IQEstimateCard 
            completedLessons={completedLessons}
            totalLessons={allLessons.length}
          />
        </div>

        {/* Path Stages */}
        <div className="px-4 space-y-3">
          {pathStages.map((stage, index) => {
            const stageLessons = getLessonsForStage(stage);
            const progress = getStageProgress(stage);
            const isAccessible = isStageAccessible(stage);
            const isExpanded = selectedStage === stage.id;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Stage Card */}
                <button
                  onClick={() => {
                    if (!isAccessible) {
                      showPaywall();
                      return;
                    }
                    setSelectedStage(isExpanded ? null : stage.id);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    isExpanded 
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-card border-border hover:border-secondary/30",
                    !isAccessible && "opacity-60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                      progress === 100 ? "bg-success/20" : "bg-muted"
                    )}>
                      {progress === 100 ? <Check className="w-6 h-6 text-success" /> : stage.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-semibold text-foreground truncate">
                          {stage.name}
                        </h3>
                        {!isAccessible && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {stage.description}
                      </p>
                      
                      {/* Progress bar */}
                      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className={cn(
                            "h-full rounded-full",
                            progress === 100 ? "bg-success" : "bg-secondary"
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-muted-foreground">
                        {stageLessons.length} lessons
                      </span>
                      <ChevronRight className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        isExpanded && "rotate-90"
                      )} />
                    </div>
                  </div>
                </button>

                {/* Expanded Lessons */}
                <AnimatePresence>
                  {isExpanded && isAccessible && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pl-6 space-y-2">
                        {stageLessons.map((lesson, lessonIndex) => {
                          const isComplete = isLessonCompleted(lesson.subjectId, lesson.id);
                          
                          return (
                            <motion.button
                              key={lesson.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lessonIndex * 0.03 }}
                              onClick={() => handleLessonOpen(lesson)}
                              className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                isComplete 
                                  ? "bg-success/10 border border-success/20" 
                                  : "bg-muted/50 hover:bg-muted border border-transparent"
                              )}
                            >
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                isComplete ? "bg-success/20" : "bg-secondary/20"
                              )}>
                                {isComplete ? (
                                  <Check className="w-4 h-4 text-success" />
                                ) : (
                                  <Play className="w-4 h-4 text-secondary" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-foreground truncate">
                                  {lesson.order}. {lesson.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.estimatedMinutes} min
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom padding for nav */}
        <div className="h-24" />
      </div>

      {/* Lesson Modal */}
      <LessonDetailModal
        lesson={selectedLesson}
        isOpen={showLessonModal}
        onClose={handleLessonClose}
        isCompleted={selectedLesson ? isLessonCompleted(selectedLesson.subjectId, selectedLesson.id) : false}
        onToggleComplete={handleToggleComplete}
      />
    </AppLayout>
  );
};

export default PathOfGenius;
