import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, BookOpen, Video, ExternalLink, 
  Play, ClipboardList, Table, ChevronDown, ChevronUp,
  Link2, ListOrdered, Sparkles, Quote, MessageCircle, Scroll, Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PathLesson } from '@/data/pathCurriculum';
import { cn } from '@/lib/utils';
import { normalizeExternalUrl } from '@/lib/externalLinks';
import ReactMarkdown from 'react-markdown';

interface PathLessonDetailModalProps {
  lesson: PathLesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

// Helper to generate a recommended learning flow based on lesson content
const generateLearningFlow = (lesson: PathLesson) => {
  const steps: { step: number; action: string; icon: 'video' | 'book' | 'content' | 'vocab' | 'exercise' }[] = [];
  let stepNum = 1;

  // If there are video resources, watch them first
  const videos = lesson.resources?.filter(r => r.type === 'video') || [];
  if (videos.length > 0) {
    steps.push({ step: stepNum++, action: `Watch the video${videos.length > 1 ? 's' : ''} below to get started`, icon: 'video' });
  }

  // Read the lesson content
  steps.push({ step: stepNum++, action: 'Read through the lesson content', icon: 'content' });

  // If there's vocabulary, study it
  if (lesson.vocabularyTable && lesson.vocabularyTable.length > 0) {
    steps.push({ step: stepNum++, action: `Study the ${lesson.vocabularyTable.length} vocabulary terms`, icon: 'vocab' });
  }

  // Complete the exercises
  if (lesson.exercises && lesson.exercises.length > 0) {
    steps.push({ step: stepNum++, action: `Complete the ${lesson.exercises.length} exercises`, icon: 'exercise' });
  }

  // Check additional resources for deeper learning
  const books = lesson.resources?.filter(r => r.type === 'book' || r.type === 'article') || [];
  if (books.length > 0) {
    steps.push({ step: stepNum++, action: 'Explore additional reading for deeper understanding', icon: 'book' });
  }

  return steps;
};

export const PathLessonDetailModal = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete
}: PathLessonDetailModalProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['flow', 'resources']));

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
        className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden z-50"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-4 pb-2 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <DialogTitle className="font-heading text-lg font-semibold text-foreground pr-8">
                {lesson.title}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {lesson.estimatedMinutes} min estimated
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-4">
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
                    <button
                      key={i}
                      onClick={() => window.open(normalizeExternalUrl(resource.url), '_blank')}
                      className="w-full flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:border-red-400 dark:hover:border-red-600 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
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
                    </button>
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

            {/* Content Section */}
            <CollapsibleSection
              title="Lesson Content"
              icon={<BookOpen className="w-4 h-4 text-secondary" />}
              isExpanded={expandedSections.has('content')}
              onToggle={() => toggleSection('content')}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                <ReactMarkdown
                  components={{
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-3">
                        <table className="w-full text-xs border-collapse border border-border rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-border bg-muted px-2 py-1.5 text-left font-semibold text-foreground">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-border px-2 py-1.5 text-muted-foreground">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {lesson.content}
                </ReactMarkdown>
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
                        {lesson.vocabularyTable[0]?.pronunciation && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Pronunciation</th>
                        )}
                        <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Meaning</th>
                        {lesson.vocabularyTable[0]?.derivatives && (
                          <th className="border border-border px-2 py-1.5 text-left font-semibold text-foreground">Derivatives</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.vocabularyTable.map((entry, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                          <td className="border border-border px-2 py-1.5 font-mono text-foreground">{entry.term}</td>
                          {entry.pronunciation && (
                            <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.pronunciation}</td>
                          )}
                          <td className="border border-border px-2 py-1.5 text-muted-foreground">{entry.meaning}</td>
                          {entry.derivatives && (
                            <td className="border border-border px-2 py-1.5 text-muted-foreground italic">{entry.derivatives}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleSection>
            )}

            {/* Exercises */}
            {lesson.exercises && lesson.exercises.length > 0 && (
              <CollapsibleSection
                title={`Exercises (${lesson.exercises.length})`}
                icon={<Play className="w-4 h-4 text-secondary" />}
                isExpanded={expandedSections.has('exercises')}
                onToggle={() => toggleSection('exercises')}
              >
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
                    <div key={i} className="bg-gradient-to-br from-amber-50/80 to-cream/30 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                          <Quote className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-foreground text-sm">{excerpt.title}</h5>
                          <p className="text-xs text-muted-foreground">{excerpt.author}</p>
                          <button
                            onClick={() => window.open(normalizeExternalUrl(excerpt.sourceUrl), '_blank')}
                            className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            {excerpt.source}
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Original Text (if available - for Greek/Latin) */}
                      {excerpt.originalText && (
                        <div className="mb-3 p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg border border-amber-200/50 dark:border-amber-700/30">
                          <p className="text-xs text-muted-foreground mb-1 font-medium">Original Text:</p>
                          <p className="text-sm text-foreground font-serif italic whitespace-pre-line">{excerpt.originalText}</p>
                        </div>
                      )}

                      {/* Translated Text */}
                      <div className="mb-3 p-3 bg-white/60 dark:bg-card/60 rounded-lg border border-amber-100 dark:border-amber-800/30">
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
                        <div className="pt-2 border-t border-amber-200/50 dark:border-amber-700/30">
                          <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Discussion Questions:
                          </p>
                          <ul className="space-y-1.5">
                            {excerpt.discussionQuestions.map((question, qi) => (
                              <li key={qi} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">{qi + 1}.</span>
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
                title={`Classical Connections (${lesson.classicalConnections.length} terms)`}
                icon={<Languages className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                isExpanded={expandedSections.has('classical')}
                onToggle={() => toggleSection('classical')}
              >
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground italic mb-3">
                    Reinforcing your Greek and Latin vocabulary—the classical roots behind scientific terms.
                  </p>
                  {lesson.classicalConnections.map((conn, i) => (
                    <div key={i} className="bg-gradient-to-r from-violet-50/80 to-indigo-50/50 dark:from-violet-900/20 dark:to-indigo-900/10 border border-violet-200 dark:border-violet-800/50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${
                          conn.language === 'Greek' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                            : conn.language === 'Latin'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                        }`}>
                          {conn.language}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-semibold text-foreground">{conn.term}</span>
                            <span className="text-xs text-muted-foreground">←</span>
                            <span className="font-mono text-sm text-violet-700 dark:text-violet-300">{conn.original}</span>
                            <span className="text-xs text-muted-foreground">"{conn.meaning}"</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{conn.usage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <button
                      key={i}
                      onClick={() => window.open(normalizeExternalUrl(resource.url), '_blank')}
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
                    </button>
                  ))}
                </div>
              </CollapsibleSection>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-card flex items-center justify-between gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button 
            onClick={() => onToggleComplete(lesson.id)}
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
        </div>
      </DialogContent>
    </Dialog>
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
