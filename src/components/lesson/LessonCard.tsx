import { Lesson } from '@/data/lessons';
import { Check, Clock, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onViewLesson: (lesson: Lesson) => void;
}

export const LessonCard = ({ lesson, isCompleted, onToggleComplete, onViewLesson }: LessonCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card border rounded-lg p-4 transition-all",
        isCompleted ? "border-success/30 bg-success/5" : "border-border hover:border-secondary/50"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <button 
          onClick={() => onToggleComplete(lesson.id)}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
            isCompleted 
              ? "bg-success border-success text-white" 
              : "border-muted-foreground hover:border-secondary"
          )}
        >
          {isCompleted && <Check className="w-3.5 h-3.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className={cn(
              "font-medium text-sm",
              isCompleted ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {lesson.order}. {lesson.title}
            </h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="w-3 h-3" />
              <span>{lesson.estimatedMinutes} min</span>
            </div>
          </div>

          {/* Overview */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {lesson.overview}
          </p>

          {/* Key Points */}
          <ul className="space-y-1 mb-3">
            {lesson.keyPoints.slice(0, 3).map((point, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-secondary mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => onViewLesson(lesson)}
            >
              <BookOpen className="w-3 h-3 mr-1" />
              View Lesson
            </Button>
            
            {lesson.fullTextUrl && (
              <a
                href={lesson.fullTextUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {lesson.fullTextTitle || "Read Full Text"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
