import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/data/lessons';
import { Clock, ExternalLink, Check, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

export const LessonDetailModal = ({ 
  lesson, 
  isOpen, 
  onClose, 
  isCompleted, 
  onToggleComplete 
}: LessonDetailModalProps) => {
  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.estimatedMinutes} minutes</span>
            {isCompleted && (
              <span className="text-success flex items-center gap-1">
                <Check className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <DialogTitle className="font-heading text-xl">
            {lesson.order}. {lesson.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-5 mt-4 pr-2">
          {/* Overview */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lesson.overview}
            </p>
          </div>

          {/* Lesson Content */}
          {lesson.content && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                Lesson Content
              </h4>
              <div className="prose prose-sm max-w-none text-foreground/90">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-transparent p-0 m-0">
                  {lesson.content}
                </pre>
              </div>
            </div>
          )}

          {/* Key Points */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Key Takeaways</h4>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Further Reading */}
          {lesson.fullTextUrl && (
            <div className="bg-secondary/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">📚 Go Deeper</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Read the original source for full understanding:
              </p>
              <a
                href={lesson.fullTextUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 hover:underline font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                {lesson.fullTextTitle || "Read Full Text"}
              </a>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="shrink-0 pt-4">
          <Button 
            className={cn(
              "w-full h-11",
              isCompleted 
                ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                : "bg-success text-white hover:bg-success/90"
            )}
            onClick={() => {
              onToggleComplete(lesson.id);
              if (!isCompleted) onClose();
            }}
          >
            {isCompleted ? (
              <>Mark as Incomplete</>
            ) : (
              <><Check className="w-4 h-4 mr-2" /> Mark as Complete</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
