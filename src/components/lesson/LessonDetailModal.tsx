import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lesson } from '@/data/lessons';
import { getQuizByLessonId } from '@/data/quizzes';
import { getExercisesByLessonId } from '@/data/exercises';
import { LessonQuiz } from '@/components/lesson/LessonQuiz';
import { LessonExercises } from '@/components/lesson/LessonExercises';
import { Clock, ExternalLink, Check, BookOpen, HelpCircle, Dumbbell, Play, Book, Video, FileText, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { normalizeExternalUrl } from '@/lib/externalLinks';

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
  const [activeTab, setActiveTab] = useState('content');
  
  if (!lesson) return null;

  const quiz = getQuizByLessonId(lesson.id);
  const exercises = getExercisesByLessonId(lesson.id);
  const hasQuiz = quiz && quiz.questions.length > 0;
  const hasExercises = exercises && exercises.exercises.length > 0;

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      onToggleComplete(lesson.id);
      onClose();
    }
  };

  const handleExercisesComplete = (allCorrect: boolean) => {
    // Exercises don't require completion, just track participation
  };

  // Count tabs for grid columns
  const tabCount = 1 + (hasExercises ? 1 : 0) + (hasQuiz ? 1 : 0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={false}
    >
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 min-h-0 flex flex-col mt-2">
          <TabsList className={cn("grid w-full shrink-0", `grid-cols-${tabCount}`)}>
            <TabsTrigger value="content" className="text-xs">
              <BookOpen className="w-3 h-3 mr-1" />
              Lesson
            </TabsTrigger>
            {hasExercises && (
              <TabsTrigger value="exercises" className="text-xs">
                <Dumbbell className="w-3 h-3 mr-1" />
                Practice
              </TabsTrigger>
            )}
            {hasQuiz && (
              <TabsTrigger value="quiz" className="text-xs">
                <HelpCircle className="w-3 h-3 mr-1" />
                Quiz
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="content" className="flex-1 overflow-y-auto mt-4 space-y-5 pr-2">
            {/* Overview */}
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lesson.overview}
              </p>
            </div>

            {/* Video Resource */}
            {lesson.videoUrl && (
              <div className="bg-accent/10 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 text-accent" />
                  Watch & Learn
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Watch this video for a deeper understanding:
                </p>
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 hover:underline font-medium bg-accent/10 px-3 py-2 rounded-lg"
                >
                  <Play className="w-4 h-4" />
                  {lesson.videoTitle || "Watch Video"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

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
                  href={normalizeExternalUrl(lesson.fullTextUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 hover:underline font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  {lesson.fullTextTitle || "Read Full Text"}
                </a>
              </div>
            )}

            {/* Study Resources - Ancient Masters & Primary Sources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Book className="w-4 h-4 text-primary" />
                  Study the Ancient Masters
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Learn directly from the sources that inspired the geniuses:
                </p>
                <div className="space-y-3">
                  {lesson.resources.map((resource, i) => {
                    const IconComponent = resource.type === 'book' ? Book 
                      : resource.type === 'video' ? Video 
                      : resource.type === 'tool' ? Wrench 
                      : FileText;
                    
                    return (
                      <a
                        key={i}
                        href={normalizeExternalUrl(resource.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            resource.type === 'book' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                            resource.type === 'video' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                            resource.type === 'tool' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          )}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {resource.title}
                              </span>
                              {resource.free && (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-success/10 text-success">
                                  FREE
                                </span>
                              )}
                              <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            {resource.author && (
                              <p className="text-xs text-muted-foreground">by {resource.author}</p>
                            )}
                            {resource.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {resource.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Practice & Quiz CTAs */}
            {(hasExercises || hasQuiz) && !isCompleted && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Ready to practice?</h4>
                <div className="flex gap-2">
                  {hasExercises && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setActiveTab('exercises')}
                    >
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Practice Exercises
                    </Button>
                  )}
                  {hasQuiz && (
                    <Button 
                      size="sm" 
                      onClick={() => setActiveTab('quiz')}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  )}
                </div>
                {hasQuiz && (
                  <p className="text-xs text-muted-foreground">
                    Complete the quiz to mark this lesson as done.
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          {hasExercises && (
            <TabsContent value="exercises" className="flex-1 overflow-y-auto mt-4 pr-2">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-1">Practice Exercises</h4>
                <p className="text-xs text-muted-foreground">
                  Reinforce your learning with these interactive exercises.
                </p>
              </div>
              
              <LessonExercises 
                exercises={exercises.exercises}
                lessonId={lesson.id}
                onComplete={handleExercisesComplete}
              />
            </TabsContent>
          )}

          {hasQuiz && (
            <TabsContent value="quiz" className="flex-1 overflow-y-auto mt-4 pr-2">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-1">Comprehension Quiz</h4>
                <p className="text-xs text-muted-foreground">
                  Answer at least 2 out of 3 questions correctly to complete this lesson.
                </p>
              </div>
              
              <LessonQuiz 
                questions={quiz.questions} 
                onComplete={handleQuizComplete}
              />
            </TabsContent>
          )}
        </Tabs>

        {/* Action Button - only show if no quiz or already completed */}
        {(!hasQuiz || isCompleted) && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};
