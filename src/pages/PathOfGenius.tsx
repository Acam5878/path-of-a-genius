import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Lock, Check, Play, BookOpen, ExternalLink, Crown, Brain, TrendingUp } from 'lucide-react';
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

// Maps each module to the IQ domain it primarily strengthens
const MODULE_IQ_BENEFITS: Record<string, { area: string; boost: string }> = {
  'ancient-greek': { area: 'Verbal', boost: '+8 pts' },
  'logic': { area: 'Logical', boost: '+7 pts' },
  'latin': { area: 'Verbal', boost: '+6 pts' },
  'mathematics': { area: 'Numerical', boost: '+8 pts' },
  'natural-philosophy': { area: 'Logical', boost: '+5 pts' },
  'chemistry': { area: 'Pattern', boost: '+4 pts' },
  'natural-history': { area: 'Spatial', boost: '+4 pts' },
  'literature': { area: 'Verbal', boost: '+6 pts' },
  'history': { area: 'Memory', boost: '+5 pts' },
  'ethics': { area: 'Logical', boost: '+4 pts' },
  'rhetoric': { area: 'Verbal', boost: '+5 pts' },
  'thought-experiments': { area: 'Pattern', boost: '+4 pts' },
  'engineering': { area: 'Spatial', boost: '+5 pts' },
  'anatomy': { area: 'Memory', boost: '+4 pts' },
};

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

        {/* Hero Hook Section */}
        <div className="px-4 space-y-4">
          {/* Main Hook */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-secondary/20 rounded-2xl p-5"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground leading-tight">
                  The Education That Created Geniuses
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  A classical curriculum reverse-engineered from history's greatest minds
                </p>
              </div>
            </div>
            
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              John Stuart Mill was reading Greek at age 3. By 12, he had mastered logic, Latin, and advanced mathematics. 
              Einstein, da Vinci, Newton—they all followed similar paths rooted in classical education.
            </p>
            
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong>This isn't just education—it's transformation.</strong> We've distilled the exact methods, 
              texts, and progression that shaped the world's most brilliant thinkers into a structured curriculum 
              you can follow today.
            </p>
          </motion.div>

          {/* What You'll Master */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <h3 className="font-heading font-semibold text-foreground mb-3">What You'll Master</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Ancient Greek & Latin</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Logic & Rhetoric</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Mathematics & Geometry</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Physics & Natural Science</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Philosophy & Ethics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Literature & History</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex justify-between items-center bg-muted/50 rounded-xl p-3"
          >
            <div className="text-center flex-1">
              <p className="font-mono text-lg font-bold text-foreground">{allLessons.length}</p>
              <p className="text-xs text-muted-foreground">Lessons</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center flex-1">
              <p className="font-mono text-lg font-bold text-foreground">{modules.length}</p>
              <p className="text-xs text-muted-foreground">Modules</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center flex-1">
              <p className="font-mono text-lg font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground">Stages</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center flex-1">
              <p className="font-mono text-lg font-bold text-secondary">∞</p>
              <p className="text-xs text-muted-foreground">Potential</p>
            </div>
          </motion.div>
        </div>

        {/* Modules Section */}
        <div className="px-4 space-y-3">
          <AnimatePresence mode="wait">
            {!selectedModule ? (
              /* === MODULE GRID === */
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-heading font-semibold text-foreground mb-3">Modules</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {modules.map((module, index) => {
                    const moduleLessons = getPathLessonsByModule(module.id);
                    const progress = getModuleProgress(module);
                    const isAccessible = isModuleAccessible(module);
                    const hasLessons = moduleLessons.length > 0;
                    
                    return (
                      <motion.button
                        key={module.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => {
                          if (!isAccessible) { showPaywall(); return; }
                          if (!hasLessons) return;
                          setSelectedModule(module.id);
                        }}
                        className={cn(
                          "flex flex-col items-center text-center p-3 rounded-xl border transition-all",
                          "bg-card border-border hover:border-secondary/30 active:scale-[0.97]",
                          !isAccessible && "opacity-50",
                          !hasLessons && "opacity-40"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-1.5",
                          progress === 100 ? "bg-success/20" : "bg-muted"
                        )}>
                          {progress === 100 ? <Check className="w-5 h-5 text-success" /> : module.icon}
                        </div>
                        <h4 className="font-heading text-xs font-semibold text-foreground leading-tight line-clamp-2 mb-1">
                          {module.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          {!isAccessible && <Lock className="w-2.5 h-2.5" />}
                          {hasLessons ? <span>{moduleLessons.length} lessons</span> : <span>Soon</span>}
                        </div>
                        {/* IQ benefit tag */}
                        {MODULE_IQ_BENEFITS[module.id] && (
                          <div className="flex items-center gap-1 mt-1 text-[9px] font-medium text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">
                            <Brain className="w-2.5 h-2.5" />
                            <span>{MODULE_IQ_BENEFITS[module.id].area} {MODULE_IQ_BENEFITS[module.id].boost}</span>
                          </div>
                        )}
                        {hasLessons && progress > 0 && (
                          <div className="w-full mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              className={cn("h-full rounded-full", progress === 100 ? "bg-success" : "bg-secondary")}
                            />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* === EXPANDED MODULE VIEW === */
              (() => {
                const module = modules.find(m => m.id === selectedModule);
                if (!module) return null;
                const moduleLessons = getPathLessonsByModule(module.id);

                return (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Back + Title */}
                    <button 
                      onClick={() => setSelectedModule(null)}
                      className="flex items-center gap-1.5 text-sm text-secondary mb-3 active:opacity-70"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <span>All Modules</span>
                    </button>

                    <div className="bg-card border border-secondary/20 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-semibold text-foreground">
                          {module.icon} {module.name}
                        </h4>
                        <span className="text-xs text-muted-foreground font-mono">
                          {moduleLessons.filter(l => isLessonCompleted(l.id)).length}/{moduleLessons.length}
                        </span>
                      </div>

                      {/* Progress */}
                      {moduleLessons.length > 0 && (
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getModuleProgress(module)}%` }}
                            className={cn(
                              "h-full rounded-full",
                              getModuleProgress(module) === 100 ? "bg-success" : "bg-secondary"
                            )}
                          />
                        </div>
                      )}

                      {/* Resources */}
                      {module.resources && module.resources.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {module.resources.slice(0, 3).map((resource, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); window.open(resource.url, '_blank'); }}
                              className="text-[10px] bg-muted/50 border border-border px-2 py-0.5 rounded-full hover:border-secondary/50 transition-colors flex items-center gap-1"
                            >
                              {resource.title.length > 20 ? resource.title.slice(0, 20) + '…' : resource.title}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Lessons */}
                      <div className="space-y-1.5 pt-1">
                        {moduleLessons.map((lesson, lessonIndex) => {
                          const isComplete = isLessonCompleted(lesson.id);
                          const isFree = isLessonFree(lesson.id);
                          const accessible = isLessonAccessible(lesson);
                          
                          return (
                            <motion.button
                              key={lesson.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: lessonIndex * 0.03 }}
                              onClick={() => handleLessonOpen(lesson)}
                              className={cn(
                                "w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-colors",
                                isComplete
                                  ? "bg-success/10 border border-success/20"
                                  : accessible
                                    ? "bg-muted/40 hover:bg-muted border border-transparent"
                                    : "bg-muted/20 border border-transparent opacity-60"
                              )}
                            >
                              <div className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                isComplete ? "bg-success/20" : accessible ? "bg-secondary/20" : "bg-muted"
                              )}>
                                {isComplete ? (
                                  <Check className="w-3.5 h-3.5 text-success" />
                                ) : !accessible ? (
                                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-secondary" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-foreground truncate">
                                    {lesson.order}. {lesson.title}
                                  </span>
                                  {isFree && !isPremium && (
                                    <span className="text-[9px] bg-success/20 text-success px-1 py-0.5 rounded font-medium shrink-0">FREE</span>
                                  )}
                                  {!accessible && <Crown className="w-3 h-3 text-secondary shrink-0" />}
                                </div>
                                <span className="text-[11px] text-muted-foreground">{lesson.estimatedMinutes} min</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            )}
          </AnimatePresence>
        </div>

        {/* IQ Projection After Modules */}
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-accent/10 rounded-xl border border-secondary/20 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-secondary" />
              <h4 className="font-heading font-semibold text-sm text-foreground">Your IQ Potential</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-mono text-3xl font-bold text-secondary">{100 + Math.floor((completedLessons / Math.max(allLessons.length, 1)) * 60)}</span>
                <span className="text-sm text-muted-foreground ml-1.5">current</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-bold text-foreground/30">160</span>
                <span className="text-sm text-muted-foreground ml-1.5">potential</span>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons / Math.max(allLessons.length, 1)) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
              />
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              Complete all {allLessons.length} lessons to reach Einstein-level mastery
            </p>
          </motion.div>
        </div>

        {/* Start From Beginning CTA */}
        <div className="px-4">
          <Button
            onClick={() => {
              setSelectedModule('ancient-greek');
              const firstLesson = getPathLessonsByModule('ancient-greek')[0];
              if (firstLesson) handleLessonOpen(firstLesson);
            }}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-sm font-semibold rounded-xl"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {completedLessons > 0 ? 'Continue The Path' : 'Start From The Beginning'}
          </Button>
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
        moduleId={selectedLesson?.moduleId}
        moduleName={modules.find(m => m.id === selectedLesson?.moduleId)?.name}
        isOpen={showLessonModal}
        onClose={handleLessonClose}
        isCompleted={selectedLesson ? isLessonCompleted(selectedLesson.id) : false}
        onToggleComplete={handleToggleComplete}
      />
    </AppLayout>
  );
};

export default PathOfGenius;
