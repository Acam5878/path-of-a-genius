import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Subject, getGeniusById } from '@/data/geniuses';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { BookOpen, Clock, Target, Check, Plus, Scroll } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const { addSubject, isSubjectAdded, startSubject, getSubjectProgress } = useLearningPath();

  if (!subject) return null;

  const genius = getGeniusById(subject.geniusId);
  const isAdded = isSubjectAdded(subject.id);
  const userProgress = getSubjectProgress(subject.id);

  const handleAddOrStart = () => {
    if (!isAdded) {
      addSubject(subject);
    } else if (userProgress?.status === 'not_started') {
      startSubject(subject.id);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
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

        <div className="space-y-5 mt-4">
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
              <p className="text-xs font-medium text-foreground">{subject.specificTexts.length}</p>
              <p className="text-[10px] text-muted-foreground">Core Texts</p>
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

          {/* Modern Resources */}
          {subject.resources && subject.resources.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                Modern Study Resources
              </h4>
              <div className="space-y-3">
                {subject.resources.map((resource, i) => (
                  <ResourceCard key={resource.id} resource={resource} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11"
            onClick={handleAddOrStart}
          >
            {isAdded ? (
              userProgress?.status === 'not_started' ? (
                <>Start Learning</>
              ) : (
                <><Check className="w-4 h-4 mr-2" /> Already in Your Path</>
              )
            ) : (
              <><Plus className="w-4 h-4 mr-2" /> Add to My Path</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
