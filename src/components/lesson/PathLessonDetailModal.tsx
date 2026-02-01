import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, BookOpen, Video, ExternalLink, 
  Play, ClipboardList, Table, ChevronDown, ChevronUp,
  Link2
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

export const PathLessonDetailModal = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete
}: PathLessonDetailModalProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['content']));

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden">
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

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <CollapsibleSection
                title={`Resources (${lesson.resources.length})`}
                icon={<ExternalLink className="w-4 h-4 text-secondary" />}
                isExpanded={expandedSections.has('resources')}
                onToggle={() => toggleSection('resources')}
              >
                <div className="space-y-2">
                  {lesson.resources.map((resource, i) => (
                    <button
                      key={i}
                      onClick={() => window.open(normalizeExternalUrl(resource.url), '_blank')}
                      className="w-full flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-secondary/50 transition-colors text-left"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        resource.type === 'video' && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
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
