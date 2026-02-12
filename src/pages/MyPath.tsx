import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, BookOpen, StickyNote, Brain, TrendingUp, Sparkles,
  ChevronRight, RefreshCw, Calendar, Flame, Check, Play, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  getPathModules, 
  getPathLessonsByModule, 
  getAllPathLessons,
  PathLesson 
} from '@/data/pathCurriculum';
import { PathLessonDetailModal } from '@/components/lesson/PathLessonDetailModal';
import { useTutor } from '@/contexts/TutorContext';
import { cn } from '@/lib/utils';
import { GeneralNoteEditor } from '@/components/notes/GeneralNoteEditor';

type TabId = 'overview' | 'revision' | 'notes';

interface LessonNote {
  id: string;
  title: string | null;
  lesson_id: string | null;
  module_id: string | null;
  content: string;
  updated_at: string;
  created_at: string;
}

const MyPath = () => {
  const navigate = useNavigate();
  const { completedLessons, isLessonCompleted, toggleLessonComplete } = usePathProgress();
  const { streak } = useLearningPath();
  const { setLessonContext } = useTutor();
  const { isPremium, showPaywall } = useSubscription();
  
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    const stored = localStorage.getItem('genius-weekly-goal');
    return stored ? parseInt(stored) : 5;
  });
  const [allNotes, setAllNotes] = useState<LessonNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<LessonNote | null | 'new'>(null); // null = list view, 'new' = create, LessonNote = edit
  
  // Lesson modal state
  const [selectedLesson, setSelectedLesson] = useState<PathLesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);

  const modules = getPathModules();
  const allLessons = getAllPathLessons();
  const completedCount = completedLessons.length;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Weekly progress (lessons completed this week)
  const [weeklyCompleted] = useState(() => {
    // Simple approximation — in real app would track dates
    return Math.min(completedCount, weeklyGoal);
  });

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    setNotesLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_lesson_notes' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      
      if (!error && data) {
        setAllNotes(data as unknown as LessonNote[]);
      }
    } catch (e) {
      console.error('Error fetching notes:', e);
    } finally {
      setNotesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'notes') fetchNotes();
  }, [activeTab, fetchNotes]);

  // Save weekly goal
  useEffect(() => {
    localStorage.setItem('genius-weekly-goal', String(weeklyGoal));
  }, [weeklyGoal]);

  // Get completed lessons with their data for revision
  const completedLessonData = allLessons.filter(l => isLessonCompleted(l.id));
  
  // Get next lesson to study
  const nextLesson = allLessons.find(l => !isLessonCompleted(l.id));

  const handleLessonOpen = (lesson: PathLesson) => {
    if (!isPremium && lesson.id !== 'greek-alphabet') {
      showPaywall();
      return;
    }
    setSelectedLesson(lesson);
    setShowLessonModal(true);
    setLessonContext({
      geniusId: 'path-of-genius',
      geniusName: 'Path of a Genius',
      subjectId: lesson.moduleId,
      subjectName: modules.find(m => m.id === lesson.moduleId)?.name || '',
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonContent: lesson.content,
    });
  };

  const getLessonTitle = (lessonId: string) => {
    return allLessons.find(l => l.id === lessonId)?.title || lessonId;
  };

  const getModuleName = (moduleId: string) => {
    return modules.find(m => m.id === moduleId)?.name || moduleId;
  };

  const tabs: { id: TabId; label: string; icon: typeof Target }[] = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'revision', label: 'Revision', icon: RefreshCw },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <AppLayout>
      <Header title="My Path" />

      <div className="py-4 space-y-4">
        {/* Tab Selector */}
        <div className="px-4">
          <div className="flex bg-muted/50 rounded-xl p-1 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* === OVERVIEW TAB === */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Streak & Stats */}
              <div className="px-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-accent" />
                      <span className="font-heading font-semibold text-foreground">
                        {streak} Day Streak
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {completedCount}/{totalLessons} lessons
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground text-right">{progressPercent}% complete</p>
                </div>
              </div>

              {/* Weekly Goal */}
              <div className="px-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <h4 className="font-heading font-semibold text-sm text-foreground">Weekly Goal</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      {[3, 5, 7, 10].map(n => (
                        <button
                          key={n}
                          onClick={() => setWeeklyGoal(n)}
                          className={cn(
                            "w-7 h-7 rounded-full text-xs font-mono font-bold transition-all",
                            weeklyGoal === n
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Goal progress dots */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: weeklyGoal }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 h-2 rounded-full transition-colors",
                          i < weeklyCompleted ? "bg-success" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {weeklyCompleted}/{weeklyGoal} lessons this week
                  </p>
                </div>
              </div>

              {/* Next Lesson CTA */}
              {nextLesson && (
                <div className="px-4">
                  <button
                    onClick={() => handleLessonOpen(nextLesson)}
                    className="w-full bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                        <Play className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-secondary font-medium uppercase tracking-wide">Up Next</p>
                        <h4 className="font-heading font-semibold text-foreground text-sm truncate">
                          {nextLesson.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {getModuleName(nextLesson.moduleId)} • {nextLesson.estimatedMinutes} min
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    </div>
                  </button>
                </div>
              )}

              {/* IQ Progress */}
              <div className="px-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-secondary" />
                    <h4 className="font-heading font-semibold text-sm text-foreground">IQ Potential</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-secondary">
                      {100 + Math.floor((completedCount / Math.max(totalLessons, 1)) * 60)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Target: 160</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedCount / Math.max(totalLessons, 1)) * 100}%` }}
                      className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Quick link to The Path */}
              <div className="px-4">
                <Button
                  variant="outline"
                  className="w-full border-secondary/30 text-secondary"
                  onClick={() => navigate('/the-path')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Go to The Path
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* === REVISION TAB === */}
          {activeTab === 'revision' && (
            <motion.div
              key="revision"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3 px-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Review Completed Lessons</h3>
                <span className="text-xs text-muted-foreground font-mono">{completedLessonData.length}</span>
              </div>

              {completedLessonData.length === 0 ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No completed lessons yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete lessons on The Path to build your revision queue</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-secondary/30 text-secondary"
                    onClick={() => navigate('/the-path')}
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Start Learning
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {completedLessonData.map((lesson, i) => (
                    <motion.button
                      key={lesson.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleLessonOpen(lesson)}
                      className="w-full flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border text-left hover:border-secondary/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{lesson.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{getModuleName(lesson.moduleId)} • {lesson.estimatedMinutes} min</p>
                      </div>
                      <RefreshCw className="w-4 h-4 text-muted-foreground shrink-0" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* === NOTES TAB === */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3 px-4"
            >
              <AnimatePresence mode="wait">
                {editingNote !== null ? (
                  <GeneralNoteEditor
                    key={editingNote === 'new' ? 'new' : editingNote.id}
                    note={editingNote === 'new' ? null : editingNote}
                    onBack={() => setEditingNote(null)}
                    onSaved={() => { setEditingNote(null); fetchNotes(); }}
                    onDeleted={() => { setEditingNote(null); fetchNotes(); }}
                  />
                ) : (
                  <motion.div key="note-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-semibold text-foreground">Your Notes</h3>
                      <Button
                        size="sm"
                        onClick={() => setEditingNote('new')}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-8"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> New Note
                      </Button>
                    </div>

                    {notesLoading ? (
                      <div className="text-center py-12">
                        <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
                      </div>
                    ) : allNotes.length === 0 ? (
                      <div className="text-center py-12">
                        <StickyNote className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No notes yet</p>
                        <p className="text-xs text-muted-foreground mt-1">Create a note to start writing, or take notes during lessons</p>
                        <Button
                          size="sm"
                          className="mt-4 bg-secondary text-secondary-foreground"
                          onClick={() => setEditingNote('new')}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Create Your First Note
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {allNotes.map((note, i) => (
                          <motion.button
                            key={note.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => setEditingNote(note)}
                            className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-secondary/30 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-semibold text-foreground truncate flex-1">
                                {note.title || (note.lesson_id ? getLessonTitle(note.lesson_id) : 'Untitled Note')}
                              </h4>
                              {note.module_id && (
                                <span className="text-[10px] text-muted-foreground ml-2 shrink-0">
                                  {getModuleName(note.module_id)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 whitespace-pre-wrap">
                              {note.content || 'Empty note'}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1.5">
                              {new Date(note.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-24" />
      </div>

      {/* Lesson Modal */}
      <PathLessonDetailModal
        lesson={selectedLesson}
        moduleId={selectedLesson?.moduleId}
        moduleName={selectedLesson ? getModuleName(selectedLesson.moduleId) : undefined}
        isOpen={showLessonModal}
        onClose={() => { setShowLessonModal(false); setSelectedLesson(null); }}
        isCompleted={selectedLesson ? isLessonCompleted(selectedLesson.id) : false}
        onToggleComplete={toggleLessonComplete}
      />
    </AppLayout>
  );
};

export default MyPath;
