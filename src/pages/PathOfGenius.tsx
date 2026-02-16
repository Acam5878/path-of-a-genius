import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Lock, Check, Play, BookOpen, ExternalLink, Crown, Brain, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
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
  'languages': { area: 'Verbal', boost: '+9 pts' },
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

// Maps each module to its primary genius(es)
const MODULE_GENIUS: Record<string, string> = {
  'ancient-greek': 'J.S. Mill',
  'logic': 'Mill · Aristotle',
  'latin': 'J.S. Mill',
  'languages': 'Pascal · Mill',
  'mathematics': 'Einstein · Pascal',
  'natural-philosophy': 'Newton',
  'chemistry': 'Curie',
  'natural-history': 'da Vinci',
  'literature': 'Goethe · Mill',
  'history': 'Mill',
  'ethics': 'Mill · Aristotle',
  'rhetoric': 'Mill',
  'thought-experiments': 'Einstein',
  'engineering': 'da Vinci · Tesla',
  'anatomy': 'da Vinci',
};

const PathOfGenius = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLessonCompleted, toggleLessonComplete, completedLessons: completedLessonIds } = usePathProgress();
  const { setLessonContext } = useTutor();
  const { isPremium, showPaywall } = useSubscription();
  
  // Get modules and lessons from the standalone curriculum
  const modules = getPathModules();
  const allLessons = getAllPathLessons();

  // Check for query params from genius profile links
  const moduleParam = searchParams.get('module');
  const lessonParam = searchParams.get('lesson');

  // Auto-select: query param > in-progress module > null
  const initialModule = (() => {
    if (moduleParam && modules.some(m => m.id === moduleParam)) return moduleParam;
    for (const mod of modules) {
      const modLessons = getPathLessonsByModule(mod.id);
      if (modLessons.length === 0) continue;
      const done = modLessons.filter(l => isLessonCompleted(l.id)).length;
      if (done > 0 && done < modLessons.length) return mod.id;
    }
    return null;
  })();

  const [selectedModule, setSelectedModule] = useState<string | null>(initialModule);
  const [selectedLesson, setSelectedLesson] = useState<PathLesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  
  // Auto-open first lesson when lesson=first param is present
  useEffect(() => {
    if (lessonParam === 'first' && moduleParam) {
      const moduleLessons = getPathLessonsByModule(moduleParam);
      if (moduleLessons.length > 0) {
        const firstLesson = moduleLessons[0];
        setSelectedLesson(firstLesson);
        setShowLessonModal(true);
      }
      setSearchParams({}, { replace: true });
    } else if (moduleParam) {
      setSearchParams({}, { replace: true });
    }
  }, []);
  
  // Calculate completion stats
  const completedLessons = allLessons.filter(lesson => 
    isLessonCompleted(lesson.id)
  ).length;

  // Free lessons - first lesson of every module is free
  const FREE_LESSON_IDS = [
    'greek-alphabet',           // Ancient Greek
    'logic-three-laws',         // Logic
    'latin-first-declension',   // Latin
    'lang-1-classical-roots',   // Languages
    'math-euclid-elements',     // Mathematics
    'physics-newton-laws',      // Physics
    'chemistry-acids-bases',    // Chemistry
    'natural-history-observation', // Natural History (using the search result ID)
    'lit-homer-iliad',          // Literature
    'history-ancient-greece',   // History
    'ethics-virtue-aristotle',  // Ethics
    'rhetoric-three-appeals',   // Rhetoric
    'thought-experiments-intro',// Thought Experiments
    'engineering-mechanical',   // Engineering
    'anatomy-leonardo-method',  // Anatomy
    'reading-greek-latin-early',// Reading
  ];

  const isLessonFree = (lessonId: string) => {
    // First lesson of each module is free
    if (FREE_LESSON_IDS.includes(lessonId)) return true;
    // Also check dynamically: if it's the first lesson (order 1) in its module
    const lesson = allLessons.find(l => l.id === lessonId);
    return lesson?.order === 1;
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

      <div className="py-4 space-y-4">
        {!selectedModule && (
          <div className="px-4 space-y-3">
            {/* Compact dark hero */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-white leading-tight">
                    The Education That Created Geniuses
                  </h2>
                  <p className="text-xs text-white/50">
                    Classical curriculum from history's greatest minds
                  </p>
                </div>
              </div>

              {/* Inline stats */}
              <div className="flex justify-between items-center bg-white/5 rounded-xl p-2.5">
                <div className="text-center flex-1">
                  <p className="font-mono text-base font-bold text-secondary">{allLessons.length}</p>
                  <p className="text-[10px] text-white/40">Lessons</p>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="text-center flex-1">
                  <p className="font-mono text-base font-bold text-secondary">{modules.length}</p>
                  <p className="text-[10px] text-white/40">Modules</p>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="text-center flex-1">
                  <p className="font-mono text-base font-bold text-secondary">6</p>
                  <p className="text-[10px] text-white/40">Stages</p>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="text-center flex-1">
                  <p className="font-mono text-base font-bold text-secondary">∞</p>
                  <p className="text-[10px] text-white/40">Potential</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Why Learn This Module - shown when module is expanded */}
        {selectedModule && (() => {
          const mod = modules.find(m => m.id === selectedModule);
          if (!mod) return null;
          const iqBenefit = MODULE_IQ_BENEFITS[mod.id];
          const genius = MODULE_GENIUS[mod.id];
          return (
            <div className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 border border-secondary/20 rounded-2xl p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-xl flex-shrink-0">
                    {mod.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-bold text-foreground leading-tight">
                      Why Learn {mod.name}?
                    </h3>
                    {iqBenefit && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Brain className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-xs font-medium text-secondary">{iqBenefit.area} Intelligence {iqBenefit.boost}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {mod.whyStudy && (
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                    {mod.whyStudy}
                  </p>
                )}
                
                {genius && (
                  <p className="text-xs text-muted-foreground italic">
                    Studied by: {genius}
                  </p>
                )}
              </motion.div>
            </div>
          );
        })()}
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
                        {/* Genius attribution */}
                        {MODULE_GENIUS[module.id] && (
                          <p className="text-[9px] text-muted-foreground/70 mt-0.5">{MODULE_GENIUS[module.id]}</p>
                        )}
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
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedModule(null)}
                      className="mb-3 border-secondary/30 text-secondary hover:bg-secondary/10"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                      All Modules
                    </Button>

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
        <Link to="/iq-tests" className="block px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-accent/10 rounded-xl border border-secondary/20 p-4 hover:border-secondary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                <h4 className="font-heading font-semibold text-sm text-foreground">Your IQ Potential</h4>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
        </Link>

        {/* Start / Continue CTA */}
        <div className="px-4">
          <Button
            onClick={() => {
              setSelectedModule(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
