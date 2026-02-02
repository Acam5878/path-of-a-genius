import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Lock, Check, Play, BookOpen, ExternalLink, Crown } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { IQEstimateCard } from '@/components/cards/IQEstimateCard';
import { PathLessonDetailModal } from '@/components/lesson/PathLessonDetailModal';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { useTutor } from '@/contexts/TutorContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { 
  getPathModules, 
  getPathLessonsByModule, 
  getAllPathLessons,
  PathLesson,
  PathModule 
} from '@/data/pathCurriculum';
import { cn } from '@/lib/utils';

const PathOfGenius = () => {
  const { isLessonCompleted, toggleLessonComplete } = usePathProgress();
  const { setLessonContext } = useTutor();
  const { isPremium, showPaywall } = useSubscription();
  
  const [selectedModule, setSelectedModule] = useState<string | null>('ancient-greek');
  const [selectedLesson, setSelectedLesson] = useState<PathLesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  
  // Get modules and lessons from the standalone curriculum
  const modules = getPathModules();
  const allLessons = getAllPathLessons();
  
  // Calculate completion stats
  const completedLessons = allLessons.filter(lesson => 
    isLessonCompleted(lesson.id)
  ).length;

  // Free lessons - only the first Greek lesson is free
  const FREE_LESSON_IDS = ['greek-alphabet'];

  const isLessonFree = (lessonId: string) => {
    return FREE_LESSON_IDS.includes(lessonId);
  };

  const isLessonAccessible = (lesson: PathLesson) => {
    return isPremium || isLessonFree(lesson.id);
  };

  const handleLessonOpen = (lesson: PathLesson) => {
    // Check if lesson is accessible
    if (!isLessonAccessible(lesson)) {
      showPaywall();
      return;
    }
    
    setSelectedLesson(lesson);
    setShowLessonModal(true);
    
    // Set tutor context
    setLessonContext({
      geniusId: 'path-of-genius',
      geniusName: 'Path of a Genius',
      subjectId: lesson.moduleId,
      subjectName: modules.find(m => m.id === lesson.moduleId)?.name || lesson.moduleId,
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
    toggleLessonComplete(lessonId);
  };

  const getModuleProgress = (module: PathModule) => {
    const moduleLessons = getPathLessonsByModule(module.id);
    if (moduleLessons.length === 0) return 0;
    
    const completed = moduleLessons.filter(lesson => 
      isLessonCompleted(lesson.id)
    ).length;
    
    return Math.round((completed / moduleLessons.length) * 100);
  };

  // Module is accessible if user is premium OR if module has any free lessons
  const isModuleAccessible = (module: PathModule) => {
    if (isPremium) return true;
    const moduleLessons = getPathLessonsByModule(module.id);
    return moduleLessons.some(lesson => isLessonFree(lesson.id));
  };

  return (
    <AppLayout>
      <Header 
        title="Path of a Genius"
        rightActions={
          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-mono text-secondary">{completedLessons}/{allLessons.length}</span>
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

        {/* Course Description */}
        <div className="px-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-heading font-semibold text-foreground mb-2">The Complete Genius Curriculum</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {allLessons.length} lessons across 7 modules. Based on John Stuart Mill's intensive education method 
              and the learning paths of 10 historical geniuses. Includes vocabulary tables, 
              video courses, and links to primary texts.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Greek</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Latin</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Mathematics</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Physics</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Logic</span>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="px-4 space-y-3">
          <h3 className="font-heading font-semibold text-foreground">Modules</h3>
          
          {modules.map((module, index) => {
            const moduleLessons = getPathLessonsByModule(module.id);
            const progress = getModuleProgress(module);
            const isAccessible = isModuleAccessible(module);
            const isExpanded = selectedModule === module.id;
            const hasLessons = moduleLessons.length > 0;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Module Card */}
                <button
                  onClick={() => {
                    if (!isAccessible) {
                      showPaywall();
                      return;
                    }
                    if (!hasLessons) return; // Don't expand empty modules
                    setSelectedModule(isExpanded ? null : module.id);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    isExpanded 
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-card border-border hover:border-secondary/30",
                    !isAccessible && "opacity-60",
                    !hasLessons && "opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                      progress === 100 ? "bg-success/20" : "bg-muted"
                    )}>
                      {progress === 100 ? <Check className="w-6 h-6 text-success" /> : module.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-semibold text-foreground truncate">
                          {module.name}
                        </h3>
                        {!isAccessible && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {module.description}
                      </p>
                      
                      {/* Progress bar */}
                      {hasLessons && (
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
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {hasLessons ? (
                        <>
                          <span className="font-mono text-sm text-muted-foreground">
                            {moduleLessons.length}
                          </span>
                          <ChevronRight className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform",
                            isExpanded && "rotate-90"
                          )} />
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Lessons */}
                <AnimatePresence>
                  {isExpanded && isAccessible && hasLessons && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Module Resources */}
                      {module.resources && module.resources.length > 0 && (
                        <div className="pt-2 pl-4 pr-2">
                          <div className="bg-muted/30 rounded-lg p-3 mb-2">
                            <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              Module Resources
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {module.resources.slice(0, 4).map((resource, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(resource.url, '_blank');
                                  }}
                                  className="text-[10px] bg-card border border-border px-2 py-1 rounded-full hover:border-secondary/50 transition-colors flex items-center gap-1"
                                >
                                  {resource.title.length > 25 ? resource.title.slice(0, 25) + '...' : resource.title}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                              ))}
                              {module.resources.length > 4 && (
                                <span className="text-[10px] text-muted-foreground px-2 py-1">
                                  +{module.resources.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 pl-6 space-y-2">
                        {moduleLessons.map((lesson, lessonIndex) => {
                          const isComplete = isLessonCompleted(lesson.id);
                          const isFree = isLessonFree(lesson.id);
                          const isAccessible = isLessonAccessible(lesson);
                          
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
                                  : isAccessible
                                    ? "bg-muted/50 hover:bg-muted border border-transparent"
                                    : "bg-muted/30 border border-transparent opacity-70"
                              )}
                            >
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                isComplete ? "bg-success/20" : isAccessible ? "bg-secondary/20" : "bg-muted"
                              )}>
                                {isComplete ? (
                                  <Check className="w-4 h-4 text-success" />
                                ) : !isAccessible ? (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Play className="w-4 h-4 text-secondary" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-medium text-foreground truncate">
                                    {lesson.order}. {lesson.title}
                                  </h4>
                                  {isFree && !isPremium && (
                                    <span className="text-[10px] bg-success/20 text-success px-1.5 py-0.5 rounded font-medium">
                                      FREE
                                    </span>
                                  )}
                                  {!isAccessible && (
                                    <Crown className="w-3 h-3 text-secondary" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{lesson.estimatedMinutes} min</span>
                                  {lesson.vocabularyTable && lesson.vocabularyTable.length > 0 && (
                                    <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary rounded text-[10px]">
                                      {lesson.vocabularyTable.length} terms
                                    </span>
                                  )}
                                  {lesson.resources && lesson.resources.length > 0 && (
                                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 rounded text-[10px]">
                                      {lesson.resources.length} resources
                                    </span>
                                  )}
                                </div>
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

        {/* Premium Upsell */}
        {!isPremium && (
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="gradient-premium rounded-xl p-4 text-cream"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Unlock All Modules</p>
                  <p className="text-xs text-cream/80 mt-0.5">{allLessons.length} lessons • Full curriculum access</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-secondary text-secondary-foreground hover:bg-gold-light h-8"
                  onClick={showPaywall}
                >
                  Upgrade
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom padding for nav */}
        <div className="h-24" />
      </div>

      {/* Lesson Modal */}
      <PathLessonDetailModal
        lesson={selectedLesson}
        isOpen={showLessonModal}
        onClose={handleLessonClose}
        isCompleted={selectedLesson ? isLessonCompleted(selectedLesson.id) : false}
        onToggleComplete={handleToggleComplete}
      />
    </AppLayout>
  );
};

export default PathOfGenius;
