import { useState } from 'react';
import { Exercise } from '@/data/exercises';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonExercisesProps {
  exercises: Exercise[];
  onComplete: (allCorrect: boolean) => void;
}

export const LessonExercises = ({ exercises, onComplete }: LessonExercisesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const currentExercise = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;

  const handleInputChange = (exerciseId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: value }));
  };

  const checkAnswer = (exercise: Exercise) => {
    const userAnswer = userAnswers[exercise.id]?.toLowerCase().trim() || '';
    const correctAnswer = exercise.answer.toLowerCase().trim();
    const isCorrect = userAnswer === correctAnswer || 
                      userAnswer.includes(correctAnswer) || 
                      correctAnswer.includes(userAnswer);
    setCheckedAnswers(prev => ({ ...prev, [exercise.id]: isCorrect }));
  };

  const toggleHint = (exerciseId: string) => {
    setShowHint(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const handleNext = () => {
    if (isLastExercise) {
      setShowResults(true);
      const correctCount = Object.values(checkedAnswers).filter(Boolean).length;
      onComplete(correctCount === exercises.length);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const isCurrentChecked = checkedAnswers[currentExercise?.id] !== undefined;
  const isCurrentCorrect = checkedAnswers[currentExercise?.id];

  if (showResults) {
    const correctCount = Object.values(checkedAnswers).filter(Boolean).length;
    const allCorrect = correctCount === exercises.length;

    return (
      <div className="text-center py-6">
        <div className={cn(
          "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
          allCorrect ? "bg-success/20" : "bg-muted"
        )}>
          {allCorrect ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : (
            <span className="text-2xl font-bold text-foreground">{correctCount}/{exercises.length}</span>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2">
          {allCorrect ? "Excellent Work!" : "Good Effort!"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          You got {correctCount} out of {exercises.length} exercises correct.
        </p>
        <Button 
          onClick={() => {
            setCurrentIndex(0);
            setUserAnswers({});
            setCheckedAnswers({});
            setShowHint({});
            setShowResults(false);
          }}
          variant="outline"
          size="sm"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!currentExercise) return null;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Exercise {currentIndex + 1} of {exercises.length}</span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <p className="text-xs text-secondary font-medium mb-1">{currentExercise.instruction}</p>
          <p className="text-sm text-foreground font-medium">{currentExercise.content}</p>
        </div>

        {/* Input */}
        <div className="relative">
          <Input
            value={userAnswers[currentExercise.id] || ''}
            onChange={(e) => handleInputChange(currentExercise.id, e.target.value)}
            placeholder="Type your answer..."
            disabled={isCurrentChecked}
            className={cn(
              "transition-colors",
              isCurrentChecked && isCurrentCorrect && "border-success bg-success/10",
              isCurrentChecked && !isCurrentCorrect && "border-destructive bg-destructive/10"
            )}
          />
          {isCurrentChecked && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isCurrentCorrect ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
          )}
        </div>

        {/* Hint */}
        {currentExercise.hint && !isCurrentChecked && (
          <button
            onClick={() => toggleHint(currentExercise.id)}
            className="text-xs text-secondary hover:text-secondary/80 flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3" />
            {showHint[currentExercise.id] ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        
        {showHint[currentExercise.id] && !isCurrentChecked && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
            💡 {currentExercise.hint}
          </div>
        )}

        {/* Correct Answer (if wrong) */}
        {isCurrentChecked && !isCurrentCorrect && (
          <div className="text-sm">
            <span className="text-muted-foreground">Correct answer: </span>
            <span className="text-success font-medium">{currentExercise.answer}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!isCurrentChecked ? (
          <Button
            onClick={() => checkAnswer(currentExercise)}
            disabled={!userAnswers[currentExercise.id]?.trim()}
            className="flex-1"
            size="sm"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1"
            size="sm"
          >
            {isLastExercise ? 'See Results' : 'Next Exercise'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
