import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, BookOpen, Video, ExternalLink, 
  Play, ClipboardList, Table, ChevronDown, ChevronUp,
  Link2, ListOrdered, Sparkles, Quote, MessageCircle, Scroll, Languages,
  Puzzle, GitBranch, Calculator, LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PathLesson } from '@/data/pathCurriculum';
import { getPathInteractiveExercises } from '@/data/pathInteractiveExercises';
import { cn } from '@/lib/utils';
import { normalizeExternalUrl } from '@/lib/externalLinks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LessonNotesSection } from './LessonNotesSection';
import { useLessonNotes } from '@/hooks/useLessonNotes';
import { useTutor } from '@/contexts/TutorContext';
import { useAuth } from '@/contexts/AuthContext';
import { MatchingExercise, OrderingExercise, CalculatorExercise, StepByStepExercise } from '@/components/exercises';
import { LessonPreviewCards } from './LessonPreviewCards';

interface PathLessonDetailModalProps {
  lesson: PathLesson | null;
  moduleId?: string;
  moduleName?: string;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

// Helper to generate a recommended learning flow based on lesson content
const generateLearningFlow = (lesson: PathLesson) => {
  const steps: { step: number; action: string; icon: 'video' | 'book' | 'content' | 'vocab' | 'exercise' | 'notes' | 'tutor' }[] = [];
  let stepNum = 1;

  const videos = lesson.resources?.filter(r => r.type === 'video') || [];
  if (videos.length > 0) {
    steps.push({ step: stepNum++, action: `Watch the video${videos.length > 1 ? 's' : ''} below to get started`, icon: 'video' });
  }

  steps.push({ step: stepNum++, action: 'Read through the lesson content', icon: 'content' });

  if (lesson.vocabularyTable && lesson.vocabularyTable.length > 0) {
    steps.push({ step: stepNum++, action: `Study the ${lesson.vocabularyTable.length} vocabulary terms`, icon: 'vocab' });
  }

  if (lesson.exercises && lesson.exercises.length > 0) {
    steps.push({ step: stepNum++, action: `Complete the ${lesson.exercises.length} exercises`, icon: 'exercise' });
  }

  // Always include notes and tutor steps
  steps.push({ step: stepNum++, action: 'Make notes as you go', icon: 'notes' });
  steps.push({ step: stepNum++, action: 'Ask the Tutor for help at any point', icon: 'tutor' });

  const books = lesson.resources?.filter(r => r.type === 'book' || r.type === 'article') || [];
  if (books.length > 0) {
    steps.push({ step: stepNum++, action: 'Explore additional reading for deeper understanding', icon: 'book' });
  }

  return steps;
};

export const PathLessonDetailModal = ({
  lesson,
  moduleId,
  moduleName,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete
}: PathLessonDetailModalProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['flow', 'resources']));
  const { setLessonContext, openTutor } = useTutor();
  
  // Notes hook
  const {
    localContent: notesContent,
    isLoading: notesLoading,
    isSaving: notesSaving,
    hasUnsavedChanges: notesUnsaved,
    updateLocalContent: updateNotes,
    saveNote,
  } = useLessonNotes(lesson?.id, moduleId);

  // Update tutor context with notes
  useEffect(() => {
    if (lesson && isOpen) {
      setLessonContext({
        geniusId: moduleId || 'path',
        geniusName: moduleName || 'The Path',
        subjectId: moduleId || 'general',
        subjectName: moduleName || 'General Studies',
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonContent: lesson.content,
        userNotes: notesContent,
      });
    }
  }, [lesson, isOpen, moduleId, moduleName, notesContent, setLessonContext]);

  if (!lesson) return null;

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const resourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      default: return <Link2 className="w-4 h-4" />;
    }
  };

  const learningFlow = generateLearningFlow(lesson);
  const videos = lesson.resources?.filter(r => r.type === 'video') || [];
  const otherResources = lesson.resources?.filter(r => r.type !== 'video') || [];
  const interactiveExercises = getPathInteractiveExercises(lesson.id);
  const hasInteractive = interactiveExercises && (
    interactiveExercises.matching || interactiveExercises.ordering || 
    interactiveExercises.calculator || interactiveExercises.stepByStep
  );

  return (
    <Dialog
      open={isOpen}
      // Only close when the dialog is actually being closed.
      // Opening the Tutor shifts focus and can trigger interact/focus-outside events.
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={false}
    >
      <DialogContent
        className="max-w-2xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] p-0 gap-0 overflow-hidden z-50"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-4 pb-2 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-heading text-lg font-semibold text-foreground pr-2">
                  {lesson.title}
                </DialogTitle>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTutor();
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary hover:scale-105 transition-transform"
                  aria-label="Ask AI Tutor about this lesson"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-secondary-foreground" />
                  <span className="text-[10px] font-medium text-secondary-foreground whitespace-nowrap">Ask if unsure</span>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {lesson.estimatedMinutes} min estimated
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-4">
            {/* Quick Preview Flashcards */}
            <LessonPreviewCards lesson={lesson} />

            {/* Recommended Learning Flow */}
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Recommended Learning Flow</h4>
                  <p className="text-xs text-muted-foreground">Follow these steps for best results</p>
                </div>
              </div>
              <div className="space-y-2">
                {learningFlow.map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                      {item.step}
                    </div>
                    <span className="text-sm text-foreground">{item.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Resources (at the top for easy access) */}
            {videos.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-500" />
                  Start Here: Watch First
                </h4>
                <div className="space-y-2">
                  {videos.map((resource, i) => (
                    <a
                      key={i}
                      href={normalizeExternalUrl(resource.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg hover:border-red-600 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-900/40 text-red-400 flex items-center justify-center shrink-0">
                        <Play className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-foreground truncate">{resource.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {resource.provider && <span>{resource.provider}</span>}
                          {resource.free && (
                            <span className="px-1.5 py-0.5 bg-success/10 text-success rounded-full text-[10px] font-medium">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-red-500 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4">
              <p className="text-sm text-foreground leading-relaxed">{lesson.overview}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-secondary" />
                Key Points
              </h4>
              <ul className="space-y-1.5">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Notes Section - with Tutor integration */}
            <LessonNotesSection
              localContent={notesContent}
              isLoading={notesLoading}
              isSaving={notesSaving}
              hasUnsavedChanges={notesUnsaved}
              onUpdateContent={updateNotes}
              onSave={saveNote}
              lessonTitle={lesson.title}
            />

            {/* Content Section - Redesigned for better readability */}
            <CollapsibleSection
              title="Lesson Content"
              icon={<BookOpen className="w-4 h-4 text-secondary" />}
              isExpanded={expandedSections.has('content')}
              onToggle={() => toggleSection('content')}
            >
              <div className="bg-gradient-to-br from-card via-background to-secondary/10 rounded-xl p-5 border border-secondary/10">
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-headings:font-heading prose-strong:text-foreground prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-heading font-bold text-foreground mt-4 mb-3 pb-2 border-b border-secondary/20">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-heading font-semibold text-foreground mt-5 mb-2 flex items-center gap-2">
                          <span className="w-1 h-5 bg-secondary rounded-full" />
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-heading font-medium text-foreground mt-4 mb-2">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground bg-secondary/10 px-1 rounded">
                          {children}
                        </strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-1.5 my-3 ml-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="space-y-2 my-3 ml-1 list-none">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-secondary mt-0.5 shrink-0">•</span>
                          <span>{children}</span>
                        </li>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4 rounded-lg border border-border shadow-sm">
                          <table className="w-full text-xs border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-secondary/10">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-border">
                          {children}
                        </th>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-border">
                          {children}
                        </tbody>
                      ),
                      tr: ({ children }) => (
                        <tr className="hover:bg-muted/30 transition-colors">
                          {children}
                        </tr>
                      ),
                      td: ({ children }) => (
                        <td className="px-3 py-2 text-muted-foreground">
                          {children}
                        </td>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-3 border-secondary bg-secondary/5 pl-4 py-2 my-4 rounded-r-lg italic text-muted-foreground">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {lesson.content}
                  </ReactMarkdown>
                </div>
              </div>
            </CollapsibleSection>

            {/* Vocabulary Table */}
            {lesson.vocabularyTable && lesson.vocabularyTable.length > 0 && (
              <CollapsibleSection
                title={`Vocabulary (${lesson.vocabularyTable.length} terms)`}
                icon={<Table className="w-4 h-4 text-secondary" />}
                isExpanded={expandedSections.has('vocabulary')}
                onToggle={() => toggleSection('vocabulary')}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Term</th>
                        {lesson.vocabularyTable.some(e => e.pronunciation) && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Pronunciation</th>
                        )}
                        {lesson.vocabularyTable.some(e => e.greekRoot) && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Greek</th>
                        )}
                        {lesson.vocabularyTable.some(e => e.latinRoot) && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Latin</th>
                        )}
                        <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Meaning</th>
                        {lesson.vocabularyTable.some(e => e.derivatives) && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Derivatives</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.vocabularyTable.map((entry, i) => {
                        const showPronunciation = lesson.vocabularyTable!.some(e => e.pronunciation);
                        const showGreek = lesson.vocabularyTable!.some(e => e.greekRoot);
                        const showLatin = lesson.vocabularyTable!.some(e => e.latinRoot);
                        const showDerivatives = lesson.vocabularyTable!.some(e => e.derivatives);
                        return (
                          <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                            <td className="border border-border px-2 py-1.5 font-mono text-foreground">{entry.term}</td>
                            {showPronunciation && (
                              <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.pronunciation || '—'}</td>
                            )}
                            {showGreek && (
                              <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.greekRoot || '—'}</td>
                            )}
                            {showLatin && (
                              <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.latinRoot || '—'}</td>
                            )}
                            <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.meaning}</td>
                            {showDerivatives && (
                              <td className="border border-border px-2 py-1.5 text-muted-foreground italic">{entry.derivatives}</td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CollapsibleSection>
            )}

            {/* Exercises - Text + Interactive */}
            {(lesson.exercises?.length || hasInteractive) && (
              <CollapsibleSection
                title={`Exercises${lesson.exercises?.length ? ` (${lesson.exercises.length}${hasInteractive ? ' + interactive' : ''})` : ' (interactive)'}`}
                icon={<Play className="w-4 h-4 text-secondary" />}
                isExpanded={expandedSections.has('exercises')}
                onToggle={() => toggleSection('exercises')}
              >
                <div className="space-y-4">
                  {/* Text-based exercises */}
                  {lesson.exercises && lesson.exercises.length > 0 && (
                    <ul className="space-y-2">
                      {lesson.exercises.map((exercise, i) => (
                        <li key={i} className="flex items-start gap-3 p-2 bg-muted/50 rounded-lg">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0",
                            exercise.type === 'writing' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                            exercise.type === 'translation' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                            exercise.type === 'reading' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                            exercise.type === 'practice' && "bg-secondary/20 text-secondary"
                          )}>
                            {i + 1}
                          </div>
                          <span className="text-sm text-muted-foreground">{exercise.instruction}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Interactive Exercises */}
                  {hasInteractive && (
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Puzzle className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-foreground">Interactive Practice</span>
                      </div>
                      <Tabs defaultValue={interactiveExercises?.matching ? 'matching' : interactiveExercises?.ordering ? 'ordering' : interactiveExercises?.stepByStep ? 'stepbystep' : 'calculator'}>
                        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${[interactiveExercises?.matching, interactiveExercises?.ordering, interactiveExercises?.calculator, interactiveExercises?.stepByStep].filter(Boolean).length}, 1fr)` }}>
                          {interactiveExercises?.matching && (
                            <TabsTrigger value="matching" className="text-xs gap-1">
                              <Puzzle className="w-3 h-3" />Match
                            </TabsTrigger>
                          )}
                          {interactiveExercises?.ordering && (
                            <TabsTrigger value="ordering" className="text-xs gap-1">
                              <ListOrdered className="w-3 h-3" />Order
                            </TabsTrigger>
                          )}
                          {interactiveExercises?.stepByStep && (
                            <TabsTrigger value="stepbystep" className="text-xs gap-1">
                              <GitBranch className="w-3 h-3" />Solve
                            </TabsTrigger>
                          )}
                          {interactiveExercises?.calculator && (
                            <TabsTrigger value="calculator" className="text-xs gap-1">
                              <Calculator className="w-3 h-3" />Calculate
                            </TabsTrigger>
                          )}
                        </TabsList>

                        {interactiveExercises?.matching && (
                          <TabsContent value="matching" className="mt-3">
                            <MatchingExercise
                              pairs={interactiveExercises.matching.pairs}
                              instruction={interactiveExercises.matching.instruction}
                              onComplete={() => {}}
                            />
                          </TabsContent>
                        )}
                        {interactiveExercises?.ordering && (
                          <TabsContent value="ordering" className="mt-3">
                            <OrderingExercise
                              items={interactiveExercises.ordering.items}
                              instruction={interactiveExercises.ordering.instruction}
                              onComplete={() => {}}
                            />
                          </TabsContent>
                        )}
                        {interactiveExercises?.stepByStep && (
                          <TabsContent value="stepbystep" className="mt-3">
                            <StepByStepExercise
                              {...interactiveExercises.stepByStep}
                              onComplete={() => {}}
                            />
                          </TabsContent>
                        )}
                        {interactiveExercises?.calculator && (
                          <TabsContent value="calculator" className="mt-3">
                            <CalculatorExercise
                              {...interactiveExercises.calculator}
                              onComplete={() => {}}
                            />
                          </TabsContent>
                        )}
                      </Tabs>
                    </div>
                  )}
                </div>
              </CollapsibleSection>
            )}

            {/* Primary Source Excerpts - "Study the Ancient Masters" */}
            {lesson.primarySourceExcerpts && lesson.primarySourceExcerpts.length > 0 && (
              <CollapsibleSection
                title={`Study the Ancient Masters (${lesson.primarySourceExcerpts.length} ${lesson.primarySourceExcerpts.length === 1 ? 'excerpt' : 'excerpts'})`}
                icon={<Scroll className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                isExpanded={expandedSections.has('sources')}
                onToggle={() => toggleSection('sources')}
              >
                <div className="space-y-4">
                  {lesson.primarySourceExcerpts.map((excerpt, i) => (
                    <div key={i} className="bg-muted/30 border border-border rounded-xl p-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Quote className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-foreground text-sm">{excerpt.title}</h5>
                          <p className="text-xs text-muted-foreground">{excerpt.author}</p>
                          <a
                            href={normalizeExternalUrl(excerpt.sourceUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline flex items-center gap-1 mt-0.5"
                          >
                            {excerpt.source}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Original Text (if available - for Greek/Latin) */}
                      {excerpt.originalText && (
                        <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1 font-medium">Original Text:</p>
                          <p className="text-sm text-foreground font-serif italic whitespace-pre-line">{excerpt.originalText}</p>
                        </div>
                      )}

                      {/* Translated Text */}
                      <div className="mb-3 p-3 bg-card rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground mb-1 font-medium">
                          {excerpt.originalText ? 'Translation:' : 'Text:'}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{excerpt.translatedText}</p>
                      </div>

                      {/* Context */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Historical Context:
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{excerpt.context}</p>
                      </div>

                      {/* Discussion Questions */}
                      {excerpt.discussionQuestions && excerpt.discussionQuestions.length > 0 && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Discussion Questions:
                          </p>
                          <ul className="space-y-1.5">
                            {excerpt.discussionQuestions.map((question, qi) => (
                              <li key={qi} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="text-accent font-bold shrink-0">{qi + 1}.</span>
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {/* Classical Connections - Latin/Greek vocabulary reinforcement */}
            {lesson.classicalConnections && lesson.classicalConnections.length > 0 && (
              <CollapsibleSection
                title={`Classical Roots (${lesson.classicalConnections.length} terms)`}
                icon={<Languages className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                isExpanded={expandedSections.has('classical')}
                onToggle={() => toggleSection('classical')}
              >
                <div className="bg-gradient-to-br from-violet-50/50 via-indigo-50/30 to-purple-50/50 dark:from-violet-900/20 dark:via-indigo-900/10 dark:to-purple-900/20 rounded-xl p-4 border border-violet-200/50 dark:border-violet-800/30">
                  <p className="text-xs text-violet-700 dark:text-violet-300 font-medium mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-[10px]">🔤</span>
                    Building mental connections through etymology—the Mill Method
                  </p>
                  <div className="grid gap-3">
                    {lesson.classicalConnections.map((conn, i) => (
                      <div key={i} className="bg-white/80 dark:bg-card/60 rounded-lg p-3 border border-violet-100 dark:border-violet-800/30 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className={`shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center ${
                            conn.language === 'Greek' 
                              ? 'bg-blue-100 dark:bg-blue-900/40' 
                              : conn.language === 'Latin'
                              ? 'bg-purple-100 dark:bg-purple-900/40'
                              : 'bg-indigo-100 dark:bg-indigo-900/40'
                          }`}>
                            <span className="text-lg">{conn.language === 'Greek' ? '🏛️' : conn.language === 'Latin' ? '📜' : '🌍'}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-wide ${
                              conn.language === 'Greek' 
                                ? 'text-blue-700 dark:text-blue-300' 
                                : conn.language === 'Latin'
                                ? 'text-purple-700 dark:text-purple-300'
                                : 'text-indigo-700 dark:text-indigo-300'
                            }`}>
                              {conn.language}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap mb-1">
                              <span className="font-heading font-bold text-foreground text-base">{conn.term}</span>
                              <span className="text-muted-foreground">←</span>
                              <span className="font-serif italic text-violet-700 dark:text-violet-300">{conn.original}</span>
                            </div>
                            <p className="text-xs font-medium text-secondary mb-1">"{conn.meaning}"</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{conn.usage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            )}

            {/* Additional Resources (books, tools, articles - not videos) */}
            {otherResources.length > 0 && (
              <CollapsibleSection
                title={`Additional Resources (${otherResources.length})`}
                icon={<BookOpen className="w-4 h-4 text-secondary" />}
                isExpanded={expandedSections.has('resources')}
                onToggle={() => toggleSection('resources')}
              >
                <div className="space-y-2">
                  {otherResources.map((resource, i) => (
                    <a
                      key={i}
                      href={normalizeExternalUrl(resource.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-secondary/50 transition-colors text-left"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        resource.type === 'book' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                        resource.type === 'tool' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                        resource.type === 'course' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                        resource.type === 'article' && "bg-secondary/20 text-secondary"
                      )}>
                        {resourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-foreground truncate">{resource.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {resource.provider && <span>{resource.provider}</span>}
                          {resource.free && (
                            <span className="px-1.5 py-0.5 bg-success/10 text-success rounded-full text-[10px] font-medium">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                    </a>
                  ))}
                </div>
              </CollapsibleSection>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <LessonFooter
          lessonId={lesson.id}
          isCompleted={isCompleted}
          onToggleComplete={onToggleComplete}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

// Lesson Footer with auth-aware Mark Complete button
const LessonFooter = ({
  lessonId,
  isCompleted,
  onToggleComplete,
  onClose,
}: {
  lessonId: string;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 border-t border-border bg-card flex items-center justify-between gap-3">
      <Button variant="outline" onClick={onClose} className="flex-1">
        Close
      </Button>
      {user ? (
        <Button
          onClick={() => onToggleComplete(lessonId)}
          className={cn(
            "flex-1",
            isCompleted
              ? "bg-success text-success-foreground hover:bg-success/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Completed
            </>
          ) : (
            'Mark Complete'
          )}
        </Button>
      ) : (
        <Button
          onClick={() => navigate('/auth')}
          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign in to save progress
        </Button>
      )}
    </div>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  isExpanded: boolean; 
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border border-border rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-sm text-foreground">{title}</span>
      </div>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="p-3 pt-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
