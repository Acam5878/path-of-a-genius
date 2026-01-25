import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Subject, getGeniusById } from '@/data/geniuses';
import { getLessonsBySubjectId, Lesson } from '@/data/lessons';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { LessonCard } from '@/components/lesson/LessonCard';
import { LessonDetailModal } from '@/components/lesson/LessonDetailModal';
import { BookOpen, Clock, Target, Check, Plus, Scroll, GraduationCap, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface SubjectDetailModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
}

const difficultyColors = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-secondary/20 text-secondary-foreground',
  Advanced: 'bg-accent/10 text-accent',
};

export const SubjectDetailModal = ({ subject, isOpen, onClose }: SubjectDetailModalProps) => {
  const { addSubject, isSubjectAdded, startSubject, getSubjectProgress, toggleLessonComplete, isLessonCompleted } = useLearningPath();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);

  if (!subject) return null;

  const genius = getGeniusById(subject.geniusId);
  const isAdded = isSubjectAdded(subject.id);
  const userProgress = getSubjectProgress(subject.id);
  const lessons = getLessonsBySubjectId(subject.id);
  const completedLessonsCount = userProgress?.completedLessons?.length || 0;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  const handleAddOrStart = () => {
    if (!isAdded) {
      addSubject(subject);
    } else if (userProgress?.status === 'not_started') {
      startSubject(subject.id);
    }
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    if (!isAdded) {
      addSubject(subject);
    }
    toggleLessonComplete(subject.id, lessonId);
  };

  const handleViewLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setLessonModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="shrink-0">
            <div className="flex items-center gap-2">
              <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColors[subject.difficulty])}>
                {subject.difficulty}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{subject.category}</span>
            </div>
            <DialogTitle className="font-heading text-xl">{subject.subjectName}</DialogTitle>
            {genius && (
              <p className="text-sm text-muted-foreground">From {genius.name}'s curriculum</p>
            )}
          </DialogHeader>

          {/* Progress Bar (if added) */}
          {isAdded && totalLessons > 0 && (
            <div className="mt-2 shrink-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{completedLessonsCount}/{totalLessons} lessons complete</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          <Tabs defaultValue="lessons" className="flex-1 min-h-0 flex flex-col mt-4">
            <TabsList className="grid w-full grid-cols-3 shrink-0">
              <TabsTrigger value="lessons" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="overview" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs">
                <Library className="w-3 h-3 mr-1" />
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Lessons Tab */}
            <TabsContent value="lessons" className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1">
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={isLessonCompleted(subject.id, lesson.id)}
                    onToggleComplete={handleToggleLessonComplete}
                    onViewLesson={handleViewLesson}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Lessons coming soon!</p>
                  <p className="text-xs mt-1">Check the Resources tab for study materials.</p>
                </div>
              )}
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="flex-1 overflow-y-auto mt-4 space-y-5 pr-1">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-medium text-foreground">{subject.timeInvestment}</p>
                  <p className="text-[10px] text-muted-foreground">Time Investment</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Target className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-medium text-foreground">Age {subject.ageStarted}+</p>
                  <p className="text-[10px] text-muted-foreground">Starting Age</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <BookOpen className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-medium text-foreground">{totalLessons > 0 ? totalLessons : subject.specificTexts.length}</p>
                  <p className="text-[10px] text-muted-foreground">{totalLessons > 0 ? 'Lessons' : 'Core Texts'}</p>
                </div>
              </div>

              {/* Why It Matters */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Why It Matters</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{subject.whyItMatters}</p>
              </div>

              {/* Learning Method */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">How {genius?.name.split(' ')[0]} Learned</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{subject.learningMethod}</p>
              </div>

              {/* Original Texts */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-secondary" />
                  Original Study Materials
                </h4>
                <ul className="space-y-1">
                  {subject.specificTexts.map((text, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-secondary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1">
              {subject.resources && subject.resources.length > 0 ? (
                subject.resources.map((resource, i) => (
                  <ResourceCard key={resource.id} resource={resource} index={i} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Library className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No resources available yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="mt-4 shrink-0">
            <Button 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11"
              onClick={handleAddOrStart}
            >
              {isAdded ? (
                userProgress?.status === 'not_started' ? (
                  <>Start Learning</>
                ) : userProgress?.status === 'completed' ? (
                  <><Check className="w-4 h-4 mr-2" /> Completed!</>
                ) : (
                  <><Check className="w-4 h-4 mr-2" /> Continue Learning</>
                )
              ) : (
                <><Plus className="w-4 h-4 mr-2" /> Add to My Path</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lesson Detail Modal */}
      <LessonDetailModal
        lesson={selectedLesson}
        isOpen={lessonModalOpen}
        onClose={() => {
          setLessonModalOpen(false);
          setSelectedLesson(null);
        }}
        isCompleted={selectedLesson ? isLessonCompleted(subject.id, selectedLesson.id) : false}
        onToggleComplete={(lessonId) => handleToggleLessonComplete(lessonId)}
      />
    </>
  );
};
